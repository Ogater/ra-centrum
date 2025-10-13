import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import logo from "../../assets/logo.png";

const LANGS = ["Укр", "Eng", "Рус"];

export default function Header() {
  const [isLangOpen, setLangOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "Укр");

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
      if (ev.key === "Escape") { setLangOpen(false); setMenuOpen(false); }
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
    localStorage.setItem("lang", value);
    setLangOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
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

        <nav className={styles.header__nav} aria-label="Основне меню">
          <a className={styles.header__navLink} href="#about" onClick={(e)=>handleSmoothAnchor(e,"about")}>Про нас</a>
          <a className={styles.header__navLink} href="#projects" onClick={handleProjectsClick}>Наші проєкти</a>
          <a className={styles.header__navLink} href="#contacts" onClick={(e)=>handleSmoothAnchor(e,"contacts")}>Звʼязатися з нами</a>
        </nav>

        <div className={styles.header__right}>
          {/* десктопный выбор языка */}
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
              <span className={styles.language__current}>{lang}</span>
              <svg
                className={styles.language__caret}
                width="12"
                height="8"
                viewBox="0 0 12 8"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="#1B3AB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <ul className={styles.language__menu} role="listbox" aria-label="Вибір мови">
              {LANGS.map((item) => (
                <li
                  key={item}
                  role="option"
                  aria-selected={lang === item}
                  className={`${styles.language__item} ${lang === item ? styles.isActive : ""}`}
                  onClick={() => selectLang(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* мобильная кнопка-меню ≤1024 */}
          <div className={styles.mobile} ref={menuRef}>
            <button
              type="button"
              className={styles.mobile__toggle}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {/* иконка-гамбургер (из ТЗ) */}
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="24" height="2" rx="1" fill="#1B3AB5"/>
                <rect y="8" width="24" height="2" rx="1" fill="#1B3AB5"/>
                <rect y="16" width="24" height="2" rx="1" fill="#1B3AB5"/>
              </svg>
            </button>

            <div className={`${styles.mobile__menu} ${isMenuOpen ? styles.isOpen : ""}`} role="menu">
              <a
                href="#about"
                className={styles.mobile__link}
                role="menuitem"
                onClick={(e)=>{ handleSmoothAnchor(e,"about"); setMenuOpen(false); }}
              >Про нас</a>
              <a
                href="#projects"
                className={styles.mobile__link}
                role="menuitem"
                onClick={(e)=>{ handleSmoothAnchor(e,"projects"); setMenuOpen(false); }}
              >Наші проєкти</a>
              <a
                href="#contacts"
                className={styles.mobile__link}
                role="menuitem"
                onClick={(e)=>{ handleSmoothAnchor(e,"contacts"); setMenuOpen(false); }}
              >Звʼязатися з нами</a>

              <div className={styles.mobile__langs} role="listbox" aria-label="Вибір мови">
                {LANGS.map((item)=>(
                  <button
                    key={item}
                    type="button"
                    className={`${styles.mobile__lang} ${lang===item?styles.isActive:""}`}
                    onClick={()=>selectLang(item)}
                  >
                    {item}
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
