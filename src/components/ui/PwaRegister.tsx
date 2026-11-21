"use client";

import React, { useEffect, useState } from "react";
import { Download, X, Smartphone, Share, PlusSquare, Apple } from "lucide-react";

export const PwaRegister: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIosPromptVisible, setIsIosPromptVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Register service worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      const swPath = isLocalhost ? "/sw.js" : "./sw.js";

      navigator.serviceWorker
        .register(swPath)
        .catch(() => {});
    }

    if (typeof window === "undefined") return;

    // Check if dismissed before in session
    const dismissed = sessionStorage.getItem("pwa_dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Check if running as installed standalone app
    const isStandalone =
      (window.navigator as any).standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;

    if (isStandalone) return;

    // 2. Check for iOS (Safari)
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isSafari = ua.includes("safari") && !ua.includes("crios") && !ua.includes("fxios");

    if (isIos && isSafari) {
      // Delay slightly for smooth page load
      const timer = setTimeout(() => {
        setIsIosPromptVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // 3. Listen for Chromium beforeinstallprompt event (Android / Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // 4. Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstallable(false);
      setIsIosPromptVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    setIsDismissed(true);
    setIsInstallable(false);
    setIsIosPromptVisible(false);
    try {
      sessionStorage.setItem("pwa_dismissed", "true");
    } catch (_) {}
  };

  if (isDismissed) return null;

  // iOS Specific Safari Install Helper
  if (isIosPromptVisible) {
    return (
      <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-in slide-in-from-bottom duration-300 max-w-sm">
        <div className="p-4 rounded-3xl bg-slate-900/95 text-white border border-slate-700 shadow-2xl backdrop-blur-md space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Smartphone className="w-4 h-4 text-brand-300" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">
                  iPhone'a Kur (Apple iOS)
                </h4>
                <span className="text-[10px] text-brand-300 font-medium">
                  Safari Ana Ekrana Ekle
                </span>
              </div>
            </div>
            <button
              onClick={dismissPrompt}
              className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              title="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-slate-300 space-y-1 bg-white/5 p-2.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <Share className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>1. Alttaki <strong>Paylaş</strong> simgesine dokunun.</span>
            </div>
            <div className="flex items-center gap-2">
              <PlusSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>2. <strong>"Ana Ekrana Ekle"</strong> seçeneğini seçin.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Android / Chromium Install Helper
  if (isInstallable) {
    return (
      <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-in slide-in-from-bottom duration-300 max-w-sm">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-brand-900/10 dark:shadow-black/40 flex items-center justify-between gap-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-brand-500/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">
                HızlıOku'yu Yükle
              </h4>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Çevrimdışı ve tam ekran mobil deneyimi.
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
            >
              Yükle
            </button>
            <button
              onClick={dismissPrompt}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
              title="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
