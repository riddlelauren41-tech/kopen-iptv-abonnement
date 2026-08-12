// Renders a post's cover image from one of several reusable template
// backgrounds (content/cover-templates/) with the post's exact target
// keyword baked in as bold headline text. The backgrounds are generated once
// (AI, one-time cost); the headline text is rendered with code (sharp + SVG),
// so there is zero incremental cost or garbled-text risk per post, no matter
// how many posts use it.
//
// Each category has its own dedicated pool of 2 template variants so posts
// in the same category don't all show the identical background -- round-
// robins per post within that category.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const TEMPLATES_DIR = (root) => path.join(root, "content", "cover-templates");
const POSTS_DIR = (root) => path.join(root, "content", "posts");

const TEMPLATE_POOL_BY_CATEGORY = {
  install: ["template_install_1.png", "template_install_2.png"],
  device: ["template_device_1.png", "template_device_2.png"],
  sport: ["template_sport_1.png", "template_sport_2.png"],
  pricing: ["template_pricing_1.png", "template_pricing_2.png"],
  technique: ["template_technique_1.png", "template_technique_2.png"],
  comparatif: ["template_comparatif_1.png", "template_comparatif_2.png"],
  general: ["template_general_1.png", "template_general_2.png"],
};

// Round-robins within the post's own category, based on how many existing
// posts in that same category already exist -- so the two variants alternate
// evenly instead of a fixed/hashed pick that could still land unevenly.
function pickTemplate(root, category) {
  const pool = TEMPLATE_POOL_BY_CATEGORY[category] || TEMPLATE_POOL_BY_CATEGORY.general;
  const postsDir = POSTS_DIR(root);
  let sameCategoryCount = 0;
  if (fs.existsSync(postsDir)) {
    for (const f of fs.readdirSync(postsDir)) {
      if (!f.endsWith(".json")) continue;
      const post = JSON.parse(fs.readFileSync(path.join(postsDir, f), "utf8"));
      if (post.category === category) sameCategoryCount++;
    }
  }
  return pool[sameCategoryCount % pool.length];
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Greedy word-wrap by estimated character width (bold sans-serif, ~0.58x
// font size per character on average).
function wrapText(text, fontSize, maxWidth) {
  const maxChars = Math.floor(maxWidth / (fontSize * 0.58));
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (test.length > maxChars && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Card thumbnails on the blog listing page render covers at width:100%,
// height:190px with object-fit:cover -- a much wider-than-square box (the
// worst case, a 3-column desktop grid, crops to roughly a 2:1 ratio).
const OUT_W = 1024;
const OUT_H = 540; // ~1.9:1, between the ~1.78:1 (tablet) and ~2.0:1 (desktop) card crops

// Renders `headline` (the post's exact target keyword) onto the category's
// template background and writes a JPG to public/blog/generated/<slug>.jpg.
// Returns the site-relative cover path to store on the post.
export async function renderCoverImage(root, category, headline, slug) {
  const templateFile = pickTemplate(root, category);
  const templatePath = path.join(TEMPLATES_DIR(root), templateFile);

  const W = OUT_W;
  // Shorter keyword-style headlines get the larger size; longer full-sentence
  // titles step down twice so 3-line wraps still fit without shrinking to
  // nothing.
  const fontSize = headline.length > 70 ? 44 : headline.length > 45 ? 56 : 66;
  const lineHeight = fontSize * 1.15;
  const lines = wrapText(headline, fontSize, 920);
  // Anchored to a fixed top margin (not centered around a fixed midpoint) --
  // centering pushes the first line above y=0 for 3-line headlines, clipping
  // it off the top of the canvas. Anchoring the top means extra lines only
  // grow the block downward.
  const startY = 55 + fontSize * 0.72;

  const textEls = lines
    .map((line, i) => {
      // "IPTV" rendered in gold to match the brand's two-tone headline
      // treatment; everything else in white.
      const parts = line.split(/(IPTV)/gi);
      const tspans = parts
        .map((part) => {
          if (!part) return "";
          const isIptv = /^iptv$/i.test(part);
          return `<tspan fill="${isIptv ? "#facc15" : "#ffffff"}">${escapeXml(part)}</tspan>`;
        })
        .join("");
      return (
        `<text x="50%" y="${startY + i * lineHeight}" xml:space="preserve" text-anchor="middle" ` +
        `font-family="Arial, sans-serif" font-weight="900" font-size="${fontSize}" ` +
        `style="paint-order: stroke; stroke: #0a1628; stroke-width: 8px; stroke-linejoin: round;">${tspans}</text>`
      );
    })
    .join("");

  // A dark gradient scrim behind the text -- the smart crop below can keep
  // any part of the template (not a guaranteed-empty top band), so the scrim
  // guarantees legibility over any content, fading out by mid-frame so the
  // graphic stays visible below.
  const scrimHeight = startY + lines.length * lineHeight + 24;
  const svg =
    `<svg width="${W}" height="${OUT_H}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="#0a1628" stop-opacity="0.85"/>` +
    `<stop offset="100%" stop-color="#0a1628" stop-opacity="0"/>` +
    `</linearGradient></defs>` +
    `<rect x="0" y="0" width="${W}" height="${scrimHeight}" fill="url(#scrim)"/>` +
    textEls +
    `</svg>`;

  const outDir = path.join(root, "public", "blog", "generated");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.jpg`);

  await sharp(templatePath)
    // Smart-crop the square template down to the landscape frame, centered
    // on whichever region has the most visual detail (the TV mockup and its
    // category-specific props) instead of a fixed top-anchored slice, which
    // would cut off the props/icons that make each variant visually distinct.
    .resize(OUT_W, OUT_H, { fit: "cover", position: sharp.strategy.attention })
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toFile(outPath);

  return `/blog/generated/${slug}.jpg`;
}
