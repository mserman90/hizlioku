"use client";

import React, { useState } from "react";
import { ComprehensionQuestion } from "@/data/publicTexts";
import { calculateComprehensionScore } from "@/lib/readingUtils";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, HelpCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react";

interface ComprehensionQuizProps {
  questions: ComprehensionQuestion[];
  wpm: number;
  wordCount: number;
  durationSeconds: number;
  onRestart: () => void;
  onComplete: (score: number) => void;
}

export const ComprehensionQuiz: React.FC<ComprehensionQuizProps> = ({
  questions,
  wpm,
  wordCount,
  durationSeconds,
  onRestart,
  onComplete,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      score: calculateComprehensionScore(correct, questions.length),
    };
  };

  const results = isSubmitted ? calculateResults() : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Session Metrics Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-6 text-white shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
          Okuma Oturumu Tamamlandı
        </span>
        <div className="grid grid-cols-3 gap-4 mt-3">
          <div>
            <span className="text-xs text-blue-200">Ulaşılan Hız</span>
            <div className="text-2xl sm:text-3xl font-extrabold">{wpm} WPM</div>
          </div>
          <div>
            <span className="text-xs text-blue-200">Kelime Sayısı</span>
            <div className="text-2xl sm:text-3xl font-extrabold">{wordCount}</div>
          </div>
          <div>
            <span className="text-xs text-blue-200">Süre</span>
            <div className="text-2xl sm:text-3xl font-extrabold">{durationSeconds} sn</div>
          </div>
        </div>
      </div>

      {/* Quiz Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <h2 className="text-xl font-bold text-slate-900">Kavrama Değerlendirmesi</h2>
        </div>

        {isSubmitted && results && (
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-brand-600" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Kavrama Başarısı</h3>
                <p className="text-xs text-slate-500">
                  {results.correct} / {questions.length} Doğru Cevap
                </p>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-brand-600">
              %{results.score}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, qIndex) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const chosen = selectedAnswers[q.id];

            return (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800 text-sm">
                  {qIndex + 1}. {q.question}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = chosen === optIndex;
                    const isCorrect = q.correctIndex === optIndex;

                    let optionStyle = "border-slate-200 bg-white hover:border-slate-300";
                    if (isSubmitted) {
                      if (isCorrect) {
                        optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        optionStyle = "border-rose-500 bg-rose-50 text-rose-900 line-through";
                      } else {
                        optionStyle = "border-slate-200 bg-white opacity-60";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-brand-500 bg-brand-50/60 text-brand-900 font-semibold";
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() => handleSelect(q.id, optIndex)}
                        disabled={isSubmitted}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {!isSubmitted ? (
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={Object.keys(selectedAnswers).length < questions.length}
            >
              Cevapları Gönder ve Puanla
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={onRestart}
                className="flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Yeni Seans Başlat
              </Button>
              <Button
                type="button"
                variant="primary"
                fullWidth
                onClick={() => onComplete(results?.score || 0)}
                className="flex items-center justify-center gap-2"
              >
                <span>Özeti Kaydet ve Bitir</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
