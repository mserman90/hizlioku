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
    // 1. Sınıf / Seviye 1 (Temel Açık & Kapalı Heceler)
    { id: "s1", text: "BA", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s2", text: "KA", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s3", text: "MA", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s4", text: "LE", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s5", text: "EL", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s6", text: "SU", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s7", text: "AL", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s8", text: "AK", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s9", text: "DE", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s10", text: "KO", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s11", text: "Mİ", category: "syllable", level: "easy", grade: "grade1" },
    { id: "s12", text: "LA", category: "syllable", level: "easy", grade: "grade1" },

    // 2. Sınıf / Seviye 2 (3 Harfli Heceler)
    { id: "s13", text: "GÖZ", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s14", text: "YOL", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s15", text: "BAL", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s16", text: "GÜN", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s17", text: "KUŞ", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s18", text: "TAŞ", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s19", text: "YAZ", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s20", text: "KIŞ", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s21", text: "BAŞ", category: "syllable", level: "medium", grade: "grade2" },
    { id: "s22", text: "KÖK", category: "syllable", level: "medium", grade: "grade2" },

    // 3. Sınıf / Seviye 3 (Ünsüz Kümeleri & 4 Harfli Heceler)
    { id: "s23", text: "KIRK", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s24", text: "TÜRK", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s25", text: "PARK", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s26", text: "DÖRT", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s27", text: "KURT", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s28", text: "KART", category: "syllable", level: "hard", grade: "grade3" },
    { id: "s29", text: "YURT", category: "syllable", level: "hard", grade: "grade3" },

    // 4. Sınıf / Seviye 4 (İleri Düzey Heceler)
    { id: "s30", text: "KENT", category: "syllable", level: "hard", grade: "grade4" },
    { id: "s31", text: "DERT", category: "syllable", level: "hard", grade: "grade4" },
    { id: "s32", text: "RENK", category: "syllable", level: "hard", grade: "grade4" },
    { id: "s33", text: "SEVK", category: "syllable", level: "hard", grade: "grade4" },
    { id: "s34", text: "ZENG", category: "syllable", level: "hard", grade: "grade4" },
    { id: "s35", text: "DİNÇ", category: "syllable", level: "hard", grade: "grade4" },
    { id: "s36", text: "GENÇ", category: "syllable", level: "hard", grade: "grade4" },
  ],
  words: [
    // 1. Sınıf / Seviye 1 (2 Hece, Temel Kelimeler)
    { id: "w1", text: "Kedi", category: "word", level: "easy", grade: "grade1" },
    { id: "w2", text: "Elma", category: "word", level: "easy", grade: "grade1" },
    { id: "w3", text: "Anne", category: "word", level: "easy", grade: "grade1" },
    { id: "w4", text: "Baba", category: "word", level: "easy", grade: "grade1" },
    { id: "w5", text: "Okul", category: "word", level: "easy", grade: "grade1" },
    { id: "w6", text: "Kuzu", category: "word", level: "easy", grade: "grade1" },
    { id: "w7", text: "Masa", category: "word", level: "easy", grade: "grade1" },
    { id: "w8", text: "Kapı", category: "word", level: "easy", grade: "grade1" },
    { id: "w9", text: "Güneş", category: "word", level: "easy", grade: "grade1" },
    { id: "w10", text: "Kalem", category: "word", level: "easy", grade: "grade1" },
    { id: "w11", text: "Silgi", category: "word", level: "easy", grade: "grade1" },
    { id: "w12", text: "Ağaç", category: "word", level: "easy", grade: "grade1" },

    // 2. Sınıf / Seviye 2 (2-3 Hece)
    { id: "w13", text: "Kitap", category: "word", level: "medium", grade: "grade2" },
    { id: "w14", text: "Deniz", category: "word", level: "medium", grade: "grade2" },
    { id: "w15", text: "Orman", category: "word", level: "medium", grade: "grade2" },
    { id: "w16", text: "Yıldız", category: "word", level: "medium", grade: "grade2" },
    { id: "w17", text: "Balık", category: "word", level: "medium", grade: "grade2" },
    { id: "w18", text: "Sincap", category: "word", level: "medium", grade: "grade2" },
    { id: "w19", text: "Tavşan", category: "word", level: "medium", grade: "grade2" },
    { id: "w20", text: "Çiçek", category: "word", level: "medium", grade: "grade2" },
    { id: "w21", text: "Rüzgar", category: "word", level: "medium", grade: "grade2" },
    { id: "w22", text: "Bulut", category: "word", level: "medium", grade: "grade2" },
    { id: "w23", text: "Yağmur", category: "word", level: "medium", grade: "grade2" },
    { id: "w24", text: "Toprak", category: "word", level: "medium", grade: "grade2" },

    // 3. Sınıf / Seviye 3 (3 Hece)
    { id: "w25", text: "Kelebek", category: "word", level: "hard", grade: "grade3" },
    { id: "w26", text: "Papatya", category: "word", level: "hard", grade: "grade3" },
    { id: "w27", text: "Arkadaş", category: "word", level: "hard", grade: "grade3" },
    { id: "w28", text: "Çalışkan", category: "word", level: "hard", grade: "grade3" },
    { id: "w29", text: "Öğretmen", category: "word", level: "hard", grade: "grade3" },
    { id: "w30", text: "Kitaplık", category: "word", level: "hard", grade: "grade3" },
    { id: "w31", text: "Gezegen", category: "word", level: "hard", grade: "grade3" },
    { id: "w32", text: "Çağlayan", category: "word", level: "hard", grade: "grade3" },
    { id: "w33", text: "Pencere", category: "word", level: "hard", grade: "grade3" },
    { id: "w34", text: "Merdiven", category: "word", level: "hard", grade: "grade3" },
    { id: "w35", text: "Kahraman", category: "word", level: "hard", grade: "grade3" },
    { id: "w36", text: "Mutluluk", category: "word", level: "hard", grade: "grade3" },

    // 4. Sınıf / Seviye 4 (4+ Hece, Bileşik ve Zengin Kelimeler)
    { id: "w37", text: "Gökkuşağı", category: "word", level: "hard", grade: "grade4" },
    { id: "w38", text: "Denizaltı", category: "word", level: "hard", grade: "grade4" },
    { id: "w39", text: "Bilgisayar", category: "word", level: "hard", grade: "grade4" },
    { id: "w40", text: "Yardımlaşma", category: "word", level: "hard", grade: "grade4" },
    { id: "w41", text: "Kaplumbağa", category: "word", level: "hard", grade: "grade4" },
    { id: "w42", text: "Cumhuriyet", category: "word", level: "hard", grade: "grade4" },
    { id: "w43", text: "Kütüphane", category: "word", level: "hard", grade: "grade4" },
    { id: "w44", text: "Sorumluluk", category: "word", level: "hard", grade: "grade4" },
    { id: "w45", text: "Hayalperest", category: "word", level: "hard", grade: "grade4" },
    { id: "w46", text: "Astronot", category: "word", level: "hard", grade: "grade4" },
    { id: "w47", text: "Fedakarlık", category: "word", level: "hard", grade: "grade4" },
    { id: "w48", text: "İyiliksever", category: "word", level: "hard", grade: "grade4" },
  ],
  sentences: [
    { id: "e1", text: "Güneş doğdu.", category: "sentence", level: "easy", grade: "grade1" },
    { id: "e2", text: "Kuşlar neşeyle uçuyor.", category: "sentence", level: "easy", grade: "grade1" },
    { id: "e3", text: "Minik kedi sütünü içti.", category: "sentence", level: "easy", grade: "grade1" },
    { id: "e4", text: "Bahçede çiçekler açtı.", category: "sentence", level: "easy", grade: "grade1" },
    { id: "e5", text: "Ali yeni bir kitap açtı.", category: "sentence", level: "medium", grade: "grade2" },
    { id: "e6", text: "Gökyüzünde beyaz bulutlar süzülüyor.", category: "sentence", level: "medium", grade: "grade2" },
    { id: "e7", text: "Deniz kıyısında renkli taşlar topladık.", category: "sentence", level: "medium", grade: "grade2" },
    { id: "e8", text: "Akıllı sincap fındığı ağacın kovuğuna sakladı.", category: "sentence", level: "medium", grade: "grade2" },
    { id: "e9", text: "Yağmur dindikten sonra parlak bir gökkuşağı çıktı.", category: "sentence", level: "hard", grade: "grade3" },
    { id: "e10", text: "Kitap okumak bizi bilmediğimiz diyarlara götürür.", category: "sentence", level: "hard", grade: "grade3" },
    { id: "e11", text: "Yıldızlar geceleyin gökyüzünü bir elmas gibi süsler.", category: "sentence", level: "hard", grade: "grade3" },
    { id: "e12", text: "Arkadaşlarıyla iş birliği yapan karıncalar kışa hazırlandı.", category: "sentence", level: "hard", grade: "grade3" },
    { id: "e13", text: "Düzenli kitap okumak hayal gücümüzü ve kelime dağarcığımızı zenginleştirir.", category: "sentence", level: "hard", grade: "grade4" },
    { id: "e14", text: "Uzay araştırmaları sayesinde gezegenlerin gizemli sırlarını keşfediyoruz.", category: "sentence", level: "hard", grade: "grade4" },
    { id: "e15", text: "Ormanlar dünyamızın oksijen kaynağıdır ve onları özenle korumalıyız.", category: "sentence", level: "hard", grade: "grade4" },
    { id: "e16", text: "Tarihi eserler geçmiş medeniyetlerin bize bıraktığı en değerli mirastır.", category: "sentence", level: "hard", grade: "grade4" },
  ],
  stories: [
    { id: "st1", text: "Bir varmış bir yokmuş.", category: "story", level: "easy", grade: "grade1" },
    { id: "st2", text: "Kurnaz tilki ile sevimli leylek ormanda buluşmuş.", category: "story", level: "easy", grade: "grade1" },
    { id: "st3", text: "Minik serçe kanat çırparak gökyüzüne yükselmiş.", category: "story", level: "easy", grade: "grade1" },
    { id: "st4", text: "Kaplumbağa azimle ve sabırla hedefine yürümüş.", category: "story", level: "medium", grade: "grade2" },
    { id: "st5", text: "Hızlı koşan tavşan gururlanıp bir ağacın gölgesinde uyuyakalmış.", category: "story", level: "medium", grade: "grade2" },
    { id: "st6", text: "Karınca yaz boyu çalışarak kış için buğday taneleri depolamış.", category: "story", level: "medium", grade: "grade2" },
    { id: "st7", text: "Ağustos böceği saz çalıp şarkı söylerken zaman su gibi akmış.", category: "story", level: "medium", grade: "grade2" },
    { id: "st8", text: "Nasreddin Hoca göle maya çalarken köylüler merakla izlemiş.", category: "story", level: "hard", grade: "grade3" },
    { id: "st9", text: "Hoca gülümseyerek: Ya tutarsa demiş!", category: "story", level: "hard", grade: "grade3" },
    { id: "st10", text: "Dede Korkut eline kopuzunu alıp yiğitlerin destanını söylemiş.", category: "story", level: "hard", grade: "grade3" },
    { id: "st11", text: "Küçük Prens gezegeninde tek başına yaşayan çiçeğini çok özlemiş.", category: "story", level: "hard", grade: "grade3" },
    { id: "st12", text: "Birlikten kuvvet doğar, el ele veren karıncalar kışı bollukla geçirmiş.", category: "story", level: "hard", grade: "grade4" },
    { id: "st13", text: "Bilim insanları merak duygusu sayesinde en karmaşık problemleri çözerler.", category: "story", level: "hard", grade: "grade4" },
    { id: "st14", text: "Kitapların rehberliğinde büyüyen bir çocuk dünyayı daha aydınlık görür.", category: "story", level: "hard", grade: "grade4" },
  ],
};
