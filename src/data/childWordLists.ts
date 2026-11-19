/**
 * Age-appropriate word, syllable, and sentence datasets for children (ages 6–12)
 * Designed for low-pressure reading fluency practice and phonics recognition.
 */

export interface WordExerciseItem {
  id: string;
  text: string;
  category: "syllable" | "word" | "sentence";
  level: "easy" | "medium" | "hard";
}

export const CHILD_EXERCISE_DATA: Record<"syllables" | "words" | "sentences", WordExerciseItem[]> = {
  syllables: [
    { id: "s1", text: "BA", category: "syllable", level: "easy" },
    { id: "s2", text: "KA", category: "syllable", level: "easy" },
    { id: "s3", text: "MA", category: "syllable", level: "easy" },
    { id: "s4", text: "LE", category: "syllable", level: "easy" },
    { id: "s5", text: "EL", category: "syllable", level: "easy" },
    { id: "s6", text: "SU", category: "syllable", level: "easy" },
    { id: "s7", text: "GÖZ", category: "syllable", level: "medium" },
    { id: "s8", text: "YOL", category: "syllable", level: "medium" },
    { id: "s9", text: "BAL", category: "syllable", level: "medium" },
    { id: "s10", text: "GÜN", category: "syllable", level: "medium" },
    { id: "s11", text: "KIRK", category: "syllable", level: "hard" },
    { id: "s12", text: "TÜRK", category: "syllable", level: "hard" },
  ],
  words: [
    { id: "w1", text: "Kedi", category: "word", level: "easy" },
    { id: "w2", text: "Elma", category: "word", level: "easy" },
    { id: "w3", text: "Güneş", category: "word", level: "easy" },
    { id: "w4", text: "Balık", category: "word", level: "easy" },
    { id: "w5", text: "Kitap", category: "word", level: "medium" },
    { id: "w6", text: "Deniz", category: "word", level: "medium" },
    { id: "w7", text: "Yıldız", category: "word", level: "medium" },
    { id: "w8", text: "Bulut", category: "word", level: "medium" },
    { id: "w9", text: "Kelebek", category: "word", level: "hard" },
    { id: "w10", text: "Papatya", category: "word", level: "hard" },
    { id: "w11", text: "Arkadaş", category: "word", level: "hard" },
    { id: "w12", text: "Gökkuşağı", category: "word", level: "hard" },
  ],
  sentences: [
    { id: "e1", text: "Güneş doğdu.", category: "sentence", level: "easy" },
    { id: "e2", text: "Kuşlar neşeyle uçuyor.", category: "sentence", level: "easy" },
    { id: "e3", text: "Ali yeni bir kitap açtı.", category: "sentence", level: "medium" },
    { id: "e4", text: "Minik kedi sütünü içti.", category: "sentence", level: "medium" },
    { id: "e5", text: "Bahçede rengarenk çiçekler açtı.", category: "sentence", level: "medium" },
    { id: "e6", text: "Deniz kenarında taşlar topladık.", category: "sentence", level: "hard" },
    { id: "e7", text: "Gökyüzünde kocaman bir gökkuşağı belirdi.", category: "sentence", level: "hard" },
  ],
};
