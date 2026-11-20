import assert from "node:assert";
import { generateComprehensionQuestions } from "../src/lib/questionGenerator.ts";

console.log("Running unit tests for questionGenerator...");

const sampleText = `
Hızlı okuma, göz kaslarının ve periferik görüşün koordine edilmesiyle geliştirilen bilimsel bir tekniktir.
İnsan beyni dakikada 800 kelimeyi işleme kapasitesine sahipken, geleneksel okuyucular ortalama 200 kelime okur.
Schulte tablosu egzersizi, gözün odaklanma ve sıçrama hızını önemli ölçüde artırmaktadır.
Fiksasyon noktaları doğru belirlendiğinde okuma süresi kısalır ve anlama düzeyi yükselir.
`;

const questions = generateComprehensionQuestions(sampleText, 3);

assert(Array.isArray(questions), "Questions should be an array");
assert(questions.length > 0, "Should generate at least 1 question for factual text");
assert(questions.length <= 3, "Should not exceed maxQuestions");

for (const q of questions) {
  assert(q.id, "Question must have an ID");
  assert(q.question.includes("______"), "Question prompt should contain blank line placeholder");
  assert.strictEqual(q.options.length, 4, "Question must have exactly 4 options");
  assert(q.correctIndex >= 0 && q.correctIndex < 4, "Correct index must be between 0 and 3");
  assert(q.options[q.correctIndex], "Correct option must exist in options list");
}

// Edge cases
const emptyQuestions = generateComprehensionQuestions("", 3);
assert.strictEqual(emptyQuestions.length, 0, "Empty text should return empty array");

const shortQuestions = generateComprehensionQuestions("Kısa metin.", 3);
assert.strictEqual(shortQuestions.length, 0, "Too short text should return empty array");

console.log("✅ All questionGenerator unit tests passed successfully!");
