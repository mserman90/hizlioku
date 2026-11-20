import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { PwaRegister } from "@/components/ui/PwaRegister";

export const metadata: Metadata = {
  title: "HızlıOku — Bilimsel ve Yaşa Uygun Hızlı Okuma Platformu",
  description:
    "Çocuklar (6–12) için oyunlaştırılmış fonetik flaş okuma, yetişkinler (13+) için RSVP ve ORP destekli kanıta dayalı hızlı okuma eğitimi.",
  manifest: "./manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HızlıOku",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 md:pb-0 selection:bg-brand-500/20 selection:text-brand-900 transition-colors duration-200">
        <SkipToContent />
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
              {children}
            </main>
            <BottomNav />
            <PwaRegister />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
