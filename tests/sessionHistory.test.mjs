import assert from "node:assert";
import { computeSessionStats, DEFAULT_SESSIONS } from "../src/lib/sessionHistory.ts";

console.log("Running unit tests for sessionHistory...");

const stats = computeSessionStats(DEFAULT_SESSIONS);

assert(stats.avgWpm > 0, "Average WPM should be greater than zero");
assert(stats.maxWpm >= stats.avgWpm, "Max WPM should be >= Avg WPM");
assert(stats.avgComprehension >= 0 && stats.avgComprehension <= 100, "Comprehension must be between 0 and 100");
assert(stats.totalWords > 0, "Total words should be positive");
assert(stats.totalDurationSeconds > 0, "Total duration should be positive");

// Empty sessions fallback
const emptyStats = computeSessionStats([]);
assert.strictEqual(emptyStats.totalWords, 0, "Empty sessions should have 0 total words");

console.log("✅ All sessionHistory unit tests passed successfully!");
