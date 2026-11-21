"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { FlashReader } from "@/components/child/FlashReader";
import { SyllableBuilderGame } from "@/components/child/SyllableBuilderGame";
import { loadChildProgress } from "@/lib/childProgress";
import { Sparkles, Flame, Trophy, Play, BookOpen, ShieldCheck, Heart, Puzzle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ChildDashboardPage() {
  const { user } = useAuth();
  const [activeActivity, setActiveActivity] = useState<"menu" | "flash" | "syllable">("menu");
  const [childStats, setChildStats] = useState({ streakDays: 3, totalPoints: 120 });

  useEffect(() => {
    const progress = loadChildProgress();
    setChildStats({
      streakDays: progress.streakDays,
      totalPoints: progress.totalPoints,
    });
  }, [activeActivity]);

  if (activeActivity === "flash") {
    return <FlashReader onBackToMenu={() => setActiveActivity("menu")} />;
  }

  if (activeActivity === "syllable") {
    return <SyllableBuilderGame onBackToMenu={() => setActiveActivity("menu")} />;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 text-amber-950 font-bold text-xs mb-2">
              <Sparkles className="w-4 h-4" /> Çocuk Okuma Alanı (6–12 Yaş)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Merhaba, {user?.displayName || "Küçük Okur"}! 🚀
            </h1>
            <p className="text-sm font-medium opacity-90 mt-1 max-w-lg">
              Bugün gözlerini ve kelime dağarcığını geliştirmek için harika bir gün.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/guide"
              className="flex items-center gap-1.5 px-4 py-2 bg-white/70 hover:bg-white rounded-2xl font-bold text-xs text-amber-950 transition shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Nasıl Oynanır?</span>
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-2xl font-bold text-sm">
              <Flame className="w-5 h-5 text-orange-600" />
              <span>{childStats.streakDays} Günlük Seri</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-2xl font-bold text-sm">
              <Trophy className="w-5 h-5 text-amber-700" />
              <span>{childStats.totalPoints} Puan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Flash-Reading Exercise Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-amber-300 dark:border-amber-800/80 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Eğlenceli Alıştırma 1
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Flaş Okuma Alıştırmaları
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Kelimeler ekranda parlar ve kaybolur. Renkli heceleme ve sesli telaffuz ile okuma hızını artır!
            </p>
          </div>
          <Button
            type="button"
            variant="child"
            size="lg"
            fullWidth
            onClick={() => setActiveActivity("flash")}
            className="flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            Flaş Okumaya Başla
          </Button>
        </div>

        {/* Syllable Catcher / Word Builder Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-orange-300 dark:border-orange-800/80 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Puzzle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
              Eğlenceli Alıştırma 2
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Hece Avcısı & Kelime İnşa
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Karışık heceleri doğru sırayla birleştirerek kelimeleri inşa et, sesini dinle ve yıldızları topla!
            </p>
          </div>
          <Button
            type="button"
            variant="child"
            size="lg"
            fullWidth
            onClick={() => setActiveActivity("syllable")}
            className="flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            Oyuna Başla
          </Button>
        </div>

        {/* Parent / Guardian Progress Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Ebeveyn Bilgilendirme
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1 mb-2">
              Veli Gözetim Alanı
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Veliniz tamamladığınız seansları, serinizi ve kazandığınız başarı rozetlerini buradan inceleyebilir.
            </p>
          </div>
          <Link href="/dashboard/child/parent">
            <Button variant="secondary" fullWidth size="lg">
              Veli İlerleme Sayfasını Aç
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
