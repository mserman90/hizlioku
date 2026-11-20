/**
 * Bionic Reading Fixation Engine
 * Formats Turkish and multilingual text to guide saccadic eye movements
 * by emphasizing the initial characters (fixation anchor) of each word.
 */

export interface BionicSegment {
  prefix: string; // Leading punctuation (e.g., quotes, brackets)
  bold: string;   // Fixation anchor (bolded)
  rest: string;   // Remaining word body
  suffix: string; // Trailing punctuation (e.g., comma, period)
}

/**
 * Calculates the number of characters to emphasize based on word length.
 */
export function getBionicAnchorLength(wordLen: number): number {
  if (wordLen <= 1) return 1;
  if (wordLen <= 3) return 1;
  if (wordLen <= 6) return 2;
  if (wordLen <= 9) return 3;
  if (wordLen <= 12) return 4;
  return Math.ceil(wordLen * 0.4);
}

/**
 * Deconstructs a single word token into Bionic segments: prefix, bold, rest, suffix.
 */
export function parseBionicWord(token: string): BionicSegment {
  if (!token) {
    return { prefix: "", bold: "", rest: "", suffix: "" };
  }

  // Separate leading punctuation
  let startIdx = 0;
  while (startIdx < token.length && /^[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/.test(token[startIdx])) {
    startIdx++;
  }
  const prefix = token.slice(0, startIdx);

  // Separate trailing punctuation
  let endIdx = token.length;
  while (endIdx > startIdx && /[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]$/.test(token[endIdx - 1])) {
    endIdx--;
  }
  const suffix = token.slice(endIdx);

  const cleanCore = token.slice(startIdx, endIdx);
  if (!cleanCore) {
    return { prefix: token, bold: "", rest: "", suffix: "" };
  }

  const anchorLen = getBionicAnchorLength(cleanCore.length);
  const bold = cleanCore.slice(0, anchorLen);
  const rest = cleanCore.slice(anchorLen);

  return {
    prefix,
    bold,
    rest,
    suffix,
  };
}

/**
 * Converts a text block into HTML formatted with <b> tags for Bionic Reading.
 */
export function formatBionicHtml(text: string): string {
  if (!text) return "";

  // Preserve paragraphs and words
  const paragraphs = text.split(/\n+/);
  return paragraphs
    .map((p) => {
      const tokens = p.split(/\s+/);
      const bionicTokens = tokens.map((token) => {
        if (!token.trim()) return "";
        const { prefix, bold, rest, suffix } = parseBionicWord(token);
        if (!bold) return token;
        return `${prefix}<b>${bold}</b>${rest}${suffix}`;
      });
      return `<p>${bionicTokens.join(" ")}</p>`;
    })
    .join("");
}
