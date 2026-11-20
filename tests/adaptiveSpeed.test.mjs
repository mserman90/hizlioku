import assert from "node:assert";
import { calculateAdaptiveWpm } from "../src/lib/adaptiveSpeed.ts";

console.log("Running unit tests for adaptiveSpeed...");

// 1. High comprehension (>= 85%) -> increase speed
const high = calculateAdaptiveWpm(300, 90);
assert.strictEqual(high.action, "increase");
assert.strictEqual(high.newWpm, 325);
assert.strictEqual(high.delta, 25);
console.log("✓ High score speed boost verified");

// 2. Low comprehension (< 70%) -> decrease speed
const low = calculateAdaptiveWpm(300, 60);
assert.strictEqual(low.action, "decrease");
assert.strictEqual(low.newWpm, 275);
assert.strictEqual(low.delta, -25);
console.log("✓ Low score throttle adjustment verified");

// 3. Balanced comprehension (70% - 84%) -> maintain speed
const balanced = calculateAdaptiveWpm(300, 75);
assert.strictEqual(balanced.action, "maintain");
assert.strictEqual(balanced.newWpm, 300);
assert.strictEqual(balanced.delta, 0);
console.log("✓ Optimum zone speed maintenance verified");

// 4. Boundary clamping (max 1000, min 150)
const maxBound = calculateAdaptiveWpm(1000, 100);
assert.strictEqual(maxBound.newWpm, 1000);

const minBound = calculateAdaptiveWpm(150, 40);
assert.strictEqual(minBound.newWpm, 150);
console.log("✓ Boundaries (150 WPM - 1000 WPM) verified");

console.log("✅ All adaptiveSpeed unit tests passed successfully!\n");
