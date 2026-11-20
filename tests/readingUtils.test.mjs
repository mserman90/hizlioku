import assert from "node:assert";
import {
  calculateRsvpIntervalMs,
  calculateWpm,
  calculateComprehensionScore,
  getOrpIndex,
} from "../src/lib/readingUtils.ts";

console.log("Running unit tests for readingUtils...");

// 1. RSVP Interval Timing Tests
assert.strictEqual(calculateRsvpIntervalMs(300), 200, "300 WPM should equal 200ms interval");
assert.strictEqual(calculateRsvpIntervalMs(600), 100, "600 WPM should equal 100ms interval");
assert.strictEqual(calculateRsvpIntervalMs(150), 400, "150 WPM should equal 400ms interval");
assert.throws(() => calculateRsvpIntervalMs(0), /greater than zero/, "0 WPM should throw an error");

// 1.1 Dynamic Punctuation & Cognitive Pacing Tests
assert.strictEqual(
  calculateRsvpIntervalMs(300, "kitap.", true),
  400,
  "Sentence terminator (.) should double interval (2.0x = 400ms)"
);
assert.strictEqual(
  calculateRsvpIntervalMs(300, "koştu!", true),
  400,
  "Exclamation (!) should double interval (2.0x = 400ms)"
);
assert.strictEqual(
  calculateRsvpIntervalMs(300, "ancak,", true),
  300,
  "Comma (,) should multiply interval by 1.5x (300ms)"
);
assert.strictEqual(
  calculateRsvpIntervalMs(300, "kütüphaneler", true),
  250,
  "12-char long word should multiply interval by 1.25x (250ms)"
);
assert.strictEqual(
  calculateRsvpIntervalMs(300, "kitap.", false),
  200,
  "Smart pacing disabled should yield baseline (200ms)"
);

// 2. WPM Calculation Tests
assert.strictEqual(calculateWpm(100, 30000), 200, "100 words in 30 seconds should be 200 WPM");
assert.strictEqual(calculateWpm(500, 60000), 500, "500 words in 1 minute should be 500 WPM");
assert.strictEqual(calculateWpm(100, 0), 0, "0ms duration should return 0 WPM");

// 3. Comprehension Scoring Tests
assert.strictEqual(calculateComprehensionScore(4, 5), 80, "4/5 correct should be 80%");
assert.strictEqual(calculateComprehensionScore(5, 5), 100, "5/5 correct should be 100%");
assert.strictEqual(calculateComprehensionScore(0, 5), 0, "0/5 correct should be 0%");
assert.strictEqual(calculateComprehensionScore(2, 0), 0, "0 total questions should return 0%");

// 4. ORP Calculation Tests
assert.strictEqual(getOrpIndex("a"), 0, "Single character word ORP at 0");
assert.strictEqual(getOrpIndex("kitap"), 1, "5-letter word ORP at index 1");
assert.strictEqual(getOrpIndex("okumak"), 2, "6-letter word ORP at index 2");
assert.strictEqual(getOrpIndex("kütüphaneler"), 3, "12-letter word ORP at index 3");

console.log("✅ All readingUtils unit tests passed successfully!");
