import fs from "fs";
import path from "path";

const TSV_PATH = "disconnected_frontmatter.tsv";
const MD_DIR = "content/es/disconnected";

// --------- helpers ----------
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
  // returns { fmRaw: string|null, body: string }
  if (!md.startsWith("---")) return { fmRaw: null, body: md };
  const end = md.indexOf("\n---", 3);
  if (end === -1) return { fmRaw: null, body: md };
  const fmRaw = md.slice(3, end + 1).trim(); // between the --- (no fences)
  const body = md.slice(end + 4); // after "\n---"
  return { fmRaw, body };
}

function parseYamlLoose(yaml) {
  // minimal parser: key: value + simple lists
  const obj = {};
  const lines = yaml.split(/\r?\n/);
  let currentKey = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    const listItemMatch = line.match(/^\s*-\s*(.*)$/);

    if (keyMatch) {
      currentKey = keyMatch[1];
      let value = (keyMatch[2] ?? "").trim();

      if (value === "") {
        obj[currentKey] = null;
        continue;
      }

      // remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      obj[currentKey] = value;
      continue;
    }

    if (listItemMatch && currentKey) {
      const item = (listItemMatch[1] ?? "").trim();
      if (!Array.isArray(obj[currentKey])) obj[currentKey] = [];
      obj[currentKey].push(item);
      continue;
    }
  }

  return obj;
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
  // replace smart quotes with normal quotes
  return s
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
}

function yamlQuote(s) {
  // keep YAML safe: always double-quote strings, escape internal quotes
  const safe = normalizeQuotes(String(s)).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${safe}"`;
}

function toYamlList(items, indent = 0) {
  const pad = " ".repeat(indent);
  if (!items || items.length === 0) return `${pad}[]\n`;
  return items.map((it) => `${pad}- ${yamlQuote(it)}\n`).join("");
}

function buildNewFrontMatter({ title, date, tags, permite, autor, draft }) {
  // Valid YAML mapping
  let out = "";
  out += `---\n`;
  out += `tipo: DESCONECTADO\n`;
  out += `title: ${yamlQuote(title)}\n`;
  if (date) out += `date: ${String(date).replace(/'/g, "").trim()}\n`;
  else out += `date: \n`;

  out += `tags:\n${toYamlList(tags, 2)}`;
  out += `permite:\n${toYamlList(permite, 2)}`;
  out += `autor:\n${toYamlList(autor, 2)}`;
  out += `draft: ${draft ? "true" : "false"}\n`;
  out += `---\n`;
  return out;
}

// --------- main ----------
if (!fs.existsSync(TSV_PATH)) {
  console.error(`No encuentro ${TSV_PATH}.`);
  process.exit(1);
}

const tsvRows = parseTSV(readUtf8(TSV_PATH));
const bySlug = new Map();
for (const r of tsvRows) {
  if (!r.nombre_git) continue;
  bySlug.set(r.nombre_git.trim(), r);
}

const mdFiles = fs
  .readdirSync(MD_DIR)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => f !== "index.md")
  .sort();

let updated = 0;
let noMatch = [];
let noFrontMatter = [];
let missingDate = [];

for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const row = bySlug.get(slug);

  if (!row) {
    noMatch.push(file);
    continue;
  }

  const fullPath = path.join(MD_DIR, file);
  const md = readUtf8(fullPath);
  const { fmRaw, body } = extractFrontMatter(md);

  const oldFM = fmRaw ? parseYamlLoose(fmRaw) : null;
  if (!oldFM) noFrontMatter.push(file);

  // date: prefer old "fecha", then old "date"
  const date = oldFM?.fecha ?? oldFM?.date ?? "";
  if (!date) missingDate.push(file);

  const title = row.nombre || slug;
  const tags = row.tags ? [row.tags] : []; // columna tags trae una categoría única
  const permite = row.permite ? [row.permite] : [];
  const autor = row.autor ? [row.autor] : [];

  const draft = String(row.estado || "").toLowerCase() === "publicado" ? false : true;

  const newFM = buildNewFrontMatter({ title, date, tags, permite, autor, draft });

  // Ensure body starts with newline if needed
  const bodyOut = body.startsWith("\n") ? body : `\n${body}`;

  writeUtf8(fullPath, newFM + bodyOut);
  updated++;
}

console.log("=== Disconnected front matter update ===");
console.log(`TSV rows: ${tsvRows.length}`);
console.log(`MD files scanned (excluding index.md): ${mdFiles.length}`);
console.log(`Updated: ${updated}`);

if (noMatch.length) {
  console.log("\nFiles with NO TSV match:");
  noMatch.forEach((f) => console.log(`- ${f}`));
}

if (noFrontMatter.length) {
  console.log("\nFiles that had NO front matter originally (still updated, but date may be empty):");
  noFrontMatter.forEach((f) => console.log(`- ${f}`));
}

if (missingDate.length) {
  console.log("\nFiles with NO date found in old front matter (date left empty):");
  missingDate.forEach((f) => console.log(`- ${f}`));
}
