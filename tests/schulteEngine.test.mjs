import assert from "node:assert/strict";
import {
  generateTargetSequence,
  generateSchulteGrid,
  shuffleArray,
} from "../src/lib/schulteEngine.ts";

console.log("Running unit tests for schulteEngine...");

// Test 1: Grid size cell counts
const sizes = [3, 4, 5, 6];
for (const size of sizes) {
  const numTargets = generateTargetSequence(size, "numbers");
  assert.equal(numTargets.length, size * size, `3x3 should have 9, 4x4 should have 16, etc. Failed for size ${size}`);

  const grid = generateSchulteGrid(size, "numbers");
  assert.equal(grid.length, size * size, `Grid generation cell count mismatch for size ${size}`);
}
console.log("✓ Grid size cell counts verified (3x3=9, 4x4=16, 5x5=25, 6x6=36)");

// Test 2: Numbers sequence check
const seq5 = generateTargetSequence(5, "numbers");
assert.equal(seq5[0].display, "1");
assert.equal(seq5[24].display, "25");
assert.equal(seq5[12].orderIndex, 12);
console.log("✓ Standard numbers sequence verified");

// Test 3: Letters sequence check
const letters3 = generateTargetSequence(3, "letters");
assert.equal(letters3[0].display, "A");
assert.equal(letters3[1].display, "B");
assert.equal(letters3.length, 9);
console.log("✓ Alphabet sequence verified");

// Test 4: Gorbov-Schulte alternating Red-Black distribution
const gorbov5 = generateTargetSequence(5, "gorbov");
assert.equal(gorbov5.length, 25);
// First is Black 1
assert.equal(gorbov5[0].color, "black");
assert.equal(gorbov5[0].display, "1");
// Second is Red 1
assert.equal(gorbov5[1].color, "red");
assert.equal(gorbov5[1].display, "1");
// Third is Black 2
assert.equal(gorbov5[2].color, "black");
assert.equal(gorbov5[2].display, "2");
// Fourth is Red 2
assert.equal(gorbov5[3].color, "red");
assert.equal(gorbov5[3].display, "2");

const blackCount = gorbov5.filter((c) => c.color === "black").length;
const redCount = gorbov5.filter((c) => c.color === "red").length;
assert.equal(blackCount, 13);
assert.equal(redCount, 12);
console.log("✓ Gorbov-Schulte alternating Red-Black distribution verified");

// Test 5: Shuffle randomness
const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffled = shuffleArray(original);
assert.equal(shuffled.length, original.length);
assert.deepEqual([...shuffled].sort((a, b) => a - b), original);
console.log("✓ Fisher-Yates array shuffling verified");

console.log("✅ All schulteEngine unit tests passed successfully!");
