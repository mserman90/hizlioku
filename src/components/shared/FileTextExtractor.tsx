"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, AlertCircle, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const ext = file.name.split(".").pop()?.toLowerCase();

    // Direct plain text reader for text-based formats
    if (ext === "txt" || ext === "md" || ext === "json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (!content || !content.trim()) {
          setError("Dosya boş görünüyor.");
          setLoading(false);
          return;
        }
        setExtractedText(content);
        setLoading(false);
      };
      reader.onerror = () => {
        setError("Dosya okunurken bir hata meydana geldi.");
        setLoading(false);
      };
      reader.readAsText(file);
    } else {
      // Documented limitation for complex binary PDF / DRM EPUB files:
      // Client-side pure extraction without heavy native WASM binaries is fragile across mobile viewports.
      setLoading(false);
      setError(
        `'.${ext}' uzantılı dosyalar karmaşık formatlama veya şifreleme içerebilir. Lütfen belgenizdeki metni kopyalayıp doğrudan metin alanına yapıştırınız.`
      );
    }
  };

  const handleApply = () => {
    if (!extractedText || !fileName) return;
    onExtracted(extractedText, fileName);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Dosyadan Metin Yükle</h3>
          <p className="text-xs text-slate-500">
            Metin belgesi (.txt, .md) seçin veya metninizi doğrudan içe aktarın
          </p>
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-2xl p-6 text-center transition cursor-pointer bg-slate-50 relative group">
        <input
          type="file"
          accept=".txt,.md,.json,.pdf,.epub"
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-brand-600 transition" />
        <span className="text-sm font-semibold text-slate-700 block">
          {fileName ? fileName : "Dosya seçmek için tıklayın veya buraya sürükleyin"}
        </span>
        <span className="text-xs text-slate-400 block mt-1">
          Doğrudan desteklenenler: .txt, .md • PDF/EPUB için metin yapıştırma önerilir
        </span>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {extractedText && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-600 max-h-24 overflow-y-auto font-mono">
            {extractedText.slice(0, 300)}...
          </div>
          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={handleApply}
            className="flex items-center justify-center gap-2"
          >
            <span>RSVP Okuyucuya Gönder</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
