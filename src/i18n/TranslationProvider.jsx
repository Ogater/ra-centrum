import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { DEFAULT_LANG, DICTIONARIES, LEGACY_LANGUAGE_MAP } from "./languages.js";

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

function resolveInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = window.localStorage.getItem("lang");
  if (!stored) return DEFAULT_LANG;
  const normalized = LEGACY_LANGUAGE_MAP[stored] || stored;
  return DICTIONARIES[normalized] ? normalized : DEFAULT_LANG;
}

export function TranslationProvider({ children }) {
  const [lang, setLang] = useState(resolveInitialLang);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("lang");
    const normalized = LEGACY_LANGUAGE_MAP[stored] || stored;

    if (normalized && normalized !== stored && DICTIONARIES[normalized]) {
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
      if (DICTIONARIES[nextLang]) {
        setLang(nextLang);
      }
    },
    t: (key) => DICTIONARIES[lang]?.[key] ?? key,
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export { DEFAULT_LANG, LANGUAGE_OPTIONS } from "./languages.js";

export function useTranslation() {
  return useContext(I18nContext);
}

export function useLang() {
  const { lang, setLang } = useTranslation();
  return { lang, setLang };
}
