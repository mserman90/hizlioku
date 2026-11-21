"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Zap, ArrowRight } from "lucide-react";
import { getOrpIndex } from "@/lib/readingUtils";
import Link from "next/link";

const DEMO_WORDS = [
  "HızlıOku",
  "bilimsel",
  "yöntemlerle",
  "okuma",
  "hızınızı",
  "ve",
  "kavrama",
  "oranınızı",
  "artırır.",
  "Gözleriniz",
  "satır",
  "üzerinde",
  "yorulmadan",
  "kelimeleri",
  "optimum",
  "noktasından",
  "yakalar.",
];

export const HeroDemo: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wpm, setWpm] = useState(350);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const intervalMs = Math.round(60000 / wpm);
    timerRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % DEMO_WORDS.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, index, wpm]);

  const currentWord = DEMO_WORDS[index];
  const orpIdx = getOrpIndex(currentWord);
  const prefix = currentWord.slice(0, orpIdx);
  const orpChar = currentWord.charAt(orpIdx);
  const suffix = currentWord.slice(orpIdx + 1);

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl shadow-brand-500/5 backdrop-blur-md transition-all">
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400 uppercase tracking-wider text-[11px]">
          <Zap className="w-3.5 h-3.5 fill-current" /> Canlı RSVP & ORP Önizleme
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold">
          {wpm} WPM
        </span>
      </div>

      {/* RSVP Focus Window */}
      <div className="relative py-8 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center justify-center overflow-hidden">
        {/* Soft Radial Focus Glow */}
        <div className="absolute inset-0 m-auto w-32 h-20 rounded-full bg-rose-500/10 dark:bg-rose-400/15 pointer-events-none blur-xl" />

        {/* Top Marker */}
        <div className="w-1.5 h-3 bg-rose-500 dark:bg-rose-400 rounded-full mb-2 opacity-90" />

        {/* Word Display with Monospace balance */}
        <div className="font-mono text-3xl sm:text-4xl font-black flex items-baseline justify-center tracking-normal select-none">
          <span className="text-right text-slate-800 dark:text-slate-200 min-w-[100px] sm:min-w-[130px]">
            {prefix}
          </span>
          <span className="text-rose-600 dark:text-rose-400 font-black px-0.5 scale-110 drop-shadow-xs">
            {orpChar}
          </span>
          <span className="text-left text-slate-800 dark:text-slate-200 min-w-[100px] sm:min-w-[130px]">
            {suffix}
          </span>
        </div>

        {/* Bottom Marker */}
        <div className="w-1.5 h-3 bg-rose-500 dark:bg-rose-400 rounded-full mt-2 opacity-90" />
      </div>

      {/* Demo Controls */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-2">
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" /> Durdur
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" /> Başlat
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          {[250, 350, 500].map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => setWpm(speed)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition cursor-pointer ${
                wpm === speed
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200"
              }`}
            >
              {speed} WPM
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
