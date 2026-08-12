import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: number;
  excerpt: string;
  cover: string;
  coverAlt: string;
  category: string;
  categoryLabel: string;
  sections: { heading?: string; body: string[]; list?: string[] }[];
  faq: { q: string; a: string }[];
};

function loadPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const posts = files.map((f) => JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), "utf8")));
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const POSTS: Post[] = loadPosts();
