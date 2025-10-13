import styles from "./index.module.scss";
import member from "../../assets/member.png"; // единая заглушка для всех

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
  return (
    <section className={styles.team} id="team">
      <h2 className={styles.team__title}>Команда</h2>

      <div className={styles.team__grid}>
        {TEAM.map((m) => (
          <article className={styles.card} key={m.id}>
            <div className={styles.card__avatar}>
              <img src={member} alt={m.name} className={styles.card__img} />
            </div>

            <h3 className={styles.card__name}>{m.name}</h3>
            <p className={styles.card__role}>{m.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
