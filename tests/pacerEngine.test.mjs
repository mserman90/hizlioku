import assert from "node:assert/strict";
import {
  tokenizePacerText,
  getPacerIntervalMs,
  formatBionicWord,
} from "../src/lib/pacerEngine.ts";

console.log("Running unit tests for pacerEngine...");

// Test 1: Tokenization of multi-paragraph text
const sampleText = `İlk paragraf burada yer alıyor. Hızlı okuma çok faydalıdır.

İkinci paragraf ise yeni satırla başlar. İkinci cümle devam eder.`;

const result = tokenizePacerText(sampleText);
assert.equal(result.paragraphs.length, 2, "Should have 2 paragraphs");
assert.equal(result.totalWords, 19, "Should count 19 total words across paragraphs");
assert.equal(result.allTokens.length, 19);

// Verify global index increment
assert.equal(result.allTokens[0].globalIndex, 0);
assert.equal(result.allTokens[0].word, "İlk");
assert.equal(result.allTokens[18].globalIndex, 18);
assert.equal(result.allTokens[18].word, "eder.");
console.log("✓ Multi-paragraph tokenization verified");

// Test 2: Pacer interval with smart pacing
const baseInterval = getPacerIntervalMs(300, "kelime", true);
const periodInterval = getPacerIntervalMs(300, "sonu.", true);
assert(periodInterval > baseInterval, "Sentence-ending words should have higher pause interval");
console.log("✓ Pacer pacing intervals with cognitive punctuation pause verified");

// Test 3: Bionic word splitting
const bionicRes = formatBionicWord("Türkiye");
assert.equal(bionicRes.boldPart, "Tür");
assert.equal(bionicRes.normalPart, "kiye");
console.log("✓ Bionic word formatting verified");

console.log("✅ All pacerEngine unit tests passed successfully!");
