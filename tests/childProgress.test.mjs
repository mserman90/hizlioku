import assert from "node:assert";

// Mock localStorage and window for node environment
const store = new Map();
const mockLocalStorage = {
  getItem: (k) => store.get(k) ?? null,
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear(),
};
globalThis.localStorage = mockLocalStorage;
globalThis.window = { localStorage: mockLocalStorage };

const { loadChildProgress, recordChildSession } = await import(
  "../src/lib/childProgress.ts"
);

console.log("Running Child Progress Milestone Tests...");

// 1. Initial / default progress
store.clear();
const initial = loadChildProgress();
assert.strictEqual(typeof initial.sessionsCompleted, "number");
assert.strictEqual(Array.isArray(initial.badges), true);
assert.strictEqual(initial.badges.includes("İlk Adım"), true);
console.log("✓ Initial progress loaded successfully");

// 2. Record new session & earn badges
const updated = recordChildSession(50);
assert.strictEqual(updated.sessionsCompleted, initial.sessionsCompleted + 1);
assert.strictEqual(updated.totalPoints, initial.totalPoints + 50);
assert.strictEqual(store.has("hizlioku_child_progress_v1"), true);
console.log("✓ Session record and milestone update verified");

// 3. Earning high milestone badge
const highMilestone = recordChildSession(200);
assert.strictEqual(highMilestone.badges.includes("Puan Şampiyonu"), true);
console.log("✓ Badge unlock triggers verified");

console.log("All Child Progress Milestone tests passed!\n");
