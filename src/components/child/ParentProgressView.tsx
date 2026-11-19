"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Parent / Guardian Progress View: Adheres to data minimization principles.
// Displays aggregate milestone achievements without behavioral profiling.

import React from "react";
import { ShieldCheck, Flame, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ParentProgressProps {
  childName?: string;
  sessionsCompleted?: number;
  streakDays?: number;
  badges?: string[];
}

export const ParentProgressView: React.FC<ParentProgressProps> = ({
  childName = "Çocuğunuz",
  sessionsCompleted = 4,
  streakDays = 3,
  badges = ["İlk Adım", "3 Günlük Seri", "Kelime Avcısı"],
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Veli Gözetim Paneli
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              {childName} — Gelişim Özeti
            </h1>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Çocuk güvenliği politikamız gereği, çocuğunuzun detaylı okuma davranışları veya süre takipleri kaydedilmez. Yalnızca tamamlanan egzersiz dönüm noktaları gösterilir.
        </p>
      </div>

      {/* Aggregate Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Düzenli Çalışma</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {streakDays} Günlük Seri
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Tamamlanan Seans</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {sessionsCompleted} Oturum
            </div>
          </div>
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 font-bold text-slate-900">
          <Trophy className="w-5 h-5 text-amber-500" />
          Kazanılan Başarı Rozetleri
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-2.5 text-xs font-bold text-amber-950"
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
