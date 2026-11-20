"use client";

import React, { useState } from "react";
import { TextSourceSelector } from "@/components/shared/TextSourceSelector";
import { FileTextExtractor } from "@/components/shared/FileTextExtractor";
import { RsvpReader } from "@/components/adult/RsvpReader";
import { ComprehensionQuiz } from "@/components/adult/ComprehensionQuiz";
import { ComprehensionQuestion } from "@/data/publicTexts";
import { generateComprehensionQuestions } from "@/lib/questionGenerator";
import { saveSessionRecord } from "@/lib/sessionHistory";
import { calculateAdaptiveWpm, AdaptiveRecommendation } from "@/lib/adaptiveSpeed";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";

type FlowStep = "select_text" | "reading" | "quiz" | "summary";

export default function RsvpPage() {
  const [step, setStep] = useState<FlowStep>("select_text");
  const [selectedText, setSelectedText] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [questions, setQuestions] = useState<ComprehensionQuestion[]>([]);

  // Session result metrics
  const [sessionMetrics, setSessionMetrics] = useState<{
    wpm: number;
    wordCount: number;
    durationSeconds: number;
  }>({ wpm: 300, wordCount: 0, durationSeconds: 0 });

  const [currentWpm, setCurrentWpm] = useState<number>(300);
  const [adaptiveRec, setAdaptiveRec] = useState<AdaptiveRecommendation | null>(null);
  const [lastScore, setLastScore] = useState<number>(0);

  const handleSelectText = (text: string, title: string, qs?: ComprehensionQuestion[]) => {
    setSelectedText(text);
    setTextTitle(title);
    if (qs && qs.length > 0) {
      setQuestions(qs);
    } else {
      // Automatically generate 3 comprehension questions for custom or PDF texts
      const generated = generateComprehensionQuestions(text, 3);
      setQuestions(generated);
    }
    setStep("reading");
  };

  const handleFinishReading = (metrics: {
    wpm: number;
    wordCount: number;
    durationSeconds: number;
  }) => {
    setSessionMetrics(metrics);
    if (questions.length > 0) {
      setStep("quiz");
    } else {
      setStep("summary");
    }
  };

  return (
    <div className="space-y-6">
      {step === "select_text" && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dashboard/adult"
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Yetişkin Paneline Dön
            </Link>
          </div>
          <div className="space-y-6">
            <TextSourceSelector onSelectText={handleSelectText} />
            <FileTextExtractor onExtracted={(text, title) => handleSelectText(text, title)} />
          </div>
        </>
      )}

      {step === "reading" && (
        <RsvpReader
          text={selectedText}
          title={textTitle}
          initialWpm={currentWpm}
          onFinishReading={handleFinishReading}
          onBackToSelector={() => setStep("select_text")}
        />
      )}

      {step === "quiz" && (
        <ComprehensionQuiz
          questions={questions}
          wpm={sessionMetrics.wpm}
          wordCount={sessionMetrics.wordCount}
          durationSeconds={sessionMetrics.durationSeconds}
          onRestart={() => setStep("reading")}
          onComplete={(score) => {
            setLastScore(score);
            const rec = calculateAdaptiveWpm(sessionMetrics.wpm, score);
            setAdaptiveRec(rec);
            saveSessionRecord({
              textTitle: textTitle || "Okuma Metni",
              wpm: sessionMetrics.wpm,
              comprehensionScore: score,
              wordCount: sessionMetrics.wordCount,
              durationSeconds: sessionMetrics.durationSeconds,
              smartPacingEnabled: true,
              chunkSize: 1,
            });
            setStep("summary");
          }}
        />
      )}

      {step === "summary" && (
        <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto text-2xl font-black">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Oturum Tamamlandı!</h2>
          
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Hız</span>
              <div className="text-xl font-black text-brand-600 dark:text-brand-400 mt-0.5">
                {sessionMetrics.wpm} WPM
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Kelime</span>
              <div className="text-xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                {sessionMetrics.wordCount}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Kavrama</span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                %{lastScore}
              </div>
            </div>
          </div>

          {/* Adaptive Speed Recommendation Card */}
          {adaptiveRec && (
            <div
              className={`p-4 rounded-2xl border text-left text-xs sm:text-sm space-y-2 ${
                adaptiveRec.action === "increase"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                  : adaptiveRec.action === "decrease"
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200"
                  : "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-950 dark:text-blue-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {adaptiveRec.action === "increase" ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                ) : adaptiveRec.action === "decrease" ? (
                  <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                ) : (
                  <Minus className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                )}
                <span>{adaptiveRec.feedbackMessage}</span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed pl-7">
                {adaptiveRec.rationale}
              </p>
              {adaptiveRec.delta !== 0 && (
                <div className="pt-1 pl-7 font-semibold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Önerilen Yeni Hızınız: <strong>{adaptiveRec.newWpm} WPM</strong></span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                if (adaptiveRec) {
                  setCurrentWpm(adaptiveRec.newWpm);
                }
                setStep("select_text");
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              {adaptiveRec && adaptiveRec.delta !== 0
                ? `${adaptiveRec.newWpm} WPM ile Yeni Metin Seç`
                : "Yeni Metin Seç"}
            </button>
            <Link
              href="/dashboard/adult"
              className="flex-1 py-3 px-4 rounded-xl bg-brand-600 text-white font-bold text-sm text-center hover:bg-brand-700 shadow-sm transition"
            >
              Panele Dön
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
