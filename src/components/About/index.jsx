import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./index.module.scss";

import LeftArrow2 from "../../assets/LeftArrow2.png";
import RightArrow2 from "../../assets/RightArrow2.png";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

export default function About() {
  const [slide, setSlide] = useState(0); // 0..2
  const viewportRef = useRef(null);
  const [vw, setVw] = useState(0);
  const { t } = useTranslation();

  const canPrev = slide > 0;
  const canNext = slide < 2;

  const goPrev = useCallback(() => setSlide((s) => Math.max(0, s - 1)), []);
  const goNext = useCallback(() => setSlide((s) => Math.min(2, s + 1)), []);

  // измеряем ширину viewport для корректного translateX
  useEffect(() => {
    const update = () => {
      const w = viewportRef.current?.clientWidth || 0;
      setVw(w);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // свайп на тач-устройствах (работает везде; стрелки на ≤320 скрыты стилями)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const state = { active: false, startX: 0, dx: 0 };
    const THRESHOLD = 40;

    const onStart = (e) => {
      state.active = true;
      state.startX = (e.touches ? e.touches[0].clientX : e.clientX);
      state.dx = 0;
    };
    const onMove = (e) => {
      if (!state.active) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      state.dx = x - state.startX;
    };
    const onEnd = () => {
      if (!state.active) return;
      if (Math.abs(state.dx) > THRESHOLD) {
        if (state.dx < 0) goNext();
        else goPrev();
      }
      state.active = false;
      state.dx = 0;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });

    // на всякий случай — поддержка мыши/трекпада
    el.addEventListener("mousedown", onStart);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);

      el.removeEventListener("mousedown", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
    };
  }, [goNext, goPrev]);

  return (
    <section className={styles.about} id="about">
      <h2 className={styles.about__title}>{t("Про нас")}</h2>

      {/* отступ 48px до миссии — задаётся в SCSS через margin-top */}
      <div className={styles.about__missionRow}>
        <button type="button" className={`${styles.about__tab} ${styles.isActive}`}>
          {t("Наша місія")}
        </button>

        <div className={styles.about__missionPanel}>
          <p className={styles.about__missionText}>
            <span className={styles.about__missionBlue}>{t("Ми ")}</span>
            <span className={styles.about__missionYellow}>{t("економимо ваш час")}</span>
            <span className={styles.about__missionBlue}>{t(" — перетворюючи дані на ")}</span>
            <span className={styles.about__missionYellow}>{t("рішення")}</span>
            <span className={styles.about__missionBlue}>{t(".")}</span>
          </p>
        </div>
      </div>

      {/* Що ми робимо */}
      <div className={styles.about__what}>
        <div className={styles.about__whatPanel}>
          <div className={styles.about__sliderViewport} ref={viewportRef}>
            <div
              className={styles.about__sliderTrack}
              style={{
                width: vw ? `${vw * 3}px` : undefined,
                transform: `translateX(${-slide * vw}px)`,
              }}
            >
              {/* слайд 0 */}
              <div className={styles.about__slide} style={{ width: vw ? `${vw}px` : undefined }}>
                <div className={styles.about__slideTitleMain}>{t("Що ми робимо:")}</div>
                <p className={styles.about__whatText}>
                  <span className={styles.about__whatYellow}>{t("збираємо та структуруємо")}</span>
                  <span className={styles.about__whatBlue}>{t(" дані, аналізуємо їх і формуємо практичні висновки.")}</span>
                </p>
              </div>

              {/* слайд 1 */}
              <div className={styles.about__slide} style={{ width: vw ? `${vw}px` : undefined }}>
                <div className={styles.about__slideTitle}>{t("Як ми це робимо:")}</div>
                <p className={styles.about__whatText}>
                  <span className={styles.about__whatYellow}>{t("швидко, професійно,")}</span>
                  <span className={styles.about__whatBlue}>{t(" з використанням сучасних методів дослідження та перевірених джерел.")}</span>
                </p>
              </div>

              {/* слайд 2 */}
              <div className={styles.about__slide} style={{ width: vw ? `${vw}px` : undefined }}>
                <div className={styles.about__slideTitle}>{t("Для кого:")}</div>
                <p className={styles.about__whatText}>
                  <span className={styles.about__whatBlue}>{t("для тих, хто хоче приймати обґрунтовані рішення")}</span>
                  <span className={styles.about__whatYellow}>{t(" без витрати часу на самостійний пошук")}</span>
                  <span className={styles.about__whatBlue}>{t(" і аналіз даних.")}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Навигация — скрываем на ≤320 стилями */}
          <div className={styles.about__whatNav}>
            {canPrev && (
              <button
                type="button"
                className={styles.about__whatBtn}
                aria-label={t("Попередній")}
                onClick={goPrev}
              >
                <img src={LeftArrow2} alt="" width="40" height="40" />
              </button>
            )}
            {canNext && (
              <button
                type="button"
                className={`${styles.about__whatBtn} ${styles.isRight}`}
                aria-label={t("Наступний")}
                onClick={goNext}
              >
                <img src={RightArrow2} alt="" width="40" height="40" />
              </button>
            )}
          </div>
          <div className={styles.about__counter} aria-live="polite">{`${slide + 1} / 3`}</div>
        </div>
      </div>
    </section>
  );
}
