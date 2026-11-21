import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Eye,
  ShieldCheck,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
  Check,
  X,
  Lock,
  Cpu,
  Layers,
  Smartphone,
  Award,
  Globe,
  Sliders,
} from "lucide-react";
import { HeroDemo } from "@/components/home/HeroDemo";

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-semibold mb-6">
          <Zap className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>Bilimsel ve Yaşa Uygun Hızlı Okuma</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          Daha Hızlı Oku, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-500 dark:from-brand-400 dark:via-indigo-400 dark:to-indigo-300">
            Daha İyi Anla.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Çocuklar için eğlenceli ve güvenli flaş okuma oyunları; yetişkinler için RSVP ve ORP odaklı bilimsel antrenman programı.
        </p>

        {/* Live Interactive RSVP Demo Widget */}
        <HeroDemo />

        {/* Age group choice cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          {/* Child Track Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950/30 border-2 border-amber-200 dark:border-amber-800/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400 dark:bg-amber-500 text-amber-950 flex items-center justify-center font-bold mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                6 – 12 Yaş
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2">
                Çocuklar İçin Hızlı Okuma
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Hece ve kelime flaşlama, disleksi dostu yazı tipi, dikkat dağıtmayan eğlenceli arayüz ve veli gözetim paneli. Reklamsız ve güvenli.
              </p>
            </div>
            <Link
              href="/signup?age=child"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-2xl shadow-sm transition active:scale-[0.98]"
            >
              <span>Çocuk Olarak Başla</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Adult Track Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/40 border-2 border-blue-200 dark:border-blue-900/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-700 dark:text-blue-400">
                13+ Yaş
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2">
                Yetişkinler İçin Hızlı Okuma
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                150–1000 WPM RSVP okuyucu, ORP (Optimum Tanıma Noktası) vurgusu, anlama testleri ve Schulte tablosu göz egzersizleri.
              </p>
            </div>
            <Link
              href="/signup?age=adult"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-sm transition active:scale-[0.98]"
            >
              <span>Yetişkin Olarak Başla</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why HızlıOku? - Superiority & Comparative Advantages */}
      <section className="w-full bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 sm:py-20 transition-colors">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold">
              <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Bilimsel & Açık Kaynak Üstünlüğü</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Neden HızlıOku?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Ticari ve yabancı hızlı okuma yazılımlarının aksine, Türkçe dil bilgisine özel algoritmalar ve sıfır veri takibiyle tasarlandı.
            </p>
          </div>

          {/* 6 Superiority Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Turkish Language Specific */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-4 font-bold shadow-xs">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Türkçe Dil Yapısına & Ateşman Modeline Özel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Yabancı uygulamalar İngilizce heceleme modelleriyle Türkçeyi bozar. HızlıOku, sondan eklemeli yapımıza uygun <strong>fonotaktik heceleme</strong> ve <strong>Ateşman Okunabilirlik İndeksi</strong> ile kelimeleri doğru ORP (Optimum Tanıma Noktası) ile odaklar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                ✓ Doğru Türkçe Heceleme & Vurgu
              </div>
            </div>

            {/* 2. 100% Free & Open Source */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 font-bold shadow-xs">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  %100 Ücretsiz, Reklamsız ve Açık Kaynak
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Aylık $10–$20 abonelik isteyen ticari yazılımların (Spreeder, SwiftRead, Outread vb.) aksine; gizli ödeme duvarı, reklam veya ücretli üyelik yoktur. MIT lisansıyla sonsuza dek ücretsiz ve topluluğa açıktır.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Sıfır Ücret • Sıfır Reklam
              </div>
            </div>

            {/* 3. Zero-Cloud Local Privacy */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mb-4 font-bold shadow-xs">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Sıfır Bulut Bağımlılığı & %100 Yerel Gizlilik
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Okuduğunuz kişisel PDF'ler, ders notları, EPUB kitapları veya metinler asla bir sunucuya yüklenmez. Tüm metin ayıklama, hız hesabı ve soru üretimi tamamen tarayıcınızda (cihaz içinde) yerel gerçekleşir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                ✓ KVKK & COPPA Tam Uyumlu
              </div>
            </div>

            {/* 4. Multi-modal Reading Engines */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 flex items-center justify-center mb-4 font-bold shadow-xs">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Çok Modlu Hibrit Okuma (RSVP + Pacer + Biyonik)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sadece tek kelime yanıp sönen flaşla sınırlandırılmazsınız. İster tek kelime <strong>RSVP</strong>, ister sayfa bütünlüğünü koruyan <strong>Rehber Cetvel (Pacer)</strong>, ister <strong>Biyonik Vurgulama</strong> ile metinleri akıcı okuyun.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold text-brand-600 dark:text-brand-400">
                ✓ 3 Farklı Bilişsel Okuma Teknolojisi
              </div>
            </div>

            {/* 5. Complete Eye-Brain Gym */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4 font-bold shadow-xs">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Bütüncül Göz Kası ve Odak Eğitimi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Yalnızca metin akıtmak hızlı okutmaz. <strong>Schulte Tablosu</strong> (Gorbov Kırmızı-Siyah çift görev), <strong>Piramit Okuma</strong> (görsel alan genişletici), <strong>Zigzag Sakkad</strong> ve <strong>Takistoskop</strong> ile göz-beyin reflekslerini geliştirir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                ✓ 4 Farklı Bilimsel Göz Egzersizi
              </div>
            </div>

            {/* 6. True Multi-Platform & Offline */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 flex items-center justify-center mb-4 font-bold shadow-xs">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Her Cihazda Yerel & Çevrimdışı Çalışma
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Web tarayıcınızda anında çalışır. Android telefonunuza hafif <strong>.apk</strong> (4.7 MB) olarak kurulabilir. iPhone ve iPad'de tam ekran <strong>PWA</strong> ve <strong>Apple WebClip</strong> ile internetiniz olmasa dahi metroda ve uçakta kesintisiz çalışır.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold text-sky-600 dark:text-sky-400">
                ✓ Web • Android APK • iOS
              </div>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="pt-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Şeffaf Karşılaştırma
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                HızlıOku ve Diğer Uygulamalar
              </h3>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                    <th className="p-4 sm:p-5 font-bold text-slate-600 dark:text-slate-300">Özellik</th>
                    <th className="p-4 sm:p-5 font-black text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/40">
                      HızlıOku (Açık Kaynak)
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-slate-400 dark:text-slate-500">
                      Diğer Ticari Uygulamalar (Spreeder, SwiftRead, vb.)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold">Fiyat & Lisans Modeli</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/20">
                      %100 Ücretsiz & MIT Açık Kaynak
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Aylık $9 – $20 Ücretli Abonelik / Freemium</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold">Türkçe Dil & Heceleme Uyumu</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/20">
                      Ateşman İndeksi & Türkçe Fonotaktik ORP
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Yalnızca İngilizce (Türkçe ekleri yanlış böler)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold">Veri Gizliliği (PDF / Metin)</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/20">
                      %100 Cihaz İçi Yerel (Sunucuya Gitmez)
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Metinler yabancı bulut sunuculara yüklenir</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold">Okuma Yöntemleri</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/20">
                      RSVP + Rehber Cetvel (Pacer) + Biyonik
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Çoğunlukla sadece tek kelime RSVP flaş</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold">Göz Kası & Periferik Egzersizleri</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/20">
                      Schulte Pro, Piramit, Zigzag, Takistoskop
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Bulunmaz veya çok ilkel düzeydedir</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold">Çocuk (6–12) ve Yetişkin Ayrımı</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/20">
                      Pedagojik İki Ayrı Mod + Veli Paneli
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Tek tip yetişkin arayüzü (Çocuklara uygunsuz)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold">Mobil Kurulum & Çevrimdışı Çalışma</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/20">
                      Android .APK (4.7 MB) + iOS PWA + Çevrimdışı
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Sürekli internet bağlantısı ve App Store zorunluluğu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source & Community Banner */}
      <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-3xl p-6 sm:p-10 bg-linear-to-r from-slate-900 via-slate-800 to-brand-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
              Açık Kaynak Kodlu ve Şeffaf
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Geliştirmeye Katılın veya Kodları İnceleyin
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              HızlıOku projesinin algoritmaları, pedagojik modülleri ve tüm kaynak kodları GitHub üzerinde mevcuttur.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://github.com/mserman90/hizlioku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
            >
              <span>GitHub Reposu</span>
              <span className="text-xs text-slate-500 font-medium">mserman90/hizlioku</span>
            </a>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
            >
              Kullanım Kılavuzu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
