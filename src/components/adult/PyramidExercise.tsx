"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Eye, Play, Pause, RotateCcw, Zap, Sparkles, CheckCircle2, Sliders } from "lucide-react";
import Link from "next/link";

interface PyramidRow {
  left: string;
  right: string;
}

const DEFAULT_PYRAMID_ROWS: PyramidRow[] = [
  { left: "ak", right: "ıl" },
  { left: "göz", right: "kas" },
  { left: "hız", right: "lı" },
  { left: "odak", right: "lama" },
  { left: "bilim", right: "insan" },
  { left: "kelime", right: "öbeği" },
  { left: "düşünce", right: "algısı" },
  { left: "bilişsel", right: "kapasite" },
  { left: "genişleyen", right: "bakışlar" },
  { left: "foveal odak", right: "merkezde" },
  { left: "okuma temposu", right: "yükselecek" },
  { left: "zihniniz bütünü", right: "anında kavrar" },
  { left: "periferik görme", right: "alanı ikiye katlar" },
];

type SpeedMode = "slow" | "medium" | "fast";

const SPEED_CONFIG: Record<SpeedMode, { ms: number; label: string }> = {
  slow: { ms: 1400, label: "Yavaş (1.4 sn)" },
  medium: { ms: 900, label: "Orta (0.9 sn)" },
  fast: { ms: 550, label: "Hızlı (0.55 sn)" },
};

export const PyramidExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState<SpeedMode>("medium");
  const [currentRow, setCurrentRow] = useState(0);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = SPEED_CONFIG[speed].ms;
    timerRef.current = setInterval(() => {
      setCurrentRow((prev) => {
        const next = prev + 1;
        if (next >= DEFAULT_PYRAMID_ROWS.length) {
          setIsActive(false);
          setIsFinished(true);
          setCompletedRounds((c) => c + 1);
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, speed]);

  const handleStart = () => {
    setIsFinished(false);
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentRow(0);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Exercise Explanation Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Göz Kası & Periferik Alan Antrenmanı
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Piramit Okuma (Görsel Alan Genişletici)
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Gözlerinizi yalnızca ortadaki <strong>kırmızı fiksasyon çizgisine (•)</strong> sabitleyin. 
          Göz bebeklerinizi sağa veya sola hareket ettirmeden, yanlara doğru genişleyen kelimeleri periferik 
          (çevresel) görüşünüzle algılamaya çalışın. Bu alıştırma tek bakışta algılanan kelime öbeği genişliğini ikiye katlar.
        </p>
      </div>

      {/* Pyramid Visual Board */}
      <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-inner relative overflow-hidden flex flex-col items-center select-none">
        {/* Central Vertical Fixation Guide Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-rose-400/30 dark:bg-rose-500/30 pointer-events-none" />

        <div className="w-full max-w-lg space-y-2 relative z-10 py-4">
          {DEFAULT_PYRAMID_ROWS.map((row, idx) => {
            const isCurrent = isActive && idx === currentRow;
            const isPast = isActive && idx < currentRow;

            let rowStyle = "opacity-40 text-slate-500 dark:text-slate-500 scale-95";
            if (isCurrent) {
              rowStyle = "opacity-100 font-extrabold text-slate-950 dark:text-white scale-105 shadow-xs bg-white dark:bg-slate-900 py-1.5 px-3 rounded-2xl border-2 border-amber-400 dark:border-amber-500";
            } else if (isPast) {
              rowStyle = "opacity-75 font-semibold text-slate-700 dark:text-slate-300";
            }

            return (
              <div
                key={idx}
                className={`flex items-center justify-between text-sm sm:text-base transition-all duration-200 ${rowStyle}`}
              >
                {/* Left Expanding Word */}
                <span className="text-right flex-1 pr-4 font-mono">
                  {row.left}
                </span>

                {/* Center Fixation Anchor Marker */}
                <div className="w-3 h-3 rounded-full bg-rose-500 dark:bg-rose-400 flex-shrink-0 flex items-center justify-center shadow-xs">
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>

                {/* Right Expanding Word */}
                <span className="text-left flex-1 pl-4 font-mono">
                  {row.right}
                </span>
              </div>
            );
          })}
        </div>

        {/* Completion Modal / Card */}
        {isFinished && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-emerald-950 dark:text-emerald-100 text-sm">
              Tur Tamamlandı! Görsel Alanınız Genişletildi
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
              Son basamakta 34 karakterlik genişliğe periferik olarak odaklandınız.
            </p>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {!isActive ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleStart}
              className="flex items-center gap-2 min-w-[130px]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{currentRow === 0 ? "Başlat" : "Devam Et"}</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handlePause}
              className="flex items-center gap-2 min-w-[130px]"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Duraklat</span>
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleReset}
            className="flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Sıfırla</span>
          </Button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tempo:</span>
          {(["slow", "medium", "fast"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSpeed(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                speed === mode
                  ? "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {SPEED_CONFIG[mode].label.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Tamamlanan Tur: <span className="text-amber-600 dark:text-amber-400">{completedRounds}</span>
        </div>
      </div>
    </div>
  );
};
