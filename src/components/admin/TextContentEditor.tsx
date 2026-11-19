"use client";

import React, { useState } from "react";
import { PUBLIC_TEXTS, PublicTextItem } from "@/data/publicTexts";
import { Button } from "@/components/ui/Button";
import { BookOpen, Plus, Trash2, Edit2, Check, X } from "lucide-react";

export const TextContentEditor: React.FC = () => {
  const [texts, setTexts] = useState<PublicTextItem[]>(PUBLIC_TEXTS);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const words = newContent.trim().split(/\s+/).filter(Boolean);
    const item: PublicTextItem = {
      id: "sample-" + Date.now(),
      title: newTitle.trim(),
      author: newAuthor.trim() || "Kamu Malı (Açık Kaynak)",
      wordCount: words.length,
      content: newContent.trim(),
      questions: [
        {
          id: "q-" + Date.now(),
          question: "Bu metnin ana fikri nedir?",
          options: ["Fikir A", "Fikir B", "Fikir C", "Fikir D"],
          correctIndex: 0,
        },
      ],
    };

    setTexts((prev) => [item, ...prev]);
    setIsCreating(false);
    setNewTitle("");
    setNewAuthor("");
    setNewContent("");
  };

  const handleDelete = (id: string) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Telifsiz Metin Kütüphanesi</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kamu malı okuma metinleri ve kavrama soruları yönetimi (CRUD)
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => setIsCreating((prev) => !prev)}
          className="flex items-center gap-1.5"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isCreating ? "İptal Et" : "Yeni Metin Ekle"}</span>
        </Button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Yeni Kamu Malı Metin Girişi</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Metin Başlığı"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
              required
            />
            <input
              type="text"
              placeholder="Yazar / Telif Durumu (Örn: Ezop - Kamu Malı)"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
            />
          </div>
          <textarea
            rows={4}
            placeholder="Metin içeriğini buraya girin (Telifli modern eserler eklenemez)..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 leading-relaxed"
            required
          />
          <Button type="submit" variant="primary" size="sm">
            Metni Kütüphaneye Ekle
          </Button>
        </form>
      )}

      {/* Texts List */}
      <div className="space-y-3">
        {texts.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{t.title}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.author} • {t.wordCount} kelime • {t.questions.length} soru
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition"
                title="Metni Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
