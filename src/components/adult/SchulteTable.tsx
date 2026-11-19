"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Grid, Trophy, RotateCcw, Play, CheckCircle2, Eye } from "lucide-react";

export const SchulteTable: React.FC = () => {
  const [grid, setGrid] = useState<number[]>([]);
  const [currentTarget, setCurrentTarget] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate randomized 5x5 grid (1 to 25)
  const initializeGrid = () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setGrid(numbers);
    setCurrentTarget(1);
    setElapsedTime(0);
    setMistakes(0);
    setIsCompleted(false);
    setIsActive(true);
  };

  // Timer loop
  useEffect(() => {
    if (!isActive || isCompleted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const start = Date.now() - elapsedTime * 1000;
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 1000));
    }, 200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isCompleted]);

  const handleCellClick = (num: number) => {
    if (!isActive || isCompleted) return;

    if (num === currentTarget) {
      if (currentTarget === 25) {
        setIsCompleted(true);
        setIsActive(false);
      } else {
        setCurrentTarget((prev) => prev + 1);
      }
    } else {
      setMistakes((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Exercise Information Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Eye className="w-4 h-4" /> Periferik Görme Egzersizi
          </div>
          <h2 className="text-xl font-bold text-slate-900">Schulte Tablosu (5×5)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Gözünüzü tablonun merkezine sabitleyin, 1'den 25'e kadar sayıları sırayla bulun.
          </p>
        </div>

        {isActive && (
          <div className="flex items-center gap-3">
            <div className="text-center px-3 py-1.5 bg-slate-100 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Süre</span>
              <div className="text-lg font-black text-slate-800">{elapsedTime}s</div>
            </div>
            <div className="text-center px-3 py-1.5 bg-brand-50 rounded-xl border border-brand-200">
              <span className="text-[10px] text-brand-600 font-bold uppercase">Hedef Sayı</span>
              <div className="text-lg font-black text-brand-700">{currentTarget}</div>
            </div>
          </div>
        )}
      </div>

      {!isActive && !isCompleted ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Grid className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Egzersiz Kuralları</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
              Bakışlarınızı mümkün olduğunca ortadaki kareye odaklayın ve gözünüzü çok fazla oynatmadan çevresel görüşünüzle sayıları sırayla tıklayın.
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={initializeGrid}
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            Egzersizi Başlat
          </Button>
        </div>
      ) : isCompleted ? (
        <div className="bg-white rounded-3xl p-8 border border-emerald-200 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">Tebrikler, Tabloyu Tamamladınız!</h3>
            <p className="text-sm text-slate-600 mt-1">
              Göz kaslarınızı ve çevresel algınızı çalıştırdınız.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 font-bold uppercase">Toplam Süre</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{elapsedTime} sn</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 font-bold uppercase">Hatalı Tıklama</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{mistakes}</div>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={initializeGrid}
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Tekrar Oyna
          </Button>
        </div>
      ) : (
        /* 5x5 Grid */
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-5 gap-2 sm:gap-3 aspect-square w-full max-w-md mx-auto">
            {grid.map((num) => {
              const isFound = num < currentTarget;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleCellClick(num)}
                  className={`rounded-2xl font-black text-lg sm:text-2xl transition-all flex items-center justify-center min-h-[50px] select-none active:scale-95 ${
                    isFound
                      ? "bg-slate-100 text-slate-300 cursor-default"
                      : "bg-slate-50 text-slate-800 hover:bg-brand-50 hover:text-brand-600 border border-slate-200 shadow-xs"
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
