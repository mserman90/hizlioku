"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Eye, Play, Pause, RotateCcw, Zap, Sliders, Shuffle, Sparkles, Type } from "lucide-react";
import { ZIGZAG_PATTERNS, SACCADE_TARGET_WORDS, ZigzagPattern } from "@/data/exercisePools";

type PatternSpeed = "slow" | "medium" | "fast";

const SPEED_MS: Record<PatternSpeed, number> = {
  slow: 850,
  medium: 500,
  fast: 300,
};

export const ZigzagExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState<PatternSpeed>("medium");
  const [selectedPatternId, setSelectedPatternId] = useState<string>("classic-zigzag");
  const [showWordsOnTarget, setShowWordsOnTarget] = useState<boolean>(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Dynamic words mapped per waypoint index
  const [currentWords, setCurrentWords] = useState<string[]>(() =>
    [...SACCADE_TARGET_WORDS].sort(() => Math.random() - 0.5)
  );

  const activePattern =
    ZIGZAG_PATTERNS.find((p) => p.id === selectedPatternId) || ZIGZAG_PATTERNS[0];
  const waypoints = activePattern.waypoints;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleShufflePattern = () => {
    setIsActive(false);
    setStepIndex(0);
    // Shuffle words
    setCurrentWords([...SACCADE_TARGET_WORDS].sort(() => Math.random() - 0.5));
    // Pick another pattern
    const otherPatterns = ZIGZAG_PATTERNS.filter((p) => p.id !== selectedPatternId);
    const randomPattern = otherPatterns[Math.floor(Math.random() * otherPatterns.length)];
    setSelectedPatternId(randomPattern.id);
  };

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = SPEED_MS[speed];
    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        const next = (prev + 1) % waypoints.length;
        if (next === 0) {
          setCompletedCycles((c) => c + 1);
          // Reshuffle words on every completed cycle so examples change continuously
          setCurrentWords([...SACCADE_TARGET_WORDS].sort(() => Math.random() - 0.5));
        }
        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, speed, waypoints.length]);

  const currentPoint = waypoints[stepIndex % waypoints.length] || waypoints[0];
  const currentWord = currentWords[stepIndex % currentWords.length] || "ODAK";

  const handleReset = () => {
    setIsActive(false);
    setStepIndex(0);
    setCompletedCycles(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <Eye className="w-4 h-4" /> Sakkadik Göz Hareketi & Algı Egzersizi
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {activePattern.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
            {activePattern.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShufflePattern}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
            title="Deseni ve hedef kelimeleri karıştır"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Farklı Desen Seç</span>
          </button>

          <div className="text-center px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Döngü</span>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100">{completedCycles}</div>
          </div>
        </div>
      </div>

      {/* Pattern Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {ZIGZAG_PATTERNS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setIsActive(false);
              setStepIndex(0);
              setSelectedPatternId(p.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedPatternId === p.id
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Visual Tracking Stage */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-950 rounded-3xl overflow-hidden shadow-xl border-4 border-slate-800 select-none">
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
            <div className="w-12 h-12 rounded-full bg-amber-400/20 animate-ping absolute" />

            {showWordsOnTarget ? (
              /* High-contrast Word Flash Target */
              <div className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 border-2 border-white shadow-xl shadow-amber-500/50 text-slate-950 font-black text-xs font-mono tracking-wider flex items-center justify-center scale-110">
                {currentWord}
              </div>
            ) : (
              /* Core Dot Target */
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 border-2 border-white shadow-lg shadow-amber-400/80" />
            )}
          </div>
        </div>

        {!isActive && stepIndex === 0 && (
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 text-white space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
              <Eye className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-sm font-semibold max-w-xs leading-relaxed">
              Başlat butonuna bastığınızda başınızı hareket ettirmeden gözlerinizle ekrandaki hedef kelimeleri anında okumaya odaklanın.
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

      {/* Speed & Mode Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Speed Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Hız:</span>
          {(["slow", "medium", "fast"] as PatternSpeed[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                speed === s
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {s === "slow" ? "Yavaş (850ms)" : s === "medium" ? "Orta (500ms)" : "Hızlı (300ms)"}
            </button>
          ))}
        </div>

        {/* Word / Dot Mode Toggle */}
        <button
          type="button"
          onClick={() => setShowWordsOnTarget((w) => !w)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
            showWordsOnTarget
              ? "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
          }`}
          title="Nokta üzerinde değişen kelimeleri göster/gizle"
        >
          <Type className="w-3.5 h-3.5" />
          <span>{showWordsOnTarget ? "Kelimeli Sakkad (Açık)" : "Yalnızca Nokta (Sade)"}</span>
        </button>

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
