/**
 * Client-side PDF Text Extraction Utility
 * Extracts plain text from PDF files using PDF.js
 */

export async function extractTextFromPdf(fileBuffer: ArrayBuffer): Promise<string> {
  // Dynamically import pdfjs-dist only in client-side environment
  const pdfjsLib = await import("pdfjs-dist");

  // Configure worker
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }

  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  const pageTexts: string[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageStrings = textContent.items
      .map((item: any) => item.str || "")
      .join(" ");
    
    if (pageStrings.trim()) {
      pageTexts.push(pageStrings.trim());
    }
  }

  return pageTexts.join("\n\n");
}
