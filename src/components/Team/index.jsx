import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

import member from "../../assets/member.png";
import LeftArrow2 from "../../assets/LeftArrow2.png";
import RightArrow2 from "../../assets/RightArrow2.png";

const TEAM = [
  { id: 1, name: "Степаненко Дмитро", role: "CEO. Експерт з фінансів та оподаткування" },
  { id: 2, name: "Шевченко Марина",  role: "CAO. Спеціаліст ПСБО та МСФО" },
  { id: 3, name: "Шевченко Марина",  role: "Консультант з податкового законодавства та бухгалтерського обліку" },
  { id: 4, name: "Шевченко Марина",  role: "Фахівець зі стратегічного маркетингу і аналітики" },
  { id: 5, name: "Степаненко Дмитро", role: "Аналітик-маркетолог" },
  { id: 6, name: "Шевченко Марина",  role: "Консультант з питань права" },
  { id: 7, name: "Шевченко Марина",  role: "Спеціаліст в сфері IT та розробок" },
];

export default function Team() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isGrid = vw >= 1024;
  const itemsPerView = vw <= 320 ? 1 : vw < 1024 ? 2 : 0;

  // формируем страницы слайдера
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

  // свайп
  useEffect(() => {
    if (isGrid) return;
    const el = viewportRef.current;
    if (!el) return;

    const s = { on: false, x0: 0, dx: 0 };
    const TH = 40;

    const start = (e) => { s.on = true; s.x0 = e.touches ? e.touches[0].clientX : e.clientX; s.dx = 0; };
    const move  = (e) => { if (!s.on) return; const x = e.touches ? e.touches[0].clientX : e.clientX; s.dx = x - s.x0; };
    const end   = () => { if (!s.on) return; if (Math.abs(s.dx) > TH) { s.dx < 0 ? handleNext() : handlePrev(); } s.on = false; };

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

  // центр стрелок по центру фотки (измеряем первую видимую)
  useEffect(() => {
    if (isGrid) return;
    const vp = viewportRef.current;
    const img = firstImgRef.current;
    if (!vp || !img) return;

    const place = () => {
      const vpRect = vp.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const center = (imgRect.top - vpRect.top) + imgRect.height / 2; // px внутри viewport
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
      <h2 className={styles.team__title}>Команда</h2>

      {isGrid ? (
        <div className={styles.team__grid}>
          {TEAM.map((m) => (
            <article className={styles.card} key={m.id}>
              <div className={styles.card__avatar}>
                <img className={styles.card__img} src={member} alt={m.name} />
              </div>
              <h3 className={styles.card__name}>{m.name}</h3>
              <p className={styles.card__role}>{m.role}</p>
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
                          src={member}
                          alt={m.name}
                          ref={i === 0 && j === 0 ? firstImgRef : null}
                        />
                      </div>
                      <h3 className={styles.card__name}>{m.name}</h3>
                      <p className={styles.card__role}>{m.role}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.slider__nav}>
              {canPrev && (
                <button type="button" className={styles.slider__btn} aria-label="Попередній" onClick={handlePrev}>
                  <img src={LeftArrow2} alt="" width="40" height="40" />
                </button>
              )}
              {canNext && (
                <button type="button" className={`${styles.slider__btn} ${styles.isRight}`} aria-label="Наступний" onClick={handleNext}>
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
