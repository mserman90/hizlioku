"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FlashReader } from "@/components/child/FlashReader";
import { Sparkles, Flame, Trophy, Play, BookOpen, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ChildDashboardPage() {
  const { user } = useAuth();
  const [isPlayingFlash, setIsPlayingFlash] = useState(false);

  if (isPlayingFlash) {
    return <FlashReader onBackToMenu={() => setIsPlayingFlash(false)} />;
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

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-2xl font-bold text-sm">
              <Flame className="w-5 h-5 text-orange-600" />
              <span>3 Günlük Seri</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-2xl font-bold text-sm">
              <Trophy className="w-5 h-5 text-amber-700" />
              <span>120 Puan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flash-Reading Exercise Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Eğlenceli Alıştırma
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2">
              Flaş Okuma Alıştırmaları
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Kelimeler ve heceler ekranda belirir ve kaybolur. Gözlerinle yakala, disleksi modunu dene ve puanları topla!
            </p>
          </div>
          <Button
            type="button"
            variant="child"
            size="lg"
            fullWidth
            onClick={() => setIsPlayingFlash(true)}
            className="flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            Flaş Okumaya Başla
          </Button>
        </div>

        {/* Parent / Guardian Progress Preview */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Ebeveyn Bilgilendirme
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2">
              Veli Gözetim Alanı
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
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
