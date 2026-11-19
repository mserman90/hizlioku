"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Age Gate self-declaration component complying with child privacy principles

import React from "react";
import { Sparkles, Glasses } from "lucide-react";
import { AgeGroup } from "@/types";

interface AgeGateModalProps {
  onSelect: (group: AgeGroup) => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-800 text-center transition-colors">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
        Hoş Geldiniz! 👋
      </h2>
      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-8">
        Size en uygun, yaşa ve bilişsel seviyeye göre tasarlanmış okuma deneyimini hazırlayabilmemiz için lütfen yaş grubunuzu seçin:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Child Selection */}
        <button
          onClick={() => onSelect("child")}
          className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-amber-300 dark:border-amber-800/80 bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 hover:border-amber-400 text-slate-900 dark:text-white transition-all group active:scale-[0.98] min-h-[140px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-200 dark:bg-amber-400 text-amber-800 dark:text-amber-950 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            Çocuk (6 – 12 Yaş)
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Eğlenceli kelime oyunları, flaş okuma ve disleksi dostu mod
          </span>
        </button>

        {/* Adult Selection */}
        <button
          onClick={() => onSelect("adult")}
          className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-900/70 bg-blue-50/50 dark:bg-slate-800/80 hover:bg-blue-100/60 dark:hover:bg-slate-700/80 hover:border-blue-400 text-slate-900 dark:text-white transition-all group active:scale-[0.98] min-h-[140px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-brand-900/60 text-blue-700 dark:text-brand-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <Glasses className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            Yetişkin (13+ Yaş)
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            RSVP odaklı okuma, ORP odak noktası, göz egzersizleri ve analizler
          </span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500">
        🔒 Çocuk güvenliği ilkelerimiz gereği 13 yaş altı kullanıcılar için veli onayı zorunludur. Profilleme ve reklam içermez.
      </div>
    </div>
  );
};
