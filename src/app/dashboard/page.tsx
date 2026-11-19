"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardDispatcher() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role === "child") {
      if (user.consentStatus === "pending") {
        router.replace("/consent-pending");
      } else {
        router.replace("/dashboard/child");
      }
    } else if (user.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard/adult");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-500">
      <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-medium">Panel yükleniyor...</p>
    </div>
  );
}
