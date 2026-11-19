"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Registration form enforcing Age Gate and Child Safety / Parental Consent flow

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AgeGateModal } from "./AgeGateModal";
import Link from "next/link";
import { AgeGroup } from "@/types";
import { UserPlus, ShieldAlert, ArrowLeft } from "lucide-react";

export const SignupForm: React.FC<{ initialAgeGroup?: AgeGroup }> = ({
  initialAgeGroup,
}) => {
  const router = useRouter();
  const { register, loginGoogle } = useAuth();

  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(initialAgeGroup || null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If age group has not yet been selected, present the mandatory Age Gate
  if (!ageGroup) {
    return <AgeGateModal onSelect={(group) => setAgeGroup(group)} />;
  }

  const isChild = ageGroup === "child";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!displayName || !email || !password) {
      setError("Lütfen tüm zorunlu alanları doldurunuz.");
      return;
    }

    if (password.length < 6) {
      setError("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    if (isChild && !parentEmail) {
      setError("13 yaş altı kayıtlar için veli e-posta adresi zorunludur.");
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        email,
        pass: password,
        displayName,
        ageGroup,
        parentEmail: isChild ? parentEmail : undefined,
      });

      if (user.role === "child") {
        router.push("/consent-pending");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.message || "Kayıt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google ile kayıt esnasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
      <button
        onClick={() => setAgeGroup(null)}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Yaş Grubunu Değiştir
      </button>

      <div className="text-center mb-6">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner ${
            isChild ? "bg-amber-100 text-amber-700" : "bg-brand-50 text-brand-600"
          }`}
        >
          <UserPlus className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          {isChild ? "Çocuk Hesabı Oluştur" : "Yetişkin Hesabı Oluştur"}
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          {isChild
            ? "6–12 Yaş | Veli izni gerektirir, güvenli ve reklamsızdır"
            : "13+ Yaş | Kişiselleştirilmiş RSVP ve anlama analizleri"}
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
          ✓ Çevrimdışı / Demo Modu Aktif (Anında Deneyebilirsiniz)
        </div>
      </div>

      {isChild && (
        <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-700 mt-0.5" />
          <div>
            <strong>Çocuk Gizliliği İlkesi:</strong> Veli onayı verilene kadar çocuğa ait hiçbir okuma süreci, puan veya metin kaydı saklanmaz.
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={isChild ? "Çocuğun Adı / Takma Adı" : "Adınız Soyadınız"}
          type="text"
          placeholder={isChild ? "Örn: Efe" : "Örn: Ahmet Yılmaz"}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <Input
          label={isChild ? "Çocuk Kullanıcı E-postası" : "E-posta Adresi"}
          type="email"
          placeholder="hesap@posta.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {isChild && (
          <Input
            label="Veli / Ebeveyn E-postası (Zorunlu)"
            type="email"
            placeholder="veli@posta.com"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            helperText="Onay bağlantısı bu adrese iletilecektir."
            required
          />
        )}

        <Input
          label="Şifre"
          type="password"
          placeholder="En az 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant={isChild ? "child" : "primary"}
          fullWidth
          isLoading={loading}
        >
          {isChild ? "Veli Onayı İçin Kaydol" : "Hesap Oluştur"}
        </Button>
      </form>

      {!isChild && (
        <>
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
              veya
            </span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={handleGoogle}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google ile Hızlı Kaydol
          </Button>
        </>
      )}

      <div className="mt-6 text-center text-sm text-slate-500">
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">
          Giriş Yapın
        </Link>
      </div>
    </div>
  );
};
