"use client";

import React, { useState, useMemo } from "react";
import { PUBLIC_TEXTS, PublicTextItem } from "@/data/publicTexts";
import { Button } from "@/components/ui/Button";
import { BookOpen, FileText, ArrowRight, Sparkles } from "lucide-react";
import { calculateReadability } from "@/lib/readabilityScore";

interface TextSourceSelectorProps {
  onSelectText: (text: string, title: string, questions?: any[]) => void;
}

export const TextSourceSelector: React.FC<TextSourceSelectorProps> = ({
  onSelectText,
}) => {
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
  const [customText, setCustomText] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const customMetrics = useMemo(() => {
    if (customText.trim().length < 20) return null;
    return calculateReadability(customText);
  }, [customText]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = customText.trim();
    if (!trimmed) {
      setError("Lütfen okunacak bir metin yapıştırın.");
      return;
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    if (words.length < 5) {
      setError("Hızlı okuma için metin en az 5 kelimeden oluşmalıdır.");
      return;
    }

    onSelectText(trimmed, customTitle.trim() || "Özel Metin");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Metin Kaynağını Seçin</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dahili telifsiz metinlerden seçin veya kendi metninizi yapıştırın
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab("preset")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
            activeTab === "preset"
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          Kamu Malı Örnek Metinler
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("custom")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
            activeTab === "custom"
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          Kendi Metnini Yapıştır
        </button>
      </div>

      {activeTab === "preset" ? (
        <div className="space-y-3">
          {PUBLIC_TEXTS.map((item) => {
            const readability = calculateReadability(item.content);
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-slate-800/50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                    <span>{item.author}</span>
                    <span>•</span>
                    <span>{item.wordCount} kelime</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${readability.badgeColorClass}`}>
                      Ateşman: {readability.score} ({readability.levelLabel})
                    </span>
                    <span>•</span>
                    <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                      Önerilen: {readability.suggestedWpm} WPM
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => onSelectText(item.content, item.title, item.questions)}
                  className="flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Bu Metinle Oku</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <form onSubmit={handleCustomSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
              Metin Başlığı (İsteğe Bağlı)
            </label>
            <input
              type="text"
              placeholder="Örn: Makale Notları"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
              Okunacak Metin (Düz Metin)
            </label>
            <textarea
              rows={6}
              placeholder="Okumak istediğiniz metni buraya yapıştırın..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:border-brand-500 focus:outline-none leading-relaxed"
              required
            />
          </div>

          {/* Live Ateşman Turkish Readability Metrics */}
          {customMetrics && customMetrics.totalWords >= 5 && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  Ateşman Türkçe Okunabilirlik Analizi:
                </span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold border ${customMetrics.badgeColorClass}`}>
                  Skor: {customMetrics.score} / 100 • {customMetrics.levelLabel}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <div>Hedef Kitle: <strong className="text-slate-700 dark:text-slate-300 block">{customMetrics.targetAudience}</strong></div>
                <div>Hece/Kelime: <strong className="text-slate-700 dark:text-slate-300 block">{customMetrics.avgSyllablesPerWord} hece</strong></div>
                <div>Önerilen Hız: <strong className="text-brand-600 dark:text-brand-400 block">{customMetrics.suggestedWpm} WPM</strong></div>
                <div>Tahmini Süre: <strong className="text-slate-700 dark:text-slate-300 block">~{Math.max(1, Math.round(customMetrics.estimatedReadingTimeSeconds / 60))} dk</strong></div>
              </div>
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth size="lg">
            RSVP Okuyucuya Aktar
          </Button>
        </form>
      )}
    </div>
  );
};
