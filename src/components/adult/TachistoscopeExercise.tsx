"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Zap, Eye, RotateCcw, CheckCircle2, XCircle, Trophy, Volume2, VolumeX, Sparkles, Sliders, Shuffle } from "lucide-react";
import { playSuccessChime, playSoftThud, playMetronomeClick } from "@/lib/soundEffects";
import { generateRandomTachistoscopeSet, FlashItem, TACHISTOSCOPE_EXPANDED_BANK } from "@/data/exercisePools";

const FLASH_SPEEDS = [
  { ms: 250, label: "250 ms (Başlangıç)" },
  { ms: 180, label: "180 ms (Orta)" },
  { ms: 120, label: "120 ms (Hızlı)" },
  { ms: 75, label: "75 ms (İleri)" },
  { ms: 50, label: "50 ms (Takistoskopik Şimşek)" },
];

type ExerciseState = "idle" | "countdown" | "flashing" | "answering" | "feedback" | "finished";

export const TachistoscopeExercise: React.FC = () => {
  const [selectedSpeedMs, setSelectedSpeedMs] = useState(120);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [items, setItems] = useState<FlashItem[]>(() => generateRandomTachistoscopeSet(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exerciseState, setExerciseState] = useState<ExerciseState>("idle");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentItem = items[currentIndex] || items[0];

  const handleShuffleNewWords = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const newItems = generateRandomTachistoscopeSet(10);
    setItems(newItems);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setExerciseState("idle");
  };

  const startNextRound = (index: number) => {
    if (index >= items.length) {
      setExerciseState("finished");
      if (soundEnabled) playSuccessChime();
      return;
    }

    setCurrentIndex(index);
    setSelectedOption(null);
    setExerciseState("countdown");

    // 1. Show fixation cross for 500ms
    timerRef.current = setTimeout(() => {
      setExerciseState("flashing");
      if (soundEnabled) playMetronomeClick();

      // 2. Flash word for selected milliseconds
      timerRef.current = setTimeout(() => {
        setExerciseState("answering");
      }, selectedSpeedMs);
    }, 600);
  };

  const handleStart = () => {
    // Generate fresh set of random items on each new start
    const freshSet = generateRandomTachistoscopeSet(10);
    setItems(freshSet);
    setScore(0);
    setCurrentIndex(0);
    setSelectedOption(null);
    startNextRound(0);
  };

  const handleSelectOption = (idx: number) => {
    if (exerciseState !== "answering") return;
    setSelectedOption(idx);
    setExerciseState("feedback");

    const isCorrect = idx === currentItem.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      if (soundEnabled) playSuccessChime();
    } else {
      if (soundEnabled) playSoftThud();
    }

    // Move to next after brief feedback
    timerRef.current = setTimeout(() => {
      startNextRound(currentIndex + 1);
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Educational Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Nöral Algı & İç Ses Bastırma
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                Takistoskop (Flaş Algı) Egzersizi
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShuffleNewWords}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
              title="Havuzdan yeni 10 kelime karıştır"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Kelimeleri Değiştir</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={soundEnabled ? "Sesi Kapat" : "Sesi Aç"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-rose-500" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          İnsanların çoğu kelimeleri zihninde seslendirdiği (iç ses / subvocalization) için 250 WPM hız sınırına takılır. 
          Takistoskop, kelimeleri seslendirmeye vakit bırakmayacak kadar kısa sürede (50–120 milisaniye) flaş patlatarak 
          beynin doğrudan <strong>görsel-kavramsal tanıma</strong> devresini çalıştırır. Her seansta {TACHISTOSCOPE_EXPANDED_BANK.length}+ kelimelik geniş havuzdan rastgele yeni kelimeler seçilir.
        </p>
      </div>

      {/* Speed & Setting Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Flaş Süresi:
          </span>
          <select
            value={selectedSpeedMs}
            onChange={(e) => setSelectedSpeedMs(Number(e.target.value))}
            disabled={exerciseState !== "idle" && exerciseState !== "finished"}
            className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-3 py-1.5 font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            {FLASH_SPEEDS.map((sp) => (
              <option key={sp.ms} value={sp.ms}>
                {sp.label}
              </option>
            ))}
          </select>
        </div>

        <div className="font-bold text-slate-500 dark:text-slate-400">
          İlerleme: {exerciseState !== "idle" && exerciseState !== "finished" ? `${currentIndex + 1} / ${items.length}` : `${items.length} Kelimelik Rastgele Set`}
        </div>
      </div>

      {/* Main Flash Screen */}
      <div className="bg-slate-950 rounded-3xl min-h-[260px] sm:min-h-[300px] border-2 border-slate-800 flex flex-col items-center justify-center p-6 text-center select-none shadow-inner relative overflow-hidden">
        {exerciseState === "idle" && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-950/60 text-rose-400 flex items-center justify-center mx-auto border border-rose-800/60">
              <Eye className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Hazır mısınız?</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Ekrana anlık bir kelime parlayacak. Gözünüzü merkezdeki artı işaretine sabitleyin.
              </p>
            </div>
            <Button variant="primary" size="lg" onClick={handleStart} className="min-w-[160px]">
              Alıştırmayı Başlat
            </Button>
          </div>
        )}

        {exerciseState === "countdown" && (
          <div className="text-rose-500 text-6xl font-black font-mono animate-pulse">
            +
          </div>
        )}

        {exerciseState === "flashing" && (
          <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-wide animate-in zoom-in-95 duration-75">
            {currentItem.prompt}
          </div>
        )}

        {(exerciseState === "answering" || exerciseState === "feedback") && (
          <div className="w-full max-w-md space-y-4 animate-in fade-in duration-150">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Gördüğünüz Kelimeyi Seçin
            </span>

            <div className="grid grid-cols-2 gap-3">
              {currentItem.options.map((opt, idx) => {
                let btnStyle = "bg-slate-800 border-slate-700 text-white hover:bg-slate-700";
                if (exerciseState === "feedback") {
                  if (idx === currentItem.correctIndex) {
                    btnStyle = "bg-emerald-600 border-emerald-500 text-white font-bold ring-2 ring-emerald-400";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-rose-600 border-rose-500 text-white line-through";
                  } else {
                    btnStyle = "bg-slate-800 opacity-40 text-slate-400";
                  }
                }

                return (
                  <button
                    key={`${opt}-${idx}`}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={exerciseState === "feedback"}
                    className={`p-3.5 rounded-xl border text-sm font-semibold transition text-center cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {exerciseState === "finished" && (
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto text-2xl font-black">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Seans Tamamlandı!</h3>
              <p className="text-sm text-slate-300 mt-1">
                Doğru Algılama: <strong className="text-emerald-400 font-extrabold">{score} / {items.length}</strong> (%{Math.round((score / items.length) * 100)})
              </p>
              <div className="text-xs text-rose-300 mt-2 font-medium bg-rose-950/40 p-2.5 rounded-xl border border-rose-900 inline-block">
                ⚡ {selectedSpeedMs} milisaniyede iç seslendirme olmadan algıladınız!
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button variant="primary" size="md" onClick={handleStart} className="flex items-center gap-2">
                <Shuffle className="w-4 h-4" /> Yeni Kelimelerle Başlat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
