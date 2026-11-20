"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Award, Clock, Activity, CheckCircle2, RotateCcw } from "lucide-react";
import { loadSessionHistory, computeSessionStats, ReadingSessionRecord } from "@/lib/sessionHistory";

interface AnalyticsChartsProps {
  sessions?: ReadingSessionRecord[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  sessions: propSessions,
}) => {
  const [sessions, setSessions] = useState<ReadingSessionRecord[]>(propSessions || []);

  useEffect(() => {
    if (!propSessions) {
      setSessions(loadSessionHistory());
    }
  }, [propSessions]);

  const stats = computeSessionStats(sessions);
  const maxWpm = Math.max(stats.maxWpm, 500);
  const displaySessions = sessions.slice(-7);

  return (
    <div className="space-y-6">
      {/* Metrics Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase mb-1">
            <TrendingUp className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            Ortalama Hız
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {stats.avgWpm} <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">WPM</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Ortalama Kavrama
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            %{stats.avgComprehension}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase mb-1">
            <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Toplam Oturum
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {sessions.length}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase mb-1">
            <Award className="w-4 h-4 text-amber-500" />
            Okunan Kelime
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {stats.totalWords.toLocaleString("tr-TR")}
          </div>
        </div>
      </div>

      {/* WPM Trend Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Haftalık WPM Gelişimi</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Son oturumlardaki okuma hızı trendi</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300">
            En Yüksek: {stats.maxWpm} WPM
          </span>
        </div>

        {/* Responsive Bar Visualization */}
        <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-6 border-b border-slate-100 dark:border-slate-800">
          {displaySessions.map((session) => {
            const heightPercent = Math.max(10, Math.round((session.wpm / maxWpm) * 100));
            return (
              <div
                key={session.id}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                {/* Value on hover */}
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition">
                  {session.wpm}
                </div>
                {/* Bar */}
                <div
                  className="w-full max-w-[48px] bg-gradient-to-t from-brand-600 to-indigo-500 rounded-t-xl transition-all duration-300 group-hover:from-brand-700 group-hover:to-indigo-600 shadow-sm"
                  style={{ height: `${heightPercent}%` }}
                />
                {/* Label */}
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 pt-1">
                  {session.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehension vs Speed Insight */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Kavrama & Odak Dengesi</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          Hızlı okuma alıştırmalarında kavrama oranının %75 ve üzerinde tutulması pedagojik olarak tavsiye edilir. Kavrama %70 altına indiğinde hızı 25-50 WPM düşürerek göz kaslarınızı adapte edebilirsiniz.
        </p>

        <div className="space-y-3">
          {sessions.slice(-4).map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2 max-w-[50%] truncate">
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                  {s.textTitle || `${s.date} Seansı`}
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap">{s.wpm} WPM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-32 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
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
                <span className="font-bold text-slate-700 dark:text-slate-200 w-10 text-right">
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
