/**
 * Turkish Syllabification Engine (Türkçe Heceleme Kural Motoru)
 * 
 * Implements standard phonological syllable boundary rules of Turkish:
 * 1. Every syllable has exactly one vowel (a, e, ı, i, o, ö, u, ü).
 * 2. Single consonant between vowels: V-CV (a-ra-ba, ki-tap, o-kul).
 * 3. Two consonants between vowels: VC-CV (öğ-ret-men, al-tı, or-man).
 * 4. Three consonants between vowels: VCC-CV (türk-çe, sırt-lan, kont-rol).
 * 5. Adjacent vowels: V-V (sa-at, şi-ir).
 */

const TURKISH_VOWELS = new Set([
  "a", "e", "ı", "i", "o", "ö", "u", "ü",
  "A", "E", "I", "İ", "O", "Ö", "U", "Ü",
]);

export function isVowel(char: string): boolean {
  return TURKISH_VOWELS.has(char);
}

/**
 * Splits a single Turkish word into syllables.
 * @param word The input word (e.g. "öğretmen")
 * @returns Array of syllable strings (e.g. ["öğ", "ret", "men"])
 */
export function syllabifyWord(word: string): string[] {
  if (!word || word.trim().length === 0) return [];

  const trimmed = word.trim();

  // Find vowel indices
  const vowelIndices: number[] = [];
  for (let i = 0; i < trimmed.length; i++) {
    if (isVowel(trimmed[i])) {
      vowelIndices.push(i);
    }
  }

  // Monosyllabic or words without vowels cannot be split
  if (vowelIndices.length <= 1) {
    return [trimmed];
  }

  // Determine split positions between consecutive vowels
  const splitPoints: number[] = [];

  for (let v = 0; v < vowelIndices.length - 1; v++) {
    const v1 = vowelIndices[v];
    const v2 = vowelIndices[v + 1];
    const consonantCount = v2 - v1 - 1;

    if (consonantCount === 0) {
      // Adjacent vowels: sa-at -> split right after v1
      splitPoints.push(v1 + 1);
    } else if (consonantCount === 1) {
      // Single consonant: ki-tap -> consonant belongs to second syllable
      splitPoints.push(v1 + 1);
    } else if (consonantCount === 2) {
      // Two consonants: al-tı -> split between consonants
      splitPoints.push(v1 + 2);
    } else if (consonantCount >= 3) {
      // Three or more consonants: türk-çe -> split before the last consonant
      splitPoints.push(v2 - 1);
    }
  }

  // Slice word into syllables
  const syllables: string[] = [];
  let startIndex = 0;

  for (const splitPoint of splitPoints) {
    syllables.push(trimmed.slice(startIndex, splitPoint));
    startIndex = splitPoint;
  }
  syllables.push(trimmed.slice(startIndex));

  return syllables;
}

/**
 * Color palette for child-friendly syllable highlighting
 */
export const SYLLABLE_COLORS = [
  "text-amber-600 dark:text-amber-400",
  "text-indigo-600 dark:text-indigo-400",
  "text-emerald-600 dark:text-emerald-400",
  "text-rose-600 dark:text-rose-400",
  "text-sky-600 dark:text-sky-400",
];
