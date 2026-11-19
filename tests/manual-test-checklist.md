# HızlıOku — Manuel Test Kontrol Listesi (Manual Test Checklist)

Bu belge, uygulamanın yayına alınmadan önce (production release) tüm cihaz genişliklerinde ve kullanıcı rollerinde manuel olarak test edilmesi gereken kritik adımları içerir.

---

## 1. Duyarlı Tasarım & Ekran Genişlikleri (Responsive Matrix)
- [ ] **360 px (Küçük Mobil Android):**
  - Yatay kaydırma çubuğu (horizontal scrollbar) oluşmuyor.
  - Alt gezinme çubuğu (BottomNav) ve butonlar min 44x44px dokunma hedefine sahip.
  - Metinler ve başlıklar taşma veya kırılma yapmıyor.
- [ ] **390 px / 414 px (iPhone 13/14/15/Plus):**
  - Güvenli alan (Safe area padding) alt çubukta doğru uygulanıyor.
  - Flash okuma ve RSVP kelime kartları tek ekranda kaydırma gerektirmeden tam oturuyor.
- [ ] **768 px (Tablet / iPad Dikey):**
  - Üst çubuk (Navbar) masaüstü moduna geçiş yapıyor veya alt çubuk temiz kapanıyor.
  - Kart gridleri 2 sütunlu düzene uyum sağlıyor.
- [ ] **1024 px / 1280 px / 1440 px (Masaüstü & Geniş Ekran):**
  - İçerik `max-w-screen-xl` sınırları içinde ortalanıyor; kenarlarda rahatlatıcı boşluklar mevcut.
  - Schulte tablosu 5x5 kare formunu koruyor.

---

## 2. Kimlik Doğrulama & Veli Onayı (Auth & Child Safety Flow)
- [ ] **Yaş Kapısı (Age Gate):**
  - Kayıt sayfasında yaş seçimi zorunlu.
  - Çocuk (6–12) seçildiğinde Veli E-posta alanı zorunlu hale geliyor.
  - Çocuk kaydında üçüncü taraf OAuth (Google) doğrudan engelleniyor.
- [ ] **Veli Onay Kilidi (Parental Consent Gate):**
  - Çocuk hesabı ilk açıldığında doğrudan `/consent-pending` sayfasına yönlendiriliyor.
  - Veli onayı verilmeden `/dashboard/child` veya alıştırma sayfalarına erişim denendiğinde RoleGuard tarafından engelleniyor.
  - Onay simülasyonu çalıştırıldığında durum `granted` olarak güncelleniyor ve çocuk paneli açılıyor.
- [ ] **Yetişkin Kayıt & Giriş:**
  - Yetişkin kaydında veli e-postası talep edilmiyor (`consentStatus: not_required`).
  - Giriş yapıldığında doğrudan yetişkin paneline yönlendiriliyor.
- [ ] **Çıkış (Sign Out):**
  - Profil sayfasından ve gezinme çubuğundan oturum başarıyla kapatılıyor ve `/login` rotasına dönülüyor.

---

## 3. Çocuk Okuma Modülü (6–12 Yaş)
- [ ] **Alıştırma Seçimi:** Hece, kelime ve kısa cümle seçimleri doğru veri kümesini yüklüyor.
- [ ] **Hız Seçimi:** Yavaş (800ms), Orta (500ms) ve Hızlı (300ms) seansları istenen süreyle ilerletiyor.
- [ ] **Disleksi Araç Çubuğu:**
  - Disleksi yazı tipi açılıp kapatılabiliyor.
  - Harf aralığı (1x, 1.5x, 2x) anında yansıyor.
  - Renk filtreleri (Doğal, Sarı, Mavi, Yeşil, Şeftali) arka planı değiştiriyor.
- [ ] **Oyunlaştırma & Ödül:**
  - 10-12 kelimelik oturum bittiğinde tebrik ekranı ve puan animasyonu gösteriliyor.
  - Sosyal baskı, karşılaştırmalı sıralama veya reklam bulunmuyor.
- [ ] **Veli Görünümü (`/dashboard/child/parent`):**
  - Sadece tamamlanan seans ve seri özetleri gösteriliyor; mikro davranışsal veri toplanmıyor.

---

## 4. Yetişkin RSVP & Göz Egzersizleri Modülü (13+ Yaş)
- [ ] **Metin Kaynağı:**
  - Kamu malı metinlerden biri seçilerek RSVP okuyucuya aktarılabiliyor.
  - Kullanıcı özel metin yapıştırıp okumayı başlatabiliyor.
  - `.txt` / `.md` dosyası yüklenerek metin çıkarılabiliyor.
- [ ] **RSVP Okuyucu:**
  - WPM kaydırıcısı 150 ile 1000 WPM arasında akıcı şekilde hızı değiştiriyor.
  - ORP odak harfi kelimenin ilk 1/3'ünde kırmızı/kontrast renkle vurgulanıyor.
  - Oynat/Duraklat, -5 kelime geri, +5 kelime ileri sarma butonları ve klavye kısayolları (Boşluk, Sol/Sağ Ok) çalışıyor.
- [ ] **Kavrama Testi:**
  - Okuma bittiğinde 3-5 soruluk test görüntüleniyor.
  - Cevaplar seçilip onaylandığında anında % skor hesaplanıyor.
- [ ] **Schulte Tablosu (5×5):**
  - Sayılar 1'den 25'e kadar rastgele yerleşiyor.
  - Yalnızca sıradaki hedef sayı tıklandığında kabul ediliyor, yanlış tıklamalarda hata sayacı artıyor.
  - 25 tamamlandığında süre ve başarı kutusu çıkıyor.
- [ ] **Zigzag / Sakkad Egzersizi:**
  - Hedef nokta 12 istasyonda zikzak ve çevresel genişleme rotasında kayıyor.
  - Hız ayarları (Yavaş, Orta, Hızlı) ritmi değiştiriyor.
- [ ] **Analitik Grafikleri:**
  - Haftalık WPM sütunları orantılı yükseklikte görselleşiyor.
  - Hedef tempo kaydırıcısı önerileri dinamik güncelliyor.

---

## 5. Yönetici Paneli (`/admin`)
- [ ] Yetkisiz kullanıcılar `/admin` sayfasına erişemiyor (RoleGuard engelliyor).
- [ ] Kullanıcı listesi, rolleri ve veli onay durumları listeleniyor.
- [ ] "Admin Yap / Adminliği Kaldır" işlemi kullanıcı rolünü dinamik güncelliyor.
- [ ] Kamu malı metin kütüphanesine yeni metin eklenebiliyor ve silinebiliyor.
- [ ] "CSV Olarak İndir" tıklandığında anonim kullanım raporu `.csv` olarak indiriliyor.

---

## 6. Erişilebilirlik (WCAG 2.2 AA)
- [ ] **Skip-to-content:** Sayfa başında Tab tuşuna basıldığında "Ana İçeriğe Atla" bağlantısı görünür oluyor.
- [ ] **Klavye Odaklanması:** Tüm buton ve girdilerde `:focus-visible` halkası net beliriyor.
- [ ] **Azaltılmış Hareket (prefers-reduced-motion):** Sistem ayarı açık olduğunda geçiş animasyonları devre dışı kalıyor.
