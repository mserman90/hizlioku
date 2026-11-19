"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Profile Management: Displays account role, consent status, and sign out

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { updateUserDisplayName } from "@/lib/firestore";
import { User, Shield, CheckCircle2, Clock, LogOut, Award } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !displayName.trim()) return;

    setSaving(true);
    setMessage(null);
    try {
      await updateUserDisplayName(user.uid, displayName);
      setMessage("Profil ismi başarıyla güncellendi.");
    } catch (err: any) {
      setMessage("Güncelleme başarısız oldu: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <RoleGuard requireConsent={false}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-2xl">
              {user?.displayName ? user.displayName[0].toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {user?.displayName}
              </h1>
              <p className="text-sm text-slate-500">{user?.email || "E-posta belirtilmemiş"}</p>
            </div>
          </div>

          {message && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
              {message}
            </div>
          )}

          <div className="space-y-6">
            {/* Account Details Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 font-semibold uppercase">Hesap Türü</span>
                <div className="mt-1 flex items-center gap-2 font-bold text-slate-800">
                  <Shield className="w-4 h-4 text-brand-600" />
                  <span>
                    {user?.role === "child"
                      ? "Çocuk (6–12 Yaş)"
                      : user?.role === "admin"
                      ? "Sistem Yöneticisi"
                      : "Yetişkin (13+ Yaş)"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 font-semibold uppercase">Veli Onay Durumu</span>
                <div className="mt-1 flex items-center gap-2 font-bold text-slate-800">
                  {user?.consentStatus === "granted" || user?.consentStatus === "not_required" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">
                        {user.consentStatus === "not_required" ? "Gerekli Değil (13+)" : "Onaylandı"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-amber-700">Onay Bekleniyor</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Reading Level Placeholder */}
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-brand-600" />
                <div>
                  <h3 className="text-sm font-bold text-brand-900">Mevcut Okuma Seviyesi</h3>
                  <p className="text-xs text-brand-700">Başlangıç Seviyesi (Faz 2 ile aktive edilecektir)</p>
                </div>
              </div>
              <span className="text-sm font-extrabold text-brand-700 px-3 py-1 bg-white rounded-xl shadow-xs">
                Seviye 1
              </span>
            </div>

            {/* Edit Display Name */}
            <form onSubmit={handleUpdate} className="space-y-4 pt-2">
              <Input
                label="Görünen İsim"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              <Button type="submit" variant="secondary" isLoading={saving}>
                İsmi Güncelle
              </Button>
            </form>

            <div className="pt-6 border-t border-slate-200">
              <Button
                type="button"
                variant="danger"
                fullWidth
                onClick={() => logout()}
                className="flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Hesaptan Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
