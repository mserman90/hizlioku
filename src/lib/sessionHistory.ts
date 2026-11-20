/**
 * Reading Session History & Performance Tracking
 * Stores and analyzes real user reading sessions locally in browser localStorage.
 */

export interface ReadingSessionRecord {
  id: string;
  date: string;
  timestamp: number;
  textTitle: string;
  wpm: number;
  comprehensionScore: number;
  wordCount: number;
  durationSeconds: number;
  smartPacingEnabled: boolean;
  chunkSize: number;
}

const STORAGE_KEY = "hizlioku_session_history_v1";

/**
 * Default sample records shown on fresh installation before user completes sessions.
 */
export const DEFAULT_SESSIONS: ReadingSessionRecord[] = [
  {
    id: "init-1",
    date: "Pzt",
    timestamp: Date.now() - 6 * 86400000,
    textTitle: "Başlangıç Alıştırması",
    wpm: 220,
    comprehensionScore: 75,
    wordCount: 150,
    durationSeconds: 41,
    smartPacingEnabled: true,
    chunkSize: 1,
  },
  {
    id: "init-2",
    date: "Sal",
    timestamp: Date.now() - 5 * 86400000,
    textTitle: "Ezop Masalları",
    wpm: 260,
    comprehensionScore: 80,
    wordCount: 200,
    durationSeconds: 46,
    smartPacingEnabled: true,
    chunkSize: 1,
  },
  {
    id: "init-3",
    date: "Çar",
    timestamp: Date.now() - 4 * 86400000,
    textTitle: "Bilim ve Keşif",
    wpm: 290,
    comprehensionScore: 85,
    wordCount: 250,
    durationSeconds: 52,
    smartPacingEnabled: true,
    chunkSize: 1,
  },
  {
    id: "init-4",
    date: "Per",
    timestamp: Date.now() - 3 * 86400000,
    textTitle: "Doğa ve Çevre",
    wpm: 320,
    comprehensionScore: 80,
    wordCount: 280,
    durationSeconds: 52,
    smartPacingEnabled: true,
    chunkSize: 1,
  },
  {
    id: "init-5",
    date: "Cum",
    timestamp: Date.now() - 2 * 86400000,
    textTitle: "Türk Klasikleri",
    wpm: 350,
    comprehensionScore: 90,
    wordCount: 350,
    durationSeconds: 60,
    smartPacingEnabled: true,
    chunkSize: 1,
  },
];

/**
 * Loads session history from browser localStorage.
 */
export function loadSessionHistory(): ReadingSessionRecord[] {
  if (typeof window === "undefined") return DEFAULT_SESSIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SESSIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SESSIONS;
  } catch {
    return DEFAULT_SESSIONS;
  }
}

/**
 * Saves a completed reading session record.
 */
export function saveSessionRecord(record: Omit<ReadingSessionRecord, "id" | "date" | "timestamp">): ReadingSessionRecord {
  const current = loadSessionHistory();
  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const now = new Date();

  const newRecord: ReadingSessionRecord = {
    ...record,
    id: `ses-${Date.now()}`,
    date: dayNames[now.getDay()],
    timestamp: Date.now(),
  };

  // Keep last 30 sessions
  const updated = [...current, newRecord].slice(-30);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota or private browsing safety
    }
  }

  return newRecord;
}

/**
 * Computes performance analytics from session history.
 */
export function computeSessionStats(sessions: ReadingSessionRecord[]) {
  if (!sessions || sessions.length === 0) {
    return {
      avgWpm: 250,
      maxWpm: 300,
      avgComprehension: 80,
      totalWords: 0,
      totalDurationSeconds: 0,
    };
  }

  const avgWpm = Math.round(sessions.reduce((acc, s) => acc + s.wpm, 0) / sessions.length);
  const maxWpm = Math.max(...sessions.map((s) => s.wpm), 300);
  const avgComprehension = Math.round(
    sessions.reduce((acc, s) => acc + s.comprehensionScore, 0) / sessions.length
  );
  const totalWords = sessions.reduce((acc, s) => acc + s.wordCount, 0);
  const totalDurationSeconds = sessions.reduce((acc, s) => acc + s.durationSeconds, 0);

  return {
    avgWpm,
    maxWpm,
    avgComprehension,
    totalWords,
    totalDurationSeconds,
  };
}
