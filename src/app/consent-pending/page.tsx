"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Parental consent verification pending screen

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Mail, AlertTriangle, ArrowRight, LogOut } from "lucide-react";

export default function ConsentPendingPage() {
  const { user, simulateConsentGrant, logout } = useAuth();
  const router = useRouter();
  const [granting, setGranting] = useState(false);

  const handleSimulate = async () => {
    if (!user) return;
    setGranting(true);
    try {
      await simulateConsentGrant(user.uid);
      router.push("/dashboard/child");
    } finally {
      setGranting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Mail className="w-8 h-8" />
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 inline-block mb-3">
          Veli Onayı Bekleniyor
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Harika Bir Yolculuğa Az Kaldı!
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          <strong>{user?.parentEmail || "Velinizin e-posta adresine"}</strong> bir onay bağlantısı gönderildi. Çocuk güvenliği ve KVKK/COPPA gereğince, veli onayı tamamlanana kadar okuma alıştırmaları başlatılamaz ve hiçbir veri kaydedilmez.
        </p>

        <div className="bg-amber-50 rounded-2xl p-4 text-left border border-amber-200/60 mb-6 space-y-2 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-700" /> Çocuk Koruma Taahhüdümüz:
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
            <li>Kişisel profilleme veya reklam yapılmaz.</li>
            <li>Okuma puanları dışarıya kapalıdır.</li>
            <li>Veli istediği zaman kaydı ve verileri silebilir.</li>
          </ul>
        </div>

        {/* Development / Staging simulation trigger */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Faz 1 Test Kolaylığı (Geliştirme / Staging Modu)
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Canlı e-posta entegrasyonu haricinde, onay sürecini ve çocuk paneli geçişini test etmek için aşağıdaki butonu kullanabilirsiniz.
          </p>
          <Button
            type="button"
            variant="child"
            fullWidth
            onClick={handleSimulate}
            isLoading={granting}
          >
            Veli Onayını Onayla ve Paneli Aç
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 hover:text-rose-600 transition font-medium"
          >
            <LogOut className="w-4 h-4" /> Farklı Hesapla Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}
