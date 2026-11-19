/**
 * Resilient Client-side PDF Text Extraction Utility
 * Handles malformed PDFs, token syntax errors (e.g., "Illegal character: 41"),
 * missing CMaps, and provides a multi-stage fallback parser.
 */

export async function extractTextFromPdf(fileBuffer: ArrayBuffer): Promise<string> {
  const uint8Data = new Uint8Array(fileBuffer);
  let pdfjsText = "";

  // 1. Primary Attempt: Standard PDF.js with maximum fault tolerance
  try {
    const pdfjsLib = await import("pdfjs-dist");

    // Configure worker from CDN to match exact version
    const version = pdfjsLib.version || "3.11.174";
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
    }

    const loadingTask = pdfjsLib.getDocument({
      data: uint8Data,
      cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/standard_fonts/`,
      stopAtErrors: false, // Do not throw on non-fatal stream/font token errors
      isEvalSupported: false,
      useSystemFonts: true,
      verbosity: 0,
    });

    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;
    const pageTexts: string[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();

        const pageStrings = textContent.items
          .map((item: any) => item.str || "")
          .filter(Boolean)
          .join(" ");

        if (pageStrings.trim()) {
          pageTexts.push(pageStrings.trim());
        }
      } catch (pageError) {
        console.warn(`[PDF.js] Page ${pageNum} parsing notice:`, pageError);
        // Continue extracting subsequent pages without failing whole document
      }
    }

    pdfjsText = pageTexts.join("\n\n").trim();
  } catch (pdfjsError: any) {
    console.warn(
      "[PDF.js] Primary parser encountered an exception (e.g. Illegal character / token error):",
      pdfjsError?.message || pdfjsError
    );
  }

  // If primary extraction succeeded with meaningful text, return it
  if (pdfjsText && pdfjsText.length > 20) {
    return pdfjsText;
  }

  // 2. Secondary Fallback: Direct binary stream token scanner
  // Recovers text from corrupted, unescaped parenthesis, or third-party generated PDF streams
  const fallbackText = extractRawPdfTextFallback(uint8Data);
  if (fallbackText && fallbackText.length > 20) {
    return fallbackText;
  }

  // If text was extracted by either method, return whatever was found
  if (pdfjsText) return pdfjsText;
  if (fallbackText) return fallbackText;

  throw new Error(
    "Bu PDF belgesinden metin katmanı okunamadı. Belge salt taranmış görsellerden (resim) oluşuyor veya şifrelenmiş olabilir."
  );
}

/**
 * Fallback parser that scans the uncompressed portions and tokens of the PDF binary buffer
 * Recovers strings formatted with (...) Tj or [...] TJ operators
 */
function extractRawPdfTextFallback(bytes: Uint8Array): string {
  try {
    const textDecoder = new TextDecoder("latin1");
    const raw = textDecoder.decode(bytes);
    const extractedPieces: string[] = [];

    // Scan for Tj text operators: (string) Tj
    const tjRegex = /\(([^)\r\n]{2,})\)\s*Tj/g;
    let match: RegExpExecArray | null;
    while ((match = tjRegex.exec(raw)) !== null) {
      const clean = cleanPdfString(match[1]);
      if (clean.length > 1) {
        extractedPieces.push(clean);
      }
    }

    // Scan for TJ array operators: [(s1) -10 (s2)] TJ
    const tjArrayRegex = /\[([^\]]{3,})\]\s*TJ/g;
    while ((match = tjArrayRegex.exec(raw)) !== null) {
      const arrayContent = match[1];
      const innerRegex = /\(([^)\r\n]+)\)/g;
      let innerMatch: RegExpExecArray | null;
      let combined = "";
      while ((innerMatch = innerRegex.exec(arrayContent)) !== null) {
        combined += cleanPdfString(innerMatch[1]) + " ";
      }
      if (combined.trim().length > 1) {
        extractedPieces.push(combined.trim());
      }
    }

    return extractedPieces.join(" ").replace(/\s+/g, " ").trim();
  } catch (e) {
    console.error("Fallback PDF extraction failed:", e);
    return "";
  }
}

/**
 * Cleans PDF string escape sequences (e.g. \(, \), \\, \r, \n)
 */
function cleanPdfString(str: string): string {
  return str
    .replace(/\\([()\\])/g, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\t/g, " ")
    .trim();
}
