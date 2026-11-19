"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CHILD_EXERCISE_DATA, WordExerciseItem } from "@/data/childWordLists";
import { DyslexiaToolbar, DyslexiaSettings } from "./DyslexiaToolbar";
import { GamificationReward } from "./GamificationReward";
import { Button } from "@/components/ui/Button";
import { Play, Pause, RotateCcw, Sparkles, Volume2, VolumeX, ArrowLeft } from "lucide-react";

type SpeedMode = "slow" | "medium" | "fast";

const SPEED_CONFIG: Record<SpeedMode, { interval: number; label: string; badge: string }> = {
  slow: { interval: 800, label: "Yavaş (800ms)", badge: "🌱 Başlangıç" },
  medium: { interval: 500, label: "Orta (500ms)", badge: "⚡ Hızlı" },
  fast: { interval: 300, label: "Hızlı (300ms)", badge: "🚀 Şampiyon" },
};

const OVERLAY_COLORS = {
  none: "bg-white",
  warm: "bg-amber-50/80",
  blue: "bg-sky-50/80",
  mint: "bg-emerald-50/80",
  peach: "bg-rose-50/80",
};

export const FlashReader: React.FC<{ onBackToMenu?: () => void }> = ({ onBackToMenu }) => {
  // Step 1: Configuration state
  const [exerciseType, setExerciseType] = useState<"syllables" | "words" | "sentences">("words");
  const [speedMode, setSpeedMode] = useState<SpeedMode>("medium");
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Active session state
  const [items, setItems] = useState<WordExerciseItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [points, setPoints] = useState(0);

  // Dyslexia & Accessibility settings
  const [dyslexia, setDyslexia] = useState<DyslexiaSettings>({
    isDyslexicFont: true,
    letterSpacing: "wide",
    overlayColor: "warm",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize randomized batch of 12 items
  const startSession = () => {
    const pool = [...CHILD_EXERCISE_DATA[exerciseType]];
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 12);
    setItems(shuffled);
    setCurrentIndex(0);
    setIsStarted(true);
    setIsPaused(false);
    setIsFinished(false);
    setPoints(0);
  };

  const currentItem = items[currentIndex];

  const advanceNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= items.length) {
        setIsFinished(true);
        setIsStarted(false);
        setPoints(items.length * (speedMode === "fast" ? 15 : speedMode === "medium" ? 10 : 5));
        return prev;
      }
      return prev + 1;
    });
  }, [items.length, speedMode]);

  // Flash presentation timer loop
  useEffect(() => {
    if (!isStarted || isPaused || isFinished || items.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = SPEED_CONFIG[speedMode].interval;
    timerRef.current = setInterval(() => {
      advanceNext();
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isPaused, isFinished, items.length, speedMode, advanceNext]);

  // Result summary
  if (isFinished) {
    return (
      <GamificationReward
        points={points}
        completedCount={items.length}
        onRestart={startSession}
        onDone={() => {
          setIsFinished(false);
          setIsStarted(false);
          if (onBackToMenu) onBackToMenu();
        }}
      />
    );
  }

  // Configuration view before starting
  if (!isStarted) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Flaş Okuma Alıştırması</h2>
                <p className="text-xs text-slate-500">Gözlerinle kelimeleri yakala ve puan kazan!</p>
              </div>
            </div>

            {onBackToMenu && (
              <button
                type="button"
                onClick={onBackToMenu}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Geri
              </button>
            )}
          </div>

          {/* Exercise type selection */}
          <div className="space-y-4 mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Alıştırma Türü
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "syllables", label: "Heceler", desc: "Temel fonetik" },
                { id: "words", label: "Kelimeler", desc: "Kelime tanıma" },
                { id: "sentences", label: "Cümleler", desc: "Kısa cümleler" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setExerciseType(t.id as any)}
                  className={`p-4 rounded-2xl border-2 text-center transition ${
                    exerciseType === t.id
                      ? "border-amber-400 bg-amber-50 text-amber-950 font-bold shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="text-base font-bold">{t.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Speed selection */}
          <div className="space-y-4 mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Flaş Hızı
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(SPEED_CONFIG) as SpeedMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSpeedMode(mode)}
                  className={`p-4 rounded-2xl border-2 text-center transition ${
                    speedMode === mode
                      ? "border-amber-400 bg-amber-50 text-amber-950 font-bold shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="text-xs text-amber-800 font-semibold mb-1">
                    {SPEED_CONFIG[mode].badge}
                  </div>
                  <div className="text-sm font-bold capitalize">
                    {mode === "slow" ? "Yavaş" : mode === "medium" ? "Orta" : "Hızlı"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dyslexia Toolbar */}
          <div className="mb-8">
            <DyslexiaToolbar settings={dyslexia} onChange={setDyslexia} />
          </div>

          <Button
            type="button"
            variant="child"
            size="lg"
            fullWidth
            onClick={startSession}
            className="flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-current" />
            Alıştırmayı Başlat
          </Button>
        </div>
      </div>
    );
  }

  // Active flash reading viewport
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Top Controls & Progress */}
      <div className="flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => {
            setIsStarted(false);
            setIsPaused(false);
          }}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" /> Durdur ve Başa Dön
        </button>

        <div className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-amber-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Flash Presentation Box */}
      <div
        className={`w-full min-h-[260px] sm:min-h-[340px] rounded-3xl border-4 border-amber-300 shadow-xl flex items-center justify-center p-6 sm:p-12 transition-all ${
          OVERLAY_COLORS[dyslexia.overlayColor]
        } ${dyslexia.isDyslexicFont ? "font-sans tracking-wide" : "font-sans"}`}
      >
        <div
          className={`text-center font-extrabold text-slate-900 select-none animate-in fade-in zoom-in-95 duration-100 ${
            exerciseType === "sentences"
              ? "text-2xl sm:text-4xl leading-relaxed"
              : "text-4xl sm:text-6xl md:text-7xl"
          }`}
          style={{
            letterSpacing:
              dyslexia.letterSpacing === "wider"
                ? "0.2em"
                : dyslexia.letterSpacing === "wide"
                ? "0.1em"
                : "normal",
          }}
        >
          {currentItem?.text || "..."}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => setIsPaused((prev) => !prev)}
          className="flex items-center gap-2 min-w-[160px]"
        >
          {isPaused ? (
            <>
              <Play className="w-5 h-5 fill-current text-emerald-600" />
              <span>Devam Et</span>
            </>
          ) : (
            <>
              <Pause className="w-5 h-5 fill-current text-amber-600" />
              <span>Duraklat</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
