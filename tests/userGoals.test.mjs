import assert from "node:assert";

// Mock localStorage and window
const store = new Map();
const mockLocalStorage = {
  getItem: (k) => store.get(k) ?? null,
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear(),
};
globalThis.localStorage = mockLocalStorage;
globalThis.window = { localStorage: mockLocalStorage };

const { loadUserGoals, saveUserGoals, computeDailyProgress, computeReadingStreak, DEFAULT_GOALS } = await import(
  "../src/lib/userGoals.ts"
);

console.log("Running unit tests for userGoals...");

// 1. Default goals
store.clear();
const initial = loadUserGoals();
assert.strictEqual(initial.targetWpm, 500);
assert.strictEqual(initial.dailyMinutes, 15);
console.log("✓ Default user goals loaded successfully");

// 2. Save goals
const updated = saveUserGoals({ targetWpm: 650, dailyMinutes: 20 });
assert.strictEqual(updated.targetWpm, 650);
assert.strictEqual(updated.dailyMinutes, 20);
assert.strictEqual(store.has("hizlioku_user_goals_v1"), true);
console.log("✓ User goals update verified");

// 3. Daily progress calculation
const mockSessions = [
  {
    id: "s1",
    timestamp: Date.now() - 10000, // Today
    wordCount: 750,
    durationSeconds: 300,
    wpm: 350,
    comprehensionScore: 85,
    textTitle: "Test",
    date: "Bugün",
    smartPacingEnabled: true,
    chunkSize: 1,
  },
];

const progress = computeDailyProgress(mockSessions, { targetWpm: 600, dailyMinutes: 10, dailyWords: 1500 });
assert.strictEqual(progress.wordsReadToday, 750);
assert.strictEqual(progress.wordProgressPercent, 50); // 750 / 1500 = 50%
assert.strictEqual(progress.currentStreakDays >= 1, true);
console.log("✓ Daily progress and streak calculation verified");

console.log("✅ All userGoals unit tests passed successfully!\n");
