/**
 * Schulte Table Professional Engine
 * Peripheral Vision Expansion & Visual Search Cognitive Trainer
 * Supports configurable grids (3x3, 4x4, 5x5, 6x6), Alphabet mode,
 * and Gorbov-Schulte (Red-Black dual task attention switching).
 */

export type SchulteGridSize = 3 | 4 | 5 | 6;
export type SchulteMode = "numbers" | "letters" | "gorbov";

export interface SchulteCell {
  id: string;
  display: string;
  color: "default" | "black" | "red";
  orderIndex: number; // Target match order (0-indexed)
}

export interface SchulteTarget {
  display: string;
  color: "default" | "black" | "red";
  orderIndex: number;
}

export interface SchulteScoreRecord {
  id: string;
  date: string;
  timestamp: number;
  size: SchulteGridSize;
  mode: SchulteMode;
  durationSeconds: number;
  mistakes: number;
  isPersonalBest?: boolean;
}

const STORAGE_KEY = "hizlioku_schulte_records_v1";

const TURKISH_ALPHABET = [
  "A", "B", "C", "Ç", "D", "E", "F", "G", "H", "I",
  "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "R",
  "S", "Ş", "T", "U", "Ü", "V", "Y", "Z", "W", "X",
  "Q", "1", "2", "3", "4", "5"
];

/**
 * Fisher-Yates array shuffler
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates the expected ordered sequence of targets for a given size and mode.
 */
export function generateTargetSequence(size: SchulteGridSize, mode: SchulteMode): SchulteTarget[] {
  const totalCells = size * size;

  if (mode === "numbers") {
    return Array.from({ length: totalCells }, (_, i) => ({
      display: String(i + 1),
      color: "default",
      orderIndex: i,
    }));
  }

  if (mode === "letters") {
    return Array.from({ length: totalCells }, (_, i) => ({
      display: TURKISH_ALPHABET[i % TURKISH_ALPHABET.length],
      color: "default",
      orderIndex: i,
    }));
  }

  // Gorbov-Schulte: Alternating Black and Red (e.g., 1 Black, 1 Red, 2 Black, 2 Red...)
  const targets: SchulteTarget[] = [];
  const blackCount = Math.ceil(totalCells / 2);
  const redCount = Math.floor(totalCells / 2);

  let b = 1;
  let r = 1;

  for (let i = 0; i < totalCells; i++) {
    if (i % 2 === 0) {
      if (b <= blackCount) {
        targets.push({
          display: String(b),
          color: "black",
          orderIndex: i,
        });
        b++;
      }
    } else {
      if (r <= redCount) {
        targets.push({
          display: String(r),
          color: "red",
          orderIndex: i,
        });
        r++;
      }
    }
  }

  return targets;
}

/**
 * Generates the randomized grid of cells for the user to click.
 */
export function generateSchulteGrid(size: SchulteGridSize, mode: SchulteMode): SchulteCell[] {
  const targets = generateTargetSequence(size, mode);
  const cells: SchulteCell[] = targets.map((t) => ({
    id: `${t.color}-${t.display}-${t.orderIndex}`,
    display: t.display,
    color: t.color,
    orderIndex: t.orderIndex,
  }));

  return shuffleArray(cells);
}

/**
 * Saves a completed session score into localStorage.
 */
export function saveSchulteScore(score: Omit<SchulteScoreRecord, "id" | "date" | "timestamp">): SchulteScoreRecord {
  const records = loadSchulteRecords();
  const dateStr = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });

  const bestBefore = getBestSchulteScore(score.size, score.mode);
  const isPersonalBest = !bestBefore || score.durationSeconds < bestBefore.durationSeconds;

  const newRecord: SchulteScoreRecord = {
    ...score,
    id: `schulte-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    date: dateStr,
    timestamp: Date.now(),
    isPersonalBest,
  };

  records.unshift(newRecord);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 50)));
    } catch {
      // Storage safe fallback
    }
  }

  return newRecord;
}

/**
 * Loads all saved Schulte records from localStorage.
 */
export function loadSchulteRecords(): SchulteScoreRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SchulteScoreRecord[];
  } catch {
    return [];
  }
}

/**
 * Returns the best (lowest duration) score for a given size and mode.
 */
export function getBestSchulteScore(size: SchulteGridSize, mode: SchulteMode): SchulteScoreRecord | null {
  const records = loadSchulteRecords().filter((r) => r.size === size && r.mode === mode);
  if (records.length === 0) return null;
  return records.reduce((best, curr) => (curr.durationSeconds < best.durationSeconds ? curr : best), records[0]);
}
