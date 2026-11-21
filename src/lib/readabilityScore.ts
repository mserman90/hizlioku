/**
 * Ateşman Turkish Readability Formula Engine (1997)
 * 
 * The authoritative standard for Turkish educational and linguistic readability:
 * Readability Score = 199.9 - (40 * avgSyllablesPerWord) - (3.22 * avgWordsPerSentence)
 * 
 * Scale:
 * - 90-100: Very Easy (Grade 1-4)
 * - 70-89:  Easy (Grade 5-8)
 * - 50-69:  Medium (High School / General News)
 * - 30-49:  Hard (Undergraduate / Literary)
 * - 1-29:   Very Hard (Academic / Legal / Medical)
 */

const TURKISH_VOWELS = new Set([
  "a", "e", "ı", "i", "o", "ö", "u", "ü",
  "A", "E", "I", "İ", "O", "Ö", "U", "Ü",
]);

export function isVowel(char: string): boolean {
  return TURKISH_VOWELS.has(char);
}

export interface ReadabilityMetrics {
  score: number;
  level: "very_easy" | "easy" | "medium" | "hard" | "very_hard";
  levelLabel: string;
  targetAudience: string;
  badgeColorClass: string;
  totalWords: number;
  totalSentences: number;
  totalSyllables: number;
  avgSyllablesPerWord: number;
  avgWordsPerSentence: number;
  suggestedWpm: number;
  estimatedReadingTimeSeconds: number;
}

/**
 * Counts the number of syllables in a Turkish word (equivalent to vowel count).
 */
export function countSyllables(word: string): number {
  if (!word) return 0;
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (isVowel(word[i])) {
      count++;
    }
  }
  return Math.max(1, count); // Every recognized word has at least 1 syllable
}

/**
 * Splits text into sentences by sentence delimiters (. ! ? …).
 */
export function splitSentences(text: string): string[] {
  if (!text) return [];
  return text
    .split(/[.!?…]+[\s\r\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Computes the Ateşman Readability metrics for Turkish text.
 */
export function calculateReadability(text: string): ReadabilityMetrics {
  if (!text || text.trim().length === 0) {
    return {
      score: 100,
      level: "very_easy",
      levelLabel: "Çok Kolay",
      targetAudience: "İlkokul (1.–4. Sınıf)",
      badgeColorClass: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
      totalWords: 0,
      totalSentences: 0,
      totalSyllables: 0,
      avgSyllablesPerWord: 0,
      avgWordsPerSentence: 0,
      suggestedWpm: 300,
      estimatedReadingTimeSeconds: 0,
    };
  }

  const rawWords = text.split(/\s+/).filter((w) => /[a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/.test(w));
  const totalWords = Math.max(1, rawWords.length);

  const sentences = splitSentences(text);
  const totalSentences = Math.max(1, sentences.length);

  let totalSyllables = 0;
  rawWords.forEach((word) => {
    totalSyllables += countSyllables(word);
  });

  const avgSyllablesPerWord = totalSyllables / totalWords;
  const avgWordsPerSentence = totalWords / totalSentences;

  // Ateşman formula
  const rawScore = 199.9 - 40 * avgSyllablesPerWord - 3.22 * avgWordsPerSentence;
  const score = Math.max(5, Math.min(100, Math.round(rawScore)));

  let level: ReadabilityMetrics["level"] = "medium";
  let levelLabel = "Orta Güçlükte";
  let targetAudience = "Lise ve Genel Okuyucu";
  let badgeColorClass = "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800";
  let suggestedWpm = 300;

  if (score >= 90) {
    level = "very_easy";
    levelLabel = "Çok Kolay";
    targetAudience = "İlkokul (1.–4. Sınıf)";
    badgeColorClass = "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800";
    suggestedWpm = 450;
  } else if (score >= 70) {
    level = "easy";
    levelLabel = "Kolay";
    targetAudience = "Ortaokul (5.–8. Sınıf)";
    badgeColorClass = "bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800";
    suggestedWpm = 375;
  } else if (score >= 50) {
    level = "medium";
    levelLabel = "Orta Güçlükte";
    targetAudience = "Lise & Günlük Basın";
    badgeColorClass = "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800";
    suggestedWpm = 300;
  } else if (score >= 30) {
    level = "hard";
    levelLabel = "Zor";
    targetAudience = "Lisans & Edebi Metinler";
    badgeColorClass = "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800";
    suggestedWpm = 250;
  } else {
    level = "very_hard";
    levelLabel = "Çok Zor";
    targetAudience = "Akademik, Hukuki & Tıbbi";
    badgeColorClass = "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800";
    suggestedWpm = 200;
  }

  const estimatedReadingTimeSeconds = Math.round((totalWords / suggestedWpm) * 60);

  return {
    score,
    level,
    levelLabel,
    targetAudience,
    badgeColorClass,
    totalWords,
    totalSentences,
    totalSyllables,
    avgSyllablesPerWord: Number(avgSyllablesPerWord.toFixed(2)),
    avgWordsPerSentence: Number(avgWordsPerSentence.toFixed(1)),
    suggestedWpm,
    estimatedReadingTimeSeconds,
  };
}
