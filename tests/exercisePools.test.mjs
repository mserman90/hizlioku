import assert from "node:assert/strict";
import {
  PYRAMID_THEMES,
  generateRandomPyramid,
  TACHISTOSCOPE_EXPANDED_BANK,
  generateRandomTachistoscopeSet,
  ZIGZAG_PATTERNS,
  SACCADE_TARGET_WORDS,
} from "../src/data/exercisePools.ts";
import { PUBLIC_TEXTS } from "../src/data/publicTexts.ts";
import { CHILD_EXERCISE_DATA } from "../src/data/childWordLists.ts";

console.log("Running unit tests for Exercise Pools and Randomization...");

// 1. Pyramid Themes & Procedural Generator Tests
assert(PYRAMID_THEMES.length >= 5, "Should have at least 5 pyramid themes");
PYRAMID_THEMES.forEach((theme) => {
  assert(theme.id && theme.name, "Theme should have id and name");
  assert(theme.rows.length >= 10, "Each theme should have at least 10 rows");
  theme.rows.forEach((row) => {
    assert(row.left && row.right, "Each pyramid row must have left and right parts");
  });
});

const randomPyramid1 = generateRandomPyramid();
const randomPyramid2 = generateRandomPyramid();
assert.equal(randomPyramid1.length, 13, "Random pyramid should have 13 rows");
assert.equal(randomPyramid2.length, 13, "Second random pyramid should have 13 rows");
console.log("✓ Pyramid themes and dynamic generator verified");

// 2. Tachistoscope Expanded Bank & Generator Tests
assert(TACHISTOSCOPE_EXPANDED_BANK.length >= 35, "Tachistoscope bank should have at least 35 items");
TACHISTOSCOPE_EXPANDED_BANK.forEach((item) => {
  assert(item.prompt, "Prompt must not be empty");
  assert(item.distractors.length >= 3, `Item '${item.prompt}' should have at least 3 distractors`);
});

const tSet1 = generateRandomTachistoscopeSet(10);
assert.equal(tSet1.length, 10, "Generated tachistoscope set should have 10 items");
tSet1.forEach((item) => {
  assert.equal(item.options.length, 4, "Item should have 4 choices");
  assert(item.correctIndex >= 0 && item.correctIndex < 4, "correctIndex must be between 0 and 3");
  assert.equal(
    item.options[item.correctIndex],
    item.prompt,
    "Option at correctIndex must match the prompt"
  );
});
console.log("✓ Tachistoscope expanded bank and dynamic option generation verified");

// 3. Zigzag Patterns & Saccade Target Words Tests
assert(ZIGZAG_PATTERNS.length >= 5, "Should have at least 5 saccade trajectory patterns");
ZIGZAG_PATTERNS.forEach((p) => {
  assert(p.id && p.name && p.description, "Pattern must have id, name and description");
  assert(p.waypoints.length >= 8, "Pattern should have at least 8 waypoints");
  p.waypoints.forEach((pt) => {
    assert(pt.x >= 0 && pt.x <= 100, "X coordinate must be percentage (0-100)");
    assert(pt.y >= 0 && pt.y <= 100, "Y coordinate must be percentage (0-100)");
  });
});
assert(SACCADE_TARGET_WORDS.length >= 25, "Should have at least 25 saccade target words");
console.log("✓ Zigzag patterns and saccade target words verified");

// 4. Public Texts Expanded Bank Tests
assert(PUBLIC_TEXTS.length >= 8, "PUBLIC_TEXTS should have at least 8 rich texts");
PUBLIC_TEXTS.forEach((txt) => {
  assert(txt.id && txt.title && txt.author && txt.category, "Text must have metadata");
  assert(txt.content.length > 50, "Text content must not be empty");
  assert(txt.questions.length >= 3, `Text '${txt.title}' should have at least 3 questions`);
  txt.questions.forEach((q) => {
    assert(q.question, "Question must not be empty");
    assert.equal(q.options.length, 4, "Question must have 4 options");
    assert(q.correctIndex >= 0 && q.correctIndex < 4, "correctIndex must be valid");
  });
});
console.log("✓ Public Texts expanded bank and questions verified");

// 5. Child Exercise Data Tests
assert(CHILD_EXERCISE_DATA.syllables.length >= 30, "Should have at least 30 syllables");
assert(CHILD_EXERCISE_DATA.words.length >= 40, "Should have at least 40 words");
assert(CHILD_EXERCISE_DATA.sentences.length >= 15, "Should have at least 15 sentences");
assert(CHILD_EXERCISE_DATA.stories.length >= 10, "Should have at least 10 stories");
console.log("✓ Child exercise data expansion verified");

console.log("✅ All Exercise Pools and Randomization unit tests passed successfully!");
