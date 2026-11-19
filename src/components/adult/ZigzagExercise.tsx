"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Eye, Play, Pause, RotateCcw, Zap, Sliders } from "lucide-react";

type PatternSpeed = "slow" | "medium" | "fast";

const SPEED_MS: Record<PatternSpeed, number> = {
  slow: 800,
  medium: 500,
  fast: 300,
};

export const ZigzagExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState<PatternSpeed>("medium");
  const [stepIndex, setStepIndex] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  // 12-point zigzag and peripheral tracking path coordinates (percentage X, Y)
  const ZIGZAG_WAYPOINTS = [
    { x: 10, y: 15 },
    { x: 90, y: 15 },
    { x: 10, y: 35 },
    { x: 90, y: 35 },
    { x: 10, y: 55 },
    { x: 90, y: 55 },
    { x: 10, y: 75 },
    { x: 90, y: 75 },
    { x: 50, y: 90 },
    { x: 50, y: 10 },
    { x: 10, y: 50 },
    { x: 90, y: 50 },
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = SPEED_MS[speed];
    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        const next = (prev + 1) % ZIGZAG_WAYPOINTS.length;
        if (next === 0) {
          setCompletedCycles((c) => c + 1);
        }
        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, speed, ZIGZAG_WAYPOINTS.length]);

  const currentPoint = ZIGZAG_WAYPOINTS[stepIndex];

  const handleReset = () => {
    setIsActive(false);
    setStepIndex(0);
    setCompletedCycles(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <Eye className="w-4 h-4" /> Sakkadik Göz Hareketi Egzersizi
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Zigzag & Periferik İzleme</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gözünüzü hareket eden hedef noktaya odaklayarak sıçrama hızınızı ve kontrolünüzü artırın.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-center px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Döngü</span>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100">{completedCycles}</div>
          </div>
        </div>
      </div>

      {/* Visual Tracking Stage */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-950 rounded-3xl overflow-hidden shadow-xl border-4 border-slate-800">
        {/* Subtle grid guidelines for peripheral orientation */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-white/40" />
          ))}
        </div>

        {/* Center fixation marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white/20 pointer-events-none" />

        {/* Moving Fixation Target */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all ease-linear"
          style={{
            left: `${currentPoint.x}%`,
            top: `${currentPoint.y}%`,
            transitionDuration: `${SPEED_MS[speed] * 0.9}ms`,
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing outer aura */}
            <div className="w-10 h-10 rounded-full bg-amber-400/30 animate-ping absolute" />
            {/* Core high-contrast target */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 border-2 border-white shadow-lg shadow-amber-400/80" />
          </div>
        </div>

        {!isActive && stepIndex === 0 && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 text-white">
            <p className="text-sm font-semibold mb-3 max-w-xs">
              Başlat butonuna bastığınızda gözlerinizle ekrandaki ışığı başınızı çevirmeden takip edin.
            </p>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setIsActive(true)}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Egzersizi Başlat
            </Button>
          </div>
        )}
      </div>

      {/* Speed & Playback Controls */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Speed Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Hız:</span>
          {(["slow", "medium", "fast"] as PatternSpeed[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                speed === s
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {s === "slow" ? "Yavaş (800ms)" : s === "medium" ? "Orta (500ms)" : "Hızlı (300ms)"}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Sıfırla
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={() => setIsActive((prev) => !prev)}
            className="flex items-center gap-1.5 min-w-[120px]"
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Duraklat
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Devam Et
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
