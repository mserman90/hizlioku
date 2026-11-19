"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, Zap, Grid, Activity, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdultDashboardPage() {
  const { user } = useAuth();

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

          <div className="flex items-center gap-3">
            <div className="flex flex-col px-4 py-2 bg-white/10 rounded-2xl border border-white/20">
              <span className="text-xs text-blue-200">Temel Hız</span>
              <span className="text-lg font-bold">250 WPM</span>
            </div>
            <div className="flex flex-col px-4 py-2 bg-white/10 rounded-2xl border border-white/20">
              <span className="text-xs text-blue-200">Hedef Hız</span>
              <span className="text-lg font-bold">600 WPM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              RSVP & ORP Okuyucu
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              150–1000 WPM ayarı, ORP odak harfi vurgusu ve kavrama değerlendirmesi.
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
              Schulte Tablosu (5×5)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              5x5 sayı matrisi ile periferik görme alanınızı genişletin ve algı hızınızı artırın.
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
