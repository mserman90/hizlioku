"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Target, Compass, Check, ArrowRight } from "lucide-react";

interface TargetPacerProps {
  currentWpm?: number;
  onSetTarget?: (targetWpm: number) => void;
}

export const TargetPacer: React.FC<TargetPacerProps> = ({
  currentWpm = 250,
  onSetTarget,
}) => {
  const [target, setTarget] = useState(450);
  const [saved, setSaved] = useState(false);

  const getRecommendation = (wpm: number) => {
    if (wpm < 300) {
      return {
        textLength: "300–400 kelime",
        duration: "yaklaşık 1.5 dakika",
        focus: "İç seslendirmeyi (subvocalization) azaltma ve göz sıçramalarını koordine etme.",
      };
    } else if (wpm < 500) {
      return {
        textLength: "600–800 kelime",
        duration: "yaklaşık 2 dakika",
        focus: "Optimum Tanıma Noktası (ORP) odaklanması ve 5x5 Schulte tablosu antrenmanı.",
      };
    } else {
      return {
        textLength: "1000+ kelime",
        duration: "yaklaşık 2-3 dakika",
        focus: "Yüksek hızlı periferik algı ve zihinsel kavrama blokları oluşturma.",
      };
    }
  };

  const rec = getRecommendation(target);

  const handleSave = () => {
    if (onSetTarget) onSetTarget(target);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Hedef Hız ve Alıştırma Asistanı</h3>
          <p className="text-xs text-slate-500">Mevcut temponuza göre hedefinizi ve seansınızı planlayın</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 uppercase">Hedef Okuma Hızı</span>
          <span className="text-xl font-black text-brand-600">{target} WPM</span>
        </div>

        <input
          type="range"
          min={200}
          max={900}
          step={25}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="w-full accent-brand-600 cursor-pointer"
        />

        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Temel (200 WPM)</span>
          <span>Akıcı (500 WPM)</span>
          <span>İleri (900 WPM)</span>
        </div>
      </div>

      {/* Dynamic Recommendation Card */}
      <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-100 space-y-2 text-xs sm:text-sm text-brand-950">
        <div className="flex items-center gap-2 font-bold text-brand-900">
          <Compass className="w-4 h-4 text-brand-600" />
          Kişiselleştirilmiş Seans Önerisi:
        </div>
        <p className="text-slate-600 leading-relaxed">
          {target} WPM hedefine ulaşmak için <strong>{rec.duration}</strong> sürecek{" "}
          <strong>{rec.textLength}</strong> uzunluğunda metinlerle pratik yapmanız önerilir.
        </p>
        <div className="text-xs text-brand-800 font-semibold pt-1">
          📌 Odak Alanı: {rec.focus}
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        fullWidth
        onClick={handleSave}
        className="flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <Check className="w-4 h-4" /> Hedef Kaydedildi
          </>
        ) : (
          <>
            Hedefi Güncelle
          </>
        )}
      </Button>
    </div>
  );
};
