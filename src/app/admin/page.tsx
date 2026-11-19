"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Admin Panel: Restricted to administrative users.
// Provides role management, content CRUD, and anonymous usage metric export.

import React from "react";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { TextContentEditor } from "@/components/admin/TextContentEditor";
import { UsageReportExport } from "@/components/admin/UsageReportExport";
import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center shadow-xs">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sistem Yönetim Paneli</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kullanıcı izinleri, veli onay durumu, telifsiz metin kütüphanesi ve kullanım raporları
            </p>
          </div>
        </div>

        {/* 1. User Management */}
        <UserManagementTable />

        {/* 2. Text Content CRUD */}
        <TextContentEditor />

        {/* 3. Usage Export */}
        <UsageReportExport />
      </div>
    </RoleGuard>
  );
}
