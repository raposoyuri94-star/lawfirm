"use client";

import { useEffect, useState } from "react";

type Lang = "pt" | "en";

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Lang | null;

    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  return {
    lang,
    setLang: changeLanguage,
  };
}