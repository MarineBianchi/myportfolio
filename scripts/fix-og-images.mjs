// `next build` with `output: "export"` renders each `opengraph-image.tsx`
// route to a file literally named `opengraph-image` (no extension). Apache
// (Hostinger's shared hosting) can't infer a Content-Type for an
// extensionless file, so social crawlers may not render it as an image.
// This renames every such file to `opengraph-image.png` and rewrites the
// matching `/opengraph-image?<hash>` references left in the exported HTML.
import { readdirSync, renameSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const allFiles = walk(OUT_DIR);

let renamedCount = 0;
for (const file of allFiles) {
  if (file.endsWith("opengraph-image")) {
    renameSync(file, `${file}.png`);
    renamedCount++;
  }
}

let rewrittenCount = 0;
for (const file of allFiles) {
  if (!file.endsWith(".html") && !file.endsWith(".txt")) continue;
  const content = readFileSync(file, "utf8");
  const updated = content.replace(
    /opengraph-image(\\?\?[0-9a-f]+)/g,
    "opengraph-image.png"
  );
  if (updated !== content) {
    writeFileSync(file, updated);
    rewrittenCount++;
  }
}

console.log(`fix-og-images: renamed ${renamedCount} file(s), rewrote references in ${rewrittenCount} file(s)`);
