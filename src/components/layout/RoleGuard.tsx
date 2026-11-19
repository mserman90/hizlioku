"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// RoleGuard: Controls route access based on authentication, age-based role, and consent status

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireConsent?: boolean;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requireConsent = true,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    // ⚠️ HUMAN REVIEW REQUIRED: Gating child access until parental consent is explicitly granted
    if (user.role === "child" && requireConsent && user.consentStatus === "pending") {
      router.replace("/consent-pending");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [user, loading, allowedRoles, requireConsent, router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-slate-500">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium">Yetki kontrol ediliyor...</p>
      </div>
    );
  }

  if (!user) return null;

  if (user.role === "child" && requireConsent && user.consentStatus === "pending") {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
