"use client";

import React from "react";
import { TrendingUp, Award, Clock, Activity, CheckCircle2 } from "lucide-react";

export interface SessionRecord {
  id: string;
  date: string;
  wpm: number;
  comprehensionScore: number;
  wordCount: number;
  durationSeconds: number;
}

interface AnalyticsChartsProps {
  sessions?: SessionRecord[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  sessions = [
    { id: "1", date: "Pzt", wpm: 220, comprehensionScore: 70, wordCount: 150, durationSeconds: 41 },
    { id: "2", date: "Sal", wpm: 260, comprehensionScore: 80, wordCount: 200, durationSeconds: 46 },
    { id: "3", date: "Çar", wpm: 290, comprehensionScore: 75, wordCount: 250, durationSeconds: 52 },
    { id: "4", date: "Per", wpm: 320, comprehensionScore: 85, wordCount: 280, durationSeconds: 52 },
    { id: "5", date: "Cum", wpm: 350, comprehensionScore: 90, wordCount: 350, durationSeconds: 60 },
    { id: "6", date: "Cmt", wpm: 380, comprehensionScore: 80, wordCount: 400, durationSeconds: 63 },
    { id: "7", date: "Paz", wpm: 410, comprehensionScore: 95, wordCount: 450, durationSeconds: 66 },
  ],
}) => {
  const maxWpm = Math.max(...sessions.map((s) => s.wpm), 500);
  const avgWpm = Math.round(
    sessions.reduce((acc, s) => acc + s.wpm, 0) / (sessions.length || 1)
  );
  const avgComprehension = Math.round(
    sessions.reduce((acc, s) => acc + s.comprehensionScore, 0) / (sessions.length || 1)
  );
  const totalWords = sessions.reduce((acc, s) => acc + s.wordCount, 0);

  return (
    <div className="space-y-6">
      {/* Metrics Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <TrendingUp className="w-4 h-4 text-brand-600" />
            Ortalama Hız
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {avgWpm} <span className="text-xs font-semibold text-slate-500">WPM</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Ortalama Kavrama
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            %{avgComprehension}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Activity className="w-4 h-4 text-indigo-600" />
            Toplam Oturum
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {sessions.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Award className="w-4 h-4 text-amber-500" />
            Okunan Kelime
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalWords.toLocaleString("tr-TR")}
          </div>
        </div>
      </div>

      {/* WPM Trend Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Haftalık WPM Gelişimi</h3>
            <p className="text-xs text-slate-500">Son oturumlardaki okuma hızı trendi</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-700">
            En Yüksek: {Math.max(...sessions.map((s) => s.wpm))} WPM
          </span>
        </div>

        {/* Responsive Bar Visualization */}
        <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-6 border-b border-slate-100">
          {sessions.map((session) => {
            const heightPercent = Math.max(10, Math.round((session.wpm / maxWpm) * 100));
            return (
              <div
                key={session.id}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                {/* Value on hover */}
                <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                  {session.wpm}
                </div>
                {/* Bar */}
                <div
                  className="w-full max-w-[48px] bg-gradient-to-t from-brand-600 to-indigo-500 rounded-t-xl transition-all duration-300 group-hover:from-brand-700 group-hover:to-indigo-600 shadow-sm"
                  style={{ height: `${heightPercent}%` }}
                />
                {/* Label */}
                <span className="text-xs font-bold text-slate-600 pt-1">
                  {session.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehension vs Speed Insight */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Kavrama & Odak Dengesi</h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Hızlı okuma alıştırmalarında kavrama oranının %75 ve üzerinde tutulması pedagojik olarak tavsiye edilir. Kavrama %70 altına indiğinde hızı 25-50 WPM düşürerek göz kaslarınızı adapte edebilirsiniz.
        </p>

        <div className="space-y-3">
          {sessions.slice(-4).map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">{s.date} Seansı</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 font-semibold">{s.wpm} WPM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      s.comprehensionScore >= 80
                        ? "bg-emerald-500"
                        : s.comprehensionScore >= 70
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${s.comprehensionScore}%` }}
                  />
                </div>
                <span className="font-bold text-slate-700 w-10 text-right">
                  %{s.comprehensionScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
