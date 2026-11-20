"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Parent / Guardian Progress View: Adheres to data minimization principles.
// Displays aggregate milestone achievements without behavioral profiling.

import React, { useState, useEffect } from "react";
import { ShieldCheck, Flame, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { loadChildProgress, ChildMilestoneSummary } from "@/lib/childProgress";

interface ParentProgressProps {
  childName?: string;
  sessionsCompleted?: number;
  streakDays?: number;
  badges?: string[];
}

export const ParentProgressView: React.FC<ParentProgressProps> = ({
  childName = "Çocuğunuz",
  sessionsCompleted: propSessions,
  streakDays: propStreak,
  badges: propBadges,
}) => {
  const [data, setData] = useState<ChildMilestoneSummary>({
    sessionsCompleted: propSessions ?? 4,
    streakDays: propStreak ?? 3,
    badges: propBadges ?? ["İlk Adım", "3 Günlük Seri", "Kelime Avcısı"],
    totalPoints: 120,
  });

  useEffect(() => {
    const loaded = loadChildProgress();
    setData({
      sessionsCompleted: propSessions ?? loaded.sessionsCompleted,
      streakDays: propStreak ?? loaded.streakDays,
      badges: propBadges ?? loaded.badges,
      totalPoints: loaded.totalPoints,
    });
  }, [propSessions, propStreak, propBadges]);

  const { sessionsCompleted, streakDays, badges } = data;
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Veli Gözetim Paneli
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {childName} — Gelişim Özeti
            </h1>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Çocuk güvenliği politikamız gereği, çocuğunuzun detaylı okuma davranışları veya süre takipleri kaydedilmez. Yalnızca tamamlanan egzersiz dönüm noktaları gösterilir.
        </p>
      </div>

      {/* Aggregate Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Düzenli Çalışma</span>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
              {streakDays} Günlük Seri
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Tamamlanan Seans</span>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
              {sessionsCompleted} Oturum
            </div>
          </div>
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4 font-bold text-slate-900 dark:text-slate-100">
          <Trophy className="w-5 h-5 text-amber-500" />
          Kazanılan Başarı Rozetleri
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center gap-2.5 text-xs font-bold text-amber-950 dark:text-amber-200"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-300 flex items-center justify-center text-sm shadow-xs">
                🌟
              </div>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-2">
        <Link href="/dashboard/child">
          <Button variant="secondary" size="md">
            Çocuk Paneline Dön
          </Button>
        </Link>
      </div>
    </div>
  );
};
