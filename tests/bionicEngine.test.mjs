import assert from "node:assert";
import { parseBionicWord, getBionicAnchorLength, formatBionicHtml } from "../src/lib/bionicEngine.ts";

console.log("Running unit tests for bionicEngine...");

// 1. Anchor length tests
assert.strictEqual(getBionicAnchorLength(1), 1);
assert.strictEqual(getBionicAnchorLength(3), 1);
assert.strictEqual(getBionicAnchorLength(5), 2);
assert.strictEqual(getBionicAnchorLength(8), 3);
assert.strictEqual(getBionicAnchorLength(12), 4);
console.log("✓ Anchor length heuristics verified");

// 2. Word parsing with Turkish characters and punctuations
const testWord1 = parseBionicWord("hızlı");
assert.strictEqual(testWord1.bold, "hı");
assert.strictEqual(testWord1.rest, "zlı");
assert.strictEqual(testWord1.prefix, "");
assert.strictEqual(testWord1.suffix, "");

const testWord2 = parseBionicWord('"öğretmenlerimizin,"');
assert.strictEqual(testWord2.prefix, '"');
assert.strictEqual(testWord2.bold, "öğretme");
assert.strictEqual(testWord2.rest, "nlerimizin");
assert.strictEqual(testWord2.suffix, ',"');

const testWord3 = parseBionicWord("okumak.");
assert.strictEqual(testWord3.bold, "ok");
assert.strictEqual(testWord3.rest, "umak");
assert.strictEqual(testWord3.suffix, ".");
console.log("✓ Punctuation stripping and Turkish phonotactic bolding verified");

// 3. HTML formatting
const html = formatBionicHtml("Hızlı okuma bilimi.");
assert(html.includes("<b>Hı</b>zlı"), "Should bold initial characters of 'Hızlı'");
assert(html.includes("<b>ok</b>uma"), "Should bold initial characters of 'okuma'");
assert(html.includes("<b>bi</b>limi."), "Should bold initial characters and preserve period");
console.log("✓ Full text HTML generation verified");

console.log("✅ All bionicEngine unit tests passed successfully!\n");
