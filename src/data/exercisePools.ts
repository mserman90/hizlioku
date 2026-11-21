/**
 * Rich exercise content pools with procedural generation and dynamic shuffling.
 * Ensures adult and child training modules present varied, fresh examples on every run.
 */

export interface PyramidRow {
  left: string;
  right: string;
}

export interface PyramidTheme {
  id: string;
  name: string;
  rows: PyramidRow[];
}

export const PYRAMID_THEMES: PyramidTheme[] = [
  {
    id: "cognitive",
    name: "Bilişsel & Okuma Bilimi",
    rows: [
      { left: "ak", right: "ıl" },
      { left: "göz", right: "kas" },
      { left: "hız", right: "lı" },
      { left: "odak", right: "lama" },
      { left: "bilim", right: "insan" },
      { left: "kelime", right: "öbeği" },
      { left: "düşünce", right: "algısı" },
      { left: "bilişsel", right: "kapasite" },
      { left: "genişleyen", right: "bakışlar" },
      { left: "foveal odak", right: "merkezde" },
      { left: "okuma temposu", right: "yükselecek" },
      { left: "zihniniz bütünü", right: "anında kavrar" },
      { left: "periferik görme", right: "alanı ikiye katlar" },
    ],
  },
  {
    id: "science",
    name: "Evren & Doğa Bilimleri",
    rows: [
      { left: "ay", right: "ış" },
      { left: "gök", right: "yüz" },
      { left: "ışık", right: "yılı" },
      { left: "uzay", right: "çağı" },
      { left: "atom", right: "çekirdek" },
      { left: "kuantum", right: "alanı" },
      { left: "galaksi", right: "kümesi" },
      { left: "derin mavi", right: "okyanuslar" },
      { left: "yıldızların", right: "ötesinde" },
      { left: "yerçekimsel", right: "kuvvetler" },
      { left: "zaman bükülmesi", right: "gözlemlendi" },
      { left: "sonsuz uzayın", right: "parıltılı derinliği" },
      { left: "kara deliklerin", right: "çekimsel gizemleri" },
    ],
  },
  {
    id: "literature",
    name: "Edebiyat & Felsefe",
    rows: [
      { left: "öz", right: "lem" },
      { left: "söz", right: "cük" },
      { left: "şiir", right: "dolu" },
      { left: "roman", right: "akışı" },
      { left: "sanat", right: "ruhu" },
      { left: "felsefe", right: "ışığı" },
      { left: "anlamlı", right: "cümleler" },
      { left: "hakikatin", right: "peşinde" },
      { left: "kitapların", right: "sayfaları" },
      { left: "hayal gücünün", right: "kanatları" },
      { left: "bilgelik dolu", right: "öğretiler" },
      { left: "zamanı aşan ulu", right: "klasik eserler" },
      { left: "kelimelerin derin", right: "büyülü dünyasında" },
    ],
  },
  {
    id: "technology",
    name: "Teknoloji & Gelecek",
    rows: [
      { left: "veri", right: "taban" },
      { left: "kod", right: "blok" },
      { left: "siber", right: "ağlar" },
      { left: "algı", right: "layıcı" },
      { left: "yapay", right: "zeka" },
      { left: "dijital", right: "dönüşüm" },
      { left: "makine", right: "öğrenimi" },
      { left: "bulut bilişim", right: "sistemleri" },
      { left: "hızlı işlemci", right: "mimarisi" },
      { left: "otonom araçlar", right: "yollarda" },
      { left: "büyük veri analizi", right: "başarılı" },
      { left: "siber güvenlik katmanı", right: "koruma altında" },
      { left: "sinirsel ağ modelleri", right: "sürekli öğreniyor" },
    ],
  },
  {
    id: "nature",
    name: "Orman & Ekoloji",
    rows: [
      { left: "su", right: "dam" },
      { left: "dal", right: "yap" },
      { left: "yeşil", right: "orman" },
      { left: "pınar", right: "başı" },
      { left: "toprak", right: "kokusu" },
      { left: "canlılar", right: "dünyası" },
      { left: "yağmurun", right: "sesinde" },
      { left: "kuş sesleri", right: "yankılanır" },
      { left: "yüksek karlı", right: "zirveler" },
      { left: "çağlayan sular", right: "coşkuyla akar" },
      { left: "doğanın dengesi", right: "korunmalıdır" },
      { left: "asırlık çınarların", right: "gölgeleri altında" },
      { left: "biyolojik çeşitlilik", right: "gezegenin zenginliğidir" },
    ],
  },
];

/**
 * Procedural Dynamic Pyramid Generator
 * Generates expanding rows randomly from modular word pairs
 */
export function generateRandomPyramid(): PyramidRow[] {
  const shortPairs = [
    { left: "ak", right: "ıl" },
    { left: "ay", right: "ış" },
    { left: "su", right: "yol" },
    { left: "öz", right: "gür" },
    { left: "el", right: "ele" },
  ];
  const mid1Pairs = [
    { left: "göz", right: "kas" },
    { left: "gök", right: "yüz" },
    { left: "ses", right: "ton" },
    { left: "gün", right: "ışık" },
    { left: "yol", right: "boyu" },
  ];
  const mid2Pairs = [
    { left: "hız", right: "lı" },
    { left: "bil", right: "gi" },
    { left: "odak", right: "nok" },
    { left: "söz", right: "cük" },
    { left: "adım", right: "adım" },
  ];
  const mid3Pairs = [
    { left: "odak", right: "lama" },
    { left: "uzay", right: "çağı" },
    { left: "roman", right: "ucu" },
    { left: "ışık", right: "hızı" },
    { left: "pınar", right: "gözü" },
  ];
  const mid4Pairs = [
    { left: "bilim", right: "insan" },
    { left: "kuşak", right: "farkı" },
    { left: "sanat", right: "ruhu" },
    { left: "toprak", right: "canı" },
    { left: "yapay", right: "zeka" },
  ];
  const mid5Pairs = [
    { left: "kelime", right: "öbeği" },
    { left: "kuantum", right: "alanı" },
    { left: "felsefe", right: "ışığı" },
    { left: "canlılar", right: "bağı" },
    { left: "dijital", right: "adım" },
  ];
  const long1Pairs = [
    { left: "düşünce", right: "algısı" },
    { left: "galaksi", right: "kümesi" },
    { left: "anlamlı", right: "sözler" },
    { left: "yağmurun", right: "ritmi" },
    { left: "makine", right: "gücü" },
  ];
  const long2Pairs = [
    { left: "bilişsel", right: "kapasite" },
    { left: "derin mavi", right: "okyanuslar" },
    { left: "hakikatin", right: "izinde" },
    { left: "kuş sesleri", right: "yankılanır" },
    { left: "bulut bilişim", right: "ağları" },
  ];
  const long3Pairs = [
    { left: "genişleyen", right: "bakışlar" },
    { left: "yıldızların", right: "ışığında" },
    { left: "kitapların", right: "sayfaları" },
    { left: "yüksek karlı", right: "dağlar" },
    { left: "hızlı işlemci", right: "mimarisi" },
  ];
  const broad1Pairs = [
    { left: "foveal odak", right: "merkezde" },
    { left: "yerçekimsel", right: "kuvvetler" },
    { left: "hayal gücünün", right: "kanatları" },
    { left: "çağlayan sular", right: "coşkuyla akar" },
    { left: "otonom araçlar", right: "yollarda" },
  ];
  const broad2Pairs = [
    { left: "okuma temposu", right: "yükselecek" },
    { left: "zaman bükülmesi", right: "gözlemlendi" },
    { left: "bilgelik dolu", right: "öğretiler" },
    { left: "doğanın dengesi", right: "korunmalıdır" },
    { left: "büyük veri analizi", right: "başarılı" },
  ];
  const wide1Pairs = [
    { left: "zihniniz bütünü", right: "anında kavrar" },
    { left: "sonsuz uzayın", right: "parıltılı derinliği" },
    { left: "zamanı aşan ulu", right: "klasik eserler" },
    { left: "asırlık çınarların", right: "gölgeleri altında" },
    { left: "siber güvenlik katmanı", right: "koruma altında" },
  ];
  const wide2Pairs = [
    { left: "periferik görme", right: "alanı ikiye katlar" },
    { left: "kara deliklerin", right: "çekimsel gizemleri" },
    { left: "kelimelerin derin", right: "büyülü dünyasında" },
    { left: "biyolojik çeşitlilik", right: "gezegenin zenginliğidir" },
    { left: "sinirsel ağ modelleri", right: "sürekli öğreniyor" },
  ];

  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  return [
    pick(shortPairs),
    pick(mid1Pairs),
    pick(mid2Pairs),
    pick(mid3Pairs),
    pick(mid4Pairs),
    pick(mid5Pairs),
    pick(long1Pairs),
    pick(long2Pairs),
    pick(long3Pairs),
    pick(broad1Pairs),
    pick(broad2Pairs),
    pick(wide1Pairs),
    pick(wide2Pairs),
  ];
}

/**
 * Tachistoscope expanded flash items (60+ items with Turkish distractor options)
 */
export interface FlashItem {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export const TACHISTOSCOPE_EXPANDED_BANK: { prompt: string; distractors: string[] }[] = [
  // 1-2 Hece (Kısa)
  { prompt: "odak", distractors: ["ortak", "ocak", "orak"] },
  { prompt: "bilgi", distractors: ["bilim", "belge", "bölge"] },
  { prompt: "sürat", distractors: ["suret", "sırat", "sürüm"] },
  { prompt: "kavram", distractors: ["kıvram", "kavruk", "kervan"] },
  { prompt: "zihin", distractors: ["zemin", "zaman", "zehir"] },
  { prompt: "hafıza", distractors: ["havza", "harita", "hazine"] },
  { prompt: "ışık", distractors: ["ılık", "eşik", "aşık"] },
  { prompt: "sıçrama", distractors: ["sıvama", "sıçan", "sığma"] },
  { prompt: "hedef", distractors: ["sedef", "kadeh", "telef"] },
  { prompt: "gözlem", distractors: ["özlem", "görkem", "gözlük"] },
  { prompt: "tempo", distractors: ["tampo", "torba", "termo"] },
  { prompt: "ritim", distractors: ["resim", "yitim", "iklim"] },
  { prompt: "bakış", distractors: ["nakış", "akış", "yakış"] },
  { prompt: "metin", distractors: ["çetin", "kesin", "derin"] },
  { prompt: "sezgi", distractors: ["sevgi", "sergi", "silgi"] },

  // 3-4 Hece (Orta & İleri)
  { prompt: "fiksasyon", distractors: ["formasyon", "filtrasyon", "fraksiyon"] },
  { prompt: "periferik", distractors: ["periyodik", "politik", "pratik"] },
  { prompt: "kapasite", distractors: ["kalite", "kabin", "katkı"] },
  { prompt: "bilişsel", distractors: ["bölgesel", "bilimsel", "bireysel"] },
  { prompt: "algılama", distractors: ["uygulama", "ayrılma", "avlama"] },
  { prompt: "optimizasyon", distractors: ["organizasyon", "oryantasyon", "operasyon"] },
  { prompt: "öbekleme", distractors: ["bebekleme", "öbekleniş", "etekleme"] },
  { prompt: "konsantre", distractors: ["kontrast", "konferans", "konsept"] },
  { prompt: "nörolojik", distractors: ["biyolojik", "psikolojik", "kronolojik"] },
  { prompt: "sakkadik", distractors: ["statik", "semantik", "sentetik"] },
  { prompt: "akıcılık", distractors: ["alıcılık", "açıklık", "akılcılık"] },
  { prompt: "heceleme", distractors: ["geceleme", "yineleme", "erteleme"] },
  { prompt: "derinlemesine", distractors: ["ilerlemesine", "genişlemesine", "kesinlemesine"] },
  { prompt: "disleksi", distractors: ["diyalekt", "diyaliz", "direktif"] },
  { prompt: "motivasyon", distractors: ["modülasyon", "mutasyon", "aktivasyon"] },

  // Kelime Grupları & İfadeler
  { prompt: "hızlı oku", distractors: ["hızlı koş", "kolay oku", "hızlı bak"] },
  { prompt: "geniş bak", distractors: ["yakın bak", "geniş gör", "hızlı bak"] },
  { prompt: "odakta kal", distractors: ["uzakta kal", "odakta ol", "ortada kal"] },
  { prompt: "iç sesi kes", distractors: ["iç sesi aç", "sesi kıs", "öz sesi duy"] },
  { prompt: "bütünsel gör", distractors: ["bölgesel gör", "bütünsel bak", "bireysel gör"] },
  { prompt: "satır sonu", distractors: ["satır başı", "sayfa sonu", "satır boyu"] },
  { prompt: "merkez nokta", distractors: ["merkez açı", "odak nokta", "orta çizgi"] },
  { prompt: "saniyede bin", distractors: ["dakikada bin", "saatte bin", "saniyede yüz"] },
  { prompt: "anında kavra", distractors: ["sonradan kavra", "anında anla", "adımda kavra"] },
  { prompt: "akıcı okuma", distractors: ["akıllı okuma", "hızlı okuma", "kalıcı okuma"] },
];

/**
 * Creates a randomized flash test set with shuffled option slots
 */
export function generateRandomTachistoscopeSet(count = 10): FlashItem[] {
  const shuffledBank = [...TACHISTOSCOPE_EXPANDED_BANK].sort(() => Math.random() - 0.5);
  const selected = shuffledBank.slice(0, Math.min(count, shuffledBank.length));

  return selected.map((item) => {
    // Collect correct prompt + 3 distractors
    const allOptions = [item.prompt, ...item.distractors.slice(0, 3)];
    // Shuffle options
    const shuffledOptions = [...allOptions].sort(() => Math.random() - 0.5);
    const correctIndex = shuffledOptions.indexOf(item.prompt);

    return {
      prompt: item.prompt,
      options: shuffledOptions,
      correctIndex,
    };
  });
}

/**
 * Zigzag & Saccade Patterns and Word Flash Items
 */
export interface ZigzagPattern {
  id: string;
  name: string;
  description: string;
  waypoints: { x: number; y: number }[];
}

export const ZIGZAG_PATTERNS: ZigzagPattern[] = [
  {
    id: "classic-zigzag",
    name: "Klasik Zigzag",
    description: "Ekranın solundan sağına zikzak sıçramalarla göz kaslarını esnetir.",
    waypoints: [
      { x: 10, y: 15 },
      { x: 90, y: 15 },
      { x: 10, y: 35 },
      { x: 90, y: 35 },
      { x: 10, y: 55 },
      { x: 90, y: 55 },
      { x: 10, y: 75 },
      { x: 90, y: 75 },
      { x: 50, y: 90 },
      { x: 50, y: 10 },
      { x: 10, y: 50 },
      { x: 90, y: 50 },
    ],
  },
  {
    id: "z-reading",
    name: "Z-Okuma Sakkadı",
    description: "Kitap okuma satır başı ve sonu sıçrama hareketlerini simüle eder.",
    waypoints: [
      { x: 15, y: 20 },
      { x: 85, y: 20 },
      { x: 15, y: 40 },
      { x: 85, y: 40 },
      { x: 15, y: 60 },
      { x: 85, y: 60 },
      { x: 15, y: 80 },
      { x: 85, y: 80 },
    ],
  },
  {
    id: "infinity",
    name: "Sonsuzluk / 8 Eğrisi",
    description: "Çift taraflı akıcı okülomotor koordinasyonu geliştirir.",
    waypoints: [
      { x: 50, y: 50 },
      { x: 75, y: 25 },
      { x: 90, y: 50 },
      { x: 75, y: 75 },
      { x: 50, y: 50 },
      { x: 25, y: 25 },
      { x: 10, y: 50 },
      { x: 25, y: 75 },
    ],
  },
  {
    id: "spiral",
    name: "Spiral Odak",
    description: "Dıştan merkeze daralan dairesel odaklanma egzersizi.",
    waypoints: [
      { x: 15, y: 15 },
      { x: 85, y: 15 },
      { x: 85, y: 85 },
      { x: 15, y: 85 },
      { x: 25, y: 30 },
      { x: 75, y: 30 },
      { x: 75, y: 70 },
      { x: 25, y: 70 },
      { x: 50, y: 50 },
    ],
  },
  {
    id: "random-saccade",
    name: "Rastgele Sıçrama",
    description: "Beklenmedik fiksasyon noktalarına anında odaklanma refleksi.",
    waypoints: [
      { x: 20, y: 30 },
      { x: 80, y: 70 },
      { x: 30, y: 80 },
      { x: 70, y: 20 },
      { x: 50, y: 50 },
      { x: 15, y: 60 },
      { x: 85, y: 40 },
      { x: 40, y: 15 },
      { x: 60, y: 85 },
      { x: 10, y: 15 },
    ],
  },
];

/**
 * Dynamic words/letters flashed at waypoint dots in Saccade exercise
 */
export const SACCADE_TARGET_WORDS = [
  "AK", "AL", "SU", "AY", "EL", "GÖZ", "HIZ", "IŞIK", "BİL", "YOL",
  "ODAK", "KAS", "SÖZ", "SES", "ADIM", "AN", "ZİHN", "GÖR", "BAK", "KAVRA",
  "A1", "B2", "C3", "D4", "E5", "F6", "X7", "Y8", "Z9", "K0"
];
