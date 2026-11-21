"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Github, Smartphone, ShieldCheck, Heart, ExternalLink, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Hızlı<span className="text-brand-400">Oku</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Çocuklar (6–12) için oyunlaştırılmış fonetik egzersizler, yetişkinler (13+) için kanıta dayalı RSVP ve ORP (Optimal Recognition Point) odaklı açık kaynak hızlı okuma platformu.
            </p>

            {/* GitHub Project Pill */}
            <div className="pt-2">
              <a
                href="https://github.com/mserman90/hizlioku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white text-xs sm:text-sm font-semibold border border-slate-700 hover:border-slate-600 transition shadow-sm group"
              >
                <Github className="w-4 h-4 text-slate-300 group-hover:text-white transition" />
                <span>GitHub Deposu: <strong className="font-bold text-brand-300">mserman90/hizlioku</strong></span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-brand-400 transition">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Kullanım Kılavuzu
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-brand-400 transition">
                  Öğrenci & Kullanıcı Paneli
                </Link>
              </li>
              <li>
                <a
                  href="./hizlioku.apk"
                  download="hizlioku.apk"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  Android APK İndir (v1.0)
                </a>
              </li>
            </ul>
          </div>

          {/* Open Source & Academic */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Açık Kaynak & Bilim
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="https://github.com/mserman90/hizlioku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Kaynak Kodları
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mserman90/hizlioku/blob/main/BILIMSEL_TEMELLER.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition"
                >
                  Akademik & Bilimsel Rapor
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mserman90/hizlioku/blob/main/KULLANIM_KILAVUZU.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition"
                >
                  Detaylı Kılavuz (Markdown)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mserman90/hizlioku/tree/main/release"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition"
                >
                  Android Sürümleri (Releases)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="max-w-2xl text-center md:text-left">
            ⚠️ <strong>Bilimsel & Yasal Sorumluluk Reddi:</strong> HızlıOku bir bilişsel egzersiz ve pratik aracıdır. Tıbbi teşhis, tedavi veya mucizevi okuma hızlanması vaat etmez. Verileriniz KVKK/COPPA uyumlu olarak yalnızca tarayıcınızda ve cihazınızda yerel saklanır.
          </p>
          <div className="flex items-center gap-2 text-center text-slate-400 shrink-0">
            <span>Açık Kaynak (MIT)</span>
            <span>•</span>
            <a
              href="https://github.com/mserman90/hizlioku"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 font-medium underline underline-offset-4"
            >
              github.com/mserman90/hizlioku
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
