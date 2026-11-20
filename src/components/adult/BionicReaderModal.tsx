"use client";

import React, { useState, useEffect, useMemo } from "react";
import { formatBionicHtml } from "@/lib/bionicEngine";
import { X, BookOpen, ZoomIn, ZoomOut, Clock } from "lucide-react";

interface BionicReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
}

export const BionicReaderModal: React.FC<BionicReaderModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
}) => {
  const [fontSize, setFontSize] = useState<number>(18);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isReading, setIsReading] = useState<boolean>(true);

  const wordCount = useMemo(() => {
    return text.split(/\s+/).filter(Boolean).length;
  }, [text]);

  const bionicHtml = useMemo(() => {
    return formatBionicHtml(text);
  }, [text]);

  // Elapsed timer
  useEffect(() => {
    if (!isOpen || !isReading) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isReading]);

  // Reset timer on open
  useEffect(() => {
    if (isOpen) {
      setElapsedSeconds(0);
      setIsReading(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentWpm =
    elapsedSeconds > 2
      ? Math.round((wordCount / elapsedSeconds) * 60)
      : Math.round(wordCount / 1);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-800/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Bionic Reading (Biyonik Okuma) Modu
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                {title || "Belge Metni"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Live Speed Tracker */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, "0")}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentWpm} WPM</span>
            </div>

            {/* Font Size Adjusters */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                title="Yazı Tipini Küçült"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 px-1">
                {fontSize}px
              </span>
              <button
                type="button"
                onClick={() => setFontSize((s) => Math.min(26, s + 2))}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                title="Yazı Tipini Büyüt"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bionic Formatted Reading Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 select-text">
          <div
            className="max-w-2xl mx-auto space-y-4 leading-relaxed text-slate-800 dark:text-slate-100 transition-all font-sans [&>p]:mb-4 [&>p]:leading-loose [&_b]:text-slate-950 dark:[&_b]:text-white [&_b]:font-black"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: bionicHtml }}
          />
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            Toplam {wordCount} kelime • Gözünüz her sözcüğün koyu başlangıç harflerine kilitlenerek satırları hızla tarar.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-xs"
          >
            RSVP Okuyucuya Dön
          </button>
        </div>
      </div>
    </div>
  );
};
