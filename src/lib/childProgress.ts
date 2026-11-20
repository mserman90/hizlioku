/**
 * Child Progress & Parental Milestone Tracking
 * Adheres strictly to COPPA / KVKK child data minimization:
 * Stores only non-identifying aggregate milestone data (session count, streak, badges).
 */

export interface ChildMilestoneSummary {
  sessionsCompleted: number;
  streakDays: number;
  badges: string[];
  totalPoints: number;
}

const STORAGE_KEY = "hizlioku_child_progress_v1";

const DEFAULT_SUMMARY: ChildMilestoneSummary = {
  sessionsCompleted: 4,
  streakDays: 3,
  badges: ["İlk Adım", "3 Günlük Seri", "Kelime Avcısı"],
  totalPoints: 120,
};

export function loadChildProgress(): ChildMilestoneSummary {
  if (typeof window === "undefined") return DEFAULT_SUMMARY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SUMMARY;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SUMMARY;
  }
}

export function recordChildSession(pointsEarned: number): ChildMilestoneSummary {
  const current = loadChildProgress();
  const newSessions = current.sessionsCompleted + 1;
  const newPoints = current.totalPoints + pointsEarned;

  // Compute dynamic badges
  const badges = [...current.badges];
  if (newSessions >= 1 && !badges.includes("İlk Adım")) {
    badges.push("İlk Adım");
  }
  if (newSessions >= 5 && !badges.includes("5 Seans Kulübü")) {
    badges.push("5 Seans Kulübü");
  }
  if (newSessions >= 10 && !badges.includes("Hızlı Okur Yıldızı")) {
    badges.push("Hızlı Okur Yıldızı");
  }
  if (newPoints >= 200 && !badges.includes("Puan Şampiyonu")) {
    badges.push("Puan Şampiyonu");
  }

  const updated: ChildMilestoneSummary = {
    sessionsCompleted: newSessions,
    streakDays: Math.min(newSessions, current.streakDays + 1),
    badges,
    totalPoints: newPoints,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage safety
    }
  }

  return updated;
}
