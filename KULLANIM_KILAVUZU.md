# HızlıOku — Detaylı Kullanım Kılavuzu (User Manual)

Bu kılavuz; **HızlıOku** platformunun çocuklar, ebeveynler, yetişkin okuyucular ve sistem yöneticileri için sunduğu tüm ekranları, özellikleri ve klavye kısayollarını adım adım açıklamaktadır.

---

## 📑 İçindekiler
1. [Hızlı Başlangıç & Giriş](#1-hızlı-başlangıç--giriş)
2. [Yaş Kapısı & Hesap Türleri](#2-yaş-kapısı--hesap-türleri)
3. [Veli Onay Süreci (Çocuk Hesapları İçin)](#3-veli-onay-süreci-çocuk-hesapları-için)
4. [Çocuk Modülü Kullanımı (6–12 Yaş)](#4-çocuk-modülü-kullanımı-612-yaş)
   - Flaş Okuma Alıştırmaları
   - Disleksi & Erişilebilirlik Araç Çubuğu
   - Puanlar ve Rozetler
   - Veli Gelişim Takip Ekranı
5. [Yetişkin Modülü Kullanımı (13+ Yaş)](#5-yetişkin-modülü-kullanımı-13-yaş)
   - Metin Seçimi ve Dosya Yükleme (.txt, .md)
   - RSVP & ORP Okuyucu Denetimleri
   - Klavye Kısayolları
   - Kavrama Testi ve Skorlama
   - Schulte Tablosu (5×5) Göz Egzersizi
   - Sakkad / Zigzag Odak Takip Egzersizi
   - Analitik ve Trend Grafikleri
   - Hedef Tempo Asistanı
6. [Yönetici (Admin) Konsolu](#6-yönetici-admin-konsolu)
7. [Sıkça Sorulan Sorular (SSS)](#7-sıkça-sorulan-sorular-sss)

---

## 1. Hızlı Başlangıç & Giriş

Uygulamayı tarayıcınızda açtığınızda karşılayıcı ana sayfa (Landing Page) görüntülenir.
- **Doğrudan Başlama:** Ana sayfadaki *"Çocuk Olarak Başla"* veya *"Yetişkin Olarak Başla"* butonlarına tıklayarak doğrudan ilgili yaş grubunun kayıt formuna gidebilirsiniz.
- **Giriş:** Önceden açılmış bir hesabınız varsa üst gezinme çubuğundaki (veya mobilde alt bardaki) **"Giriş Yap"** bağlantısını kullanabilirsiniz.

---

## 2. Yaş Kapısı & Hesap Türleri

Kayıt formuna (`/signup`) ilk ulaşıldığında sistem zorunlu bir yaş seçimi sunar:
- **Çocuk (6–12 Yaş):** Çocuğun adı, çocuk kullanıcı e-postası, şifre ve **Veli / Ebeveyn E-postası** girilmesi zorunludur. Çocukların gizliliği gereği doğrudan üçüncü taraf Google girişi kapatılmıştır.
- **Yetişkin (13+ Yaş):** Standart e-posta/şifre veya tek tıkla **Google ile Giriş** seçeneği aktiftir. Veli izni talep edilmez.

---

## 3. Veli Onay Süreci (Çocuk Hesapları İçin)

1. Bir çocuk hesabı oluşturulduğunda, hesap otomatik olarak `pending` (veli onayı bekleniyor) statüsüne alınır ve `/consent-pending` sayfasına yönlendirilir.
2. Veli e-posta adresine bilgilendirme iletilir.
3. Çocuk koruma ilkeleri gereğince, **veli onayı verilene kadar hiçbir okuma çalışması başlatılamaz ve çocuğa ait hiçbir veri kaydedilmez**.
4. Geliştirme ve deneme aşamasında bu süreci test etmek için sayfadaki *"Veli Onayını Onayla ve Paneli Aç"* butonu kullanılabilir. Onay verildikten sonra çocuk paneli derhal kullanıma açılır.

---

## 4. Çocuk Modülü Kullanımı (6–12 Yaş)

Çocuk paneli (`/dashboard/child`), dikkat dağıtıcı öğelerden arındırılmış, yüksek kontrastlı ve sıcak renk paletine (kehribar, mercan, nane) sahiptir.

### 4.1. Flaş Okuma Alıştırmaları
1. **Alıştırma Türü Seçimi:**
   - *Heceler:* Temel fonetik algı (BA, KA, GÖZ, BAL vb.).
   - *Kelimeler:* Sık kullanılan temel kelimeler (Kedi, Güneş, Balık, Kitap vb.).
   - *Cümleler:* Kısa ve akıcı cümleler.
2. **Hız Seçimi:**
   - *Yavaş (800ms):* Yeni başlayanlar ve harfleri birleştirenler için.
   - *Orta (500ms):* Akıcı okuma temposu.
   - *Hızlı (300ms):* Kelimeyi anında tanıma refleksi kazanan şampiyon okurlar için.
3. **Seans Akışı:**
   - Kelimeler ekranda sırayla parlar ve kaybolur.
   - Duraklatmak için ekran altındaki *"Duraklat"* butonuna dokunulabilir.
   - 10-12 kelimelik seans bittiğinde başarı tebriği, kazanılan puanlar ve yıldızlar ekrana gelir.

### 4.2. Disleksi & Erişilebilirlik Araç Çubuğu
Flaş okuma ekranında yer alan araç çubuğu ile:
- **Disleksi Fontu:** Özel harf anatomisine sahip yüksek okunabilirlikli yazı tipini açıp kapatabilirsiniz.
- **Harf Aralığı:** 1x, 1.5x ve 2x aralık seçenekleriyle harf kalabalıklaşmasını önleyebilirsiniz.
- **Renk Katmanı:** Beyaz zemin parlamasını önlemek için *Sıcak Sarı, Açık Mavi, Nane Yeşili, Şeftali* renk filtrelerinden dilediğinizi seçebilirsiniz.

### 4.3. Veli Gelişim Takip Ekranı (`/dashboard/child/parent`)
- Yalnızca ilgili çocuğun velisine açıktır.
- Tamamlanan oturum sayısı, düzenli çalışma gün serisi ve kazanılan rozetleri (Örn: *İlk Adım, Kelime Avcısı*) listeler.
- Çocuğun psikolojisini ve gizliliğini korumak amacıyla detaylı hata veya süre takibi tutulmaz.

---

## 5. Yetişkin Modülü Kullanımı (13+ Yaş)

Yetişkin paneli (`/dashboard/adult`), RSVP tabanlı hızlı okuma ve bilişsel göz kası antrenmanlarını bir araya getirir.

### 5.1. Metin Seçimi ve Dosya Yükleme
RSVP okuyucusunu başlatmadan önce iki yöntemle metin temin edebilirsiniz:
1. **Kamu Malı Kütüphane:** Ezop Fablları veya Bilimsel Okuma Metni gibi önceden hazırlanmış telifsiz metinlerden birini seçebilirsiniz.
2. **Kendi Metnini Yapıştır:** İstediğiniz herhangi bir makale, rapor veya ders notunu metin kutusuna kopyalayıp yapıştırabilirsiniz.
3. **Dosya Yükleme:** `.txt` veya `.md` uzantılı yerel dosyanızı sürükleyip bırakarak doğrudan okuyucuya aktarabilirsiniz.

### 5.2. RSVP & ORP Okuyucu Denetimleri
- **WPM Hız Ayarı:** 150 WPM ile 1000 WPM arasında 25'er birimlik adımlarla okuma hızını anlık olarak değiştirebilirsiniz.
- **ORP Vurgusu:** Her kelimenin optimum tanıma harfi kırmızı renkle işaretlenir. Gözünüzü sadece üst ve alt kırmızı noktalara sabitleyerek kelimenin tamamını tek bakışta algılayabilirsiniz.
- **Tam Ekran Modu:** Sağ üst köşedeki büyütme butonuna basarak dikkat dağıtan tüm tarayıcı öğelerini gizleyebilirsiniz.

### 5.3. Klavye Kısayolları (Masaüstü Kullanıcıları İçin)
| Tuş | İşlev |
| :--- | :--- |
| **Boşluk (Space)** | Okumayı Başlat / Duraklat |
| **Sol Ok (←)** | 5 Kelime Geri Sar |
| **Sağ Ok (→)** | 5 Kelime İleri Atla |
| **Tab / Shift+Tab** | Düğmeler arası klavye odağı |

### 5.4. Kavrama Testi ve Skorlama
Kamu malı metinler okunduktan sonra okuyucunun karşısına 3–5 soruluk çoktan seçmeli kavrama testi çıkar. Cevaplar işaretlenip gönderildiğinde kavrama başarı yüzdesi (`%`) ve doğru cevap anahtarı anında raporlanır.

### 5.5. Schulte Tablosu (5×5) Göz Egzersizi
- **Amaç:** Bakışları merkez noktada tutarken periferik (çevresel) görüş alanını tarayarak 1'den 25'e kadar sayıları sırayla bulmak.
- **Kullanım:** Egzersizi başlatın, ekranda beliren "Hedef Sayı"yı takip ederek 1, 2, 3... 25 sırasıyla kutucuklara tıklayın. Yanlış tıklamalarda hata sayacı artar; 25 tamamlandığında toplam süre saniye cinsinden gösterilir.

### 5.6. Sakkad / Zigzag Odak Takip Egzersizi
- **Amaç:** Gözün satır atlama ve istemsiz sıçrama (saccade) hareketlerini koordine etmek.
- **Kullanım:** 12 istasyondan oluşan geometrik rotada hareket eden ışık hedefini başınızı oynatmadan yalnızca gözlerinizle takip edin. Yavaş (800ms), Orta (500ms) ve Hızlı (300ms) modları mevcuttur.

### 5.7. Analitik & Hedef Tempo Asistanı
- `/dashboard/adult/analytics` rotasında son seanslarınızın WPM gelişim çubukları ve ortalama kavrama yüzdeniz sergilenir.
- **Hedef Hız Asistanı:** Hedeflediğiniz okuma hızını kaydırıcıyla belirlediğinizde (örn: 450 WPM), sistem bu hıza ulaşmanız için ideal seans süresini (örn: 2 dakika) ve odaklanmanız gereken teknikleri (örn: iç seslendirmeyi azaltma) tavsiye eder.

---

## 6. Yönetici (Admin) Konsolu (`/admin`)

Yönetici rolüne sahip kullanıcılar için özel olarak kurgulanan bu konsolda:
1. **Kullanıcı & İzin Yönetimi:** Tüm kullanıcıların yaş grubu, rolü ve veli onay durumları listelenir. Yetkili kullanıcılar tek tıkla admin yetkisi atayabilir veya kaldırabilir.
2. **Telifsiz Metin Kütüphanesi CRUD:** Kamu malı okuma metinleri eklenebilir, başlık/yazar düzenlenebilir ve silinebilir.
3. **Kullanım Raporu İhracı:** Toplam kullanıcı sayısı, seans sayısı ve ortalama okuma hızlarını içeren anonim özet rapor tek tıkla `.csv` formatında indirilebilir.

---

## 7. Sıkça Sorulan Sorular (SSS)

**S: Hızlı okuma yaparken anlama oranım düşüyor, ne yapmalıyım?**  
*C: Okuma bilimi araştırmalarına göre, hızınızı aniden 2-3 katına çıkarmak kavrama çöküşüne yol açar. Hızınızı haftada 25–50 WPM artırarak ve kavrama testlerinde en az %75 doğruluğu koruyarak ilerlemeniz tavsiye edilir.*

**S: Çocuğumun okuma verilerini başka kimse görebilir mi?**  
*C: Hayır. Çocuk hesaplarında hiçbir genel profil veya liderlik tablosu yoktur. Bilgiler yalnızca ilgili çocuğa ve onay veren ebeveynine özeldir.*

**S: PDF dosyası yüklediğimde metin çıkmıyorsa ne yapmalıyım?**  
*C: Taranmış resimlerden oluşan veya şifreli PDF'lerde istemci taraflı metin ayrıştırma sınırlı olabilir. Belgenizdeki metni seçip kopyalayarak "Kendi Metnini Yapıştır" sekmesine yapıştırmanız en doğru ve hızlı sonucu verir.*
