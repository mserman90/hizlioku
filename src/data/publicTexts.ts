/**
 * Public domain sample texts with comprehension questions
 * Strictly no copyrighted modern material is bundled.
 */

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface PublicTextItem {
  id: string;
  title: string;
  author: string;
  wordCount: number;
  content: string;
  questions: ComprehensionQuestion[];
}

export const PUBLIC_TEXTS: PublicTextItem[] = [
  {
    id: "fable-1",
    title: "Kaplumbağa ile Tavşan (Ezop)",
    author: "Ezop Masalları (Kamu Malı)",
    wordCount: 88,
    content:
      "Bir zamanlar kendisinin çok hızlı koştuğunu söyleyen kibirli bir tavşan varmış. Yavaş yürüyen kaplumbağayla sürekli alay edermiş. Bir gün kaplumbağa tavşana bir yarış teklif etmiş. Tavşan gülerek kabul etmiş. Yarış başladığında tavşan hızla öne geçmiş ve o kadar rahatmış ki bir ağacın gölgesinde uyuyakalmış. Ağır ama kararlı adımlarla durmadan yürüyen kaplumbağa, uyuyan tavşanı geçmiş ve bitiş çizgisine ilk varan olmuş. Azim ve sabır, dikkatsiz hızı mağlup etmiştir.",
    questions: [
      {
        id: "q1",
        question: "Tavşan neyiyle övünmekteydi?",
        options: ["Hızlı koşmasıyla", "Güzel tüyleriyle", "Zekasıyla", "Gücüyle"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Tavşan yarış esnasında neden durdu?",
        options: ["Ağacın gölgesinde uyuyakaldı", "Yolu kaybetti", "Yemek aradı", "Geri dönmeye karar verdi"],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "Bu hikayenin ana fikri nedir?",
        options: [
          "Hızlı olmak her zaman kazanmayı garantiler",
          "Azim ve istikrar dikkatsiz hızdan üstündür",
          "Yarış yapmak gereksizdir",
          "Uyku sağlık için en önemli şeydir",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "science-1",
    title: "Göz Hareketi ve Okuma Bilimi",
    author: "Eğitim Metni (Kamu Malı / Açık Kaynak)",
    wordCount: 114,
    content:
      "Geleneksel okuma sırasında gözlerimiz satırlar üzerinde sürekli kaymaz; bunun yerine 'saccade' adı verilen hızlı sıçramalar ve duraksamalar yapar. Her duraksamada göz bir veya birkaç kelimeyi odaklar. Yapılan bilimsel deneyler, okuma hızının büyük ölçüde bu sıçramalar ve iç seslendirme alışkanlığı tarafından sınırlandığını ortaya koymuştur. RSVP yöntemi, kelimeleri ekranda tam odak noktasına getirerek gözün sağa sola sıçrama ihtiyacını azaltır. Bu sayede okuyucu, göz kaslarını daha az yorarak bilgiyi daha süratli ve odaklı şekilde işleme fırsatı bulur.",
    questions: [
      {
        id: "q1",
        question: "Gözlerin satır üzerindeki hızlı sıçrama hareketine ne ad verilir?",
        options: ["Saccade", "Fiksasyon", "RSVP", "ORP"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Geleneksel okuma hızını en çok sınırlandıran faktörlerden biri nedir?",
        options: [
          "Gözün sıçrama hareketi ve iç seslendirme",
          "Işığın parlaklığı",
          "Yazının rengi",
          "Kitabın sayfa sayısı",
        ],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "RSVP yönteminin temel faydası nedir?",
        options: [
          "Gözün sıçrama hareketlerini ve kas yorgunluğunu azaltmak",
          "Kitap sayfalarını çevirmeyi kolaylaştırmak",
          "Bütün kelimeleri ezberletmek",
          "Gözlük ihtiyacını tamamen ortadan kaldırmak",
        ],
        correctIndex: 0,
      },
    ],
  },
];
