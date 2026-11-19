"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl border transition-all flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-500 ${
        theme === "dark"
          ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 shadow-sm"
          : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 shadow-xs"
      } ${className}`}
      aria-label={theme === "dark" ? "Gündüz moduna geç" : "Gece moduna geç (Göz koruması)"}
      title={theme === "dark" ? "Gündüz Modu" : "Gece Modu (Göz Koruması)"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 fill-amber-400 text-amber-400 animate-in zoom-in-75 duration-200" />
      ) : (
        <Moon className="w-5 h-5 fill-slate-700 text-slate-700 animate-in zoom-in-75 duration-200" />
      )}
    </button>
  );
};
