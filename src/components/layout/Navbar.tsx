"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, User, Shield, LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Hızlı<span className="text-brand-600">Oku</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-brand-600 transition"
          >
            Ana Sayfa
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition"
            >
              Panelim
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1 transition"
            >
              <Shield className="w-4 h-4" /> Admin
            </Link>
          )}
        </nav>

        {/* User state / Auth action buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Role Badge */}
              <span
                className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  user.role === "child"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : user.role === "admin"
                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                {user.role === "child"
                  ? "Çocuk (6-12)"
                  : user.role === "admin"
                  ? "Yönetici"
                  : "Yetişkin (13+)"}
              </span>

              {/* Profile Link */}
              <Link
                href="/profile"
                className="flex items-center gap-2 p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                title="Profilim"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold text-sm">
                  {user.displayName ? user.displayName[0].toUpperCase() : "U"}
                </div>
                <span className="hidden lg:inline text-sm font-medium text-slate-800 max-w-[120px] truncate">
                  {user.displayName}
                </span>
              </Link>

              {/* Logout button */}
              <button
                onClick={() => logout()}
                className="p-2 text-slate-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Çıkış Yap"
                title="Çıkış Yap"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-brand-600 transition min-h-[44px] flex items-center"
              >
                Giriş Yap
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition min-h-[44px] flex items-center"
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
