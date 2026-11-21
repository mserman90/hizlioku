"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Palette,
  Type,
  Clock,
} from "lucide-react";
import {
  tokenizePacerText,
  getPacerIntervalMs,
  formatBionicWord,
  PacerHighlightMode,
  PacerWordToken,
} from "@/lib/pacerEngine";
import { playMetronomeClick } from "@/lib/soundEffects";

interface GuidedPacerReaderProps {
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

export const GuidedPacerReader: React.FC<GuidedPacerReaderProps> = ({
  text,
  title,
  initialWpm = 300,
  onFinishReading,
  onBackToSelector,
}) => {
  const { paragraphs, allTokens, totalWords } = useMemo(
    () => tokenizePacerText(text),
    [text]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm, setWpm] = useState(initialWpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Settings
  const [mode, setMode] = useState<PacerHighlightMode>("word");
  const [enableSmartPacing, setEnableSmartPacing] = useState(true);
  const [enableMetronome, setEnableMetronome] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [theme, setTheme] = useState<"modern" | "sepia" | "eink" | "dark">("modern");
  const [showSettings, setShowSettings] = useState(false);

  // Time tracking
  const totalElapsedMsRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeWordRef = useRef<HTMLSpanElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to active word
  useEffect(() => {
    if (activeWordRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = activeWordRef.current;

      const elementTop = element.offsetTop;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Keep active line roughly in middle 40% of viewport
      if (
        elementTop < containerTop + 100 ||
        elementTop > containerTop + containerHeight - 150
      ) {
        container.scrollTo({
          top: Math.max(0, elementTop - containerHeight / 3),
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  // Main Pacer Timer Loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentIndex >= totalWords) {
      setIsPlaying(false);
      const durationSeconds = Math.max(1, Math.round(totalElapsedMsRef.current / 1000));
      onFinishReading({
        wpm,
        wordCount: totalWords,
        durationSeconds,
      });
      return;
    }

    const currentToken = allTokens[currentIndex];
    const intervalMs = getPacerIntervalMs(
      wpm,
      currentToken?.word || "",
      enableSmartPacing
    );

    timerRef.current = setTimeout(() => {
      totalElapsedMsRef.current += intervalMs;
      if (enableMetronome) {
        playMetronomeClick();
      }
      setCurrentIndex((prev) => prev + 1);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    isPlaying,
    currentIndex,
    wpm,
    totalWords,
    enableSmartPacing,
    enableMetronome,
    allTokens,
    onFinishReading,
  ]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 10));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(totalWords - 1, prev + 10));
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        setWpm((prev) => Math.min(800, prev + 25));
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        setWpm((prev) => Math.max(150, prev - 25));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalWords]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    totalElapsedMsRef.current = 0;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleManualFinish = () => {
    setIsPlaying(false);
    const durationSeconds = Math.max(1, Math.round(totalElapsedMsRef.current / 1000));
    onFinishReading({
      wpm,
      wordCount: Math.max(1, currentIndex),
      durationSeconds,
    });
  };

  // Font size styling
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-base sm:text-lg leading-relaxed";
      case "md":
        return "text-lg sm:text-xl leading-loose";
      case "lg":
        return "text-xl sm:text-2xl leading-loose";
      case "xl":
        return "text-2xl sm:text-3xl leading-loose";
    }
  };

  // Theme styling
  const getThemeStyles = () => {
    switch (theme) {
      case "sepia":
        return {
          bg: "bg-[#fbf0d9] text-[#433422]",
          card: "bg-[#f4e8cc] border-[#e6d7b5]",
          highlight: "bg-amber-300/80 text-amber-950 font-bold px-1 rounded shadow-xs",
        };
      case "eink":
        return {
          bg: "bg-[#f4f4f4] text-black",
          card: "bg-white border-black/20",
          highlight: "bg-black text-white font-bold px-1 rounded",
        };
      case "dark":
        return {
          bg: "bg-slate-950 text-slate-100",
          card: "bg-slate-900 border-slate-800",
          highlight: "bg-brand-500 text-white font-bold px-1 rounded shadow-md shadow-brand-500/20",
        };
      case "modern":
      default:
        return {
          bg: "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100",
          card: "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700",
          highlight: "bg-brand-500 text-white font-bold px-1.5 py-0.5 rounded-md shadow-sm shadow-brand-500/20 ring-2 ring-brand-300 dark:ring-brand-700",
        };
    }
  };

  const themeStyles = getThemeStyles();
  const progressPercent = totalWords > 0 ? Math.round((currentIndex / totalWords) * 100) : 0;

  const remainingTimeText = useMemo(() => {
    const remainingWords = Math.max(0, totalWords - currentIndex);
    const secs = Math.ceil((remainingWords / Math.max(1, wpm)) * 60);
    if (secs < 60) return `${secs} sn`;
    return `${Math.floor(secs / 60)} dk ${secs % 60} sn`;
  }, [totalWords, currentIndex, wpm]);

  return (
    <div
      className={`flex flex-col gap-6 w-full max-w-4xl mx-auto transition-colors duration-200 ${
        isFullscreen ? "fixed inset-0 z-50 p-6 sm:p-10 max-w-none bg-slate-950 overflow-hidden" : ""
      }`}
    >
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToSelector}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Metin Seçimine Dön
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSettings((prev) => !prev)}
            className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              showSettings
                ? "bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-950/60 dark:border-brand-700 dark:text-brand-300"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
            }`}
            title="Okuma Tercihleri"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">Görünüm</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer"
            title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Settings Drawer */}
      {showSettings && (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Highlight Mode */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Kılavuz Vurgulama
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "word", label: "Kelime" },
                  { id: "bionic", label: "Bionic" },
                  { id: "line", label: "Odak" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as PacerHighlightMode)}
                    className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                      mode === m.id
                        ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" /> Yazı Boyutu
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(["sm", "md", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFontSize(s)}
                    className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition cursor-pointer uppercase ${
                      fontSize === s
                        ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> Renk Paleti
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: "modern", label: "Klasik" },
                  { id: "sepia", label: "Sepya" },
                  { id: "eink", label: "E-Mürekkep" },
                  { id: "dark", label: "Koyu" },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id as any)}
                    className={`py-1.5 px-1 text-[11px] font-bold rounded-xl border transition cursor-pointer truncate ${
                      theme === th.id
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                    title={th.label}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setEnableSmartPacing((prev) => !prev)}
              className="font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  enableSmartPacing ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"
                }`}
              />
              Noktalama Duraklaması: {enableSmartPacing ? "Açık" : "Kapalı"}
            </button>

            <button
              type="button"
              onClick={() => setEnableMetronome((prev) => !prev)}
              className="font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 cursor-pointer flex items-center gap-1.5"
            >
              {enableMetronome ? (
                <>
                  <Volume2 className="w-4 h-4 text-brand-600" /> Metronom: Açık
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" /> Metronom: Kapalı
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Full-Text Reading Container */}
      <div
        ref={scrollContainerRef}
        className={`rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-sm max-h-[60vh] sm:max-h-[65vh] overflow-y-auto relative select-none scroll-smooth ${themeStyles.bg} ${themeStyles.card}`}
      >
        <div className="mb-6 border-b pb-4 border-black/10 dark:border-white/10 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black truncate max-w-[60%] sm:max-w-[70%]">
            {title || "Rehber Okuma"}
          </h2>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 opacity-80">
              <Clock className="w-3 h-3 text-brand-600 dark:text-brand-400" />
              ~{remainingTimeText}
            </span>
            <span className="text-xs font-bold opacity-60">
              {currentIndex} / {totalWords} Kelime
            </span>
          </div>
        </div>

        {/* Paragraphs and Word Tokens */}
        <div className={`space-y-6 ${getFontSizeClass()}`}>
          {paragraphs.map((p) => (
            <p key={p.index} className="transition-opacity">
              {p.tokens.map((token: PacerWordToken) => {
                const isActive = token.globalIndex === currentIndex;
                const isPast = token.globalIndex < currentIndex;

                // Highlight rendering
                if (mode === "bionic") {
                  const bionic = formatBionicWord(token.word);
                  return (
                    <span
                      key={token.id}
                      ref={isActive ? activeWordRef : null}
                      onClick={() => setCurrentIndex(token.globalIndex)}
                      className={`inline-block mr-1.5 transition-all cursor-pointer ${
                        isActive
                          ? themeStyles.highlight
                          : isPast
                          ? "opacity-60"
                          : "opacity-95"
                      }`}
                    >
                      <strong className="font-black text-inherit">{bionic.boldPart}</strong>
                      <span className="font-normal opacity-90">{bionic.normalPart}</span>
                    </span>
                  );
                }

                return (
                  <span
                    key={token.id}
                    ref={isActive ? activeWordRef : null}
                    onClick={() => setCurrentIndex(token.globalIndex)}
                    className={`inline-block mr-1.5 transition-all cursor-pointer ${
                      isActive
                        ? themeStyles.highlight
                        : isPast
                        ? "opacity-60"
                        : "opacity-95"
                    }`}
                  >
                    {token.word}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>

      {/* Floating Control Toolbar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
        {/* Progress Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>İlerleme: %{progressPercent}</span>
            <span>
              {wpm} <span className="font-normal text-[10px]">WPM</span>
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-600 h-full transition-all duration-150 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Buttons and Speed Slider */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          {/* Main Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 10))}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition cursor-pointer"
              title="10 Kelime Geri (Sol Ok)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="flex items-center gap-2 px-6 font-bold"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Durdur</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>{currentIndex === 0 ? "Başlat" : "Devam Et"}</span>
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(totalWords - 1, prev + 10))}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition cursor-pointer"
              title="10 Kelime İleri (Sağ Ok)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition cursor-pointer"
              title="Başa Dön"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed WPM Slider & Presets */}
          <div className="flex flex-col gap-1.5 w-full sm:w-64">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">150</span>
              <input
                type="range"
                min={150}
                max={800}
                step={25}
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <span className="text-xs font-bold text-slate-400">800</span>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5">
              {[250, 350, 450, 600].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setWpm(preset)}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-lg border transition cursor-pointer ${
                    wpm === preset
                      ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                  }`}
                  title={`${preset} WPM`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Complete Early Button */}
          <button
            type="button"
            onClick={handleManualFinish}
            className="text-xs font-bold px-3 py-2 rounded-xl text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950/60 transition cursor-pointer whitespace-nowrap"
          >
            Okumayı Bitir
          </button>
        </div>
      </div>
    </div>
  );
};
