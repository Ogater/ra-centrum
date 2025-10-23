import { createContext, useContext, useEffect, useMemo, useState } from "react";

import en from "../locales/en.json";
import ru from "../locales/ru.json";
import uk from "../locales/uk.json";

const dictionaries = { en, ru, uk };
const LEGACY_MAP = {
  Укр: "uk",
  Eng: "en",
  Рус: "ru",
};

const I18nContext = createContext({
  lang: "uk",
  setLang: () => {},
  t: (key) => key,
});

function resolveInitialLang() {
  if (typeof window === "undefined") return "uk";
  const stored = window.localStorage.getItem("lang");
  if (!stored) return "uk";
  const normalized = LEGACY_MAP[stored] || stored;
  return dictionaries[normalized] ? normalized : "uk";
}

export function TranslationProvider({ children }) {
  const [lang, setLang] = useState(resolveInitialLang);

  // Write current language to localStorage whenever it changes
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  // Sync language if it changes in another tab (storage events don't fire in the same tab)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e) => {
      if (e.key !== "lang") return;
      const stored = e.newValue;
      const normalized = LEGACY_MAP[stored] || stored;
      if (normalized && normalized !== lang && dictionaries[normalized]) {
        setLang(normalized);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang: (nextLang) => {
      if (dictionaries[nextLang]) {
        setLang(nextLang);
      }
    },
    t: (key) => dictionaries[lang]?.[key] ?? key,
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext);
}

export function useLang() {
  const { lang, setLang } = useTranslation();
  return { lang, setLang };
}
