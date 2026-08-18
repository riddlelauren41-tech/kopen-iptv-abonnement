#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderCoverImage } from "./render-cover.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const POSTS_DIR = path.join(ROOT, "content", "posts");
const TOPICS_PATH = path.join(ROOT, "content", "topics.json");

// content/posts/ can be empty (fresh repo, or after a wipe) and git does not
// track empty directories -- a fresh checkout would then be missing the
// directory entirely, crashing every readdirSync(POSTS_DIR) call below.
fs.mkdirSync(POSTS_DIR, { recursive: true });

// Kept as plain constants here (not imported from lib/site.ts) since this
// script runs under plain Node, which can't import a TypeScript module
// without a loader.
const SITE = {
  name: "IPTV Kopen",
  url: "https://kopen-iptv-abonnement.site",
  description:
    "IPTV Kopen is een IPTV-abonnementendienst voor Nederland en België: live tv, films en series in HD/4K, met directe activatie en 24/7 WhatsApp support.",
};

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const countArg = args.find((a) => a.startsWith("--count="));
const COUNT = Number(countArg ? countArg.split("=")[1] : process.env.ARTICLES_PER_RUN ?? 1);
const getArg = (name) => {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : "";
};
const CUSTOM_TOPIC = getArg("topic");
const CUSTOM_ANGLE = getArg("angle");
const CUSTOM_CATEGORY = getArg("category");

// Same paid-model choice as the owner's other IPTV sites: reliable and cheap
// enough (well under a cent per article) that it beats chasing free-tier
// capacity across providers.
const FALLBACK_MODELS = process.env.ARTICLE_MODEL
  ? [process.env.ARTICLE_MODEL]
  : ["deepseek/deepseek-v4-flash"];
const API_KEY = process.env.OPENROUTER_API_KEY;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (!API_KEY && !DRY_RUN) {
  console.error("Missing OPENROUTER_API_KEY (set it in the environment, or run with --dry-run to test topic selection only).");
  process.exit(1);
}

// Cover images are rendered from AI-generated template backgrounds
// (content/cover-templates/ + render-cover.mjs) with the post's exact
// target keyword baked in as headline text via code (sharp + SVG) --
// zero incremental cost or garbled-text risk per post.

const CATEGORY_LABELS = {
  install: "Installatie",
  device: "Apparaten",
  sport: "Sport",
  pricing: "Prijzen",
  technique: "Probleemoplossing",
  comparatif: "Vergelijking",
  general: "Gids",
};

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function loadTopics() {
  return JSON.parse(fs.readFileSync(TOPICS_PATH, "utf8"));
}

// Concurrent runs (local testing, the daily cron) each load-mutate-save this
// file independently, then get reconciled via git merges -- which can leave
// duplicate entries for the same keyword (a stale "pending" copy alongside
// the real "done" one) if two runs picked the same topic before either had
// pushed. Deduping on every save keeps this self-healing instead of
// accumulating duplicates over time.
function dedupeTopics(topics) {
  const rank = { done: 3, error: 1, pending: 0 };
  const byKeyword = new Map();
  for (const t of topics) {
    const existing = byKeyword.get(t.keyword);
    if (!existing || (rank[t.status] || 0) > (rank[existing.status] || 0)) {
      byKeyword.set(t.keyword, t);
    }
  }
  return [...byKeyword.values()];
}

function saveTopics(topics) {
  fs.writeFileSync(TOPICS_PATH, JSON.stringify(dedupeTopics(topics), null, 2) + "\n");
}

function existingSlugs() {
  return new Set(
    fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""))
  );
}

function existingPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), "utf8")));
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Deterministic, code-controlled link + emphasis insertion -- the model only
// ever writes plain prose. This keeps hrefs limited to real internal routes
// and a small vetted external whitelist, so a hallucinated URL can never end
// up on the site. Ordered longest/most-specific phrase first: overlap
// resolution below prefers earlier-starting, longer matches.
const INTERNAL_LINKS = [
  { pattern: /IPTV abonnement/i, href: "/iptv-abonnement", type: "internal" },
  { pattern: /IPTV Belgi[eë]/i, href: "/iptv-belgie", type: "internal" },
  { pattern: /installatiegids/i, href: "/installatiegids", type: "internal" },
  { pattern: /\bFAQ\b/i, href: "/faq", type: "internal" },
];
const MAX_INTERNAL_LINKS = 3;

const EXTERNAL_LINKS = [
  { pattern: /\b(Mbps|internetsnelheid|bandbreedte)\b/i, href: "https://www.speedtest.net/", rel: "noopener noreferrer", type: "external" },
  { pattern: /\bIPTV\b/, href: "https://nl.wikipedia.org/wiki/IPTV", rel: "noopener noreferrer", type: "external" },
];
const MAX_EXTERNAL_LINKS = 1;

// Not links -- just bold emphasis on brand-critical phrases, same
// non-overlapping mechanism so it never collides with a link span.
const BOLD_PHRASES = [
  { pattern: /IPTV Kopen/, type: "bold" },
  { pattern: /IPTV Nederland/i, type: "bold" },
];
const MAX_BOLD = 4;

// Appended once per article. Deliberately phrased so at least one of these
// patterns always matches, guaranteeing a minimum internal + external link
// even if the model's own prose never happened to contain a matching phrase.
const GUARANTEE_SENTENCES = [
  "Bekijk ons IPTV abonnement voor de actuele pakketten en kies de formule die bij je past.",
  "Wil je meer weten over hoe IPTV precies werkt, dan kun je aanvullende informatie online raadplegen.",
];

function findMatches(text, candidates) {
  const found = [];
  for (const candidate of candidates) {
    const m = text.match(candidate.pattern);
    if (m) found.push({ start: m.index, end: m.index + m[0].length, text: m[0], candidate });
  }
  found.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const accepted = [];
  let lastEnd = -1;
  for (const m of found) {
    if (m.start >= lastEnd) {
      accepted.push(m);
      lastEnd = m.end;
    }
  }
  return accepted;
}

function applyMatches(text, matches) {
  let result = "";
  let cursor = 0;
  for (const m of matches) {
    result += text.slice(cursor, m.start);
    if (m.candidate.type === "bold") {
      result += `<strong>${m.text}</strong>`;
    } else {
      const relAttr = m.candidate.rel ? ` target="_blank" rel="${m.candidate.rel}"` : "";
      result += `<a href="${m.candidate.href}"${relAttr}>${m.text}</a>`;
    }
    cursor = m.end;
  }
  return result + text.slice(cursor);
}

function createAnnotator(allCandidates) {
  const remaining = [...allCandidates];
  const usedCount = { internal: 0, external: 0, bold: 0 };
  const maxByType = { internal: MAX_INTERNAL_LINKS, external: MAX_EXTERNAL_LINKS, bold: MAX_BOLD };

  function annotate(texts) {
    return texts.map((text) => {
      const available = remaining.filter((c) => usedCount[c.type] < maxByType[c.type]);
      if (available.length === 0) return text;

      const matches = findMatches(text, available);
      if (matches.length === 0) return text;

      for (const m of matches) {
        usedCount[m.candidate.type]++;
        remaining.splice(remaining.indexOf(m.candidate), 1);
      }
      return applyMatches(text, matches);
    });
  }

  return { annotate, usedCount };
}

function findRelatedPost(category, excludeSlug) {
  const candidates = existingPosts().filter((p) => p.category === category && p.slug !== excludeSlug);
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function annotateSections(sections, annotator) {
  const flatRefs = [];
  sections.forEach((s, si) => {
    s.body.forEach((_, pi) => flatRefs.push(["body", si, pi]));
    s.list.forEach((_, li) => flatRefs.push(["list", si, li]));
  });
  const flatTexts = flatRefs.map(([kind, si, i]) => sections[si][kind][i]);
  const annotated = annotator.annotate(flatTexts);
  flatRefs.forEach(([kind, si, i], idx) => {
    sections[si][kind][i] = annotated[idx];
  });
}

function buildLinkedSections(rawSections, { slug, category }) {
  const sections = rawSections.map((s) => ({
    heading: escapeHtml(s.heading),
    body: (s.body || []).map(escapeHtml),
    list: (s.list || []).map(escapeHtml),
  }));

  const annotator = createAnnotator([...INTERNAL_LINKS, ...EXTERNAL_LINKS, ...BOLD_PHRASES]);
  annotateSections(sections, annotator);

  const related = findRelatedPost(category, slug);
  const closingBody = [];
  if (annotator.usedCount.internal === 0) closingBody.push(GUARANTEE_SENTENCES[0]);
  if (annotator.usedCount.external === 0) closingBody.push(GUARANTEE_SENTENCES[1]);
  if (related) {
    closingBody.push(
      `Lees ook ons artikel over <a href="/nieuws/${related.slug}">${escapeHtml(related.title)}</a>.`
    );
  }

  if (closingBody.length > 0) {
    const closingSection = { heading: "Meer weten?", body: closingBody, list: [] };
    annotateSections([closingSection], annotator);
    sections.push(closingSection);
  }

  return sections;
}

// Extract the FIRST complete, balanced JSON value from a model response.
function extractJSON(text) {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "");
  const start = cleaned.search(/[\{\[]/);
  if (start === -1) return null;
  const open = cleaned[start];
  const close = open === "{" ? "}" : "]";
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < cleaned.length; i++) {
    const c = cleaned[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return cleaned.slice(start, i + 1);
    }
  }
  return null;
}

function parseModelJSON(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch {
    const repaired = jsonStr.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(repaired);
  }
}

async function callModelJSON(prompt, validate, maxTokens = 3000) {
  const attempts = [];

  for (const model of FALLBACK_MODELS) {
    let reason = "unknown error";
    let rateLimited = false;

    for (let attempt = 1; attempt <= 2; attempt++) {
      let res;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 90_000);
      try {
        res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          signal: controller.signal,
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${API_KEY}`,
            "http-referer": SITE.url,
            "x-title": SITE.name,
          },
          body: JSON.stringify({
            model,
            max_tokens: maxTokens,
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: prompt }],
          }),
        });
      } catch (netErr) {
        reason = netErr.name === "AbortError" ? "timed out after 90s (no response)" : `network error: ${netErr.message}`;
        if (attempt < 2) { await sleep(2000 * attempt); continue; }
        break;
      } finally {
        clearTimeout(timer);
      }

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content ?? "";
        const jsonStr = extractJSON(text);
        if (jsonStr) {
          try {
            const parsed = parseModelJSON(jsonStr);
            if (!validate || validate(parsed)) return parsed;
            reason = "returned JSON in the wrong shape";
          } catch (parseErr) {
            reason = `JSON parse failed: ${parseErr.message}`;
          }
        } else {
          reason = `no JSON found in output: ${text.slice(0, 120)}`;
        }
        if (attempt < 2) { await sleep(1500); continue; }
        break;
      }

      rateLimited = res.status === 429;
      reason = `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`;

      if (rateLimited && attempt < 2) {
        await sleep(3000 * attempt);
        continue;
      }
      break;
    }
    attempts.push({ model, reason, rateLimited });
  }

  const rateLimitedCount = attempts.filter((a) => a.rateLimited).length;
  const summary = attempts.map((a) => `  - ${a.model}: ${a.reason}`).join("\n");
  throw new Error(
    `All ${attempts.length} fallback model(s) failed (${rateLimitedCount} rate-limited):\n${summary}`
  );
}

async function generateArticle(topic) {
  const prompt = `Je bent een senior SEO-copywriter voor ${SITE.name}, een IPTV-abonnementendienst voor Nederland en België.
Beschrijving van de site: ${SITE.description}

Schrijf een lang, diepgaand en SEO-geoptimaliseerd blogartikel in het Nederlands over het volgende onderwerp:
Onderwerp: "${topic.keyword}"
Invalshoek: ${topic.angle}

Doel: dit artikel moet vollediger en nuttiger zijn dan wat concurrenten schrijven (meestal 900-1300
woorden). Streef naar een echt naslagartikel, geen kunstmatig opgeblazen tekst.

Vereiste structuur (zoals een echt professioneel blogartikel, nooit een muur tekst):
- Een "excerpt": 1 samenvattende introductiezin (max 160 tekens), ook gebruikt als intro bovenaan het artikel.
- Precies 8 "sections", elk met:
  - "heading": een specifieke, concrete H2-subtitel (bijv. "Oorzaak 1: Probleem met de internetverbinding"), nooit generiek zoals "Inleiding" of "Conclusie".
  - "body": 3 tot 4 UITGEWERKTE alinea's van elk 4 tot 6 zinnen (ongeveer 220-280 woorden voor de hele sectie) -- leg het "waarom" grondig uit (mechanisme, reden, context, concreet gevolg), nooit slechts 1-2 oppervlakkige zinnen per alinea.
  - "list" (optioneel maar aanbevolen indien relevant): een opsommingslijst van 3 tot 6 concrete stappen/punten. Laat een leeg array [] staan als niet relevant voor deze sectie.
- "faq": 4 tot 6 vragen/antwoorden specifiek voor DIT onderwerp (geen generieke sitevragen) -- echte vragen die een lezer geïnteresseerd in "${topic.keyword}" zou stellen, met volledige antwoorden van 3-5 zinnen elk (geen bondige antwoorden van één zin).
- Met 8 secties van ongeveer 250 woorden elk moet de totale tekst (exclusief FAQ) natuurlijk uitkomen op 1800 tot 2500 woorden. Kom je aan het einde van een sectie en is deze korter dan 200 woorden, werk hem dan verder uit voordat je naar de volgende sectie gaat -- verkort nooit om "snel klaar te zijn".

Inhoudelijke vereisten:
- Informatieve, deskundige en nuttige toon, nooit misleidend. Verzin geen statistieken of samenwerkingen. Geen enkele promotie van of instructie voor piraterij of het omzeilen van auteursrechten; blijf gericht op legitiem gebruik van een IPTV-abonnement.
- Noem op een natuurlijke manier "IPTV Kopen" en "IPTV abonnement" zonder overmatige of kunstmatige herhaling. De dienst is compatibel met meerdere IPTV-apps (IPTV Smarters, TiviMate, GSE Smart IPTV, Smart IPTV) -- je mag deze bij naam noemen waar relevant, maar "IPTV Kopen" verwijst naar het abonnement zelf, niet naar een app.
- Varieer het vocabulaire en de zinsconstructies tussen secties; herhaal niet dezelfde openingszin-structuur bij elke sectie.
- Precieze en pakkende titel (idealiter 60-70 tekens).
- "coverAlt": afbeeldingsbeschrijving in het Nederlands voor toegankelijkheid.

Je antwoord moet direct beginnen met het teken { en eindigen met het teken }. Geen tekst, geen redenering, geen markdown ervoor of erna. Geldig JSON-object in exact dit formaat:
{"title": "...", "excerpt": "...", "coverAlt": "...", "readTime": 9, "sections": [{"heading": "...", "body": ["alinea 1", "alinea 2"], "list": ["stap 1", "stap 2", "stap 3"]}, ...], "faq": [{"q": "...", "a": "..."}, ...]}`;

  const countWords = (a) =>
    a.sections.flatMap((s) => [s.heading, ...(s.body || []), ...(s.list || [])])
      .join(" ").replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;

  const validate = (a) =>
    a && typeof a.title === "string" && a.title.trim().length > 0 &&
    Array.isArray(a.sections) && a.sections.length >= 6 &&
    a.sections.every((s) => s && typeof s.heading === "string" && Array.isArray(s.body)) &&
    Array.isArray(a.faq) && a.faq.length >= 3 &&
    a.faq.every((f) => f && typeof f.q === "string" && typeof f.a === "string") &&
    countWords(a) >= 1500;
  // Successful runs already use 5000-5900 of the previous 7000-token budget
  // for body content alone (measured directly against real published posts)
  // -- FAQ, headings, and JSON structural overhead sit on top of that, so a
  // longer-than-usual article (or a verbose FAQ) had very little room before
  // getting cut off mid-response, producing unbalanced/truncated JSON that
  // extractJSON() correctly rejects as "no JSON found". Real headroom now.
  return callModelJSON(prompt, validate, 10000);
}

async function isCoherent(sections) {
  const sample = sections
    .slice(0, 4)
    .flatMap((s) => [s.heading, ...(s.body || [])])
    .join("\n\n")
    .replace(/<[^>]+>/g, "");
  const prompt = `Hieronder staat een fragment van een Nederlandstalig artikel. Antwoord uitsluitend met een JSON-object.
Als de tekst grammaticaal correct en logisch coherent is van begin tot eind, antwoord dan {"coherent": true}.
Als het onbegrijpelijke zinnen, onzin, verzonnen woorden of betekenisbreuken bevat, antwoord dan {"coherent": false}.

Fragment:
"""${sample}"""

Antwoord alleen met de JSON, verder niets.`;

  try {
    const result = await callModelJSON(prompt);
    return result.coherent !== false;
  } catch {
    return true;
  }
}

async function topUpTopics(topics, needed) {
  const known = topics.map((t) => t.keyword);
  const prompt = `Je stelt ideeën voor SEO-blogartikelen voor in het Nederlands voor ${SITE.name}, een IPTV-abonnementendienst voor Nederland en België.

Stel ${needed} nieuwe artikelonderwerpen voor, verschillend van de onderstaande al behandelde onderwerpen (geen duplicaten of bijna-herformuleringen):
${known.map((k) => `- ${k}`).join("\n")}

Elk onderwerp moet een categorie hebben uit: install, device, sport, pricing, technique, comparatif, general.

Antwoord UITSLUITEND met een geldige JSON-array, zonder markdown of tekst eromheen, in exact dit formaat:
[{"keyword": "...", "angle": "...", "category": "..."}, ...]`;

  // Every callModelJSON request sets response_format: json_object, which
  // forces the model to return a JSON *object* at the top level -- fine for
  // every other prompt in this file (they all ask for an object), but this
  // is the one prompt that wants a bare array. Root-caused in production
  // (2026-08-15 through -18: every single day's brainstorm attempt failed,
  // so the queue silently ran dry and the daily cron did nothing while still
  // reporting green/"success"): with `needed` == 1 the model complies with
  // the object constraint by returning ONE topic as a bare object --
  // {"keyword": ..., "angle": ..., "category": ...} -- not wrapped in an
  // array or in a {"topics": [...]} container. Neither of those first two
  // shapes is an array, so unwrap() needs a third case: if the object itself
  // already looks like a single topic, wrap it in a 1-element array.
  const isTopicShape = (t) => t && typeof t.keyword === "string" && typeof t.category === "string";
  const isValidTopicArray = (v) => Array.isArray(v) && v.every(isTopicShape);

  const unwrap = (parsed) => {
    if (isValidTopicArray(parsed)) return parsed;
    if (isTopicShape(parsed)) return [parsed];
    if (parsed && typeof parsed === "object") {
      const arr = Object.values(parsed).find(isValidTopicArray);
      if (arr) return arr;
    }
    return parsed;
  };

  const newTopics = await callModelJSON(prompt, (parsed) => isValidTopicArray(unwrap(parsed)));
  return unwrap(newTopics).map((t) => ({ ...t, status: "pending" }));
}

async function processTopic(topic, { slugs, today }) {
  let slug = slugify(topic.keyword);
  if (slugs.has(slug)) slug = `${slug}-${today}`;

  process.stdout.write(`Generating: ${topic.keyword} -> ${slug} ... `);

  if (DRY_RUN) {
    console.log("[dry-run, no API call]");
    return { ok: false, dryRun: true };
  }

  try {
    const article = await generateArticle(topic);

    if (!Array.isArray(article.sections) || article.sections.length === 0) {
      throw new Error("Model response missing sections array");
    }

    if (!(await isCoherent(article.sections))) {
      throw new Error("Failed coherence check (garbled output)");
    }

    const category = topic.category || "general";
    // Headline text is the topic's exact target keyword (not the model's
    // embellished article.title) -- guarantees the image always shows the
    // precise SEO phrase being targeted.
    const cover = await renderCoverImage(ROOT, category, topic.keyword, slug);
    const post = {
      slug,
      title: article.title,
      date: today,
      author: "IPTV Kopen Team",
      readTime: Number(article.readTime) || 4,
      excerpt: article.excerpt,
      cover,
      coverAlt: article.coverAlt,
      category,
      categoryLabel: CATEGORY_LABELS[category] || CATEGORY_LABELS.general,
      sections: buildLinkedSections(article.sections, { slug, category }),
      // Not escapeHtml'd like the section body -- the FAQ accordion renders
      // these through plain JSX text interpolation (React escapes on its
      // own), so pre-escaping here would double-escape entities like "&" and
      // show literal "&amp;" text on the page.
      faq: Array.isArray(article.faq)
        ? article.faq
            .filter((f) => f && typeof f.q === "string" && typeof f.a === "string")
            .map((f) => ({ q: f.q, a: f.a }))
        : [],
    };
    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.json`), JSON.stringify(post, null, 2) + "\n");
    slugs.add(slug);
    console.log("done");
    return { ok: true, slug };
  } catch (err) {
    console.log(`FAILED (${err.message})`);
    return { ok: false, error: err.message };
  }
}

async function runCustomTopic() {
  const topics = loadTopics();
  const slugs = existingSlugs();
  const today = new Date().toISOString().slice(0, 10);

  const topic = {
    keyword: CUSTOM_TOPIC,
    angle: CUSTOM_ANGLE || "praktische gids voor IPTV-abonnees",
    category: CUSTOM_CATEGORY || "general",
  };

  const result = await processTopic(topic, { slugs, today });

  if (!result.dryRun) {
    topics.push({
      ...topic,
      status: result.ok ? "done" : "error",
      slug: result.slug,
      error: result.error,
      source: "custom",
    });
    saveTopics(topics);
  }

  console.log(`\n${result.ok ? "Created" : "Failed to create"} 1 article(s) in content/posts/.`);
  if (result.ok) {
    console.log("Next steps: npm run build (verify), review the new page, then commit + push.");
  }
  return result.ok;
}

async function runQueue() {
  let topics = loadTopics();
  let pending = topics.filter((t) => t.status === "pending");

  if (pending.length < COUNT && !DRY_RUN) {
    const needed = COUNT - pending.length;
    console.log(`Only ${pending.length} pending topic(s) left, brainstorming ${needed} more...`);
    try {
      const fresh = await topUpTopics(topics, needed);
      topics = topics.concat(fresh);
      saveTopics(topics);
      pending = topics.filter((t) => t.status === "pending");
      console.log(`Added ${fresh.length} new topic(s) to content/topics.json.`);
    } catch (err) {
      console.log(`Could not brainstorm new topics (${err.message}) — continuing with what's pending.`);
    }
  }

  pending = pending.slice(0, COUNT);

  if (pending.length === 0) {
    console.log("No pending topics left in content/topics.json. Add more entries before the next run.");
    return true;
  }

  const slugs = existingSlugs();
  const today = new Date().toISOString().slice(0, 10);
  let created = 0;

  for (const topic of pending) {
    const result = await processTopic(topic, { slugs, today });
    if (result.ok) {
      topic.status = "done";
      topic.slug = result.slug;
      created++;
    } else if (!result.dryRun) {
      topic.status = "error";
      topic.error = result.error;
    }
  }

  saveTopics(topics);
  console.log(`\nCreated ${created} article(s) in content/posts/.`);
  if (created > 0) {
    console.log("Next steps: npm run build (verify), review the new pages, then commit + push.");
  }
  return created > 0;
}

async function main() {
  const ok = CUSTOM_TOPIC ? await runCustomTopic() : await runQueue();
  if (!ok) {
    console.error("\nNo articles were generated this run — failing so this is visible instead of a silent no-op.");
    process.exitCode = 1;
  }
}

main();
