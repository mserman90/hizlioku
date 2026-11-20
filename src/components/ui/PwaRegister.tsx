"use client";

import React, { useEffect, useState } from "react";
import { Download, Check } from "lucide-react";

export const PwaRegister: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Register service worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const swPath = isLocalhost ? "/sw.js" : "./sw.js";

      navigator.serviceWorker
        .register(swPath)
        .then((reg) => {
          // Service worker registered successfully
        })
        .catch((err) => {
          // Registration error (silent fallback)
        });
    }

    // 2. Listen for PWA beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // 3. Listen for appinstalled event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
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

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 animate-in slide-in-from-bottom duration-300">
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-500/30 transition transform hover:scale-105"
        title="Uygulamayı cihazınıza yükleyin (Çevrimdışı çalışır)"
      >
        <Download className="w-4 h-4" />
        <span>Uygulamayı Yükle (PWA)</span>
      </button>
    </div>
  );
};
