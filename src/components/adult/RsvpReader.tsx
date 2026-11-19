"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { OrpWordDisplay } from "./OrpWordDisplay";
import { calculateRsvpIntervalMs } from "@/lib/readingUtils";
import { Button } from "@/components/ui/Button";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sliders,
  Maximize2,
  Minimize2,
  CheckCircle,
} from "lucide-react";

interface RsvpReaderProps {
  text: string;
  title: string;
  initialWpm?: number;
  onFinishReading: (metrics: {
    wpm: number;
    wordCount: number;
    durationSeconds: number;
  }) => void;
  onBackToSelector: () => void;
}

export const RsvpReader: React.FC<RsvpReaderProps> = ({
  text,
  title,
  initialWpm = 300,
  onFinishReading,
  onBackToSelector,
}) => {
  const words = React.useMemo(() => {
    return text.split(/\s+/).filter(Boolean);
  }, [text]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm, setWpm] = useState(initialWpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Time tracking
  const startTimeRef = useRef<number | null>(null);
  const totalElapsedMsRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentWord = words[currentIndex] || "";

  // Advance word function
  const stepForward = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= words.length) {
        setIsPlaying(false);
        const durationSec = Math.max(1, Math.round(totalElapsedMsRef.current / 1000));
        onFinishReading({
          wpm,
          wordCount: words.length,
          durationSeconds: durationSec,
        });
        return prev;
      }
      return prev + 1;
    });
  }, [words.length, wpm, onFinishReading]);

  // Main RSVP interval loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = calculateRsvpIntervalMs(wpm);
    const tickStart = Date.now();

    timerRef.current = setInterval(() => {
      totalElapsedMsRef.current += intervalMs;
      stepForward();
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, wpm, stepForward]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 5));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(words.length - 1, prev + 5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [words.length]);

  const handleRewind5 = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 5));
  };

  const handleSkip5 = () => {
    setCurrentIndex((prev) => Math.min(words.length - 1, prev + 5));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    totalElapsedMsRef.current = 0;
  };

  return (
    <div
      className={`w-full max-w-3xl mx-auto space-y-6 transition-all ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-white p-6 sm:p-12 flex flex-col justify-between max-w-none"
          : ""
      }`}
    >
      {/* Top Header & Context */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={onBackToSelector}
            className="text-xs font-semibold text-brand-600 hover:underline mb-1 inline-block"
          >
            ← Başka Metin Seç
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate max-w-md">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
            {currentIndex + 1} / {words.length} kelime
          </div>
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
            title="Tam Ekran"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-brand-600 h-full transition-all duration-150"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* RSVP Word Stage */}
      <div className="w-full min-h-[240px] sm:min-h-[320px] rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-inner flex flex-col items-center justify-center p-6 relative">
        <OrpWordDisplay word={currentWord} />

        {/* Small subtle helper */}
        <div className="absolute bottom-3 text-[11px] text-slate-400">
          Klavye: [Boşluk] Duraklat/Başlat • [Sol/Sağ Ok] -5/+5 Kelime
        </div>
      </div>

      {/* Primary Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Başa Dön"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleRewind5}
            className="p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="5 Kelime Geri Sar"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="flex items-center gap-2 min-w-[140px]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{currentIndex === 0 ? "Başlat" : "Devam Et"}</span>
              </>
            )}
          </Button>

          <button
            onClick={handleSkip5}
            className="p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="5 Kelime İleri Sar"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* WPM Speed Slider */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Okuma Hızı</span>
            <span className="text-xl font-black text-brand-600">{wpm} WPM</span>
          </div>

          <div className="flex-1 sm:w-48">
            <input
              type="range"
              min={150}
              max={1000}
              step={25}
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>150</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
