import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { authorityHubs } from "../content/authority-batch.mjs";

const root = process.cwd();
const htmlFiles = readdirSync(root).filter((file) => file.endsWith(".html"));
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const problems = [];
const checkedAssets = new Set();
const authorityPages = new Map();
for (const hub of authorityHubs) {
  authorityPages.set(hub.slug, { kind: "hub", hub });
  for (const article of hub.articles) authorityPages.set(article[0], { kind: "article", hub });
}
authorityPages.set("boating-library.html", { kind: "index" });
const seenDescriptions = new Map();
const editorialGroups = {
  destinations: {
    files: ["lake-george-guide.html", "thousand-islands-guide.html", "finger-lakes-guide.html", "lake-champlain-guide.html", "lake-winnipesaukee-guide.html", "newport-rhode-island-guide.html", "cape-cod-guide.html", "chesapeake-bay-guide.html", "erie-canal-guide.html"],
    minimumWords: 1200,
    maximumWords: 2500,
  },
  products: {
    files: ["best-chartplotters.html", "best-boat-coolers.html", "best-life-jackets.html"],
    minimumWords: 2000,
    maximumWords: 4000,
  },
  journal: {
    files: ["classic-runabouts.html", "chartplotter-needs.html", "dock-box-essentials.html", "end-of-season-checklist.html", "great-family-boat.html", "waterfront-escape.html", "weather.html", "guide.html"],
    minimumWords: 1500,
    maximumWords: 3000,
  },
};
const editorialRules = new Map(Object.values(editorialGroups).flatMap((group) => group.files.map((file) => [file, group])));
const retiredGeneratedArtwork = [
  "assets/cape-cod.webp",
  "assets/chesapeake-bay.webp",
  "assets/erie-canal.webp",
  "assets/lake-champlain.webp",
  "assets/lake-winnipesaukee.webp",
  "assets/newport-rhode-island.webp",
  "assets/cape-cod.svg",
  "assets/chesapeake-bay.svg",
  "assets/erie-canal.svg",
  "assets/finger-lakes.svg",
  "assets/lake-champlain.svg",
  "assets/lake-george.svg",
  "assets/lake-winnipesaukee.svg",
  "assets/newport-rhode-island.svg",
  "assets/thousand-islands.svg",
];

function plainText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(html) {
  const text = plainText(html);
  return text ? text.split(" ").length : 0;
}

function localPath(rawValue) {
  const value = rawValue.trim().replaceAll("&quot;", '"').replaceAll("&#39;", "'").replace(/^['"]|['"]$/g, "");
  if (!value || value === "#") return value === "#" ? "#" : null;
  if (/^(?:[a-z]+:|\/\/)/i.test(value)) return null;

  const clean = value.split("#")[0].split("?")[0];
  if (!clean) return null;
  return normalize(clean.replace(/^\//, ""));
}

function hasValidImageSignature(path) {
  const data = readFileSync(path);
  const extension = extname(path).toLowerCase();

  if (extension === ".jpg" || extension === ".jpeg") {
    return data.length > 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  }
  if (extension === ".png") {
    return data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (extension === ".webp") {
    return data.length > 12 && data.subarray(0, 4).toString("ascii") === "RIFF" && data.subarray(8, 12).toString("ascii") === "WEBP";
  }
  if (extension === ".svg") {
    return data.toString("utf8").includes("<svg");
  }
  return true;
}

for (const htmlFile of htmlFiles) {
  const html = readFileSync(join(root, htmlFile), "utf8");
  const references = [
    ...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi),
    ...html.matchAll(/url\(([^)]+)\)/gi),
  ];

  for (const match of references) {
    const relative = localPath(match[1]);
    if (relative === "#") {
      problems.push(`${htmlFile}: dead placeholder link href="#"`);
      continue;
    }
    if (!relative || relative.startsWith("..")) continue;

    const target = join(root, relative);
    if (!existsSync(target)) {
      problems.push(`${htmlFile}: missing local target ${relative}`);
      continue;
    }

    if (/\.(?:jpe?g|png|webp|svg)$/i.test(relative) && !checkedAssets.has(relative)) {
      checkedAssets.add(relative);
      if (!hasValidImageSignature(target)) {
        problems.push(`${htmlFile}: ${relative} does not contain valid ${extname(relative)} image data`);
      }
    }
  }

  if (/\bundefined\b/i.test(html)) {
    problems.push(`${htmlFile}: contains the literal value "undefined"`);
  }

  for (const retiredImage of retiredGeneratedArtwork) {
    if (html.includes(retiredImage)) problems.push(`${htmlFile}: still references retired generated artwork ${retiredImage}`);
  }

  const externalImage = html.match(/<img\b[^>]*\bsrc=["']https?:\/\//i);
  if (externalImage) problems.push(`${htmlFile}: display image is externally hotlinked`);

  const emptyAlts = [...html.matchAll(/<img\b[^>]*\balt=["']\s*["'][^>]*>/gi)].length;
  const imagesWithoutAlt = [...html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)].length;
  if (emptyAlts || imagesWithoutAlt) {
    problems.push(`${htmlFile}: image alt-text failure (${emptyAlts} empty, ${imagesWithoutAlt} missing)`);
  }

  if (htmlFile !== "thanks.html") {
    if (!/<meta\s+name=["']description["']/i.test(html)) problems.push(`${htmlFile}: missing meta description`);
    if (!/<link\s+rel=["']canonical["']/i.test(html)) problems.push(`${htmlFile}: missing canonical URL`);
    if (!/<meta\s+property=["']og:title["']/i.test(html)) problems.push(`${htmlFile}: missing Open Graph title`);
    if (!/<meta\s+property=["']og:description["']/i.test(html)) problems.push(`${htmlFile}: missing Open Graph description`);
    if (!/<meta\s+property=["']og:url["']/i.test(html)) problems.push(`${htmlFile}: missing Open Graph URL`);
    if ((html.match(/<h1\b/gi) || []).length !== 1) problems.push(`${htmlFile}: must contain exactly one h1`);
    const publicUrl = htmlFile === "index.html" ? "https://nauticaldream.com/" : `https://nauticaldream.com/${htmlFile}`;
    if (!sitemap.includes(publicUrl)) problems.push(`${htmlFile}: missing from sitemap.xml`);
    const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=(["'])(.*?)\1/i);
    const description = descriptionMatch?.[2];
    if (description) {
      if (seenDescriptions.has(description)) problems.push(`${htmlFile}: duplicates meta description from ${seenDescriptions.get(description)}`);
      else seenDescriptions.set(description, htmlFile);
    }
  }

  const authority = authorityPages.get(htmlFile);
  if (authority) {
    const words = wordCount(html);
    const minimum = authority.kind === "article" ? 850 : authority.kind === "hub" ? 450 : 180;
    if (words < minimum) problems.push(`${htmlFile}: ${words} words; authority ${authority.kind} requires at least ${minimum}`);
    if (!/application\/ld\+json/i.test(html)) problems.push(`${htmlFile}: authority page missing structured data`);
    if (authority.kind === "article" && !html.includes(`href="${authority.hub.slug}"`)) problems.push(`${htmlFile}: missing backlink to ${authority.hub.slug}`);
  }

  const rule = editorialRules.get(htmlFile);
  if (rule) {
    const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] || "";
    const words = wordCount(article);
    if (words < rule.minimumWords || words > rule.maximumWords) {
      problems.push(`${htmlFile}: ${words} editorial words; expected ${rule.minimumWords}-${rule.maximumWords}`);
    }

    const inlineImages = [...article.matchAll(/<img\b/gi)].length;
    const requiredInlineImages = Math.max(3, Math.ceil(words / 500) - 1);
    if (inlineImages < requiredInlineImages) {
      problems.push(`${htmlFile}: ${inlineImages} inline images; needs at least ${requiredInlineImages} for ${words} words plus the hero`);
    }

    if (!/<meta\s+property=["']og:image["']/i.test(html)) problems.push(`${htmlFile}: missing Open Graph image`);
    if (!/application\/ld\+json/i.test(html) || !/FAQPage/.test(html)) problems.push(`${htmlFile}: missing Article/FAQ structured data`);
    if (!/class=["']related-content["']/.test(html)) problems.push(`${htmlFile}: missing related-content block`);

    const related = html.match(/<aside\s+class=["']related-content["'][^>]*>([\s\S]*?)<\/aside>/i)?.[1] || "";
    const relatedLinks = [...related.matchAll(/<a\s+href=/gi)].length;
    if (relatedLinks !== 9 || !/Related stories/.test(related) || !/Destinations/.test(related) || !/Buying guides/.test(related)) {
      problems.push(`${htmlFile}: related content must include 3 stories, 3 destinations and 3 buying guides`);
    }

    if (editorialGroups.journal.files.includes(htmlFile) && !/class=["'](?:pull-quote|editor-note)["']/.test(html)) {
      problems.push(`${htmlFile}: Journal feature needs a pull quote or editorial callout`);
    }
  }
}

for (const match of sitemap.matchAll(/<loc>https:\/\/nauticaldream\.com\/(.*?)<\/loc>/g)) {
  const sitemapPath = match[1];
  if (sitemapPath && !existsSync(join(root, sitemapPath))) problems.push(`sitemap.xml: missing target ${sitemapPath}`);
}

if (problems.length) {
  console.error(`Static site audit failed with ${problems.length} problem(s):`);
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`Static site audit passed: ${htmlFiles.length} HTML pages, ${editorialRules.size} long-form editorial thresholds and ${checkedAssets.size} unique image assets checked.`);
