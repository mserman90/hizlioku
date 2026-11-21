import assert from "node:assert";
import { countSyllables, splitSentences, calculateReadability } from "../src/lib/readabilityScore.ts";

console.log("Running unit tests for readabilityScore (Ateşman)...");

// 1. Syllable count
assert.strictEqual(countSyllables("araba"), 3);
assert.strictEqual(countSyllables("türk"), 1);
assert.strictEqual(countSyllables("öğretmenlerimizin"), 7);
assert.strictEqual(countSyllables("saat"), 2);
console.log("✓ Syllable counting verified");

// 2. Sentence splitting
const text = "Ali topu attı. Veli topu tuttu! Ancak top patladı mı?";
const sentences = splitSentences(text);
assert.strictEqual(sentences.length, 3);
console.log("✓ Sentence splitting verified");

// 3. Simple child text should yield high readability score (>= 80)
const simpleText = "Ali ata baktı. Ayşe süt içti. Güneş doğdu. Kuşlar uçtu.";
const simpleMetrics = calculateReadability(simpleText);
assert(simpleMetrics.score >= 80, `Expected score >= 80, got ${simpleMetrics.score}`);
assert.strictEqual(simpleMetrics.level, "very_easy");
assert.strictEqual(simpleMetrics.suggestedWpm >= 350, true);
console.log("✓ Simple text Ateşman scoring verified");

// 4. Complex academic/scientific text should yield lower readability score (<= 60)
const complexText = "Bilişsel psikolojideki nörofizyolojik araştırmalar, göz hareketlerinin ve sakkadik sıçramaların foveal görme merkezindeki algısal yükle doğrudan ilintili olduğunu göstermektedir. Morfolojik çözümlemeler ve aglütinatif dil yapısı okuma sürelerini etkilemektedir.";
const complexMetrics = calculateReadability(complexText);
assert(complexMetrics.score < 60, `Expected complex score < 60, got ${complexMetrics.score}`);
assert(["medium", "hard", "very_hard"].includes(complexMetrics.level));
console.log("✓ Complex academic text Ateşman scoring verified");

console.log("✅ All readabilityScore unit tests passed successfully!\n");
