import React from "react";
import Link from "next/link";
import { Sparkles, Eye, ShieldCheck, ArrowRight, Zap, Target, BookOpen } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold mb-6">
          <Zap className="w-4 h-4 text-brand-600" />
          <span>Bilimsel ve Yaşa Uygun Hızlı Okuma</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          Daha Hızlı Oku, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
            Daha İyi Anla.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Çocuklar için eğlenceli ve güvenli flaş okuma oyunları; yetişkinler için RSVP ve ORP odaklı bilimsel antrenman programı.
        </p>

        {/* Age group choice cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          {/* Child Track Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                6 – 12 Yaş
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                Çocuklar İçin Hızlı Okuma
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
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
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-700">
                13+ Yaş
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                Yetişkinler İçin Hızlı Okuma
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
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

      {/* Feature Highlights */}
      <section className="w-full bg-white border-y border-slate-200 py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Neden HızlıOku?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Okuma bilimine dayalı pedagojik ve bilişsel yöntemler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                ORP & RSVP Teknolojisi
              </h3>
              <p className="text-sm text-slate-600">
                Gözün sıçrama (saccade) hareketini minimuma indirerek kelimeleri optimum odak noktasından algılayın.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Çocuk Güvenliği & Gizlilik
              </h3>
              <p className="text-sm text-slate-600">
                13 yaş altı için veli onayı şarttır. Reklam, profil çıkarma veya sosyal baskı içermez.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Disleksi & Erişilebilirlik
              </h3>
              <p className="text-sm text-slate-600">
                Özel fontlar, kontrast ayarları ve yüksek okunabilirlik ile her bireye eşit okuma fırsatı sunar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="w-full max-w-screen-xl mx-auto px-4 py-8 text-center text-xs text-slate-400">
        <p className="max-w-2xl mx-auto">
          ⚠️ <strong>Yasal Bilgilendirme:</strong> HızlıOku bir eğitim ve pratik aracıdır. Tıbbi, psikolojik veya garantili akademik kazanım vaadinde bulunmaz.
        </p>
      </footer>
    </div>
  );
}
