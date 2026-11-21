"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  Grid,
  Trophy,
  RotateCcw,
  Play,
  Eye,
  Sliders,
  Volume2,
  VolumeX,
  Sparkles,
  CircleDot,
} from "lucide-react";
import {
  SchulteGridSize,
  SchulteMode,
  SchulteCell,
  SchulteTarget,
  generateSchulteGrid,
  generateTargetSequence,
  saveSchulteScore,
  getBestSchulteScore,
  SchulteScoreRecord,
} from "@/lib/schulteEngine";
import {
  playCorrectClick,
  playSoftThud,
  playSuccessChime,
} from "@/lib/soundEffects";

export const SchulteTable: React.FC = () => {
  // Configuration
  const [size, setSize] = useState<SchulteGridSize>(5);
  const [mode, setMode] = useState<SchulteMode>("numbers");
  const [showCenterDot, setShowCenterDot] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Game State
  const [grid, setGrid] = useState<SchulteCell[]>([]);
  const [targets, setTargets] = useState<SchulteTarget[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [lastSavedScore, setLastSavedScore] = useState<SchulteScoreRecord | null>(null);

  // Personal Best for current size/mode
  const [bestScore, setBestScore] = useState<SchulteScoreRecord | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Refresh best score on size/mode change or component mount
  useEffect(() => {
    setBestScore(getBestSchulteScore(size, mode));
  }, [size, mode, isCompleted]);

  // Start new exercise
  const initializeGrid = () => {
    const newTargets = generateTargetSequence(size, mode);
    const newGrid = generateSchulteGrid(size, mode);

    setTargets(newTargets);
    setGrid(newGrid);
    setCurrentStepIndex(0);
    setElapsedTime(0);
    setMistakes(0);
    setIsCompleted(false);
    setIsActive(true);
  };

  // Timer loop
  useEffect(() => {
    if (!isActive || isCompleted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const start = Date.now() - elapsedTime * 1000;
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 1000));
    }, 200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isCompleted]);

  const currentTarget = targets[currentStepIndex];

  const handleCellClick = (cell: SchulteCell) => {
    if (!isActive || isCompleted || !currentTarget) return;

    if (cell.orderIndex === currentStepIndex) {
      if (soundEnabled) playCorrectClick();

      if (currentStepIndex === targets.length - 1) {
        // Complete
        setIsCompleted(true);
        setIsActive(false);
        if (soundEnabled) playSuccessChime();

        const saved = saveSchulteScore({
          size,
          mode,
          durationSeconds: elapsedTime,
          mistakes,
        });
        setLastSavedScore(saved);
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    } else {
      if (soundEnabled) playSoftThud();
      setMistakes((prev) => prev + 1);
    }
  };

  const getGridColsClass = () => {
    switch (size) {
      case 3:
        return "grid-cols-3 max-w-xs";
      case 4:
        return "grid-cols-4 max-w-sm";
      case 5:
        return "grid-cols-5 max-w-md";
      case 6:
        return "grid-cols-6 max-w-lg";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Exercise Information Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <Eye className="w-4 h-4" /> Periferik Görme & Bilişsel Tarama
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Schulte Tablosu Pro ({size}×{size})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gözünüzü merkezdeki noktaya sabitleyin; çevresel görüşünüzle sıradaki hedefi bulun.
          </p>
        </div>

        {/* Live Counters */}
        {isActive && currentTarget && (
          <div className="flex items-center gap-3">
            <div className="text-center px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Süre</span>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100">{elapsedTime}s</div>
            </div>
            <div className="text-center px-4 py-1.5 bg-brand-50 dark:bg-brand-950/50 rounded-xl border border-brand-200 dark:border-brand-800">
              <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold uppercase">Hedef</span>
              <div className="flex items-center justify-center gap-1.5">
                <span
                  className={`text-xl font-black ${
                    currentTarget.color === "red"
                      ? "text-rose-600 dark:text-rose-400"
                      : currentTarget.color === "black"
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-brand-700 dark:text-brand-300"
                  }`}
                >
                  {currentTarget.display}
                </span>
                {currentTarget.color !== "default" && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      currentTarget.color === "red"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                        : "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {currentTarget.color === "red" ? "Kırmızı" : "Siyah"}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls & Configuration Toolbar */}
      {!isActive && !isCompleted && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Antrenman Seçenekleri
            </span>
            {bestScore && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                <Trophy className="w-3.5 h-3.5" /> En İyi: {bestScore.durationSeconds} sn
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Grid Size Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Tablo Boyutu
              </label>
              <div className="grid grid-cols-4 gap-2">
                {([3, 4, 5, 6] as SchulteGridSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-2 px-3 text-xs font-black rounded-xl border transition cursor-pointer ${
                      size === s
                        ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {s}×{s}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Egzersiz Modu
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "numbers", label: "Sayılar" },
                  { id: "letters", label: "Harfler" },
                  { id: "gorbov", label: "Kırmızı/Siyah" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as SchulteMode)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition cursor-pointer truncate ${
                      mode === m.id
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                    title={m.label}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowCenterDot((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
            >
              <CircleDot className={`w-4 h-4 ${showCenterDot ? "text-emerald-500" : "text-slate-400"}`} />
              Merkez Odak Noktası: {showCenterDot ? "Açık" : "Kapalı"}
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  Ses Efektleri: Açık
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  Ses Efektleri: Kapalı
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      {!isActive && !isCompleted ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Grid className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {size}×{size} {mode === "gorbov" ? "Kırmızı-Siyah Gorbov" : mode === "letters" ? "Harf" : "Sayı"} Tablosu
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto mt-2 leading-relaxed">
              {mode === "gorbov"
                ? "Dikkat kontrolünüzü test edin! Sırayla 1 Siyah, 1 Kırmızı, 2 Siyah, 2 Kırmızı şeklinde ilerleyin."
                : mode === "letters"
                ? "Bakışınızı merkezde tutun ve A'dan başlayarak alfabeyi sırayla takip edin."
                : "Bakışlarınızı merkezde sabitleyin ve gözünüzü oynatmadan 1'den sırayla sayıları tıklayın."}
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={initializeGrid}
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            Egzersizi Başlat
          </Button>
        </div>
      ) : isCompleted ? (
        /* Completion & Results Screen */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">Tebrikler, Tamamladınız!</h3>
              {lastSavedScore?.isPersonalBest && (
                <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Yeni Rekor!
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {size}×{size} {mode} tablosunda çevresel algı ve hız reflekslerinizi geliştirdiniz.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 font-bold uppercase">Toplam Süre</span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">{elapsedTime} sn</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 font-bold uppercase">Hatalı Tıklama</span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">{mistakes}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={initializeGrid}
              className="flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Tekrar Oyna
            </Button>
          </div>
        </div>
      ) : (
        /* Active Schulte Interactive Grid */
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
          <div className={`grid gap-2 sm:gap-3 aspect-square w-full mx-auto relative ${getGridColsClass()}`}>
            {grid.map((cell) => {
              const isFound = cell.orderIndex < currentStepIndex;

              let textColorClass = "text-slate-800 dark:text-slate-100";
              if (cell.color === "red") textColorClass = "text-rose-600 dark:text-rose-400 font-black";
              if (cell.color === "black") textColorClass = "text-slate-950 dark:text-slate-50 font-black";

              return (
                <button
                  key={cell.id}
                  type="button"
                  onClick={() => handleCellClick(cell)}
                  className={`rounded-2xl text-lg sm:text-2xl font-black transition-all flex items-center justify-center aspect-square select-none active:scale-95 cursor-pointer ${
                    isFound
                      ? "bg-slate-100 dark:bg-slate-800/40 text-slate-300 dark:text-slate-600 cursor-default border border-transparent opacity-40"
                      : cell.color === "red"
                      ? "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 hover:scale-[1.02] shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-50 dark:hover:bg-brand-900/40 hover:text-brand-600 dark:hover:text-brand-300 hover:scale-[1.02] shadow-xs"
                  } ${textColorClass}`}
                >
                  {cell.display}
                </button>
              );
            })}

            {/* Center Fixation Anchor Dot */}
            {showCenterDot && (
              <div
                className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-emerald-500 shadow-lg pointer-events-none ring-4 ring-emerald-500/20 animate-pulse"
                title="Merkez Odak Noktası"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
