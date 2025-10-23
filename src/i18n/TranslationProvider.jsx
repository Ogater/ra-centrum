import { createContext, useContext, useEffect, useMemo, useState } from "react";

import en from "../locales/en.json";
import ru from "../locales/ru.json";
import uk from "../locales/uk.json";

const dictionaries = { en, ru, uk };
const DEFAULT_LANG = "uk";
export const LANGUAGE_OPTIONS = [
  { code: "uk", labelKey: "Укр" },
  { code: "en", labelKey: "Eng" },
  { code: "ru", labelKey: "Рус" },
];
const LEGACY_MAP = {
  Укр: "uk",
  Eng: "en",
  Рус: "ru",
};

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

function resolveInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = window.localStorage.getItem("lang");
  if (!stored) return DEFAULT_LANG;
  const normalized = LEGACY_MAP[stored] || stored;
  return dictionaries[normalized] ? normalized : DEFAULT_LANG;
}

export function TranslationProvider({ children }) {
  const [lang, setLang] = useState(resolveInitialLang);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("lang");
    const normalized = LEGACY_MAP[stored] || stored;

    if (normalized && normalized !== stored && dictionaries[normalized]) {
      window.localStorage.setItem("lang", normalized);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lang", lang);
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
