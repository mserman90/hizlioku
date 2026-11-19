"use client";

import React, { useState } from "react";
import { PUBLIC_TEXTS, PublicTextItem } from "@/data/publicTexts";
import { Button } from "@/components/ui/Button";
import { BookOpen, FileText, ArrowRight } from "lucide-react";

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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Metin Kaynağını Seçin</h2>
          <p className="text-xs text-slate-500">
            Dahili telifsiz metinlerden seçin veya kendi metninizi yapıştırın
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab("preset")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
            activeTab === "preset"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Kamu Malı Örnek Metinler
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("custom")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
            activeTab === "custom"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Kendi Metnini Yapıştır
        </button>
      </div>

      {activeTab === "preset" ? (
        <div className="space-y-3">
          {PUBLIC_TEXTS.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/30 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.wordCount} kelime</span>
                  <span>•</span>
                  <span>{item.questions.length} soru içerir</span>
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
          ))}
        </div>
      ) : (
        <form onSubmit={handleCustomSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Metin Başlığı (İsteğe Bağlı)
            </label>
            <input
              type="text"
              placeholder="Örn: Makale Notları"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Okunacak Metin (Düz Metin)
            </label>
            <textarea
              rows={6}
              placeholder="Okumak istediğiniz metni buraya yapıştırın..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-brand-500 focus:outline-none leading-relaxed"
              required
            />
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg">
            RSVP Okuyucuya Aktar
          </Button>
        </form>
      )}
    </div>
  );
};
