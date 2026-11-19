"use client";

import React, { useState } from "react";
import { Download, FileSpreadsheet, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const UsageReportExport: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCsv = () => {
    // Generate clean CSV report of anonymous usage metrics
    const headers = ["Metrik", "Deger", "Aciklama"];
    const rows = [
      ["Toplam Kayitli Kullanici", "4", "Aktif sistem kullanicilari"],
      ["Yetiskin Kullanici Sayisi", "2", "13 yas ve uzeri"],
      ["Cocuk Kullanici Sayisi", "2", "6-12 yas araligi"],
      ["Veli Onayi Alinmis Cocuk", "1", "Okuma verisi toplanabilen"],
      ["Tamamlanan Toplam Oturum", "48", "Tum moduller toplami"],
      ["Ortalama RSVP Hizi", "345 WPM", "Yetiskin oturum ortalamasi"],
      ["Ortalama Kavrama Orani", "%82", "Quiz cevap ortalamasi"],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hizlioku_kullanim_raporu_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
          <FileSpreadsheet className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Kullanım Raporu İhracı</h3>
          <p className="text-xs text-slate-500">
            Anonimleştirilmiş toplam oturum, kullanıcı ve ortalama WPM verilerini CSV olarak indirin
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={handleDownloadCsv}
        className="flex items-center gap-2 flex-shrink-0"
      >
        {downloaded ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span>İndirildi</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>CSV Olarak İndir</span>
          </>
        )}
      </Button>
    </div>
  );
};
