#!/usr/bin/env node

/**
 * Trip Plan PDF Builder
 *
 * Renders DISNEY_WORLD_TRIP_PLAN_AUG_2026.md into a print-ready PDF.
 *
 * Has no npm dependencies. Markdown is converted by the small purpose-built
 * renderer below (the source document uses only headings, paragraphs, rules,
 * GFM tables, bullet/numbered lists, bold and italic), then Chrome's headless
 * --print-to-pdf renders the styled HTML.
 *
 * Requires Google Chrome or Chromium on PATH. Set CHROME_BIN to override.
 *
 * Usage:
 *   node scripts/build-trip-pdf.js
 *   node scripts/build-trip-pdf.js path/to/input.md path/to/output.pdf
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawn } = require('child_process');

const DEFAULT_INPUT = 'DISNEY_WORLD_TRIP_PLAN_AUG_2026.md';
const DEFAULT_OUTPUT = 'DISNEY_WORLD_TRIP_PLAN_AUG_2026.pdf';

const CHROME_CANDIDATES = [
  process.env.CHROME_BIN,
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

// ---------------------------------------------------------------------------
// Markdown rendering
// ---------------------------------------------------------------------------

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Bold before italic, so the ** in **bold** is never read as a lone *. */
function renderInline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableDivider(line) {
  return /^\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.includes('-');
}

function renderTable(rows) {
  const header = splitTableRow(rows[0]);
  const bodyRows = rows.slice(isTableDivider(rows[1] || '') ? 2 : 1);

  // A table whose header cells are all blank is a label/value block, not a
  // real table — drop the empty header row and emphasise the first column.
  const isKeyValue = header.every((cell) => cell === '');

  const parts = [`<table class="${isKeyValue ? 'kv' : 'grid'}">`];

  if (!isKeyValue) {
    parts.push('<thead><tr>');
    header.forEach((cell) => parts.push(`<th>${renderInline(cell)}</th>`));
    parts.push('</tr></thead>');
  }

  parts.push('<tbody>');
  bodyRows.forEach((row) => {
    parts.push('<tr>');
    splitTableRow(row).forEach((cell) => parts.push(`<td>${renderInline(cell)}</td>`));
    parts.push('</tr>');
  });
  parts.push('</tbody></table>');

  return parts.join('');
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      flushParagraph();
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushParagraph();
      out.push('<hr />');
      continue;
    }

    if (trimmed.startsWith('|')) {
      flushParagraph();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i]);
        i += 1;
      }
      i -= 1;
      out.push(renderTable(rows));
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i += 1;
      }
      i -= 1;
      out.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      i -= 1;
      out.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ol>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();

  // Each "---" in the source separates two sections, but an <h2> already
  // starts a fresh page with its own rule, so those separators would otherwise
  // strand a stray line at the foot of the previous page.
  return out
    .filter((block, index) => !(block === '<hr />' && (out[index + 1] || '').startsWith('<h2')))
    .join('\n');
}

// ---------------------------------------------------------------------------
// Document assembly
// ---------------------------------------------------------------------------

const STYLES = `
  @page { size: letter; margin: 17mm 15mm; }

  * { box-sizing: border-box; }

  html {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    margin: 0;
    font-family: Inter, "Liberation Sans", Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.5;
    color: #23262e;
  }

  p { margin: 0 0 8pt; orphans: 3; widows: 3; }

  strong { color: #1b2a5e; font-weight: 600; }
  em { color: #3c4250; }

  /* --- Cover ------------------------------------------------------------ */

  .cover {
    break-after: page;
    padding-top: 46mm;
    text-align: center;
  }

  .cover .kicker {
    font-size: 9pt;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #9a7b2f;
    font-weight: 600;
    margin-bottom: 10mm;
  }

  .cover h1 {
    font-family: "Noto Serif Display", "Noto Serif", "Liberation Serif", Georgia, serif;
    font-size: 33pt;
    line-height: 1.15;
    font-weight: 600;
    color: #1b2a5e;
    margin: 0 0 6mm;
    border: 0;
    padding: 0;
  }

  .cover .dates {
    font-family: "Noto Serif Display", "Noto Serif", "Liberation Serif", Georgia, serif;
    font-size: 14pt;
    color: #3c4250;
    font-style: italic;
    margin-bottom: 12mm;
  }

  .cover .rule {
    width: 26mm;
    height: 2.5pt;
    background: #c9a13b;
    margin: 0 auto 12mm;
  }

  .cover .party {
    font-size: 10.5pt;
    line-height: 1.9;
    color: #23262e;
  }

  .cover .party span { color: #9a7b2f; padding: 0 3pt; }

  .cover .stamp {
    margin-top: 20mm;
    font-size: 8.5pt;
    color: #7b8194;
    line-height: 1.7;
  }

  /* --- Contents --------------------------------------------------------- */

  .contents { break-after: page; }

  .contents h2 { break-before: auto; margin-top: 0; }

  .contents ol {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: toc;
  }

  .contents li {
    counter-increment: toc;
    padding: 5pt 0;
    border-bottom: 0.5pt solid #e3e6ee;
    font-size: 11pt;
    color: #1b2a5e;
  }

  .contents li::before {
    content: counter(toc);
    display: inline-block;
    width: 9mm;
    color: #c9a13b;
    font-weight: 600;
  }

  /* --- Headings --------------------------------------------------------- */

  h1, h2, h3, h4 {
    font-family: "Noto Serif Display", "Noto Serif", "Liberation Serif", Georgia, serif;
    color: #1b2a5e;
    break-after: avoid-page;
    margin: 0;
  }

  h2 {
    break-before: page;
    font-size: 19pt;
    font-weight: 600;
    padding-bottom: 3mm;
    margin-bottom: 6mm;
    border-bottom: 1.5pt solid #c9a13b;
  }

  h3 {
    font-size: 13pt;
    font-weight: 600;
    margin: 8mm 0 3mm;
  }

  h4 {
    font-family: Inter, "Liberation Sans", Arial, sans-serif;
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b5620;
    margin: 6mm 0 2.5mm;
  }

  hr {
    border: 0;
    border-top: 0.5pt solid #e3e6ee;
    margin: 7mm 0;
  }

  /* Section rules sit right above a page-breaking h2, so hide them. */
  hr + h2 { border-top: 0; }

  /* --- Lists ------------------------------------------------------------ */

  ul, ol { margin: 0 0 8pt; padding-left: 6mm; }
  li { margin-bottom: 3.5pt; break-inside: avoid; }
  li::marker { color: #c9a13b; font-weight: 600; }

  /* --- Tables ----------------------------------------------------------- */

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 9pt;
    font-size: 9pt;
    line-height: 1.4;
  }

  thead { display: table-header-group; }
  tr { break-inside: avoid; }

  th {
    background: #1b2a5e;
    color: #fff;
    text-align: left;
    font-weight: 600;
    padding: 4pt 5pt;
    border: 0.5pt solid #1b2a5e;
  }

  td {
    padding: 4pt 5pt;
    border: 0.5pt solid #dfe3ec;
    vertical-align: top;
  }

  tbody tr:nth-child(even) td { background: #f6f7fb; }

  /* First column of a table carries the time, date or label — keep it tight
     and readable rather than letting it wrap oddly. */
  td:first-child { color: #1b2a5e; font-weight: 500; }
  table.grid td:first-child { white-space: nowrap; }
  table.grid.wide td:first-child { white-space: normal; }

  table.kv td:first-child { width: 34%; font-weight: 600; }
`;

function buildHtml(bodyHtml, sections) {
  const contents = sections
    .map((section) => `<li>${escapeHtml(section)}</li>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Sianna's 2nd Birthday Trip — Walt Disney World, August 2026</title>
<style>${STYLES}</style>
</head>
<body>

<section class="cover">
  <div class="kicker">Travel Plan &amp; Itinerary</div>
  <h1>Sianna&rsquo;s 2nd Birthday<br />at Walt Disney World</h1>
  <div class="dates">Thursday, August 13 &ndash; Monday, August 17, 2026</div>
  <div class="rule"></div>
  <div class="party">
    Orlando, Florida<br />
    Animal Kingdom <span>&middot;</span> Magic Kingdom <span>&middot;</span> Disney Springs
  </div>
  <div class="stamp">
    Prepared for a party of four &mdash; two parents, grandmother, and Sianna<br />
    Birthday celebration: Saturday, August 15 at Magic Kingdom
  </div>
</section>

<section class="contents">
  <h2>Contents</h2>
  <ol>${contents}</ol>
</section>

${bodyHtml}

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      execFileSync(candidate, ['--version'], { stdio: 'ignore' });
      return candidate;
    } catch (err) {
      // Try the next candidate.
    }
  }
  throw new Error(
    'Could not find Google Chrome or Chromium. Install it, or set CHROME_BIN ' +
      'to the browser executable.'
  );
}

/**
 * Headless Chrome writes the PDF and then, in some sandboxed and containerised
 * environments, fails to exit while it waits on a session bus that isn't there.
 * So rather than waiting for the process, watch for the output file to appear
 * and stop growing, then stop the browser ourselves.
 */
function printToPdf(chrome, htmlPath, pdfPath, { timeoutMs = 90000 } = {}) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'trip-pdf-'));

  fs.rmSync(pdfPath, { force: true });

  const child = spawn(
    chrome,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--no-first-run',
      '--no-pdf-header-footer',
      '--virtual-time-budget=20000',
      `--user-data-dir=${profile}`,
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: ['ignore', 'ignore', 'ignore'], detached: true }
  );

  const started = Date.now();
  let lastSize = -1;
  let stableFor = 0;

  try {
    // Chrome writes the file in one pass; two identical non-zero readings a
    // few hundred milliseconds apart mean it has finished.
    while (Date.now() - started < timeoutMs) {
      execFileSync('sleep', ['0.3']);

      const size = fs.existsSync(pdfPath) ? fs.statSync(pdfPath).size : 0;
      if (size > 0 && size === lastSize) {
        stableFor += 1;
        if (stableFor >= 3) return;
      } else {
        stableFor = 0;
      }
      lastSize = size;

      if (child.exitCode !== null && size > 0) return;
    }
    throw new Error(`Chrome did not finish writing a PDF within ${timeoutMs}ms.`);
  } finally {
    try {
      process.kill(-child.pid, 'SIGKILL');
    } catch (err) {
      try {
        child.kill('SIGKILL');
      } catch (innerErr) {
        // Already gone.
      }
    }
    fs.rmSync(profile, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const inputPath = path.resolve(process.argv[2] || DEFAULT_INPUT);
  const outputPath = path.resolve(process.argv[3] || DEFAULT_OUTPUT);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(inputPath, 'utf8');

  // The generated cover page replaces the markdown's title block, so start the
  // body at the first "## " section heading.
  const firstSection = markdown.search(/^##\s/m);
  const body = firstSection > 0 ? markdown.slice(firstSection) : markdown;

  const sections = (body.match(/^##\s+(.*)$/gm) || []).map((line) =>
    line.replace(/^##\s+/, '').replace(/^\d+\.\s*/, '')
  );

  const html = buildHtml(renderMarkdown(body), sections);
  const htmlPath = path.join(os.tmpdir(), 'trip-plan-print.html');
  fs.writeFileSync(htmlPath, html, 'utf8');

  const chrome = findChrome();
  printToPdf(chrome, htmlPath, outputPath);

  if (!fs.existsSync(outputPath)) {
    console.error('Chrome did not produce a PDF.');
    process.exit(1);
  }

  const kb = (fs.statSync(outputPath).size / 1024).toFixed(0);
  const pages = (fs.readFileSync(outputPath).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;

  console.log(`Wrote ${path.relative(process.cwd(), outputPath)} — ${pages} pages, ${kb} KB`);
  console.log(`Sections: ${sections.length}`);
}

main();
