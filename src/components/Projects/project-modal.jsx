import { useEffect, useRef } from "react";
import styles from "./project-modal.module.scss";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

export default function ProjectModal({
  title,
  // режим 1 (для первого проекта): лид + подзаголовок + список
  lead,            // string
  subtitle,        // string
  list,            // string[]
  // режим 2 (для второго проекта): просто абзацы
  paragraphs = [], // string[]
  onClose,
}) {
  const wndRef = useRef(null);
  const { t } = useTranslation();

  // Esc закрывает
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Фокус при маунте
  useEffect(() => {
    wndRef.current?.focus();
  }, []);

  const stop = (e) => e.stopPropagation();

  return (
    <div className={styles.modal} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.modal__backdrop} aria-hidden="true" />
      <div
        ref={wndRef}
        className={styles.modal__window}
        tabIndex={-1}
        onClick={stop}
      >
        <button
          type="button"
          className={styles.modal__close}
          aria-label={t("Закрити модальне вікно")}
          onClick={onClose}
        >
          ×
        </button>

        <h3 className={styles.modal__title}>{title}</h3>

        {/* РЕЖИМ 1: лид + подзаголовок + список (как в исходных стилях) */}
        {lead && <p className={styles.modal__lead}>{lead}</p>}
        {subtitle && <h4 className={styles.modal__subtitle}>{subtitle}</h4>}
        {Array.isArray(list) && list.length > 0 && (
          <ul className={styles.modal__list}>
            {list.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )}

        {/* РЕЖИМ 2: просто абзацы (для второго проекта) */}
        {!lead && !subtitle && (!list || list.length === 0) && paragraphs.map((p, i) => (
          <p key={i} className={styles.modal__lead}>{p}</p>
        ))}
      </div>
    </div>
  );
}
