import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

import leftPng from "../../assets/LeftButton.png";
import rightPng from "../../assets/RightButton.png";

import Banner from "../Banner/index.jsx";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

const BASE = [
  { img: banner1, titleKey: "Аналітика в медицині", subtitleKey: "Дослідження в сфері охорони здоров’я. Швидка та якісна обробка даних, генерація висновків для клінік та лабораторій" },
  { img: banner2, titleKey: "Бізнес та податки", subtitleKey: "Дослідження ринку, консультації з податкових та фінансових питань. Оптимізація бізнес процесів" },
  { img: banner3, titleKey: "Наука та технології", subtitleKey: "Експериментальні розробки, техніко-економічні обґрунтування, впроваження інноваційних рішень" },
  { img: banner4, titleKey: "Дослідження суспільних процесів", subtitleKey: "Опитування, моніторинг, аналіз громадської думки" },
];

const SLIDE_MS = 500;
const AUTOPLAY_MS = 5000;

function useSlidesPerView() {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches ? 1 : 2;
  const [spv, setSpv] = useState(get);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setSpv(mq.matches ? 1 : 2);
    mq.addEventListener?.("change", onChange);
    mq.addListener?.(onChange);
    onChange();
    return () => {
      mq.removeEventListener?.("change", onChange);
      mq.removeListener?.(onChange);
    };
  }, []);
  return spv;
}

export default function BannerGrid() {
  const { t } = useTranslation();
  const slidesPerView = useSlidesPerView();
  const stepPercent = 100 / slidesPerView;

  // [cloneLast, ...BASE, cloneFirst]
  const trackData = useMemo(() => [BASE[BASE.length - 1], ...BASE, BASE[0]], []);
  const baseLen = BASE.length;

  // состояние
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [noTransition, setNoTransition] = useState(false);

  // блокировки/таймер
  const moveGuardRef = useRef(false);
  const needRestartRef = useRef(false);
  const timerRef = useRef(null);

  const pauseAutoplay = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  const startAutoplay = () => { if (!timerRef.current) timerRef.current = setInterval(() => handleNext(), AUTOPLAY_MS); };

  useEffect(() => { startAutoplay(); return pauseAutoplay; }, []);

  // ✅ валидные индексы:
  //  - для 1-в-ряд: 1..baseLen
  //  - для 2-в-ряд: 0..baseLen (= 0..4) — чтобы пара 4–1 могла быть стабильной
  const minIndex = (slidesPerView === 1) ? 1 : 0;
  const maxIndex = (slidesPerView === 1) ? baseLen : baseLen; // для 2-в-ряд разрешаем 4

  function lockMoves()   { moveGuardRef.current = true; }
  function unlockMoves() { moveGuardRef.current = false; }

  function beginMove() {
    lockMoves();
    pauseAutoplay();
    needRestartRef.current = true;
    setNoTransition(false);
    setIsAnimating(true);
  }

  function handleNext() {
    if (moveGuardRef.current) return;
    beginMove();
    setIndex((i) => i + 1);
  }

  function handlePrev() {
    if (moveGuardRef.current) return;
    beginMove();
    setIndex((i) => i - 1);
  }

  // завершение transition → при необходимости делаем snap без анимации
  function onTransitionEnd(e) {
    if (e.target !== e.currentTarget) return;

    let needSnap = false;
    let target = index;

    if (slidesPerView === 1) {
      // валидные: 1..4; вылеты: 0 -> 4, 5 -> 1
      if (index === 0)              { needSnap = true; target = baseLen; }
      else if (index === baseLen+1) { needSnap = true; target = 1; }
    } else {
      // валидные: 0..4; вылеты: -1 -> 3, 5 -> 1
      if (index === -1)             { needSnap = true; target = baseLen - 1; }
      else if (index === baseLen+1) { needSnap = true; target = 1; }
    }

    if (needSnap) {
      setIsAnimating(false);
      setNoTransition(true);
      setIndex(target);
      requestAnimationFrame(() => {
        setNoTransition(false);
        unlockMoves();
        if (needRestartRef.current) { needRestartRef.current = false; startAutoplay(); }
      });
    } else {
      setIsAnimating(false);
      unlockMoves();
      if (needRestartRef.current) { needRestartRef.current = false; startAutoplay(); }
    }
  }

  // смена 1↔2-в-ряд: мягко приводим индекс к допустимому диапазону
  useEffect(() => {
    lockMoves();
    pauseAutoplay();
    const clamped = Math.min(Math.max(index, minIndex), maxIndex);
    setNoTransition(true);
    setIndex(clamped);
    requestAnimationFrame(() => {
      setNoTransition(false);
      unlockMoves();
      startAutoplay();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesPerView]);

  const trackStyle = {
    transform: `translateX(${-index * stepPercent}%)`,
    transition: noTransition ? "none" : (isAnimating ? `transform ${SLIDE_MS}ms ease-in-out` : "none"),
  };

  return (
    <section className={styles.banners}>
      <div className={styles.banners__viewport}>
        <div
          className={styles.banners__track}
          style={trackStyle}
          onTransitionEnd={onTransitionEnd}
        >
          {trackData.map((item, i) => (
            <div key={i} className={styles.banners__slide}>
              <Banner
                imageSrc={item.img}
                title={t(item.titleKey)}
                subtitle={t(item.subtitleKey)}
                alt={t(item.titleKey)}
              />
            </div>
          ))}
        </div>

        <div className={styles.banners__controls}>
          <button type="button" className={styles.banners__controlBtn} onClick={handlePrev} aria-label={t("Previous banner")}>
            <img src={leftPng} alt="" width="56" height="56" />
          </button>
          <button type="button" className={styles.banners__controlBtn} onClick={handleNext} aria-label={t("Next banner")}>
            <img src={rightPng} alt="" width="56" height="56" />
          </button>
        </div>
      </div>
    </section>
  );
}
