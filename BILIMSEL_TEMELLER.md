# HızlıOku — Bilişsel Okuma Bilimi, Pedagojik İlkeler ve Akademik Temeller

Bu belge; **HızlıOku** platformunun mimari, algoritmik ve pedagojik tasarımının dayandığı bilişsel psikoloji, nörodilbilim ve okuma bilimi (Science of Reading) literatürünü ayrıntılı olarak açıklamaktadır.

---

## 1. Giriş ve Kuramsal Çerçeve

Geleneksel okuma eylemi, gözün satırlar üzerinde kesintisiz ve pürüzsüz biçimde kaydığı bir süreç değildir. Okuma; gözün **fiksasyon** (duraklama), **sakkad** (hızlı sıçrama) ve **regresyon** (önceki kelimelere geri dönüş) evrelerinden oluşan karmaşık bir okülomotor (göz kası kontrolü) ve bilişsel bilgi işleme sürecidir (Rayner, 1998).

Ortalama bir yetişkin okuyucuda:
- Dakikadaki okuma hızı: **200 – 250 WPM (Words Per Minute)**
- Fiksasyon süresi: **200 – 250 ms**
- Sakkad süresi: **20 – 35 ms**
- Görsel açıklık (Visual Span / Foveal alan): Yalnızca **3 – 4 harf sola, 7 – 8 harf sağa** (sağdan sola diller hariç).
- Regresyon oranı: Okuma süresinin **%10 – %15'i** geriye dönük lüzumsuz sıçramalarla harcanır.

HızlıOku; yetişkinlerde okülomotor verimsizliği minimize etmeyi, çocuklarda ise fonolojik farkındalık ve ortografik haritalamayı desteklemeyi amaçlayan yaşa duyarlı çift yönlü bir mimari sunar.

---

## 2. Yetişkin Modülü: Bilişsel Temeller ve Algoritmik Tasarım

### 2.1. RSVP (Rapid Serial Visual Presentation) Paradigması
RSVP ilk olarak Forster (1970) ve Potter (1984) tarafından deneysel psikolojide kelime işleme dinamiklerini analiz etmek amacıyla geliştirilmiştir. Geleneksel metin formatında göz, satır başından satır sonuna kadar binlerce sakkadik sıçrama yapmak zorundadır. Bu durum okülomotor yorgunluğa (göz kası tükenmişliği) ve dikkat dağınıklığına yol açar.

**HızlıOku RSVP Yaklaşımı:**
- Kelimeler ekranda tek ve sabit bir koordinatta sunulur.
- Gözün sağa-sola sıçrama ihtiyacı ortadan kaldırılarak okülomotor enerji tasarrufu sağlanır.
- Okuma hızı $W$ (WPM) cinsinden belirlendiğinde, her bir kelime karesinin ekranda kalma süresi ($T_{ms}$) şu denklemle hesaplanır:
  $$T_{ms} = \left\lfloor \frac{60\,000}{W} \right\rfloor$$
  *Örneğin: 300 WPM hızda $T_{ms} = 200 \text{ ms}$; 600 WPM hızda $T_{ms} = 100 \text{ ms}$.*

### 2.2. ORP (Optimal Recognition Point / Optimum Tanıma Noktası)
Göz bir kelimeye odaklandığında, retinanın en keskin görüş sağlayan fovea merkezi kelimenin tam ortasına değil; kelime uzunluğuna bağlı olarak sol taraftan itibaren yaklaşık **%30 – %35'lik dilimine** denk geldiğinde kelime tanıma süresi en düşük düzeye iner (O'Regan, Lévy-Schoen, Pynte & Brulex, 1984; Rayner, 1979). Bu noktaya literatürde **ORP (Optimal Recognition Point)** adı verilir.

HızlıOku'da uygulanan deterministik ORP fonksiyonu:
```typescript
export function getOrpIndex(word: string): number {
  const len = word.length;
  if (len <= 1) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  if (len <= 13) return 3;
  return 4;
}
```
ORP harfi yüksek kontrastlı kırmızı/turuncu renkle işaretlenir ve üst-alt fiksasyon kılavuzları ile gözün doğrudan foveal merkezine hizalanır. Böylece okuyucunun kelime sınırlarını aramak için harcadığı mikro-fiksasyon gecikmeleri elenir.

### 2.3. İç Seslendirme (Subvocalization) ve Çalışma Belleği (Working Memory)
Alan Baddeley'in Çalışma Belleği Modeli'ne (Baddeley & Hitch, 1974) göre, okuma esnasında metin **Fonolojik Döngü** (Phonological Loop) üzerinden gırtlak ve iç ses kaslarıyla tekrar edilir. İç seslendirme hızı fiziksel konuşma hızına (~250 WPM) bağımlıdır. 

HızlıOku RSVP modülü, kademeli tempo artırımıyla fonolojik döngü darboğazını baypas ederek **Görsel-Mekansal Kopyalama** (Visuo-Spatial Sketchpad) ve doğrudan ortografik anlamlandırma yolağını aktive eder.

### 2.4. Okülomotor Egzersizler
1. **Schulte Tablosu (5×5 Matris):**
   - Walter Schulte tarafından geliştirilen bu psikodiagnostik test, foveal görüşten ziyade periferik (çevresel) görüş alanını genişletmeyi hedefler.
   - Okuyucu, bakışlarını merkezde tutarken çevredeki sayıları sırayla algılayarak görsel arama hızını ve frontal korteks dikkat kontrolünü geliştirir.
2. **Sakkad / Zigzag İzleme:**
   - Düzensiz ve genişleyen yörüngede hareket eden hedef nokta, gözün dış rektus ve iç rektus kaslarını esnetir; istemsiz fiksasyon titremelerini (nystagmus) ve regresyonları azaltır.

---

## 3. Çocuk Modülü (6–12 Yaş): Pedagojik ve Gelişimsel Yaklaşım

Çocuklar "küçültülmüş yetişkinler" değildir. Okuma ediniminin erken evrelerinde yetişkin tipi RSVP doğrudan uygulanırsa kavrama çökebilir. Bu nedenle çocuk modülü tamamen farklı pedagojik kuramlara göre tasarlanmıştır.

### 3.1. Okuma Gelişimi Evreleri (Chall & Ehri Modelleri)
- **Jeanne Chall'ın Okuma Evreleri:** 6–12 yaş grubu "Okumayı Öğrenme" (Learning to Read) evresinden "Öğrenmek İçin Okuma" (Reading to Learn) evresine geçiş yapar.
- **Linnea Ehri'nin Faz Teorisi:** Çocuklar harf-ses eşleştirmesinden (Full Alphabetic Phase) tüm kelimeyi tek bakışta tanıma fazına (Consolidated Alphabetic Phase) geçer.

HızlıOku Çocuk Modülü; hece (fonem/morfem), bağımsız kelime ve kısa cümle alıştırmaları sunarak fonolojik farkındalıktan ortografik kelime tanımaya kademeli geçişi destekler.

### 3.2. Flaş Okuma (Tachistoscopic Flash Reading)
Takistoskopik flaş okuma yönteminde kelimeler 300 ms – 800 ms gibi kontrollü aralıklarla ekranda görünür ve kaybolur. Bu yöntem:
- Çocuğun harf harf kod çözme (decoding) bağımlılığını azaltır.
- Kelimeyi bir görsel bütün (gestalt) olarak algılama refleksini pekiştirir.
- Oturumlar 10–12 öğe ile sınırlandırılarak bilişsel aşırı yüklenme (Cognitive Overload) önlenir.

### 3.3. Disleksi ve Görsel İşleme Adaptasyonları
Gelişimsel disleksi ve görsel stres (Meares-Irlen Sendromu) yaşayan çocuklar için üç kritik adaptasyon entegre edilmiştir:
1. **Ağırlaştırılmış Tabanlı Tipografi (Dyslexic Font Option):** Harflerin alt kısımlarının daha kalın olması, harflerin zihinsel olarak dönmesini (b-d, p-q karışıklığı) engellemeye yardımcı olur.
2. **Harf Aralığı (Inter-character Spacing):** Zorzi ve ark. (2012, PNAS) tarafından kanıtlandığı üzere, artırılmış harf aralığı görsel kalabalıklaşmayı (visual crowding) kırarak dislektik çocuklarda okuma doğruluğunu anlamlı düzeyde artırır.
3. **Kromatik Pastel Filtreler (Color Overlays):** Yüksek beyaz-siyah kontrastı bazı çocuklarda görsel parlama ve harf dansı hissiyatına yol açar. Sıcak sarı, açık mavi, nane yeşili ve şeftali arka plan filtreleri kontrast stresini yumuşatır.

### 3.4. Düşük Baskılı Oyunlaştırma ve Psikolojik Güvenlik
- **Sosyal Karşılaştırma Yoktur:** Çocuk kullanıcılar arasında kamuya açık liderlik tablosu (leaderboard) veya puan yarışı oluşturulmaz. Bu sayede okuma kaygısı (reading anxiety) tetiklenmez.
- **Bireysel Seri ve Başarı Rozetleri:** Yalnızca çocuğun kendi düzenli çalışmasını ödüllendiren içsel motivasyon (intrinsic motivation) odaklı geri bildirim mekanizması uygulanır.

---

## 4. Çocuk Güvenliği, Gizlilik ve Etik Standartlar

HızlıOku mimarisi, uluslararası çocuk güvenliği mevzuatlarına (COPPA, GDPR-K, KVKK Çocuk Hakları Yönergesi) tam uyumlu olarak **Gizlilik Odaklı Tasarım (Privacy by Design)** ile inşa edilmiştir:

1. **Zorunlu Yaş Kapısı (Age Gate):** 13 yaş altı kullanıcı kaydında ebeveyn e-postası zorunludur.
2. **Veli Onay Kilidi (Parental Consent Gate):** Veli e-posta doğrulaması tamamlanmadan (`consentStatus: "granted"`) hiçbir çocuk okuma oturumu verisi kaydedilmez.
3. **Veri Minimizasyonu (Data Minimization):** Çocukların fare tıklama hızları, mikro davranışları veya profil tercihleri kaydedilmez; yalnızca velinin görebileceği seans sayısı ve rozetler gibi asgari dönüm noktaları tutulur.
4. **Sıfır Reklam ve Sıfır Üçüncü Taraf İzleyici:** Çocuk arayüzlerinde hiçbir reklam ağı veya davranışsal izleme script'i bulunmaz.
5. **Akademik Dürüstlük Kuralı:** Sistem "Foto-okuma", "10.000 WPM garantisi" veya "disleksiyi tamamen iyileştirme" gibi bilimsel temeli olmayan sahte-bilimsel (pseudoscience) iddialarda bulunmaz. Araç yalnızca düzenli bilişsel egzersiz ve okuma akıcılığı desteği sunan bir eğitim teknolojisidir.

---

## 5. Kaynakça (References)

1. **Baddeley, A. D., & Hitch, G. (1974).** *Working memory.* Psychology of Learning and Motivation, 8, 47-89.
2. **Chall, J. S. (1983).** *Stages of Reading Development.* New York: McGraw-Hill.
3. **Ehri, L. C. (2005).** *Development of sight word reading: Phases and findings.* In M. J. Snowling & C. Hulme (Eds.), The Science of Reading: A Handbook (pp. 135-154).
4. **Forster, K. I. (1970).** *Visual perception of rapidly presented word sequences of varying complexity.* Perception & Psychophysics, 8(4), 215-221.
5. **O'Regan, J. K., Lévy-Schoen, A., Pynte, J., & Brulex, R. (1984).** *Convenient fixation position within words in reading.* In Theoretical and Applied Aspects of Eye Movement Research (pp. 373-380).
6. **Potter, M. C. (1984).** *Rapid serial visual presentation (RSVP): A method for studying language processing.* New Methods in Reading Comprehension Research, 118, 91-118.
7. **Rayner, K. (1979).** *Eye guidance in reading: Fixation locations within words.* Perception, 8(1), 21-30.
8. **Rayner, K. (1998).** *Eye movements in reading and information processing: 20 years of research.* Psychological Bulletin, 124(3), 372-422.
9. **Sweller, J. (1988).** *Cognitive load during problem solving: Effects on learning.* Cognitive Science, 12(2), 257-285.
10. **Zorzi, M., et al. (2012).** *Extra-large letter spacing improves reading in dyslexia.* Proceedings of the National Academy of Sciences (PNAS), 109(28), 11455-11459.
