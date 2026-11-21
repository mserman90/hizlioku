"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  Zap,
  Grid,
  Sparkles,
  Trophy,
  ArrowRight,
  Sliders,
  Compass,
  FileText,
  Volume2,
  Smile,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Keyboard,
  Download,
  GraduationCap,
  Layers,
  HeartHandshake,
} from "lucide-react";

type GuideTab = "adult" | "child" | "science";

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<GuideTab>("adult");

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-brand-800">
          <BookOpen className="w-3.5 h-3.5" />
          HızlıOku Kullanım Kılavuzu & Bilimsel Rehber
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Nasıl Kullanılır?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Yaşınıza ve hedefinize uygun egzersizleri, bilimsel okuma tekniklerini ve pratik ipuçlarını keşfedin.
        </p>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("adult")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "adult"
                ? "bg-white dark:bg-slate-700 text-brand-700 dark:text-brand-300 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Yetişkinler İçin (13+)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("child")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "child"
                ? "bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Smile className="w-4 h-4" />
            Çocuklar & Veliler (6–12)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("science")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === "science"
                ? "bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Bilimsel Temeller
          </button>
        </div>
      </div>

      {/* TAB 1: ADULT GUIDE */}
      {activeTab === "adult" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Quick Summary Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-100">
                13+ Yaş & Yetişkinler İçin Hızlı Yol Haritası
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                Göz Sıçramalarını Azaltın, İç Seslendirmeyi Kırın, Algınızı Genişletin
              </h2>
              <p className="text-xs sm:text-sm text-brand-50 leading-relaxed">
                Yetişkin modülü; üniversite öğrencileri, sınavlara hazırlananlar (LGS, YKS, ALES, KPSS) ve profesyoneller için bilimsel RSVP, Pacer, Bionic Reading ve Schulte egzersizleri sunar.
              </p>
            </div>
            <Link
              href="/dashboard/adult"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-brand-700 font-black text-sm shadow-md hover:bg-brand-50 transition shrink-0"
            >
              Yetişkin Paneline Git
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Module Step-by-Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: RSVP */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  1. RSVP & ORP Flaş Okuyucu
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Kelimeler tek noktada hızlıca yanıp söner; göz satır üzerinde sıçrama yapmaz.
                </p>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>Kelimedeki <strong>kırmızı harfe (ORP)</strong> odaklanın.</li>
                <li>Hızı 250 WPM ile başlatıp aşamalı olarak 450+ WPM'e çıkarın.</li>
                <li>İleri seviyede 2'li veya 3'lü kelime öbeklemeyi (chunking) açın.</li>
              </ul>
              <Link
                href="/dashboard/adult/rsvp"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline pt-2"
              >
                RSVP Okuyucuyu Aç <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Pacer */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  2. Rehber Cetvel (Pacer)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tüm metin ekranda listelenirken ışıklı cetvel gözü yönlendirir.
                </p>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>Gözün istemsizce geriye dönmesini (regresyon) engeller.</li>
                <li>Sayfa otomatik olarak yumuşakça aşağı kayar.</li>
                <li>Ders kitapları, uzun makaleler ve e-kitaplar için idealdir.</li>
              </ul>
              <Link
                href="/dashboard/adult/rsvp"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
              >
                Pacer Modunu Dene <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Schulte Pro */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Grid className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  3. Schulte Tablosu Pro
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Periferik (çevresel) görüş alanınızı genişleten bilimsel matris.
                </p>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Merkezdeki yeşil noktaya</strong> bakın; gözü oynatmayın!</li>
                <li>3×3, 4×4, 5×5 ve 6×6 boyut seçenekleri.</li>
                <li>Kırmızı-Siyah Gorbov modu ile dikkat kontrolünüzü test edin.</li>
              </ul>
              <Link
                href="/dashboard/adult/exercises/schulte"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
              >
                Schulte Pro'yu Başlat <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4: Takistoskop */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  4. Takistoskop (İç Ses Kırıcı)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  50–150 milisaniyelik anlık flaşlarla kelimeleri yakalama eğitimi.
                </p>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>Kelimelerin içten telaffuz edilmesine fırsat bırakmaz.</li>
                <li>Kelimeleri görsel kalıp (resim) olarak tanımayı öğretir.</li>
              </ul>
              <Link
                href="/dashboard/adult/exercises/tachistoscope"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline pt-2"
              >
                Takistoskop Egzersizine Git <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 5: Piramit Okuma */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  5. Piramit Egzersizi
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Aşağı doğru genişleyen kelime bloklarıyla görme açısını büyütme.
                </p>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>Ortadaki dikey kırmızı kılavuz çizgisine odaklanın.</li>
                <li>Çizgiden ayrılmadan sağ ve soldaki kelimeleri tek bakışta yakalayın.</li>
              </ul>
              <Link
                href="/dashboard/adult/exercises/pyramid"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                Piramit Egzersizini Aç <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 6: Kendi Metnini Yükleme */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  6. PDF, EPUB ve Metin Yükleme
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Ders notlarınızı veya e-kitaplarınızı platformda hızla okuyun.
                </p>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>İstemci taraflı PDF ve EPUB ayıklayıcı (sunucuya yüklenmez).</li>
                <li>Ateşman Türkçe Okunabilirlik Puanı hesaplama.</li>
                <li>Otomatik anlama ve kavrama testi üretimi.</li>
              </ul>
              <Link
                href="/dashboard/adult/rsvp"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline pt-2"
              >
                Metin Yükle <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 15-Minute Daily Training Routine Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600" />
              Önerilen Günlük 15 Dakikalık Antrenman Programı
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  1. Aşama (0–4. Dakika)
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Göz Kası Isınması</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  1 tur Zigzag Sakkad takibi + 2 tekrar Schulte Tablosu 4×4/5×5 (Merkez odaklı).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  2. Aşama (4–11. Dakika)
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Hız & Kavrama Seansı</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  RSVP veya Rehber Cetvel ile 300–450 WPM hızında 1 metin okuma + 3 soruluk kavrama testi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  3. Aşama (11–15. Dakika)
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">İç Ses Kırma & Soğuma</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  10 soru Takistoskop (50–100 ms) + 20-20-20 kuralı ile 20 saniye uzağa bakarak dinlenme.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHILD GUIDE */}
      {activeTab === "child" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Child Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                6–12 Yaş Çocuklar & Ebeveynler İçin Rehber
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                Okumayı Seven, Hızlı ve Akıcı Okuyan Süper Gözler!
              </h2>
              <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
                Çocuk modülü; renkli heceleme, sesli telaffuz ve eğlenceli oyunlarla ilkokul öğrencilerinin heceleyerek takılmasını önler, okuma sevgisini ve özgüvenini artırır.
              </p>
            </div>
            <Link
              href="/dashboard/child"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-amber-800 font-black text-sm shadow-md hover:bg-amber-50 transition shrink-0"
            >
              Çocuk Paneline Git
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Child Card 1: Heceleme */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl">
                he-ce
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Renkli Heceleme Motoru
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Kelimeler Türkçenin hece kurallarına göre pastel renklere ayrılır.
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Çocuklar uzun kelimeleri okurken zorlanmaz. Heceleri renk renk görerek göz ritmini hızlandırır ve kelimeyi bir bütün olarak tanır.
              </p>
            </div>

            {/* Child Card 2: Sesli TTS */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Sesli Okuma (İşitsel Destek)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Kelimeleri hem gör hem de doğru telaffuzla anında dinle!
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                İkili kodlama (göz ve kulak aynı anda) sayesinde disleksi ve okuma güçlüğü çeken çocuklarda öğrenme hızı katlanır.
              </p>
            </div>

            {/* Child Card 3: Hece Avcısı */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Hece Avcısı & Kelime Oyunu
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Dağınık heceleri sırayla topla, kelimeni inşa et ve yıldız kazan!
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Çocukların çalışma belleğini ve görsel arama hızını oyunlaştırılmış eğlenceli bir formatta pekiştirir.
              </p>
            </div>

            {/* Child Card 4: Masallar */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Kademeli Masallar (1–4. Sınıf)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Yaşa ve sınıfa uygun kelime sıklığıyla hazırlanmış eğitici hikayeler.
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                1. Sınıftan 4. Sınıfa kadar sözcük zorluğu derecelendirilmiş masallar; okuma bittikten sonra kavrama soruları içerir.
              </p>
            </div>

            {/* Child Card 5: Veli Takip */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Ebeveyn Gelişim Paneli
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Çocuğunuzun okuduğu kelimeleri, hız artışını ve rozetlerini görün.
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Gelişim paneli çocuğun başarısını somutlaştırır; rozetler motivasyonu daima yüksek tutar.
              </p>
              <Link
                href="/dashboard/child/parent"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
              >
                Veli Panelini Aç <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Child Card 6: Gizlilik */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  %100 Güvenli & Reklamsız
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  COPPA ve KVKK uyumlu sıfır-sunucu çocuk güvenliği.
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Uygulama içinde reklam, zararlı bağlantı veya harici veri satışı yoktur. Çocuğunuzun tüm verileri yalnızca kendi cihazınızda saklanır.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCIENCE & ACADEMIC FOUNDATIONS */}
      {activeTab === "science" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Bilimsel Temeller & Kaynakça Özeti
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Bilişsel Psikoloji ve Göz Hareketi Literatürü
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              HızlıOku; popüler bilim iddialarını değil, hakemli dergilerde yayımlanan bilişsel psikoloji (Rayner et al., 2016), nörobilim (O'Regan & Jacobs, 1992) ve Türkçe dilbilim araştırmalarını (Ateşman, 1997) temel alır.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  Optimum Tanıma Noktası (ORP)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Gözün kelimenin ilk 1/3'lük kısmına fiksasyon yapması halinde beynin görsel işleme korteksi kelimeyi en kısa sürede çözümler. HızlıOku kelimeleri daima ORP harfi merkezli gösterir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  Bilişsel Toparlanma (Cognitive Wrap-Up)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Beyin cümle bitişlerinde duraklayarak cümleyi uzun süreli belleğe aktarır. Sistem noktalama işaretlerinde duraklama süresini 2.0x artırarak kavrama kaybını engeller.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  Ateşman Türkçe Okunabilirlik Formülü
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Türkçenin eklemeli yapısına özel geliştirilen formül ile metinlerin zorluk düzeyi 100 üzerinden bilimsel olarak derecelendirilir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  20-20-20 Dijital Göz Sağlığı
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  American Academy of Ophthalmology protokolü gereği, 20 dakikada bir 20 saniye boyunca 6 metre uzağa bakılarak astenopi ve kuru göz spazmı önlenir.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              Detaylı akademik raporu ve kaynakçayı GitHub repomuzdaki{" "}
              <a
                href="https://github.com/mserman90/hizlioku/blob/main/BILIMSEL_TEMELLER.md"
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 dark:text-brand-400 font-bold underline"
              >
                BILIMSEL_TEMELLER.md
              </a>{" "}
              belgesinden inceleyebilirsiniz.
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Bottom Section */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Pratik Klavye Kısayolları
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Okurken farenizi bırakın, klavyenizle tam kontrol sağlayın.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border rounded-lg shadow-xs">
            Boşluk: Başlat / Durdur
          </span>
          <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border rounded-lg shadow-xs">
            Ok Tuşları: Hız & Atlama
          </span>
          <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border rounded-lg shadow-xs">
            Esc: Tam Ekran
          </span>
        </div>
      </div>
    </div>
  );
}
