"use client";

import React from "react";
import { PyramidExercise } from "@/components/adult/PyramidExercise";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PyramidExercisePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Link
          href="/dashboard/adult"
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Yetişkin Paneline Dön
        </Link>
      </div>

      <PyramidExercise />
    </div>
  );
}
