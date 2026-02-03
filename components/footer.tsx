"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="mt-auto border-t-2 border-amber/15 bg-navy py-8">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-lg font-extrabold text-sand/90">
          {lang === "ar" ? "خروجة" : "Khroga"}
          <span className="mx-1.5 text-coral">·</span>
          <span className="text-sm font-medium text-sand/50">
            {t.siteDescription}
          </span>
        </p>
        <p className="mt-2 text-xs text-sand/35">
          &copy; 2026 {lang === "ar" ? "خروجة" : "Khroga"}
        </p>
      </div>
    </footer>
  );
}
