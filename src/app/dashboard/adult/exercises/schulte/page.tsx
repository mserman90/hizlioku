"use client";

import React from "react";
import { SchulteTable } from "@/components/adult/SchulteTable";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SchultePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Link
          href="/dashboard/adult"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Yetişkin Paneline Dön
        </Link>
      </div>
      <SchulteTable />
    </div>
  );
}
