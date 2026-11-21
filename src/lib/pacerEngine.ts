/**
 * Guided Pacer & Reading Wand Engine
 * Provides structured tokenization, paragraph/line mapping,
 * and adaptive timing for full-text guided speed reading.
 */

export type PacerHighlightMode = "word" | "line" | "bionic";

export interface PacerWordToken {
  id: string;
  word: string;
  cleanWord: string;
  paragraphIndex: number;
  wordIndexInParagraph: number;
  globalIndex: number;
}

export interface PacerParagraph {
  index: number;
  tokens: PacerWordToken[];
  rawText: string;
}

/**
 * Parses full raw text into paragraphs and indexed word tokens.
 */
export function tokenizePacerText(rawText: string): {
  paragraphs: PacerParagraph[];
  allTokens: PacerWordToken[];
  totalWords: number;
} {
  const rawParagraphs = rawText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Fallback if no double newlines
  const effectiveParagraphs =
    rawParagraphs.length > 0 ? rawParagraphs : [rawText.trim()].filter(Boolean);

  const paragraphs: PacerParagraph[] = [];
  const allTokens: PacerWordToken[] = [];
  let globalCounter = 0;

  effectiveParagraphs.forEach((paraText, pIdx) => {
    const rawWords = paraText.split(/\s+/).filter(Boolean);
    const tokens: PacerWordToken[] = [];

    rawWords.forEach((w, wIdx) => {
      const clean = w.replace(/[.,!?;:()""'']/g, "");
      const token: PacerWordToken = {
        id: `p-${pIdx}-w-${wIdx}-${globalCounter}`,
        word: w,
        cleanWord: clean,
        paragraphIndex: pIdx,
        wordIndexInParagraph: wIdx,
        globalIndex: globalCounter,
      };
      tokens.push(token);
      allTokens.push(token);
      globalCounter++;
    });

    paragraphs.push({
      index: pIdx,
      tokens,
      rawText: paraText,
    });
  });

  return {
    paragraphs,
    allTokens,
    totalWords: allTokens.length,
  };
}

/**
 * Calculates step interval in milliseconds for a word in Pacer mode.
 * Adapts with punctuation weighting to provide natural cognitive breathing room.
 */
export function getPacerIntervalMs(
  wpm: number,
  word: string,
  enableSmartPacing = true
): number {
  if (wpm <= 0) return 200;
  const baseMs = 60000 / wpm;
  if (!enableSmartPacing || !word) return Math.round(baseMs);

  const clean = word.trim();
  let multiplier = 1.0;
  if (/[.!?…]$/.test(clean)) {
    multiplier = 2.0;
  } else if (/[,;:—–-]$/.test(clean)) {
    multiplier = 1.5;
  } else if (clean.length >= 11) {
    multiplier = 1.25;
  }

  return Math.round(baseMs * multiplier);
}

/**
 * Formats Bionic html for a single word in Pacer mode.
 */
export function formatBionicWord(word: string): { boldPart: string; normalPart: string } {
  let startIdx = 0;
  while (startIdx < word.length && /^[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/.test(word[startIdx])) {
    startIdx++;
  }
  const prefix = word.slice(0, startIdx);

  let endIdx = word.length;
  while (endIdx > startIdx && /[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]$/.test(word[endIdx - 1])) {
    endIdx--;
  }
  const suffix = word.slice(endIdx);
  const clean = word.slice(startIdx, endIdx);

  if (!clean) {
    return { boldPart: word, normalPart: "" };
  }

  const len = clean.length;
  let fixationLength = 1;

  if (len <= 3) fixationLength = 1;
  else if (len <= 6) fixationLength = 2;
  else if (len <= 9) fixationLength = 3;
  else fixationLength = Math.ceil(len * 0.4);

  const boldPart = prefix + clean.slice(0, fixationLength);
  const normalPart = clean.slice(fixationLength) + suffix;

  return { boldPart, normalPart };
}
