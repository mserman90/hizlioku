/**
 * User Reading Goals & Daily Habit Engine
 * Tracks target WPM, daily reading time/word goals, and computes real daily streaks.
 */

export interface ReadingSessionRecord {
  id?: string;
  timestamp: number;
  wordCount: number;
  durationSeconds: number;
  wpm?: number;
  comprehensionScore?: number;
  textTitle?: string;
}

export interface UserGoals {
  targetWpm: number;
  dailyMinutes: number;
  dailyWords: number;
}

export interface DailyGoalProgress {
  wordsReadToday: number;
  secondsReadToday: number;
  minutesReadToday: number;
  wordProgressPercent: number;
  timeProgressPercent: number;
  overallPercent: number;
  isGoalMet: boolean;
  currentStreakDays: number;
}

const STORAGE_KEY = "hizlioku_user_goals_v1";

export const DEFAULT_GOALS: UserGoals = {
  targetWpm: 500,
  dailyMinutes: 15,
  dailyWords: 1500,
};

export function loadUserGoals(): UserGoals {
  if (typeof window === "undefined") return DEFAULT_GOALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GOALS;
    return { ...DEFAULT_GOALS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_GOALS;
  }
}

export function saveUserGoals(goals: Partial<UserGoals>): UserGoals {
  const current = loadUserGoals();
  const updated = { ...current, ...goals };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage safety
    }
  }
  return updated;
}

/**
 * Computes consecutive days streak from session timestamps.
 */
export function computeReadingStreak(sessions: ReadingSessionRecord[]): number {
  if (!sessions || sessions.length === 0) return 0;

  // Extract unique calendar days in YYYY-MM-DD
  const days = new Set(
    sessions.map((s) => {
      const d = new Date(s.timestamp);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    })
  );

  const sortedDays = Array.from(days).sort().reverse();
  if (sortedDays.length === 0) return 0;

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  
  const yesterday = new Date(Date.now() - 86400000);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  // If user hasn't read today or yesterday, streak is broken
  if (!days.has(todayStr) && !days.has(yesterdayStr)) {
    return 0;
  }

  let streak = 0;
  let checkDate = days.has(todayStr) ? now : yesterday;

  while (true) {
    const checkStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
    if (days.has(checkStr)) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Computes today's progress towards user's daily goals.
 */
export function computeDailyProgress(
  sessions: ReadingSessionRecord[],
  goals: UserGoals = DEFAULT_GOALS
): DailyGoalProgress {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  let wordsReadToday = 0;
  let secondsReadToday = 0;

  sessions.forEach((s) => {
    if (s.timestamp >= todayStart) {
      wordsReadToday += s.wordCount;
      secondsReadToday += s.durationSeconds;
    }
  });

  const minutesReadToday = Number((secondsReadToday / 60).toFixed(1));
  const wordProgressPercent = Math.min(100, Math.round((wordsReadToday / goals.dailyWords) * 100));
  const timeProgressPercent = Math.min(100, Math.round((secondsReadToday / (goals.dailyMinutes * 60)) * 100));
  const overallPercent = Math.round((wordProgressPercent + timeProgressPercent) / 2);

  const streak = computeReadingStreak(sessions);

  return {
    wordsReadToday,
    secondsReadToday,
    minutesReadToday,
    wordProgressPercent,
    timeProgressPercent,
    overallPercent,
    isGoalMet: overallPercent >= 100,
    currentStreakDays: Math.max(streak, sessions.length > 0 ? 1 : 0),
  };
}
