# HızlıOku — Bilimsel ve Yaşa Uygun Hızlı Okuma Platformu

HızlıOku, iki farklı yaş grubunun bilişsel ve pedagojik ihtiyaçlarına göre özelleştirilmiş, kanıta dayalı ve mobil öncelikli (mobile-first) bir hızlı okuma web uygulamasıdır:
1. **Çocuklar (6–12 Yaş):** Düşük baskılı, eğlenceli flaş okuma, fonetik ve hece tanıma, disleksi dostu görünüm seçenekleri ve veli gözetim paneli. Reklamsız, profillemesiz ve çocuk güvenliği ilkelerine tam uyumlu.
2. **Yetişkinler (13+ Yaş):** 150–1000 WPM RSVP okuyucu, ORP (Optimum Tanıma Noktası) vurgulama, kavrama testleri, Schulte tablosu (5×5) ve Sakkad/Zigzag göz kası egzersizleri ile kişisel analitik grafikleri.
3. **Yönetici (Admin):** Kullanıcı rolleri ve onay durumları yönetimi, telifsiz metin kütüphanesi CRUD işlemleri ve anonim kullanım raporu ihracı.

---

## 📚 Dokümantasyon & Akademik Kaynaklar

- [BILIMSEL_TEMELLER.md](file:///C:/Users/mert/.gemini/antigravity/scratch/hizlioku/BILIMSEL_TEMELLER.md): Bilişsel psikoloji, okülomotor hareketler (RSVP, ORP, Sakkad), disleksi adaptasyonları ve okuma bilimi literatürü.
- [KULLANIM_KILAVUZU.md](file:///C:/Users/mert/.gemini/antigravity/scratch/hizlioku/KULLANIM_KILAVUZU.md): Tüm ekranlar, çocuk/yetişkin/veli/yönetici akışları ve klavye kısayollarını içeren adım adım kullanım rehberi.
- [manual-test-checklist.md](file:///C:/Users/mert/.gemini/antigravity/scratch/hizlioku/tests/manual-test-checklist.md): 6 farklı ekran genişliğinde ve tüm modüllerde uçtan uca test matrisi.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Stil & Tasarım:** Tailwind CSS (Mobil öncelikli: 360px – 1440px)
- **Kimlik Doğrulama:** Firebase Authentication (Google Sign-In + E-posta/Şifre)
- **Veritabanı:** Firebase Cloud Firestore
- **Hosting:** Firebase Hosting (Statik dışa aktarım: `output: "export"`)
- **Erişilebilirlik:** WCAG 2.2 AA standartları, Skip-to-content, `:focus-visible`, `prefers-reduced-motion`

---

## 🛡️ Çocuk Güvenliği & Yasal Bildirimler

- **Veli Onay Zorunluluğu:** 13 yaş altı kullanıcılar için kayıt esnasında veli e-postası zorunludur. Veli onayı verilmeden (`consentStatus: "granted"`) hiçbir okuma veya profil verisi kaydedilmez.
- **Veri Minimizasyonu:** Çocuk hesaplarında davranışsal profilleme, süre takipleri, reklam veya sosyal rekabet unsurları (liderlik tabloları) kesinlikle bulunmaz.
- **Telif Hakları:** Uygulama içerisinde telifli hiçbir üçüncü taraf metin bulunmaz; yalnızca kamu malı (public domain) eserler veya kullanıcının yapıştırdığı metinler kullanılır.
- **Yasal Sorumluluk Reddi:** HızlıOku bir eğitim ve pratik aracıdır. Tıbbi, nörolojik veya garantili akademik kazanım vaadinde bulunmaz.

---

## 🚀 Yerel Geliştirme Kurulumu (Local Setup)

### 1. Gereksinimler
- Node.js 18.17+ veya 20+ (Test edilen: Node.js 26)
- npm 9+

### 2. Projeyi Çalıştırma
```bash
# Proje dizinine gidin
cd C:\Users\mert\.gemini\antigravity\scratch\hizlioku

# Bağımlılıkları yükleyin (ilk kurulum)
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```
Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

---

## 🔑 Ortam Değişkenleri (.env.local)

`.env.example` dosyasını referans alarak `.env.local` oluşturabilirsiniz:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Yerel Firebase Emülatörü kullanmak için "true" yapın:
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
```

---

## 🧪 Testler ve Kalite Kontrol

```bash
# Birim testlerini çalıştırın (RSVP aralıkları, WPM, kavrama puanlama, ORP)
npm test

# Üretim derlemesini ve tip doğrulamalarını çalıştırın
npm run build
```

Manuel test yönergeleri için [tests/manual-test-checklist.md](file:///C:/Users/mert/.gemini/antigravity/scratch/hizlioku/tests/manual-test-checklist.md) belgesini inceleyiniz.

---

## ☁️ Firebase Hosting Dağıtımı (Deployment)

1. Firebase CLI aracının yüklü olduğundan emin olun:
   ```bash
   npm install -g firebase-tools
   ```
2. Firebase hesabınıza giriş yapın:
   ```bash
   firebase login
   ```
3. Statik üretim çıktısını oluşturun:
   ```bash
   npm run build
   ```
   *Bu komut Next.js çıktısını `out/` klasörüne aktarır.*
4. Firebase Hosting ve Firestore kurallarını dağıtın:
   ```bash
   firebase deploy --only hosting,firestore:rules
   ```

---

## ⚠️ İnsan İncelemesi Gerektiren Alanlar (Human Review Required)
Tüm kimlik doğrulama, veli onayı, rol değiştirme ve Firestore güvenlik kuralları kod içerisinde `// ⚠️ HUMAN REVIEW REQUIRED` etiketi ile işaretlenmiştir. Canlı üretime geçmeden önce bu alanların güvenlik denetiminden geçirilmesi zorunludur.

---

## 📄 Lisanslar
Üçüncü taraf bağımlılıkların lisans detayları için [THIRD_PARTY_LICENSES.md](file:///C:/Users/mert/.gemini/antigravity/scratch/hizlioku/THIRD_PARTY_LICENSES.md) dosyasına bakınız.
