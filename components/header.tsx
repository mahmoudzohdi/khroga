"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";

export default function Header() {
  const { lang, setLang } = useLanguage();

  const toggleLang = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-amber/20 bg-sand/95 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-white shadow-md shadow-coral/25 transition-transform duration-200 hover:scale-105">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="text-xl font-extrabold tracking-tight text-navy">
            {lang === "ar" ? (
              <>
                خروجة
                <span className="mx-1 text-coral/60">·</span>
                <span className="text-base font-bold text-navy/50">Khroga</span>
              </>
            ) : (
              <>
                Khroga
                <span className="mx-1 text-coral/60">·</span>
                <span className="text-base font-bold text-navy/50">خروجة</span>
              </>
            )}
          </span>
        </Link>

        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy px-4 text-sm font-bold text-sand transition-all duration-200 hover:bg-navy/85 hover:shadow-lg hover:shadow-navy/15 active:scale-95"
          aria-label={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>{lang === "ar" ? "EN" : "عربي"}</span>
        </button>
      </div>
    </header>
  );
}
