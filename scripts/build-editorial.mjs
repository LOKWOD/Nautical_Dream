import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { destinations } from "../content/destinations.mjs";
import { productGuides } from "../content/product-guides.mjs";
import { journalFeatures } from "../content/journal-features.mjs";
import { resourceFeatures } from "../content/resource-features.mjs";
import { renderPage } from "./editorial-lib.mjs";

const root = process.cwd();
const pages = [...destinations, ...productGuides, ...journalFeatures, ...resourceFeatures];

for (const page of pages) {
  writeFileSync(join(root, page.slug), renderPage(page));
  console.log(`built ${page.slug}`);
}

console.log(`Built ${pages.length} long-form editorial pages.`);
