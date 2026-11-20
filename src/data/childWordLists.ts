/**
 * Age-appropriate word, syllable, and sentence datasets for children (ages 6–12)
 * Designed for low-pressure reading fluency practice, phonics recognition, and storytelling.
 */

export type ChildGradeLevel = "grade1" | "grade2" | "grade3" | "grade4";

export interface WordExerciseItem {
  id: string;
  text: string;
  category: "syllable" | "word" | "sentence" | "story";
  level: "easy" | "medium" | "hard";
  grade?: ChildGradeLevel;
}

export const CHILD_EXERCISE_DATA: Record<"syllables" | "words" | "sentences" | "stories", WordExerciseItem[]> = {
  syllables: [
    { id: "s1", text: "BA", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s2", text: "KA", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s3", text: "MA", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s4", text: "LE", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s5", text: "EL", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s6", text: "SU", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s7", text: "GÖZ", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s8", text: "YOL", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s9", text: "BAL", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s10", text: "GÜN", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s11", text: "KIRK", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s12", text: "TÜRK", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s13", text: "KENT", category: "syllable", level: "hard", grade: "grade4" },
    { id: "s14", text: "DERT", category: "syllable", level: "hard", grade: "grade4" },
  ],
  words: [
    // 1. Sınıf / Seviye 1
    { id: "w1", text: "Kedi", category: "word", level: "easy", grade: "grade1" },
    { id: "w2", text: "Elma", category: "word", level: "easy", grade: "grade1" },
    { id: "w3", text: "Anne", category: "word", level: "easy", grade: "grade1" },
    { id: "w4", text: "Baba", category: "word", level: "easy", grade: "grade1" },
    { id: "w5", text: "Okul", category: "word", level: "easy", grade: "grade1" },
    // 2. Sınıf / Seviye 2
    { id: "w6", text: "Kitap", category: "word", level: "medium", grade: "grade2" },
    { id: "w7", text: "Deniz", category: "word", level: "medium", grade: "grade2" },
    { id: "w8", text: "Orman", category: "word", level: "medium", grade: "grade2" },
    { id: "w9", text: "Yıldız", category: "word", level: "medium", grade: "grade2" },
    { id: "w10", text: "Balık", category: "word", level: "medium", grade: "grade2" },
    // 3. Sınıf / Seviye 3
    { id: "w11", text: "Kelebek", category: "word", level: "hard", grade: "grade3" },
    { id: "w12", text: "Papatya", category: "word", level: "hard", grade: "grade3" },
    { id: "w13", text: "Arkadaş", category: "word", level: "hard", grade: "grade3" },
    { id: "w14", text: "Çalışkan", category: "word", level: "hard", grade: "grade3" },
    // 4. Sınıf / Seviye 4
    { id: "w15", text: "Gökkuşağı", category: "word", level: "hard", grade: "grade4" },
    { id: "w16", text: "Denizaltı", category: "word", level: "hard", grade: "grade4" },
    { id: "w17", text: "Bilgisayar", category: "word", level: "hard", grade: "grade4" },
    { id: "w18", text: "Yardımlaşma", category: "word", level: "hard", grade: "grade4" },
  ],
  sentences: [
    { id: "e1", text: "Güneş doğdu.", category: "sentence", level: "easy", grade: "grade1" },
    { id: "e2", text: "Kuşlar neşeyle uçuyor.", category: "sentence", level: "easy", grade: "grade1" },
    { id: "e3", text: "Ali yeni bir kitap açtı.", category: "sentence", level: "medium", grade: "grade2" },
    { id: "e4", text: "Minik kedi sütünü içti.", category: "sentence", level: "medium", grade: "grade2" },
    { id: "e5", text: "Bahçede rengarenk çiçekler açtı.", category: "sentence", level: "medium", grade: "grade2" },
    { id: "e6", text: "Deniz kenarında pırıl pırıl taşlar topladık.", category: "sentence", level: "hard", grade: "grade3" },
    { id: "e7", text: "Gökyüzünde kocaman ve parlak bir gökkuşağı belirdi.", category: "sentence", level: "hard", grade: "grade3" },
    { id: "e8", text: "Düzenli kitap okumak hayal gücümüzü zenginleştirir.", category: "sentence", level: "hard", grade: "grade4" },
  ],
  stories: [
    { id: "st1", text: "Bir varmış bir yokmuş.", category: "story", level: "easy", grade: "grade1" },
    { id: "st2", text: "Kurnaz tilki ile sevimli leylek ormanda buluşmuş.", category: "story", level: "easy", grade: "grade1" },
    { id: "st3", text: "Kaplumbağa azimle ve sabırla hedefine yürümüş.", category: "story", level: "medium", grade: "grade2" },
    { id: "st4", text: "Hızlı koşan tavşan gururlanıp bir ağacın gölgesinde uyuyakalmış.", category: "story", level: "medium", grade: "grade2" },
    { id: "st5", text: "Nasreddin Hoca göle maya çalarken köylüler merakla izlemiş.", category: "story", level: "hard", grade: "grade3" },
    { id: "st6", text: "Hoca gülümseyerek: Ya tutarsa demiş!", category: "story", level: "hard", grade: "grade3" },
    { id: "st7", text: "Birlikten kuvvet doğar, el ele veren karıncalar kışı bollukla geçirmiş.", category: "story", level: "hard", grade: "grade4" },
  ],
};
