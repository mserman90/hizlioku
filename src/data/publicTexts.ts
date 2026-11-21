/**
 * Public domain and educational open-source sample texts with comprehension questions.
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
  category?: string;
  wordCount: number;
  content: string;
  questions: ComprehensionQuestion[];
}

export const PUBLIC_TEXTS: PublicTextItem[] = [
  {
    id: "fable-1",
    title: "Kaplumbağa ile Tavşan (Ezop)",
    author: "Ezop Masalları (Kamu Malı)",
    category: "Masal & Felsefe",
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
    category: "Bilim & Teknoloji",
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
  {
    id: "neuro-1",
    title: "Beynin Süper Gücü: Nöroplastisite",
    author: "Bilişsel Bilim Serisi (Açık Kaynak)",
    category: "Bilim & Teknoloji",
    wordCount: 135,
    content:
      "İnsan beyni durağan bir organ değildir; aksine yaşam boyu yeni deneyimlerle kendi sinirsel bağlantılarını yeniden yapılandırabilir. Bu biyolojik esnekliğe 'nöroplastisite' adı verilir. Hızlı okuma antrenmanları yaptığımızda, beynin görsel korteksi ile dil işleme merkezleri arasındaki sinir yolları güçlenir. İlk başlarda zorlayıcı gelen kelime öbeklerini tanıma ve iç sesi bastırma pratiği, düzenli egzersizle otomatikleşir. Nörobilimsel araştırmalar, her gün yapılan 15 dakikalık bilinçli odaklanma egzersizinin, beynin dikkat ve kavrama devrelerinde kalıcı olumlu yapısal değişimler meydana getirdiğini göstermektedir.",
    questions: [
      {
        id: "q1",
        question: "Beynin yaşam boyu sinirsel bağlantılarını yeniden yapılandırabilme özelliğine ne ad verilir?",
        options: ["Nöroplastisite", "Fiksasyon", "Miyelinasyon", "Sakkad"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Hızlı okuma antrenmanları beynin hangi bölgeleri arasındaki bağı güçlendirir?",
        options: [
          "Görsel korteks ile dil işleme merkezleri",
          "İşitme korteksi ile motor merkez",
          "Denge merkezi ile omurilik",
          "Koku soğancığı ile hafıza",
        ],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "Metne göre beyinde kalıcı olumlu değişim için önerilen günlük süre nedir?",
        options: ["15 dakika", "60 dakika", "5 dakika", "3 saat"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "history-1",
    title: "Tarihin Sıfır Noktası: Göbeklitepe",
    author: "Arkeoloji ve Medeniyet Tarihi (Kamu Malı)",
    category: "Tarih & Medeniyet",
    wordCount: 138,
    content:
      "Şanlıurfa yakınlarında yer alan Göbeklitepe, günümüzden yaklaşık 12.000 yıl öncesine, yani Çanak Çömleksiz Neolitik Çağ'a tarihlenmektedir. Boyları 6 metreyi, ağırlıkları 20 tonu bulan T biçimli anıtsal kireçtaşı sütunlar, avcı-toplayıcı insanların henüz yerleşik tarım hayatına geçmeden önce devasa mimari yapılar inşa edebildiklerini kanıtlamıştır. Sütunların üzerinde aslan, boğa, turna ve yılan gibi hayvan kabartmaları ustalıkla işlenmiştir. Bu keşif, arkeoloji dünyasındaki 'önce tarım yerleşimi, sonra inanç merkezleri kuruldu' tezini kökünden sarsmış, insanlığın önce ortak inanç ve ritüeller etrafında bir araya geldiğini ortaya koymuştur.",
    questions: [
      {
        id: "q1",
        question: "Göbeklitepe yaklaşık kaç yıl öncesine tarihlenmektedir?",
        options: ["12.000 yıl öncesine", "5.000 yıl öncesine", "2.000 yıl öncesine", "50.000 yıl öncesine"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Göbeklitepe'deki anıtsal sütunların belirgin geometrik şekli nedir?",
        options: ["T biçimli", "Yuvarlak silindir", "Piramidal", "Kare prizma"],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "Göbeklitepe'nin arkeoloji tarihindeki en büyük ezber bozan yönü nedir?",
        options: [
          "Tarım toplumundan önce ortak inanç ve anıtsal yapıların kurulduğunu göstermesi",
          "Demir madeninin ilk kez kullanıldığını kanıtlaması",
          "Yazının burada icat edildiğini göstermesi",
          "Denizcilik faaliyetlerini belgelemesi",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "philosophy-1",
    title: "Sokrates ve Bilgeliğin Başlangıcı",
    author: "Antik Felsefe Klasikleri (Kamu Malı)",
    category: "Masal & Felsefe",
    wordCount: 122,
    content:
      "Antik Atina'nın sokaklarında çıplak ayakla dolaşan düşünür Sokrates, yurttaşlarına hiçbir hazır bilgi vermez; onlara doğru soruları sorarak zihinlerindeki hakikati doğurtmaya çalışırdı. Bu yönteme 'maiotik' yani düşünce ebeligi adı verilirdi. Delphi tapınağındaki kahinlerin kendisini yaşayan en bilge insan ilan ettiğini duyduğunda Sokrates şaşırmış ve bunun sırrını araştırmıştır. Sonunda şu sonuca varmıştır: Diğer insanlar hiçbir şey bilmedikleri halde bildiklerini zannederken, Sokrates en azından bilmediğinin farkındaydı. 'Bildiğim tek şey hiçbir şey bilmediğimdir' sözü, hakiki öğrenmenin ve sorgulayan aklın başlangıç noktasıdır.",
    questions: [
      {
        id: "q1",
        question: "Sokrates'in soru sorarak hakikati buldurma yöntemine ne ad verilir?",
        options: ["Maiotik (Düşünce ebeliği)", "Retorik", "Diyalektik materyalizm", "Sofizm"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Sokrates'i diğer insanlardan bilge kılan temel fark nedir?",
        options: [
          "Bilmediğinin farkında olması ve kibrinden arınması",
          "En çok kitap okuyan kişi olması",
          "Büyük bir orduya komutanlık etmesi",
          "Zengin bir filozof olması",
        ],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "Metne göre hakiki öğrenmenin başlangıcı nedir?",
        options: [
          "Kendi cehaletini ve sınırlarını dürüstçe kabul etmek",
          "Her şeyi ezberlemek",
          "Yalnızca öğretmenleri dinlemek",
          "Hiçbir soru sormamak",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "space-1",
    title: "James Webb ve Evrenin İlk Işıkları",
    author: "Modern Astronomi Derlemesi (Açık Kaynak)",
    category: "Bilim & Teknoloji",
    wordCount: 130,
    content:
      "Dünya'dan 1.5 milyon kilometre uzaktaki Lagrange-2 noktasında görev yapan James Webb Uzay Teleskobu, insanlığın gökyüzüne açılan en keskin kızılötesi gözüdür. Altın kaplamalı berilyum aynaları ve tenis kortu büyüklüğündeki devasa güneş kalkanı sayesinde Webb, Büyük Patlama'dan yalnızca birkaç yüz milyon yıl sonra parıldayan ilk galaksilerin solgun ışıklarını yakalayabilmektedir. Işık sonlu bir hızla ilerlediği için, uzayın derinliklerine bakmak aslında zamanda geriye bakmak anlamına gelir. Webb'in topladığı veriler, yıldızların doğum süreçlerini, ötegezegenlerin atmosferindeki su buharı ve molekülleri daha önce hiç görülmemiş bir netlikte incelememizi sağlamaktadır.",
    questions: [
      {
        id: "q1",
        question: "James Webb Teleskobu uzayın hangi spektrumunda gözlem yapmaktadır?",
        options: ["Kızılötesi (Infrared)", "X-ışınları", "Radyo dalgaları", "Gama ışınları"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Astronomide uzayın derinliklerine bakmak neden zamanda geriye bakmak demektir?",
        options: [
          "Işığın sonlu bir hızda hareket etmesi ve uzak mesafelerden gelmesinin zaman alması",
          "Teleskobun zaman makinesi donanımı içermesi",
          "Gezegenlerin geriye doğru dönmesi",
          "Uzayda yerçekiminin olmaması",
        ],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "James Webb Teleskobu Dünya'dan yaklaşık ne kadar uzaklıktadır?",
        options: ["1.5 milyon kilometre", "384 bin kilometre", "150 milyon kilometre", "40 bin kilometre"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "folklore-1",
    title: "Nasreddin Hoca ve Kazanın Doğurması",
    author: "Türk Halk Edebiyatı (Kamu Malı)",
    category: "Edebiyat",
    wordCount: 125,
    content:
      "Nasreddin Hoca bir gün komşusundan büyük bir bakır kazan ödünç almış. İşini bitirince kazanın içine küçük bir tencere koyarak komşusuna iade etmiş. Komşusu küçük tencereyi görünce şaşkınlıkla: 'Hoca Efendi, bu nedir?' diye sormuş. Hoca gayet sakin bir ifadeyle: 'Müjde komşu, senin kazan bizdeyken doğurdu!' demiş. Komşu sevinçle her iki kabı da sahiplenmiş. Bir süre sonra Hoca kazanı yine istemiş. Komşu bu kez seve seve vermiş. Ancak aradan haftalar geçtiği halde kazan geri gelmeyince komşu Hoca'nın kapısını çalmış. Hoca üzgün bir sesle: 'Başın sağ olsun komşu, senin kazan öldü' demiş. Komşu öfkeyle: 'Yahu Hoca, hiç kazan ölür mü?' deyince Hoca taşı gediğine koymuş: 'Kazanın doğurduğuna inanıyordun da öldüğüne neden inanmıyorsun?'",
    questions: [
      {
        id: "q1",
        question: "Nasreddin Hoca komşusuna ilk seferinde kazanın yanında ne vermiştir?",
        options: ["Küçük bir tencere", "Bir tabak helva", "Altın para", "Gümüş kaşık"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Komşu kazanın öldüğünü duyunca ne tepki vermiştir?",
        options: [
          "Öfkelenerek kazanın ölemeyeceğini söylemiştir",
          "Ağlamaya başlamıştır",
          "Hemen kabullenmiştir",
          "Yeni bir kazan istemiştir",
        ],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "Fıkradaki temel mizahi ve felsefi eleştiri nedir?",
        options: [
          "İnsanların kendi çıkarlarına gelen saçmalıklara inanıp, çıkarlarına ters düşen gerçeği reddetmeleri",
          "Bakır kapların kalitesizliği",
          "Komşuluk ilişkilerinin gereksizliği",
          "Kazanların bakımı",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "epic-1",
    title: "Dede Korkut: Boğaç Han'ın Ad Alışı",
    author: "Klasik Türk Destanları (Kamu Malı)",
    category: "Edebiyat",
    wordCount: 142,
    content:
      "Bayındır Han'ın toyunda azgın ve güçlü bir boğa meydana salınmıştı. Sert adımlarla yeri göğü inleten boğanın karşısına kimse çıkmaya cesaret edemiyordu. O sırada Dirse Han'ın on beş yaşındaki yiğit oğlu meydana girdi. Boğa hızla üzerine hücum ettiğinde genç çocuk yumruğunu boğanın alnına dayadı ve var gücüyle direndi. Çocukla boğa uzun süre kıyasıya çekişti. Sonunda genç yiğit bir adım geri çekilip hamle yapınca dengesini kaybeden boğa yere yıkıldı. Meydandaki beyler ve ozanlar çocuğu alkışladı. Dede Korkut gelip boy boyladı, soy soyladı ve şöyle dedi: 'Bu oğlan bir boğayı yere vurdu, adı Boğaç olsun; boyunu aşsın, yaşı uzun olsun!' Eski Türk töresinde hiçbir yiğide emek vermeden ve hüner göstermeden ad konulmazdı.",
    questions: [
      {
        id: "q1",
        question: "Genç çocuğa Boğaç Han adını kim vermiştir?",
        options: ["Dede Korkut", "Bayındır Han", "Dirse Han", "Korkut Ata'nın eşi"],
        correctIndex: 0,
      },
      {
        id: "q2",
        question: "Boğaç Han meydandaki boğayı nasıl yenmiştir?",
        options: [
          "Yumruğunu alnına dayayıp direnerek ve dengesini bozarak",
          "Kılıçla vurarak",
          "Ok atarak",
          "Kement atarak",
        ],
        correctIndex: 0,
      },
      {
        id: "q3",
        question: "Metne göre eski Türk töresinde isim verme kuralı neydi?",
        options: [
          "Emek vermeden ve kahramanlık göstermeden isim konulmazdı",
          "İsimler doğum gününe göre verilirdi",
          "Herkes babasının adını alırdı",
          "Kahinler rüyaya göre isim belirlerdi",
        ],
        correctIndex: 0,
      },
    ],
  },
];
