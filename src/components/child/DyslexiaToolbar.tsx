"use client";

import React from "react";
import { Sliders, Type, Palette } from "lucide-react";

export interface DyslexiaSettings {
  isDyslexicFont: boolean;
  letterSpacing: "normal" | "wide" | "wider";
  overlayColor: "none" | "warm" | "blue" | "mint" | "peach";
}

interface DyslexiaToolbarProps {
  settings: DyslexiaSettings;
  onChange: (newSettings: DyslexiaSettings) => void;
}

export const DyslexiaToolbar: React.FC<DyslexiaToolbarProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-4 border border-amber-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
      <div className="flex items-center gap-2 font-bold text-slate-800">
        <Sliders className="w-4 h-4 text-amber-600" />
        <span>Okuma Kolaylaştırıcı</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Dyslexia-friendly font toggle */}
        <button
          type="button"
          onClick={() =>
            onChange({ ...settings, isDyslexicFont: !settings.isDyslexicFont })
          }
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition ${
            settings.isDyslexicFont
              ? "bg-amber-100 border-amber-400 text-amber-900"
              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
          title="Harf ayırt ediciliği yüksek disleksi dostu yazı tipi"
        >
          <Type className="w-4 h-4" />
          <span>{settings.isDyslexicFont ? "Disleksi Fontu: Açık" : "Normal Font"}</span>
        </button>

        {/* Letter Spacing Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <span className="text-[11px] font-medium text-slate-500 px-1">Aralık:</span>
          {(["normal", "wide", "wider"] as const).map((spacing) => (
            <button
              key={spacing}
              type="button"
              onClick={() => onChange({ ...settings, letterSpacing: spacing })}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                settings.letterSpacing === spacing
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {spacing === "normal" ? "1x" : spacing === "wide" ? "1.5x" : "2x"}
            </button>
          ))}
        </div>

        {/* Color Tint Overlay Selector */}
        <div className="flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-1">
            {[
              { id: "none", color: "bg-white border-slate-300", title: "Doğal" },
              { id: "warm", color: "bg-amber-100 border-amber-300", title: "Sıcak Sarı" },
              { id: "blue", color: "bg-blue-100 border-blue-300", title: "Açık Mavi" },
              { id: "mint", color: "bg-emerald-100 border-emerald-300", title: "Nane Yeşili" },
              { id: "peach", color: "bg-rose-100 border-rose-300", title: "Şeftali" },
            ].map((tint) => (
              <button
                key={tint.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...settings,
                    overlayColor: tint.id as DyslexiaSettings["overlayColor"],
                  })
                }
                title={tint.title}
                className={`w-6 h-6 rounded-full border-2 transition ${tint.color} ${
                  settings.overlayColor === tint.id
                    ? "ring-2 ring-brand-500 scale-110"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
