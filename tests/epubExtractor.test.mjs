import assert from "node:assert";
import JSZip from "jszip";
import { extractEpubText } from "../src/lib/epubExtractor.ts";

console.log("Running unit tests for epubExtractor...");

// Generate an in-memory test EPUB zip archive
const zip = new JSZip();

// 1. Add META-INF/container.xml
zip.file(
  "META-INF/container.xml",
  `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
);

// 2. Add OEBPS/content.opf with metadata
zip.file(
  "OEBPS/content.opf",
  `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>Küçük Prens</dc:title>
    <dc:creator>Antoine de Saint-Exupéry</dc:creator>
  </metadata>
</package>`
);

// 3. Add Chapter 1
zip.file(
  "OEBPS/chapter1.xhtml",
  `<!DOCTYPE html>
<html>
<head><title>Bölüm 1</title></head>
<body>
  <h1>Birinci Bölüm</h1>
  <p>Altı yaşımdayken, ilk kez bir resim yapmıştım.</p>
  <p>Resmimde bir fili yutmuş olan dev bir boğa yılanı vardı.</p>
</body>
</html>`
);

// 4. Add Chapter 2
zip.file(
  "OEBPS/chapter2.xhtml",
  `<!DOCTYPE html>
<html>
<head><title>Bölüm 2</title></head>
<body>
  <h1>İkinci Bölüm</h1>
  <p>Büyükler bana resmi bırakıp coğrafya ve tarih çalışmamı öğütlediler.</p>
</body>
</html>`
);

const buffer = await zip.generateAsync({ type: "nodebuffer" });
const result = await extractEpubText(buffer);

assert.strictEqual(result.title, "Küçük Prens", "Should extract correct title");
assert.strictEqual(result.author, "Antoine de Saint-Exupéry", "Should extract correct author");
assert.strictEqual(result.chapterCount, 2, "Should extract 2 chapters");
assert(result.wordCount > 10, "Word count should be positive");
assert(result.text.includes("Altı yaşımdayken"), "Text should contain Chapter 1 content");
assert(result.text.includes("Büyükler bana"), "Text should contain Chapter 2 content");

console.log("✅ All epubExtractor unit tests passed successfully!");
