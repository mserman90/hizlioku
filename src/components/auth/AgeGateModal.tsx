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
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
        Hoş Geldiniz! 👋
      </h2>
      <p className="text-slate-600 text-sm sm:text-base mb-8">
        Size en uygun, yaşa ve bilişsel seviyeye göre tasarlanmış okuma deneyimini hazırlayabilmemiz için lütfen yaş grubunuzu seçin:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Child Selection */}
        <button
          onClick={() => onSelect("child")}
          className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-amber-300 bg-amber-50/60 hover:bg-amber-100/70 hover:border-amber-400 text-slate-900 transition-all group active:scale-[0.98] min-h-[140px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-200 flex items-center justify-center text-amber-800 mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg text-slate-900 mb-1">
            Çocuk (6 – 12 Yaş)
          </span>
          <span className="text-xs text-slate-600">
            Eğlenceli kelime oyunları, flaş okuma ve disleksi dostu mod
          </span>
        </button>

        {/* Adult Selection */}
        <button
          onClick={() => onSelect("adult")}
          className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 hover:border-blue-400 text-slate-900 transition-all group active:scale-[0.98] min-h-[140px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <Glasses className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg text-slate-900 mb-1">
            Yetişkin (13+ Yaş)
          </span>
          <span className="text-xs text-slate-600">
            RSVP odaklı okuma, ORP odak noktası, göz egzersizleri ve analizler
          </span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
        🔒 Çocuk güvenliği ilkelerimiz gereği 13 yaş altı kullanıcılar için veli onayı zorunludur. Profilleme ve reklam içermez.
      </div>
    </div>
  );
};
