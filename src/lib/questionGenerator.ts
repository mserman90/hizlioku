/**
 * Heuristic Client-Side Comprehension Question Generator
 * 
 * Automatically generates 3-5 multiple-choice comprehension questions from any
 * custom text or extracted PDF document without requiring external AI APIs or cloud services.
 */

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

interface SentenceCandidate {
  sentence: string;
  focusWord: string;
  wordIndex: number;
}

/**
 * Common Turkish stop words and low-information words that should not be quizzed.
 */
const STOP_WORDS = new Set([
  "bir", "bu", "şu", "o", "ve", "ile", "de", "da", "ki", "için",
  "çok", "daha", "en", "gibi", "kadar", "olan", "olarak", "ise",
  "ancak", "ama", "fakat", "lakin", "çünkü", "veya", "ya", "hem",
  "ne", "nasıl", "neden", "niçin", "her", "bütün", "tüm", "bazı",
  "biri", "şey", "zaman", "sonra", "önce", "kendi", "bunu", "buna",
]);

/**
 * Extracts factual sentences and generates multiple choice questions.
 */
export function generateComprehensionQuestions(
  text: string,
  maxQuestions: number = 3
): ComprehensionQuestion[] {
  if (!text || text.trim().length < 50) {
    return [];
  }

  // 1. Split text into clean sentences (using Turkish sentence terminators)
  const rawSentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 25 && s.length <= 160 && !s.startsWith("http"));

  if (rawSentences.length < 2) {
    return [];
  }

  // 2. Identify candidate sentences with informative words (nouns, capitalized words, numbers, adjectives)
  const candidates: SentenceCandidate[] = [];
  const vocabularyPool: string[] = [];

  for (const sentence of rawSentences) {
    const words = sentence
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, "")
      .split(/\s+/)
      .filter((w) => w.length >= 4);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const lower = word.toLowerCase();

      if (!STOP_WORDS.has(lower) && !vocabularyPool.includes(word)) {
        vocabularyPool.push(word);
      }

      // Check if word is an interesting candidate (numbers, capitalized entities, or descriptive words)
      const isNumber = /^\d+/.test(word);
      const isProper = /^[A-ZÇĞİÖŞÜ]/.test(word) && i > 0;
      const isKeyWord = word.length >= 6 && !STOP_WORDS.has(lower);

      if ((isNumber || isProper || isKeyWord) && candidates.length < maxQuestions * 2) {
        candidates.push({
          sentence,
          focusWord: word,
          wordIndex: i,
        });
      }
    }
  }

  // If pool is too small, fill with words from text
  if (vocabularyPool.length < 4) {
    return [];
  }

  // 3. Construct question items
  const questions: ComprehensionQuestion[] = [];
  const selectedSentences = new Set<string>();

  for (const cand of candidates) {
    if (questions.length >= maxQuestions) break;
    if (selectedSentences.has(cand.sentence)) continue;

    selectedSentences.add(cand.sentence);

    // Create cloze sentence by replacing the focus word with blank
    const blankedSentence = cand.sentence.replace(
      new RegExp(`\\b${cand.focusWord}\\b`, "i"),
      "______"
    );

    // Pick 3 distractors from vocabulary pool
    const distractors = vocabularyPool
      .filter((w) => w.toLowerCase() !== cand.focusWord.toLowerCase())
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    if (distractors.length < 3) continue;

    // Shuffle options with correct answer
    const correctIndex = Math.floor(Math.random() * 4);
    const options = [...distractors];
    options.splice(correctIndex, 0, cand.focusWord);

    questions.push({
      id: `gen-q-${questions.length + 1}-${Date.now()}`,
      question: `Metne göre boş bırakılan yeri en uygun şekilde tamamlayınız: "${blankedSentence}"`,
      options,
      correctIndex,
    });
  }

  return questions;
}
