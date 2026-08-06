import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const htmlFiles = readdirSync(root).filter((file) => file.endsWith(".html"));
const problems = [];
const checkedAssets = new Set();

function localPath(rawValue) {
  const value = rawValue.trim().replace(/^['"]|['"]$/g, "");
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
}

if (problems.length) {
  console.error(`Static site audit failed with ${problems.length} problem(s):`);
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`Static site audit passed: ${htmlFiles.length} HTML pages and ${checkedAssets.size} unique image assets checked.`);
