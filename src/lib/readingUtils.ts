/**
 * Reading Science Calculation Utilities
 * Core calculations for RSVP timing, WPM (Words Per Minute), and comprehension scoring.
 */

/**
 * Calculates RSVP frame duration (ms per word) from target WPM,
 * optionally applying dynamic cognitive pacing based on punctuation and word length.
 * 
 * Cognitive Wrap-up multipliers (Rayner et al., 2016):
 * - Sentence terminators (. ! ? …): 2.0x pause
 * - Clause delimiters (, ; : — – -): 1.5x pause
 * - Long words (11+ characters): 1.25x pause
 * 
 * Example: 300 WPM = 200 ms baseline; with sentence terminator = 400 ms.
 */
export function calculateRsvpIntervalMs(
  wpm: number,
  word?: string,
  enableSmartPacing: boolean = false
): number {
  if (wpm <= 0) throw new Error("WPM must be greater than zero");
  const baseMs = 60000 / wpm;

  if (!enableSmartPacing || !word) {
    return Math.round(baseMs);
  }

  const cleanWord = word.trim();
  let multiplier = 1.0;

  // Sentence ending punctuation
  if (/[.!?…]$/.test(cleanWord)) {
    multiplier = 2.0;
  }
  // Clause / mid-sentence pause punctuation
  else if (/[,;:—–-]$/.test(cleanWord)) {
    multiplier = 1.5;
  }
  // Morphologically long word (Turkish compound words and agglutinative suffixes)
  else if (cleanWord.length >= 11) {
    multiplier = 1.25;
  }

  return Math.round(baseMs * multiplier);
}

/**
 * Calculates effective WPM achieved.
 * @param wordCount Total words read
 * @param durationMs Total duration in milliseconds
 */
export function calculateWpm(wordCount: number, durationMs: number): number {
  if (durationMs <= 0) return 0;
  const minutes = durationMs / 60000;
  return Math.round(wordCount / minutes);
}

/**
 * Calculates comprehension percentage score.
 * @param correctAnswers Number of correct answers
 * @param totalQuestions Total number of questions
 */
export function calculateComprehensionScore(correctAnswers: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((Math.max(0, correctAnswers) / totalQuestions) * 100);
}

/**
 * Identifies the Optimal Recognition Point (ORP) index in a word.
 * Research indicates the fixation point is typically at or slightly before the center (first third to mid).
 */
export function getOrpIndex(word: string): number {
  const len = word.length;
  if (len <= 1) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  if (len <= 13) return 3;
  return 4;
}
