"use client";

import React from "react";
import { getOrpIndex } from "@/lib/readingUtils";

interface OrpWordDisplayProps {
  word: string;
  fontSizeClass?: string;
}

export const OrpWordDisplay: React.FC<OrpWordDisplayProps> = ({
  word,
  fontSizeClass = "text-4xl sm:text-6xl md:text-7xl",
}) => {
  if (!word) {
    return (
      <div className={`${fontSizeClass} font-mono font-bold text-slate-300 dark:text-slate-600`}>
        —
      </div>
    );
  }

  const orpIndex = getOrpIndex(word);
  const prefix = word.slice(0, orpIndex);
  const orpChar = word.charAt(orpIndex);
  const suffix = word.slice(orpIndex + 1);

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-6">
      {/* Top Fixation Marker */}
      <div className="w-1.5 h-3.5 bg-rose-500 dark:bg-rose-400 rounded-full mb-3 opacity-90 shadow-xs" />

      {/* ORP Word presentation: Monospace or proportional with high-visibility contrast */}
      <div className={`font-mono font-bold tracking-normal ${fontSizeClass} flex items-baseline justify-center`}>
        {/* Left segment */}
        <span className="text-right text-slate-800 dark:text-slate-100 flex-1 min-w-[120px] sm:min-w-[180px] transition-colors">
          {prefix}
        </span>

        {/* ORP Focus character */}
        <span className="text-rose-600 dark:text-rose-400 font-black px-0.5 transform scale-110 inline-block drop-shadow-xs">
          {orpChar}
        </span>

        {/* Right segment */}
        <span className="text-left text-slate-800 dark:text-slate-100 flex-1 min-w-[120px] sm:min-w-[180px] transition-colors">
          {suffix}
        </span>
      </div>

      {/* Bottom Fixation Marker */}
      <div className="w-1.5 h-3.5 bg-rose-500 dark:bg-rose-400 rounded-full mt-3 opacity-90 shadow-xs" />
    </div>
  );
};
