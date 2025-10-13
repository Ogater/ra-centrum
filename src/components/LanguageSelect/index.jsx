import React from "react";
import styles from "./index.module.scss";

export default function LanguageSelect(){
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentLanguage] = React.useState("Укр");

  function handleToggleMenu(){
    setIsOpen((v) => !v);
  }

  return (
    <div className={`${styles.lang} ${isOpen ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.lang__btn}
        onClick={handleToggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span>{currentLanguage}</span>
        <span className={styles.lang__chev} aria-hidden />
      </button>

      <div className={styles.lang__menu} role="menu">
        <div className={styles.lang__item} role="menuitemradio" aria-checked="true">Укр</div>
        <div className={styles.lang__item} role="menuitemradio" aria-disabled="true">Eng</div>
        <div className={styles.lang__item} role="menuitemradio" aria-disabled="true">Рус</div>
      </div>
    </div>
  );
}
