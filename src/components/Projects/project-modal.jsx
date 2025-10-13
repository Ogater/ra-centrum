import { useEffect, useRef } from "react";
import styles from "./project-modal.module.scss";

export default function ProjectModal({ open, onClose }) {
  const wndRef = useRef(null);

  // Закрытие по Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Фокус в модалке
  useEffect(() => {
    if (open) wndRef.current?.focus();
  }, [open]);

  // Клик по фону закрывает
  const handleBackdrop = () => onClose?.();

  // Останавливаем всплытие внутри окна
  const stop = (e) => e.stopPropagation();

  return (
    <div className={styles.modal} role="dialog" aria-modal="true" onClick={handleBackdrop}>
      <div
        className={styles.modal__backdrop}
        aria-hidden="true"
      />
      <div
        ref={wndRef}
        className={styles.modal__window}
        tabIndex={-1}
        onClick={stop}
      >
        <button
          type="button"
          className={styles.modal__close}
          aria-label="Закрити модальне вікно"
          onClick={onClose}                // ← крестик закрывает
        >
          ×
        </button>

        <h3 className={styles.modal__title}>Асоціація Еволюції Медицини</h3>
        <p className={styles.modal__lead}>
          Дослідницько-Аналітичний Центр є членом Асоціації еволюції медицини.
        </p>

        <h4 className={styles.modal__subtitle}>Ключові напрямки діяльності Асоціації:</h4>
        <ul className={styles.modal__list}>
          <li>Об’єднання фахівців задля впровадження інновацій у сфері профілактики, діагностики та лікування.</li>
          <li>Координація освітніх і професійних ініціатив учасників.</li>
          <li>Проведення інформаційно-просвітницьких кампаній, спрямованих на розвиток медичної галузі.</li>
          <li>Підтримка громадських організацій, проєктів та ініціатив, що відповідають цілям Асоціації.</li>
          <li>Сприяння розвитку ринку медичних товарів і послуг.</li>
          <li>Створення платформи для вільного обміну знаннями та технологіями між медичними фахівцями й виробниками.</li>
          <li>Надання консультаційної та іншої підтримки членам Асоціації.</li>
        </ul>
      </div>
    </div>
  );
}
