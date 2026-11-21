"use client";

import React, { useState, useEffect } from "react";
import { syllabifyWord } from "@/lib/turkishSyllabifier";
import { playSuccessChime, playSoftThud } from "@/lib/soundEffects";
import { recordChildSession } from "@/lib/childProgress";
import { Button } from "@/components/ui/Button";
import { Sparkles, Trophy, RotateCcw, Volume2, ArrowLeft, Star, Heart } from "lucide-react";

interface WordChallenge {
  word: string;
  category: string;
  emoji: string;
}

const CHILD_WORDS_BANK: WordChallenge[] = [
  // Hayvanlar
  { word: "kelebek", category: "Hayvanlar", emoji: "🦋" },
  { word: "sincap", category: "Hayvanlar", emoji: "🐿️" },
  { word: "kaplumbağa", category: "Hayvanlar", emoji: "🐢" },
  { word: "yunus", category: "Hayvanlar", emoji: "🐬" },
  { word: "tavşan", category: "Hayvanlar", emoji: "🐰" },
  { word: "zürafa", category: "Hayvanlar", emoji: "🦒" },
  { word: "karınca", category: "Hayvanlar", emoji: "🐜" },
  { word: "papağan", category: "Hayvanlar", emoji: "🦜" },
  { word: "kunduz", category: "Hayvanlar", emoji: "🦫" },
  { word: "baykuş", category: "Hayvanlar", emoji: "🦉" },

  // Doğa & Çevre
  { word: "gökkuşağı", category: "Doğa", emoji: "🌈" },
  { word: "çağlayan", category: "Doğa", emoji: "🌊" },
  { word: "yıldız", category: "Doğa", emoji: "⭐" },
  { word: "şelale", category: "Doğa", emoji: "💦" },
  { word: "fırtına", category: "Doğa", emoji: "🌪️" },
  { word: "papatya", category: "Doğa", emoji: "🌼" },
  { word: "yanardağ", category: "Doğa", emoji: "🌋" },
  { word: "nilüfer", category: "Doğa", emoji: "🪷" },

  // Okul & Öğrenme
  { word: "öğretmen", category: "Okul", emoji: "👩‍🏫" },
  { word: "arkadaş", category: "Okul", emoji: "🤝" },
  { word: "kitaplık", category: "Okul", emoji: "📚" },
  { word: "kırtasiye", category: "Okul", emoji: "✏️" },
  { word: "teneffüs", category: "Okul", emoji: "🔔" },
  { word: "merdiven", category: "Okul", emoji: "🪜" },

  // Uzay & Bilim
  { word: "gezegen", category: "Uzay", emoji: "🪐" },
  { word: "roket", category: "Uzay", emoji: "🚀" },
  { word: "astronot", category: "Uzay", emoji: "👨‍🚀" },
  { word: "teleskop", category: "Uzay", emoji: "🔭" },
  { word: "samanyolu", category: "Uzay", emoji: "🌌" },

  // Meyveler & Lezzetler
  { word: "çilek", category: "Meyveler", emoji: "🍓" },
  { word: "portakal", category: "Meyveler", emoji: "🍊" },
  { word: "karpuz", category: "Meyveler", emoji: "🍉" },
  { word: "mandalina", category: "Meyveler", emoji: "🍊" },
  { word: "böğürtlen", category: "Meyveler", emoji: "🫐" },
  { word: "şeftali", category: "Meyveler", emoji: "🍑" },
];

const SYLLABLE_PASTEL_COLORS = [
  "bg-pink-100 dark:bg-pink-950/70 text-pink-800 dark:text-pink-200 border-pink-300 dark:border-pink-800 hover:bg-pink-200",
  "bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800 hover:bg-blue-200",
  "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800 hover:bg-amber-200",
  "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200",
  "bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-800 hover:bg-purple-200",
];

export const SyllableBuilderGame: React.FC<{ onBackToMenu: () => void }> = ({ onBackToMenu }) => {
  const [activeWords, setActiveWords] = useState<WordChallenge[]>(() =>
    [...CHILD_WORDS_BANK].sort(() => Math.random() - 0.5)
  );
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [shuffledSyllables, setShuffledSyllables] = useState<{ id: string; text: string; colorClass: string }[]>([]);
  const [stars, setStars] = useState(0);
  const [isRoundWon, setIsRoundWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentChallenge = activeWords[roundIndex % activeWords.length] || CHILD_WORDS_BANK[0];
  const targetSyllables = syllabifyWord(currentChallenge.word);

  // Initialize round
  useEffect(() => {
    const syllables = syllabifyWord(currentChallenge.word);
    const mapped = syllables.map((s, idx) => ({
      id: `${s}-${idx}-${Math.random()}`,
      text: s,
      colorClass: SYLLABLE_PASTEL_COLORS[idx % SYLLABLE_PASTEL_COLORS.length],
    }));

    // Shuffle
    const shuffled = [...mapped].sort(() => Math.random() - 0.5);
    setShuffledSyllables(shuffled);
    setSelectedSyllables([]);
    setIsRoundWon(false);
  }, [roundIndex, currentChallenge.word]);

  const speakWord = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Audio safety
    }
  };

  const handleSelectSyllable = (item: { id: string; text: string }) => {
    if (isRoundWon) return;

    const nextSelected = [...selectedSyllables, item.text];
    setSelectedSyllables(nextSelected);

    // Check if the sequence matches so far
    const currentIndex = nextSelected.length - 1;
    if (targetSyllables[currentIndex] !== item.text) {
      // Wrong syllable selected
      playSoftThud();
      setTimeout(() => {
        setSelectedSyllables([]);
      }, 500);
      return;
    }

    // Correct syllable
    if (nextSelected.length === targetSyllables.length) {
      // Complete word formed!
      setIsRoundWon(true);
      setStars((s) => s + 1);
      playSuccessChime();
      speakWord(currentChallenge.word);

      // Record to parent milestone progress
      recordChildSession(15);

      setTimeout(() => {
        if (roundIndex + 1 >= 8) {
          setIsGameOver(true);
        } else {
          setRoundIndex((r) => r + 1);
        }
      }, 1400);
    }
  };

  const handleRestart = () => {
    setActiveWords([...CHILD_WORDS_BANK].sort(() => Math.random() - 0.5));
    setRoundIndex(0);
    setStars(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-amber-300 dark:border-amber-800 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-4xl shadow-inner">
          🏆
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Tebrikler Şampiyon!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Tüm Heceleri Başarıyla Birleştirdin!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Harika bir iş çıkardın. Kazandığın yıldızlar veli paneline başarıyla kaydedildi!
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-2xl font-black text-amber-500">
          {[...Array(Math.min(5, stars))].map((_, i) => (
            <Star key={i} className="w-8 h-8 fill-current drop-shadow-xs" />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="secondary" fullWidth size="lg" onClick={handleRestart} className="flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Yeniden Oyna
          </Button>
          <Button variant="child" fullWidth size="lg" onClick={onBackToMenu}>
            Çocuk Paneline Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Çocuk Paneline Dön
        </button>

        {/* Stars counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-950/60 rounded-full text-xs font-bold text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>{stars} Yıldız</span>
        </div>
      </div>

      {/* Target Word Card */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-950 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-amber-900/60 text-center shadow-sm relative overflow-hidden">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
          {currentChallenge.category} • Kelimeyi Hecelerle Oluştur
        </span>

        <div className="text-5xl sm:text-6xl mb-3 animate-bounce">
          {currentChallenge.emoji}
        </div>

        {/* Word Display Assembly Zone */}
        <div className="flex items-center justify-center gap-2 min-h-[56px] my-3">
          {targetSyllables.map((_, idx) => {
            const hasSyllable = selectedSyllables[idx] !== undefined;
            return (
              <div
                key={idx}
                className={`w-16 sm:w-20 h-14 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl transition-all ${
                  hasSyllable
                    ? "bg-amber-400 dark:bg-amber-500 text-amber-950 shadow-md scale-105"
                    : "border-2 border-dashed border-amber-300 dark:border-amber-800 text-transparent bg-white/40 dark:bg-slate-800/40"
                }`}
              >
                {selectedSyllables[idx] || "?"}
              </div>
            );
          })}
        </div>

        {/* Pronunciation button */}
        <button
          type="button"
          onClick={() => speakWord(currentChallenge.word)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-xs hover:bg-amber-100 transition border border-amber-200 dark:border-amber-800 mt-2"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Kelimeyi Dinle</span>
        </button>
      </div>

      {/* Shuffled Syllable Selection Tiles */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          Doğru Sırayla Hecelere Dokun:
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {shuffledSyllables.map((item) => {
            const isUsed = selectedSyllables.filter((s) => s === item.text).length >=
              shuffledSyllables.filter((s) => s.text === item.text).length;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSyllable(item)}
                disabled={isUsed || isRoundWon}
                className={`px-5 py-4 rounded-2xl border-2 font-black text-xl sm:text-2xl transition-all shadow-sm active:scale-95 ${
                  item.colorClass
                } ${isUsed ? "opacity-30 cursor-not-allowed scale-90" : "hover:scale-105 cursor-pointer"}`}
              >
                {item.text}
              </button>
            );
          })}
        </div>

        {selectedSyllables.length > 0 && !isRoundWon && (
          <button
            type="button"
            onClick={() => setSelectedSyllables([])}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pt-2 block mx-auto underline"
          >
            Heceleri Temizle ve Baştan Dene
          </button>
        )}
      </div>
    </div>
  );
};
