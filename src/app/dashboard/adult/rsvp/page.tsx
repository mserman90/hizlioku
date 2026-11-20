"use client";

import React, { useState } from "react";
import { TextSourceSelector } from "@/components/shared/TextSourceSelector";
import { FileTextExtractor } from "@/components/shared/FileTextExtractor";
import { RsvpReader } from "@/components/adult/RsvpReader";
import { ComprehensionQuiz } from "@/components/adult/ComprehensionQuiz";
import { ComprehensionQuestion } from "@/data/publicTexts";
import { generateComprehensionQuestions } from "@/lib/questionGenerator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
          onComplete={(score) => setStep("summary")}
        />
      )}

      {step === "summary" && (
        <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto text-2xl font-black">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Oturum Tamamlandı!</h2>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 font-bold uppercase">Hız</span>
              <div className="text-2xl font-black text-brand-600 dark:text-brand-400 mt-1">
                {sessionMetrics.wpm} WPM
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 font-bold uppercase">Okunan Kelime</span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {sessionMetrics.wordCount}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setStep("select_text")}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Yeni Metin Seç
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
