"use client";

import React from "react";
import { getOrpIndex } from "@/lib/readingUtils";

interface OrpWordDisplayProps {
  word: string;
  fontSizeClass?: string;
  theme?: "modern" | "sepia" | "eink" | "dark";
}

export const OrpWordDisplay: React.FC<OrpWordDisplayProps> = ({
  word,
  fontSizeClass = "text-4xl sm:text-6xl md:text-7xl",
  theme = "modern",
}) => {
  if (!word) {
    return (
      <div className={`${fontSizeClass} font-mono font-bold text-slate-300 dark:text-slate-600`}>
        —
      </div>
    );
  }

  const firstWord = word.split(" ")[0] || word;
  const orpIndex = getOrpIndex(firstWord);
  const prefix = word.slice(0, orpIndex);
  const orpChar = word.charAt(orpIndex);
  const suffix = word.slice(orpIndex + 1);

  // Theme-specific styling
  const markerColor =
    theme === "sepia"
      ? "bg-amber-700"
      : theme === "eink"
      ? "bg-black"
      : theme === "dark"
      ? "bg-rose-400"
      : "bg-rose-500 dark:bg-rose-400";

  const textColor =
    theme === "sepia"
      ? "text-[#382813]"
      : theme === "eink"
      ? "text-black"
      : theme === "dark"
      ? "text-slate-100"
      : "text-slate-800 dark:text-slate-100";

  const orpCharColor =
    theme === "sepia"
      ? "text-amber-800"
      : theme === "eink"
      ? "text-black underline decoration-2 underline-offset-4"
      : theme === "dark"
      ? "text-rose-400"
      : "text-rose-600 dark:text-rose-400";

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-6">
      {/* Subtle Optical Focus Backdrop Glow */}
      <div className="absolute inset-0 m-auto w-48 h-28 rounded-full bg-rose-500/5 dark:bg-rose-400/10 pointer-events-none blur-2xl" />

      {/* Top Fixation Marker */}
      <div className={`w-1.5 h-3.5 ${markerColor} rounded-full mb-3 opacity-90 shadow-xs`} />

      {/* ORP Word presentation: Monospace or proportional with high-visibility contrast */}
      <div className={`font-mono font-bold tracking-normal ${fontSizeClass} flex items-baseline justify-center`}>
        {/* Left segment */}
        <span className={`text-right ${textColor} flex-1 min-w-[120px] sm:min-w-[180px] transition-colors`}>
          {prefix}
        </span>

        {/* ORP Focus character */}
        <span className={`${orpCharColor} font-black px-0.5 transform scale-110 inline-block drop-shadow-xs`}>
          {orpChar}
        </span>

        {/* Right segment */}
        <span className={`text-left ${textColor} flex-1 min-w-[120px] sm:min-w-[180px] transition-colors`}>
          {suffix}
        </span>
      </div>

      {/* Bottom Fixation Marker */}
      <div className={`w-1.5 h-3.5 ${markerColor} rounded-full mt-3 opacity-90 shadow-xs`} />
    </div>
  );
};
