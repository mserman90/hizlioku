"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { OrpWordDisplay } from "./OrpWordDisplay";
import { BionicReaderModal } from "./BionicReaderModal";
import { calculateRsvpIntervalMs } from "@/lib/readingUtils";
import { Button } from "@/components/ui/Button";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Maximize2,
  Minimize2,
  Sliders,
  Sparkles,
  Eye,
  CheckCircle,
  X,
  BookOpen,
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

  // Advanced Reading Settings
  const [enableSmartPacing, setEnableSmartPacing] = useState(true);
  const [chunkSize, setChunkSize] = useState<1 | 2 | 3>(1);
  const [showSettings, setShowSettings] = useState(false);

  // 20-20-20 Eye Rest Break state
  const [isEyeRestOpen, setIsEyeRestOpen] = useState(false);
  const [restCountdown, setRestCountdown] = useState(20);
  const restTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Bionic Reading Modal state
  const [isBionicModalOpen, setIsBionicModalOpen] = useState(false);

  // Time tracking
  const startTimeRef = useRef<number | null>(null);
  const totalElapsedMsRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic chunk word
  const currentWord = React.useMemo(() => {
    return words.slice(currentIndex, currentIndex + chunkSize).join(" ") || "";
  }, [words, currentIndex, chunkSize]);

  // Advance word function
  const stepForward = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + chunkSize;
      if (next >= words.length) {
        setIsPlaying(false);
        const durationSec = Math.max(1, Math.round(totalElapsedMsRef.current / 1000));
        onFinishReading({
          wpm,
          wordCount: words.length,
          durationSeconds: durationSec,
        });
        return prev;
      }
      return next;
    });
  }, [words.length, wpm, chunkSize, onFinishReading]);

  // Main RSVP dynamic interval loop (adaptive setTimeout)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const chunkWords = words.slice(currentIndex, currentIndex + chunkSize);
    const triggerWord = chunkWords[chunkWords.length - 1] || "";
    const intervalMs = calculateRsvpIntervalMs(wpm, triggerWord, enableSmartPacing);

    timerRef.current = setTimeout(() => {
      totalElapsedMsRef.current += intervalMs;
      // Auto-trigger 20-20-20 rule if continuous reading exceeds 20 minutes (1200000 ms)
      if (totalElapsedMsRef.current >= 1200000 && !isEyeRestOpen) {
        setIsPlaying(false);
        setIsEyeRestOpen(true);
      } else {
        stepForward();
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentIndex, wpm, chunkSize, enableSmartPacing, stepForward, words, isEyeRestOpen]);

  // 20-20-20 Timer Countdown Loop
  useEffect(() => {
    if (!isEyeRestOpen) {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
      setRestCountdown(20);
      return;
    }

    restTimerRef.current = setInterval(() => {
      setRestCountdown((prev) => {
        if (prev <= 1) {
          if (restTimerRef.current) clearInterval(restTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [isEyeRestOpen]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 5 * chunkSize));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(words.length - 1, prev + 5 * chunkSize));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [words.length, chunkSize]);

  const handleRewind5 = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 5 * chunkSize));
  };

  const handleSkip5 = () => {
    setCurrentIndex((prev) => Math.min(words.length - 1, prev + 5 * chunkSize));
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
          ? "fixed inset-0 z-50 bg-white dark:bg-slate-950 p-6 sm:p-12 flex flex-col justify-between max-w-none"
          : ""
      }`}
    >
      {/* Top Header & Context */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <button
            onClick={onBackToSelector}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline mb-1 inline-block"
          >
            ← Başka Metin Seç
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate max-w-md">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300">
            {currentIndex + 1} / {words.length} kelime
          </div>
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Tam Ekran"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-brand-600 dark:bg-brand-500 h-full transition-all duration-150"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* RSVP Word Stage - High-comfort dark mode for zero eye fatigue */}
      <div className="w-full min-h-[240px] sm:min-h-[320px] rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-inner flex flex-col items-center justify-center p-6 relative transition-colors">
        <OrpWordDisplay word={currentWord} />

        {/* Small subtle helper */}
        <div className="absolute bottom-3 text-[11px] text-slate-400 dark:text-slate-500">
          Klavye: [Boşluk] Duraklat/Başlat • [Sol/Sağ Ok] -5/+5 Kelime
        </div>
      </div>

      {/* Primary Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Başa Dön"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleRewind5}
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="5 Kelime İleri Sar"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* WPM Speed Slider */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Okuma Hızı</span>
            <span className="text-xl font-black text-brand-600 dark:text-brand-400">{wpm} WPM</span>
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
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              <span>150</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Reading Science Controls (Smart Pacing, Chunking, Eye Rest) */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Smart Cognitive Pacing Toggle */}
          <button
            type="button"
            onClick={() => setEnableSmartPacing((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition ${
              enableSmartPacing
                ? "bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-800 text-brand-700 dark:text-brand-300 shadow-xs"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            }`}
            title="Noktalama işaretleri (. , ? !) ve uzun kelimelerde beyne kavrama payı bırakan akıllı duraklama"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dinamik Noktalama: {enableSmartPacing ? "Açık (Akıllı)" : "Kapalı"}</span>
          </button>

          {/* Chunk Size Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-1">Öbek:</span>
            {([1, 2, 3] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setChunkSize(size)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                  chunkSize === size
                    ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
                title={`${size} kelimelik fiksasyon öbeği`}
              >
                {size}x
              </button>
            ))}
          </div>
        </div>

        {/* 20-20-20 Eye Rest Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setIsBionicModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/60 transition"
            title="Metni Bionic Reading (Biyonik Odaklanma) modunda görüntüle"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biyonik Metin</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setIsEyeRestOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
            title="20-20-20 kuralı ile göz kaslarınızı dinlendirin"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Göz Dinlendir (20-20-20)</span>
          </button>
        </div>
      </div>

      {/* Bionic Reader Modal */}
      <BionicReaderModal
        isOpen={isBionicModalOpen}
        onClose={() => setIsBionicModalOpen(false)}
        title={title}
        text={text}
      />

      {/* 20-20-20 Eye Rest Modal */}
      {isEyeRestOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-center border-2 border-indigo-400 dark:border-indigo-600 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 animate-pulse" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              20-20-20 Göz Dinlendirme Molası
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Yoğun odaklanma göz kırpma refleksini azaltır. Lütfen ekrandan uzaklaşın ve <strong>en az 6 metre (20 feet)</strong> uzaktaki bir nesneye bakın.
            </p>

            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-black text-indigo-600 dark:text-indigo-400">
                {restCountdown}s
              </div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Kalan Dinlenme Süresi
              </span>
            </div>

            <Button
              type="button"
              variant="primary"
              fullWidth
              onClick={() => setIsEyeRestOpen(false)}
              className="flex items-center justify-center gap-2"
            >
              <span>{restCountdown === 0 ? "Okumaya Geri Dön" : "Molayı Tamamla"}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
