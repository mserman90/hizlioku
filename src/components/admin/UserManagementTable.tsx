"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Admin user management: Lists user roles and consent states; role modification

import React, { useState } from "react";
import { UserDoc, UserRole } from "@/types";
import { Shield, ShieldAlert, CheckCircle2, Clock, UserCheck } from "lucide-react";

interface UserManagementTableProps {
  initialUsers?: UserDoc[];
}

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  initialUsers = [
    {
      uid: "usr-1",
      displayName: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "adult",
      ageGroup: "adult",
      consentStatus: "not_required",
      createdAt: "2026-11-10",
    },
    {
      uid: "usr-2",
      displayName: "Efe Kaya",
      email: "efe@example.com",
      role: "child",
      ageGroup: "child",
      parentEmail: "veli.kaya@example.com",
      consentStatus: "granted",
      createdAt: "2026-11-12",
    },
    {
      uid: "usr-3",
      displayName: "Zeynep Demir",
      email: "zeynep@example.com",
      role: "child",
      ageGroup: "child",
      parentEmail: "veli.demir@example.com",
      consentStatus: "pending",
      createdAt: "2026-11-18",
    },
    {
      uid: "usr-4",
      displayName: "Sistem Yöneticisi",
      email: "admin@hizlioku.com",
      role: "admin",
      ageGroup: "adult",
      consentStatus: "not_required",
      createdAt: "2026-11-01",
    },
  ],
}) => {
  const [users, setUsers] = useState<UserDoc[]>(initialUsers);
  const [message, setMessage] = useState<string | null>(null);

  // ⚠️ HUMAN REVIEW REQUIRED: Granting / revoking admin role
  const toggleAdminRole = (uid: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.uid === uid) {
          const newRole: UserRole = u.role === "admin" ? "adult" : "admin";
          setMessage(`${u.displayName} kullanıcısının rolü '${newRole}' olarak güncellendi.`);
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Kullanıcı & İzin Yönetimi</h3>
            <p className="text-xs text-slate-500">
              Kayıtlı hesaplar, yaş grupları ve veli onay durumları
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
          {message}
        </div>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
              <th className="pb-3">Kullanıcı</th>
              <th className="pb-3">Yaş Grubu</th>
              <th className="pb-3">Rol</th>
              <th className="pb-3">Veli Onayı</th>
              <th className="pb-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.uid} className="hover:bg-slate-50/50">
                <td className="py-3.5 pr-2">
                  <div className="font-bold text-slate-900">{u.displayName}</div>
                  <div className="text-xs text-slate-500">{u.email || "E-posta yok"}</div>
                </td>
                <td className="py-3.5 pr-2">
                  <span className="font-medium text-slate-700 capitalize">
                    {u.ageGroup === "child" ? "Çocuk (6–12)" : "Yetişkin (13+)"}
                  </span>
                </td>
                <td className="py-3.5 pr-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-rose-100 text-rose-800"
                        : u.role === "child"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {u.role === "admin" && <Shield className="w-3 h-3" />}
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 pr-2">
                  {u.consentStatus === "granted" ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Onaylı
                    </span>
                  ) : u.consentStatus === "pending" ? (
                    <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-xs">
                      <Clock className="w-3.5 h-3.5" /> Bekliyor
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">Gerekli Değil</span>
                  )}
                </td>
                <td className="py-3.5 text-right">
                  {u.role !== "child" && (
                    <button
                      onClick={() => toggleAdminRole(u.uid)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                    >
                      {u.role === "admin" ? "Adminliği Kaldır" : "Admin Yap"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
