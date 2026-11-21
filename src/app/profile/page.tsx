"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Profile Management: Displays account role, consent status, and sign out

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { updateUserDisplayName } from "@/lib/firestore";
import { User, Shield, CheckCircle2, Clock, LogOut, Award, Github, Smartphone, ExternalLink } from "lucide-react";

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
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-2xl">
              {user?.displayName ? user.displayName[0].toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {user?.displayName}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email || "E-posta belirtilmemiş"}</p>
            </div>
          </div>

          {message && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-sm">
              {message}
            </div>
          )}

          <div className="space-y-6">
            {/* Account Details Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase">Hesap Türü</span>
                <div className="mt-1 flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                  <Shield className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>
                    {user?.role === "child"
                      ? "Çocuk (6–12 Yaş)"
                      : user?.role === "admin"
                      ? "Sistem Yöneticisi"
                      : "Yetişkin (13+ Yaş)"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase">Veli Onay Durumu</span>
                <div className="mt-1 flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                  {user?.consentStatus === "granted" || user?.consentStatus === "not_required" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400">
                        {user.consentStatus === "not_required" ? "Gerekli Değil (13+)" : "Onaylandı"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      <span className="text-amber-700 dark:text-amber-400">Onay Bekleniyor</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Reading Level Placeholder */}
            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                <div>
                  <h3 className="text-sm font-bold text-brand-900 dark:text-brand-200">Mevcut Okuma Seviyesi</h3>
                  <p className="text-xs text-brand-700 dark:text-brand-300">Başlangıç Seviyesi (Faz 2 ile aktive edilecektir)</p>
                </div>
              </div>
              <span className="text-sm font-extrabold text-brand-700 dark:text-brand-300 px-3 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
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

            {/* App & Open Source Info */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Uygulama & Açık Kaynak
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  v1.0.0 (Web & Android)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Github className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        GitHub Deposu
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        mserman90/hizlioku
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://github.com/mserman90/hizlioku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-brand-600 text-xs font-bold border border-slate-200 dark:border-slate-600 shadow-xs transition"
                  >
                    <span>Görüntüle</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Android APK Kurulumu</span>
                  </div>
                  <a
                    href="./hizlioku.apk"
                    download="hizlioku.apk"
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    APK İndir (4.7 MB)
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
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
