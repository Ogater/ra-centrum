import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import logo from "../../assets/logo.png";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

const LANGS = [
  { code: "uk", labelKey: "Укр" },
  { code: "en", labelKey: "Eng" },
  { code: "ru", labelKey: "Рус" },
];

/**
 * Header
 * @param {{openUp?: boolean}} props
 *  openUp — если хедер используется внизу страницы (перед футером),
 *  меню и язык открываются ВВЕРХ.
 */
export default function Header({ openUp = false }) {
  const [isLangOpen, setLangOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();

  const langRef = useRef(null);
  const menuRef = useRef(null);

  const handleSmoothAnchor = useCallback((e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleProjectsClick = useCallback((e) => {
    const el = document.getElementById("projects");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const onDocClick = (ev) => {
      if (langRef.current && !langRef.current.contains(ev.target)) setLangOpen(false);
      if (menuRef.current && !menuRef.current.contains(ev.target)) setMenuOpen(false);
    };
    const onEsc = (ev) => {
      if (ev.key === "Escape") {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const selectLang = (value) => {
    setLang(value);
    setLangOpen(false);
    setMenuOpen(false);
  };

  const currentLangLabel = useMemo(() => {
    const match = LANGS.find((item) => item.code === lang);
    return match ? t(match.labelKey) : lang?.toUpperCase?.() || "";
  }, [lang, t]);

  return (
    <header className={`${styles.header} ${openUp ? styles.openUp : ""}`}>
      <div className={styles.header__inner}>
        <div className={styles.header__left}>
          <img
            className={styles.header__logo}
            src={logo}
            alt="RA Centrum"
            width={240}
            height={50}
          />
        </div>

        <nav className={styles.header__nav} aria-label={t("Основне меню")}>
          <a
            className={styles.header__navLink}
            href="#about"
            onClick={(e) => handleSmoothAnchor(e, "about")}
          >
            {t("Про нас")}
          </a>
          <a
            className={styles.header__navLink}
            href="#projects"
            onClick={handleProjectsClick}
          >
            {t("Наші проєкти")}
          </a>
          <a
            className={styles.header__navLink}
            href="#contacts"
            onClick={(e) => handleSmoothAnchor(e, "contacts")}
          >
            {t("Звʼязатися з нами")}
          </a>
        </nav>

        <div className={styles.header__right}>
          {/* выбор языка на ≥1025 */}
          <div
            className={`${styles.language} ${isLangOpen ? styles.isOpen : ""}`}
            ref={langRef}
          >
            <button
              type="button"
              className={styles.language__toggle}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <span className={styles.language__current}>{currentLangLabel}</span>
              <svg
                className={styles.language__caret}
                width="12"
                height="8"
                viewBox="0 0 12 8"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  fill="none"
                  stroke="#1B3AB5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <ul className={styles.language__menu} role="listbox" aria-label={t("Вибір мови")}>
              {LANGS.map((item) => (
                <li
                  key={item.code}
                  role="option"
                  aria-selected={lang === item.code}
                  className={`${styles.language__item} ${lang === item.code ? styles.isActive : ""}`}
                  onClick={() => selectLang(item.code)}
                >
                  {t(item.labelKey)}
                </li>
              ))}
            </ul>
          </div>

          {/* мобильное меню ≤1024 */}
          <div className={styles.mobile} ref={menuRef}>
            <button
              type="button"
              className={styles.mobile__toggle}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="24" height="2" rx="1" fill="#1B3AB5" />
                <rect y="8" width="24" height="2" rx="1" fill="#1B3AB5" />
                <rect y="16" width="24" height="2" rx="1" fill="#1B3AB5" />
              </svg>
            </button>

            <div className={`${styles.mobile__menu} ${isMenuOpen ? styles.isOpen : ""}`} role="menu">
              <a
                href="#about"
                className={styles.mobile__link}
                role="menuitem"
                onClick={(e) => {
                  handleSmoothAnchor(e, "about");
                  setMenuOpen(false);
                }}
              >
                {t("Про нас")}
              </a>
              <a
                href="#projects"
                className={styles.mobile__link}
                role="menuitem"
                onClick={(e) => {
                  handleSmoothAnchor(e, "projects");
                  setMenuOpen(false);
                }}
              >
                {t("Наші проєкти")}
              </a>
              <a
                href="#contacts"
                className={styles.mobile__link}
                role="menuitem"
                onClick={(e) => {
                  handleSmoothAnchor(e, "contacts");
                  setMenuOpen(false);
                }}
              >
                {t("Звʼязатися з нами")}
              </a>

              <div className={styles.mobile__langs} role="listbox" aria-label={t("Вибір мови")}>
                {LANGS.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className={`${styles.mobile__lang} ${lang === item.code ? styles.isActive : ""}`}
                    onClick={() => selectLang(item.code)}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
