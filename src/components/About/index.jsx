import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

import LeftArrow2 from "../../assets/LeftArrow2.png";
import RightArrow2 from "../../assets/RightArrow2.png";

export default function About() {
  // ====== slider state ======
  const [slide, setSlide] = useState(0); // 0..2
  const viewportRef = useRef(null);
  const [vw, setVw] = useState(0);

  // measure viewport width (px) and keep it fresh on resize
  useEffect(() => {
    const update = () => {
      const w = viewportRef.current?.clientWidth || 0;
      setVw(w);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const canPrev = slide > 0;
  const canNext = slide < 2;

  return (
    <section className={styles.about} id="about">
      {/* ===== Про нас ===== */}
      <h2 className={styles.about__title}>Про нас</h2>

      {/* ===== Наша місія ===== */}
      <div className={styles.about__missionRow}>
        <button type="button" className={`${styles.about__tab} ${styles.isActive}`}>
          Наша місія
        </button>

        <div className={styles.about__missionPanel}>
          <p className={styles.about__missionText}>
            <span className={styles.about__missionBlue}>Ми&nbsp;</span>
            <span className={styles.about__missionYellow}>економимо ваш час</span>
            <span className={styles.about__missionBlue}> — перетворюючи дані на&nbsp;</span>
            <span className={styles.about__missionYellow}>рішення</span>
            <span className={styles.about__missionBlue}>.</span>
          </p>
        </div>
      </div>

      {/* ===== Що ми робимо (слайдер 3 карточки) ===== */}
      <div className={styles.about__what}>
        <div className={styles.about__whatPanel}>
          {/* Viewport */}
          <div className={styles.about__sliderViewport} ref={viewportRef}>
            {/* Track */}
            <div
              className={styles.about__sliderTrack}
              style={{
                width: vw ? `${vw * 3}px` : undefined,
                transform: `translateX(${-slide * vw}px)`,
              }}
            >
              {/* slide 0 */}
              <div className={styles.about__slide} style={{ width: vw ? `${vw}px` : undefined }}>
                <div className={styles.about__slideTitleMain}>Що ми робимо:</div>
                <p className={styles.about__whatText}>
                  <span className={styles.about__whatYellow}>збираємо та структуруємо</span>
                  <span className={styles.about__whatBlue}>
                    &nbsp;дані, аналізуємо їх і формуємо практичні висновки.
                  </span>
                </p>
              </div>

              {/* slide 1 */}
              <div className={styles.about__slide} style={{ width: vw ? `${vw}px` : undefined }}>
                <div className={styles.about__slideTitle}>Як ми це робимо:</div>
                <p className={styles.about__whatText}>
                  <span className={styles.about__whatYellow}>швидко, професійно,</span>
                  <span className={styles.about__whatBlue}>
                    &nbsp;з використанням сучасних методів дослідження та перевірених джерел.
                  </span>
                </p>
              </div>

              {/* slide 2 */}
              <div className={styles.about__slide} style={{ width: vw ? `${vw}px` : undefined }}>
                <div className={styles.about__slideTitle}>Для кого:</div>
                <p className={styles.about__whatText}>
                  <span className={styles.about__whatBlue}>
                    для тих, хто хоче приймати обґрунтовані рішення
                  </span>
                  <span className={styles.about__whatYellow}>
                    &nbsp;без витрати часу на самостійний пошук
                  </span>
                  <span className={styles.about__whatBlue}>&nbsp;і аналіз даних.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Навигация: 1 — Right, 2 — обе, 3 — Left (центр относительно всей панели) */}
          <div className={styles.about__whatNav}>
            {canPrev && (
              <button
                type="button"
                className={styles.about__whatBtn}
                aria-label="Попередній"
                onClick={() => setSlide((s) => Math.max(0, s - 1))}
              >
                <img src={LeftArrow2} alt="" width="40" height="40" />
              </button>
            )}
            {canNext && (
              <button
                type="button"
                className={`${styles.about__whatBtn} ${styles.isRight}`}
                aria-label="Наступний"
                onClick={() => setSlide((s) => Math.min(2, s + 1))}
              >
                <img src={RightArrow2} alt="" width="40" height="40" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
