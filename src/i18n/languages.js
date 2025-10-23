import en from "../locales/en.json";
import ru from "../locales/ru.json";
import uk from "../locales/uk.json";

export const DICTIONARIES = { en, ru, uk };

export const DEFAULT_LANG = "uk";

export const LANGUAGE_OPTIONS = [
  { code: "uk", labelKey: "Укр" },
  { code: "en", labelKey: "Eng" },
  { code: "ru", labelKey: "Рус" },
];

export const LEGACY_LANGUAGE_MAP = {
  Укр: "uk",
  Eng: "en",
  Рус: "ru",
};
