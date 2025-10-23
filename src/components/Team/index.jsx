import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

import member from "../../assets/member.png";
import LeftArrow2 from "../../assets/LeftArrow2.png";
import RightArrow2 from "../../assets/RightArrow2.png";

// нові фото для перших трьох
import worker1 from "../../assets/worker1.jpg";
import worker2 from "../../assets/worker2.jpg";
import worker3 from "../../assets/worker3.jpg";
import worker4 from "../../assets/worker4.jpg";
import worker5 from "../../assets/worker5.jpg";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

const TEAM = [
  { id: 1, nameKey: "Оліфіренко Ольга",   roleKey: "CEO. Експерт з фінансів та оподаткування",                                 photo: worker1 },
  { id: 2, nameKey: "Ліснічук Людмила",   roleKey: "CAO. Спеціаліст ПСБО та МСФО",                                             photo: worker2 },
  { id: 3, nameKey: "Черемисіна Світлана", roleKey: "Консультант з податкового законодавства та бухгалтерського обліку",       photo: worker3 },
  { id: 4, nameKey: "Гурська Ірина",    roleKey: "Фахівець зі стратегічного маркетингу і аналітики",                           photo: worker4 },

  // { id: 5, nameKey: "Степаненко Дмитро",  roleKey: "Аналітик-маркетолог" },
  // { id: 6, nameKey: "Шевченко Марина",    roleKey: "Консультант з питань права" },
  { id: 5, nameKey: "Михайло Сельдін",    roleKey: "Спеціаліст в сфері IT та розробок",                                        photo: worker5 },
];

export default function Team() {
  const { t } = useTranslation();
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isGrid = vw >= 1024;
  const itemsPerView = vw <= 767 ? 1 : vw < 1024 ? 2 : 0;

  const pages = useMemo(() => {
    if (!itemsPerView) return [];
    const out = [];
    for (let i = 0; i < TEAM.length; i += itemsPerView) {
      out.push(TEAM.slice(i, i + itemsPerView));
    }
    return out;
  }, [itemsPerView]);

  const [pageIndex, setPageIndex] = useState(0);
  const viewportRef = useRef(null);
  const firstImgRef = useRef(null);

  useEffect(() => {
    if (!itemsPerView) return;
    setPageIndex((i) => Math.min(i, Math.max(0, pages.length - 1)));
  }, [itemsPerView, pages.length]);

  const canPrev = !isGrid && pageIndex > 0;
  const canNext = !isGrid && pageIndex < pages.length - 1;

  const handlePrev = () => setPageIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setPageIndex((i) => Math.min(pages.length - 1, i + 1));

  useEffect(() => {
    if (isGrid) return;
    const el = viewportRef.current;
    if (!el) return;

    const s = { on: false, x0: 0, dx: 0 };
    const TH = 40;

    const start = (e) => { s.on = true; s.x0 = e.touches ? e.touches[0].clientX : e.clientX; s.dx = 0; };
    const move  = (e) => { if (!s.on) return; const x = e.touches ? e.touches[0].clientX : e.clientX; s.dx = x - s.x0; };
    const end   = () => { if (!s.on) return; if (Math.abs(s.dx) > TH) { s.dx < 0 ? handleNext() : handlePrev(); } s.on = false; s.dx = 0; };

    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchmove",  move,  { passive: true });
    el.addEventListener("touchend",   end,   { passive: true });
    el.addEventListener("mousedown",  start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

    return () => {
      el.removeEventListener("touchstart", start);
      el.removeEventListener("touchmove",  move);
      el.removeEventListener("touchend",   end);
      el.removeEventListener("mousedown",  start);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
    };
  }, [isGrid, pageIndex]);

  useEffect(() => {
    if (isGrid) return;
    const vp = viewportRef.current;
    const img = firstImgRef.current;
    if (!vp || !img) return;

    const place = () => {
      const vpRect = vp.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const center = (imgRect.top - vpRect.top) + imgRect.height / 2;
      vp.style.setProperty("--nav-center", `${center}px`);
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(vp);
    ro.observe(img);

    window.addEventListener("resize", place);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [isGrid, pageIndex, itemsPerView]);

  return (
    <section className={styles.team} id="team">
      <h2 className={styles.team__title}>{t("Команда")}</h2>

      {isGrid ? (
        <div className={styles.team__grid}>
          {TEAM.map((m) => (
            <article className={styles.card} key={m.id}>
              <div className={styles.card__avatar}>
                <img className={styles.card__img} src={m.photo || member} alt={t(m.nameKey)} />
              </div>
              <h3 className={styles.card__name}>{t(m.nameKey)}</h3>
              <p className={styles.card__role}>{t(m.roleKey)}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.slider}>
          <div className={styles.slider__viewport} ref={viewportRef}>
            <div
              className={styles.slider__track}
              style={{ transform: `translateX(-${pageIndex * 100}%)` }}
            >
              {pages.map((group, i) => (
                <div className={styles.slider__page} key={i}>
                  {group.map((m, j) => (
                    <article className={styles.card} key={m.id}>
                      <div className={styles.card__avatar}>
                        <img
                          className={styles.card__img}
                          src={m.photo || member}
                          alt={t(m.nameKey)}
                          ref={i === 0 && j === 0 ? firstImgRef : null}
                        />
                      </div>
                      <h3 className={styles.card__name}>{t(m.nameKey)}</h3>
                      <p className={styles.card__role}>{t(m.roleKey)}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.slider__nav}>
              {canPrev && (
                <button type="button" className={styles.slider__btn} aria-label={t("Попередній")} onClick={handlePrev}>
                  <img src={LeftArrow2} alt="" width="40" height="40" />
                </button>
              )}
              {canNext && (
                <button type="button" className={`${styles.slider__btn} ${styles.isRight}`} aria-label={t("Наступний")} onClick={handleNext}>
                  <img src={RightArrow2} alt="" width="40" height="40" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
