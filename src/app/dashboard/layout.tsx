"use client";

import React from "react";
import { RoleGuard } from "@/components/layout/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard>
      <div className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </div>
    </RoleGuard>
  );
}
