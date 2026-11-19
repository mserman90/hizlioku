/**
 * Reading Science Calculation Utilities
 * Core calculations for RSVP timing, WPM (Words Per Minute), and comprehension scoring.
 */

/**
 * Calculates RSVP frame duration (ms per word) from target WPM.
 * Example: 300 WPM = 60000 / 300 = 200 ms per word.
 */
export function calculateRsvpIntervalMs(wpm: number): number {
  if (wpm <= 0) throw new Error("WPM must be greater than zero");
  return Math.round(60000 / wpm);
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
