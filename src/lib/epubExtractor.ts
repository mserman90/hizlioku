/**
 * Client-Side EPUB (Electronic Publication) Text Extractor
 * Extracts readable book chapters and paragraphs from .epub archives
 * entirely within the browser without external cloud dependencies.
 */

import JSZip from "jszip";

export interface EpubExtractionResult {
  title: string;
  author: string;
  text: string;
  chapterCount: number;
  wordCount: number;
}

/**
 * Strips HTML tags and decodes common HTML entities.
 */
function cleanHtmlToText(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts all text chapters from an EPUB file.
 * @param file The EPUB File or ArrayBuffer
 */
export async function extractEpubText(file: File | ArrayBuffer): Promise<EpubExtractionResult> {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(file);

  let bookTitle = "EPUB E-Kitap";
  let bookAuthor = "Bilinmeyen Yazar";

  // 1. Try to find OPF package document for metadata and spine order
  let opfPath = "";
  const containerFile = loadedZip.file("META-INF/container.xml");
  if (containerFile) {
    const containerXml = await containerFile.async("text");
    const fullPathMatch = containerXml.match(/full-path=["']([^"']+)["']/i);
    if (fullPathMatch && fullPathMatch[1]) {
      opfPath = fullPathMatch[1];
    }
  }

  // 2. Read metadata from OPF if available
  if (opfPath) {
    const opfFile = loadedZip.file(opfPath);
    if (opfFile) {
      const opfXml = await opfFile.async("text");
      const titleMatch = opfXml.match(/<dc:title[^>]*>([^<]+)<\/dc:title>/i);
      if (titleMatch && titleMatch[1]) {
        bookTitle = titleMatch[1].trim();
      }
      const authorMatch = opfXml.match(/<dc:creator[^>]*>([^<]+)<\/dc:creator>/i);
      if (authorMatch && authorMatch[1]) {
        bookAuthor = authorMatch[1].trim();
      }
    }
  }

  // 3. Locate all XHTML/HTML chapter files in archive
  const htmlFiles: { name: string; file: JSZip.JSZipObject }[] = [];
  loadedZip.forEach((relativePath, zipEntry) => {
    if (!zipEntry.dir && /\.(x?html?|xml)$/i.test(relativePath)) {
      // Exclude packaging files
      if (!relativePath.includes("container.xml") && !relativePath.endsWith(".opf")) {
        htmlFiles.push({ name: relativePath, file: zipEntry });
      }
    }
  });

  // Sort files naturally by path/number
  htmlFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  if (htmlFiles.length === 0) {
    throw new Error("EPUB arşivinde okunabilir metin dosyası (.xhtml/.html) bulunamadı.");
  }

  // 4. Extract and clean text from each chapter
  const chapterTexts: string[] = [];
  for (const item of htmlFiles) {
    try {
      const htmlContent = await item.file.async("text");
      const cleaned = cleanHtmlToText(htmlContent);
      if (cleaned.length > 50) {
        chapterTexts.push(cleaned);
      }
    } catch {
      // Skip corrupt chapter
    }
  }

  const fullText = chapterTexts.join("\n\n---\n\n");
  const words = fullText.split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    throw new Error("EPUB belgesinden metin çıkarılamadı.");
  }

  return {
    title: bookTitle,
    author: bookAuthor,
    text: fullText,
    chapterCount: chapterTexts.length,
    wordCount: words.length,
  };
}
