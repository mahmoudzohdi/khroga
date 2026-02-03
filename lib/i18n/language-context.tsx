"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import en from "./dictionaries/en.json";
import ar from "./dictionaries/ar.json";

type Lang = "ar" | "en";
type Dictionary = typeof en;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  dir: "rtl" | "ltr";
}

const dictionaries: Record<Lang, Dictionary> = { en, ar };

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang");
    if (stored === "ar" || stored === "en") return stored;
  }
  return "ar";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // On first render, sync the DOM with the stored language
      const dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang]);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    const dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    document.documentElement.dir = dir;
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: dictionaries[lang],
    dir: lang === "ar" ? "rtl" : "ltr",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
