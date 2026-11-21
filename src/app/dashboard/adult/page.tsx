"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, Zap, Grid, Activity, ArrowRight, Compass, Triangle, Flame, BookOpen, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { loadSessionHistory, computeSessionStats } from "@/lib/sessionHistory";
import { loadUserGoals, computeDailyProgress } from "@/lib/userGoals";

export default function AdultDashboardPage() {
  const { user } = useAuth();
  const [statsSummary, setStatsSummary] = useState({
    avgWpm: 280,
    targetWpm: 500,
    streakDays: 3,
    todayProgressPercent: 40,
  });

  useEffect(() => {
    const sessions = loadSessionHistory();
    const goals = loadUserGoals();
    const stats = computeSessionStats(sessions);
    const progress = computeDailyProgress(sessions, goals);

    setStatsSummary({
      avgWpm: stats.avgWpm || 280,
      targetWpm: goals.targetWpm || 500,
      streakDays: progress.currentStreakDays,
      todayProgressPercent: progress.overallPercent,
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-semibold text-xs mb-2">
              <Zap className="w-4 h-4 text-amber-300" /> Yetişkin Okuma Alanı (13+ Yaş)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hoş Geldiniz, {user?.displayName || "Okuyucu"}
            </h1>
            <p className="text-sm text-blue-100 mt-1 max-w-lg">
              Hızlı okuma ve odaklanma antrenmanlarınıza başlamak için modül seçin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/guide"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 transition text-xs font-bold text-white shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Kullanım Kılavuzu</span>
            </Link>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-white/10 rounded-2xl border border-white/20">
              <Flame className="w-5 h-5 text-amber-300" />
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-200">Okuma Serisi</span>
                <span className="text-sm font-bold">{statsSummary.streakDays} Gün</span>
              </div>
            </div>

            <div className="flex flex-col px-3.5 py-2 bg-white/10 rounded-2xl border border-white/20">
              <span className="text-[10px] text-blue-200">Ortalama Hız</span>
              <span className="text-sm font-bold">{statsSummary.avgWpm} WPM</span>
            </div>

            <div className="flex flex-col px-3.5 py-2 bg-white/10 rounded-2xl border border-white/20">
              <span className="text-[10px] text-blue-200">Hedef Hız</span>
              <span className="text-sm font-bold text-amber-300">{statsSummary.targetWpm} WPM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Beginner Guided Roadmap: "Nereden Başlamalıyım?" */}
      <div className="bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-indigo-500/10 rounded-3xl p-6 sm:p-7 border border-amber-200/80 dark:border-amber-900/60 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Yeni Kullanıcı Rehberi
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                Nereden Başlamalıyım? (İlk Gün Yol Haritası)
              </h2>
            </div>
          </div>
          <Link
            href="/guide"
            className="text-xs font-bold text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Detaylı Kılavuzu Aç</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Hızlı okuma bir yetenek değil; göz kası koordinasyonu ve zihinsel odaklanma antrenmanıdır. Karmaşık hissetmenize hiç gerek yok, günde yalnızca <strong>15 dakikanızı</strong> şu 3 adıma ayırarak başlayın:
        </p>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {/* Step 1 */}
          <Link
            href="/dashboard/adult/exercises/zigzag"
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                  1. Adım • 3 Dakika
                </span>
                <Compass className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition">
                Göz Kaslarını Isıtın
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>Zigzag</strong> veya <strong>Piramit</strong> ile gözünüzü merkezde tutarak çevresel görüşü açın.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Isınmaya Başla →
            </span>
          </Link>

          {/* Step 2 */}
          <Link
            href="/dashboard/adult/exercises/schulte"
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300">
                  2. Adım • 4 Dakika
                </span>
                <Grid className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                Odaklanmayı Keskinleştirin
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>Schulte Tablosu 3×3 veya 4×4</strong> ile gözü merkez noktada sabit tutup sayıları yakalayın.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Dikkati Topla →
            </span>
          </Link>

          {/* Step 3 */}
          <Link
            href="/dashboard/adult/rsvp"
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-950/70 text-brand-800 dark:text-brand-300">
                  3. Adım • 8 Dakika (Ana Modül)
                </span>
                <Eye className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition">
                İlk Hızlı Okumanızı Yapın
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>RSVP Okuyucu</strong> ile bir metin seçin, 250 WPM hızda okuyup kavrama testinizi tamamlayın.
              </p>
            </div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Okumayı Başlat →
            </span>
          </Link>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* RSVP Reader Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-brand-200 dark:border-brand-800/60 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Ana Modül
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              RSVP & Rehber Pacer Okuyucu
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Tek kelime RSVP flaş veya tüm metin üzerinde akıcı Rehber Cetvel (Pacer) ile regresyonsuz okuma.
            </p>
          </div>
          <Link href="/dashboard/adult/rsvp">
            <Button variant="primary" fullWidth size="md" className="flex items-center justify-center gap-2">
              <span>Okumaya Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Schulte Table Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Grid className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Göz Kası Antrenmanı 1
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Schulte Tablosu Pro
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              3×3–6×6 matrisler, harf ve Kırmızı-Siyah (Gorbov) modları ile periferik görüş ve dikkat kontrolü.
            </p>
          </div>
          <Link href="/dashboard/adult/exercises/schulte">
            <Button variant="secondary" fullWidth size="md" className="flex items-center justify-center gap-2">
              <span>Egzersizi Aç</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Zigzag Saccade Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Göz Kası Antrenmanı 2
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Zigzag & Sakkad Takibi
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Dinamik sıçrama egzersizi ile göz koordinasyonunuzu ve sıçrama hızınızı artırın.
            </p>
          </div>
          <Link href="/dashboard/adult/exercises/zigzag">
            <Button variant="secondary" fullWidth size="md" className="flex items-center justify-center gap-2">
              <span>Egzersizi Aç</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Pyramid Peripheral Expansion Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Triangle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Göz Kası Antrenmanı 3
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Piramit Okuma (Görsel Alan)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Merkez fiksasyon hattıyla periferik görüşünüzü yanlara doğru genişletip bakış açınızı ikiye katlayın.
            </p>
          </div>
          <Link href="/dashboard/adult/exercises/pyramid">
            <Button variant="secondary" fullWidth size="md" className="flex items-center justify-center gap-2">
              <span>Egzersizi Aç</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Tachistoscope Subvocalization Breaker Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Bilişsel Antrenman 4
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Takistoskop & İç Ses Bastırma
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              50–250 ms aralığında şimşek kelime flaşlarıyla iç seslendirmeyi devreden çıkarıp doğrudan algılayın.
            </p>
          </div>
          <Link href="/dashboard/adult/exercises/tachistoscope">
            <Button variant="secondary" fullWidth size="md" className="flex items-center justify-center gap-2">
              <span>Egzersizi Aç</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Analytics Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Gelişim Takibi
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Analitik & Trendler
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Haftalık WPM değişim eğriniz, ortalama kavrama yüzdeniz ve hedef tempo asistanı.
            </p>
          </div>
          <Link href="/dashboard/adult/analytics">
            <Button variant="secondary" fullWidth size="md" className="flex items-center justify-center gap-2">
              <span>Analitiği Gör</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
