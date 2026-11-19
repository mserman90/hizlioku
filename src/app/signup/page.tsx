"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SignupForm } from "@/components/auth/SignupForm";
import { AgeGroup } from "@/types";

function SignupContent() {
  const searchParams = useSearchParams();
  const ageParam = searchParams.get("age");
  const initialAgeGroup: AgeGroup | undefined =
    ageParam === "child" || ageParam === "adult" ? ageParam : undefined;

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <SignupForm initialAgeGroup={initialAgeGroup} />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
          Yükleniyor...
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
