import fs from "fs";
import path from "path";

const TSV_PATH = "disconnected_frontmatter.tsv";
const MD_DIR = "content/es/disconnected";

function readUtf8(p) {
  return fs.readFileSync(p, "utf8");
}
function writeUtf8(p, s) {
  fs.writeFileSync(p, s, "utf8");
}
function stripBom(s) {
  return s.replace(/^\uFEFF/, "");
}

function extractFrontMatter(md) {
  if (!md.startsWith("---")) return { fmBlock: null, body: md };
  const end = md.indexOf("\n---", 3);
  if (end === -1) return { fmBlock: null, body: md };
  const fmBlock = md.slice(0, end + 4); // incluye --- ... ---
  const body = md.slice(end + 4);
  return { fmBlock, body };
}

function parseTSV(tsvText) {
  const text = stripBom(tsvText).trimEnd();
  const lines = text.split(/\r?\n/);
  const header = lines[0].split("\t").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split("\t");
    const row = {};
    header.forEach((h, idx) => (row[h] = (cols[idx] ?? "").trim()));
    rows.push(row);
  }
  return rows;
}

function normalizeQuotes(s) {
  return String(s).replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
}

function startsWithHeading(body, headingText) {
  // Mira la primera línea no vacía del body y revisa si es heading igual
  const lines = body.split(/\r?\n/);
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    // Acepta #, ##, ### etc si el texto coincide
    const m = t.match(/^#{1,6}\s+(.*)$/);
    if (!m) return false;
    return m[1].trim() === headingText.trim();
  }
  return false;
}

if (!fs.existsSync(TSV_PATH)) {
  console.error(`No encuentro ${TSV_PATH}.`);
  process.exit(1);
}

const rows = parseTSV(readUtf8(TSV_PATH));
const bySlug = new Map();
for (const r of rows) {
  if (!r.nombre_git) continue;
  bySlug.set(r.nombre_git.trim(), r);
}

const mdFiles = fs
  .readdirSync(MD_DIR)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => f !== "index.md")
  .sort();

let updated = 0;
let skippedNoEncabezado = [];
let skippedNoMatch = [];
let skippedAlready = [];

for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const row = bySlug.get(slug);
  if (!row) {
    skippedNoMatch.push(file);
    continue;
  }

  const encabezado = normalizeQuotes(row.encabezado || "").trim();
  if (!encabezado) {
    skippedNoEncabezado.push(file);
    continue;
  }

  const fullPath = path.join(MD_DIR, file);
  const md = readUtf8(fullPath);
  const { fmBlock, body } = extractFrontMatter(md);

  if (!fmBlock) {
    // Si no hay FM, no metemos nada para no romper estructura
    skippedNoEncabezado.push(file);
    continue;
  }

  if (startsWithHeading(body, encabezado)) {
    skippedAlready.push(file);
    continue;
  }

  // Construye nuevo body: línea en blanco + ## encabezado + línea en blanco + body (sin comerse contenido)
  const bodyTrimLeft = body.startsWith("\n") ? body.slice(1) : body;
  const newBody = `\n\n## ${encabezado}\n\n${bodyTrimLeft}`;

  writeUtf8(fullPath, fmBlock + newBody);
  updated++;
}

console.log("=== Insert encabezado after front matter ===");
console.log(`MD scanned: ${mdFiles.length}`);
console.log(`Updated: ${updated}`);

if (skippedAlready.length) {
  console.log("\nSkipped (already had heading):");
  skippedAlready.forEach((f) => console.log(`- ${f}`));
}
if (skippedNoEncabezado.length) {
  console.log("\nSkipped (no encabezado in TSV or missing FM):");
  skippedNoEncabezado.forEach((f) => console.log(`- ${f}`));
}
if (skippedNoMatch.length) {
  console.log("\nSkipped (no TSV match):");
  skippedNoMatch.forEach((f) => console.log(`- ${f}`));
}
