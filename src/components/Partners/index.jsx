import styles from "./index.module.scss";

import partner1 from "../../assets/partner1.png";
import partner2 from "../../assets/partner2.png";

const PARTNERS = [
  { id: 1, name: "Partner 1", logo: partner1 },
  { id: 2, name: "Partner 2", logo: partner2 },
  // когда будут ещё — просто добавь сюда
];

export default function Partners() {
  return (
    <section className={styles.partners} id="partners">
      <h2 className={styles.partners__title}>Партнери</h2>

      <ul className={styles.partners__list}>
        {PARTNERS.map((p) => (
          <li className={styles.logoCard} key={p.id}>
            <img
              className={styles.logoCard__img}
              src={p.logo}
              alt={p.name}
              width={110}
              height={40}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
