"use client";

import React from "react";
import { Trophy, Star, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GamificationRewardProps {
  points: number;
  completedCount: number;
  onRestart: () => void;
  onDone: () => void;
}

export const GamificationReward: React.FC<GamificationRewardProps> = ({
  points,
  completedCount,
  onRestart,
  onDone,
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 text-center border-2 border-amber-300 shadow-xl animate-in fade-in zoom-in-95 duration-200">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-amber-950 mx-auto mb-4 shadow-lg shadow-amber-300/50">
        <Trophy className="w-10 h-10 animate-bounce" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
        <Sparkles className="w-4 h-4" /> Harika Bir Başarı!
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
        Tebrikler, Seansı Tamamladın! 🎉
      </h2>

      <p className="text-sm text-slate-600 mb-6">
        Gözlerin hızlandı ve odaklanman güçlendi. Bugün harika bir pratik yaptın!
      </p>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <span className="text-xs text-amber-800 font-semibold">Kazanılan Puan</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
            +{points}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
          <span className="text-xs text-emerald-800 font-semibold">Okunan Kelime</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            {completedCount}
          </div>
        </div>
      </div>

      {/* Encouragement note */}
      <div className="flex items-center justify-center gap-1 text-amber-500 mb-6">
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={onRestart}
          className="flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Yeniden Oyna
        </Button>
        <Button
          type="button"
          variant="child"
          fullWidth
          onClick={onDone}
        >
          Panele Dön
        </Button>
      </div>
    </div>
  );
};
