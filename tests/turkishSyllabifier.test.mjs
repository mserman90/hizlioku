import assert from "node:assert";
import { syllabifyWord, isVowel } from "../src/lib/turkishSyllabifier.ts";

console.log("Running unit tests for turkishSyllabifier...");

// 1. Vowel detection tests
assert.strictEqual(isVowel("a"), true);
assert.strictEqual(isVowel("ü"), true);
assert.strictEqual(isVowel("İ"), true);
assert.strictEqual(isVowel("k"), false);
assert.strictEqual(isVowel(" "), false);

// 2. Monosyllabic words
assert.deepStrictEqual(syllabifyWord("ev"), ["ev"]);
assert.deepStrictEqual(syllabifyWord("ben"), ["ben"]);
assert.deepStrictEqual(syllabifyWord("türk"), ["türk"]);

// 3. Single consonant between vowels (V-CV)
assert.deepStrictEqual(syllabifyWord("araba"), ["a", "ra", "ba"]);
assert.deepStrictEqual(syllabifyWord("kitap"), ["ki", "tap"]);
assert.deepStrictEqual(syllabifyWord("okul"), ["o", "kul"]);

// 4. Two consonants between vowels (VC-CV)
assert.deepStrictEqual(syllabifyWord("öğretmen"), ["öğ", "ret", "men"]);
assert.deepStrictEqual(syllabifyWord("altı"), ["al", "tı"]);
assert.deepStrictEqual(syllabifyWord("orman"), ["or", "man"]);
assert.deepStrictEqual(syllabifyWord("sevgi"), ["sev", "gi"]);

// 5. Three consonants between vowels (VCC-CV)
assert.deepStrictEqual(syllabifyWord("türkçe"), ["türk", "çe"]);
assert.deepStrictEqual(syllabifyWord("sırtlan"), ["sırt", "lan"]);

// 6. Adjacent vowels (V-V)
assert.deepStrictEqual(syllabifyWord("saat"), ["sa", "at"]);
assert.deepStrictEqual(syllabifyWord("şiir"), ["şi", "ir"]);

console.log("✅ All turkishSyllabifier unit tests passed successfully!");
