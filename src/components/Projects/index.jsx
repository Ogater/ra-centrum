import { useState } from "react";
import s from "./index.module.scss";
import Modal from "./project-modal.jsx";

import project1Logo from "../../assets/project1.png";
import project1Photo from "../../assets/photo1.png";
import project2Logo from "../../assets/project2.png";
import project2Photo from "../../assets/photo2.png";

const DATA = [
  {
    id: "assoc-med",
    tone: "dark",
    logo: project1Logo,
    title: "Асоціація Еволюції Медицини",
    lead: [
      "Розробка сумісних проєктів підвищення кваліфікації",
      "спеціалістів медичної галузі. Створення бібліотеки",
      "цифрових патоморфологічних зображень."
    ],
    image: project1Photo,
    modal: {
      title: "Асоціація Еволюції Медицини",
      paragraphs: [
        "Дослідницько-Аналітичний Центр є членом Асоціації еволюції медицини.",
        "Ключові напрямки діяльності Асоціації:",
        "Об’єднання фахівців задля впровадження інновацій у сфері профілактики, діагностики та лікування.",
        "Координація освітніх і професійних ініціатив учасників.",
        "Проведення інформаційно-просвітницьких кампаній, спрямованих на розвиток медичної галузі.",
        "Підтримка громадських організацій, проєктів та ініціатив, що відповідають цілям Асоціації.",
        "Створення платформи для вільного обміну знаннями та технологіями між медичними фахівцями й виробниками."
      ]
    }
  },
  {
    id: "cor-lab",
    tone: "light",
    logo: project2Logo,
    title: "Cor-Lab",
    lead: [
      "Деперсоналізація та системний аналіз даних",
      "пацієнтів, що проходять онкологічне обстеження."
    ],
    image: project2Photo,
    modal: {
      title: "Cor-Lab",
      paragraphs: [
        "Дослідницько-Аналітичний Центр є одним з партнерів у проєкті COR-Lab.",
        "Компанія забезпечує деперсоналізацію, стандартизацію та аналітичну обробку медичних даних, отриманих із лабораторних інформаційних систем, розроблених у профільними партнерами.",
        "Мета — захист персональної інформації пацієнтів, а також створення інструментів для досліджень, статистики й клінічного прогнозування на основі анонімізованих даних."
      ]
    }
  }
];

export default function Projects() {
  const [opened, setOpened] = useState(null);

  return (
    <section id="projects" className={s.projects}>
      <h2 className={s.title}>Проєкти. Новини. Дослідження</h2>

      <div className={s.list}>
        {DATA.map((p) => (
          <article
            key={p.id}
            className={`${s.card} ${p.tone === "dark" ? s.toneDark : s.toneLight}`}
          >
            <div className={s.left}>
              <img src={p.logo} alt="" className={s.logo} />
              <h3 className={s.heading}>{p.title}</h3>

              <div className={s.lead}>
                {p.lead.map((line, i) => (
                  <div key={i} className={s.leadLine}>{line}</div>
                ))}
              </div>

              <button className={s.btn} onClick={() => setOpened(p)}>
                Детальніше
              </button>
            </div>

            <div className={s.right}>
              <img src={p.image} alt="" className={s.image} />
            </div>
          </article>
        ))}
      </div>

      {opened && (
        <Modal
          title={opened.modal.title}
          paragraphs={opened.modal.paragraphs}
          onClose={() => setOpened(null)}
        />
      )}
    </section>
  );
}
