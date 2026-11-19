"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, AlertCircle, Check, ArrowRight, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { extractTextFromPdf } from "@/lib/pdfExtractor";

interface FileTextExtractorProps {
  onExtracted: (text: string, title: string) => void;
}

export const FileTextExtractor: React.FC<FileTextExtractorProps> = ({
  onExtracted,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState<string>("Dosya işleniyor...");
  const [stats, setStats] = useState<{ wordCount: number; charCount: number } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setExtractedText(null);
    setStats(null);

    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const ext = file.name.split(".").pop()?.toLowerCase();

    try {
      if (ext === "pdf") {
        setLoadingMsg("PDF sayfaları taranıyor ve metne dönüştürülüyor...");
        const buffer = await file.arrayBuffer();
        const text = await extractTextFromPdf(buffer);

        if (!text || !text.trim()) {
          throw new Error(
            "Bu PDF dosyasından metin çıkarılamadı. Belge salt taranmış resimlerden (OCR gerektiren) oluşuyor veya şifreli olabilir."
          );
        }

        const words = text.trim().split(/\s+/).filter(Boolean);
        setExtractedText(text.trim());
        setStats({ wordCount: words.length, charCount: text.length });
      } else if (ext === "txt" || ext === "md" || ext === "json") {
        setLoadingMsg("Metin belgesi okunuyor...");
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (!content || !content.trim()) {
            setError("Dosya boş görünüyor.");
            setLoading(false);
            return;
          }
          const words = content.trim().split(/\s+/).filter(Boolean);
          setExtractedText(content.trim());
          setStats({ wordCount: words.length, charCount: content.length });
          setLoading(false);
        };
        reader.onerror = () => {
          setError("Dosya okunurken bir hata meydana geldi.");
          setLoading(false);
        };
        reader.readAsText(file);
        return;
      } else {
        throw new Error(
          `'.${ext}' uzantısı doğrudan desteklenmiyor. Lütfen .pdf, .txt veya .md formatında bir dosya yükleyin ya da metni doğrudan yapıştırın.`
        );
      }
    } catch (err: any) {
      console.error("File extraction error:", err);
      setError(err.message || "Dosya ayrıştırılırken beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!extractedText || !fileName) return;
    onExtracted(extractedText, fileName.replace(/\.[^/.]+$/, ""));
  };

  const handleDownloadTxt = () => {
    if (!extractedText || !fileName) return;
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName.replace(/\.[^/.]+$/, "")}_hizlioku.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Otomatik PDF & Belge Dönüştürücü
          </h3>
          <p className="text-xs text-slate-500">
            PDF, TXT veya MD dosyalarınızı yükleyin; anında temiz metne dönüştürülüp RSVP'ye aktarılır
          </p>
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-2xl p-6 text-center transition cursor-pointer bg-slate-50 relative group">
        <input
          type="file"
          accept=".pdf,.txt,.md,.json"
          onChange={handleFileUpload}
          disabled={loading}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
        />
        {loading ? (
          <div className="flex flex-col items-center justify-center py-2">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin mb-2" />
            <span className="text-sm font-semibold text-slate-800">{loadingMsg}</span>
            <span className="text-xs text-slate-400 mt-1">Lütfen bekleyin...</span>
          </div>
        ) : (
          <>
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-brand-600 transition" />
            <span className="text-sm font-semibold text-slate-700 block">
              {fileName ? fileName : "PDF veya Metin Belgesi Seçmek İçin Tıklayın / Sürükleyin"}
            </span>
            <span className="text-xs text-slate-400 block mt-1">
              Desteklenen formatlar: <strong>.pdf</strong> (otomatik metne dönüştürülür), <strong>.txt</strong>, <strong>.md</strong>
            </span>
          </>
        )}
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {extractedText && stats && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Dönüştürme Başarılı!</span>
            </div>
            <div className="font-semibold text-emerald-800">
              {stats.wordCount.toLocaleString("tr-TR")} kelime • {stats.charCount.toLocaleString("tr-TR")} karakter
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700 max-h-32 overflow-y-auto font-mono whitespace-pre-wrap leading-relaxed border border-slate-200">
            {extractedText.slice(0, 500)}
            {extractedText.length > 500 ? "..." : ""}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Button
              type="button"
              variant="secondary"
              onClick={handleDownloadTxt}
              className="flex items-center justify-center gap-1.5 flex-1"
            >
              <Download className="w-4 h-4" />
              <span>TXT Olarak İndir</span>
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handleApply}
              className="flex items-center justify-center gap-2 flex-1"
            >
              <span>RSVP Okuyucuya Gönder</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
