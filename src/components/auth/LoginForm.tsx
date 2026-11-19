"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Login Form: Handles credentials and Google auth redirects

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, loginGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Lütfen e-posta ve şifrenizi giriniz.");
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === "child" && user.consentStatus === "pending") {
        router.push("/consent-pending");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.message || "Giriş yapılırken bir hata oluştu. Bilgilerinizi kontrol ediniz."
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
      setError(err.message || "Google ile giriş yapılırken bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hesabınıza Giriş Yapın</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Hızlı okuma çalışmalarınıza kaldığınız yerden devam edin
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
          ✓ Çevrimdışı / Demo Modu Aktif (Anında Giriş Yapabilirsiniz)
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-posta Adresi"
          type="email"
          placeholder="ornek@posta.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Şifre"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" fullWidth isLoading={loading}>
          Giriş Yap
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
        <span className="text-xs uppercase text-slate-400 dark:text-slate-500 font-semibold tracking-wider">
          veya
        </span>
        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
      </div>

      <Button
        type="button"
        variant="secondary"
        fullWidth
        onClick={handleGoogle}
        disabled={loading}
        className="flex items-center gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
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
        Google ile Giriş Yap (Yetişkin)
      </Button>

      <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Hesabınız yok mu?{" "}
        <Link href="/signup" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          Kayıt Olun
        </Link>
      </div>
    </div>
  );
};
