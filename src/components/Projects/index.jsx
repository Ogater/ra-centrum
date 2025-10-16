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
      // режим 1: лид + подзаголовок + список (сохранит прежние стили)
      lead: "Дослідницько-Аналітичний Центр є членом Асоціації еволюції медицини.",
      subtitle: "Ключові напрямки діяльності Асоціації:",
      list: [
        "Об’єднання фахівців задля впровадження інновацій у сфері профілактики, діагностики та лікування.",
        "Координація освітніх і професійних ініціатив учасників.",
        "Проведення інформаційно-просвітницьких кампаній, спрямованих на розвиток медичної галузі.",
        "Підтримка громадських організацій, проєктів та ініціатив, що відповідають цілям Асоціації.",
        "Сприяння розвитку ринку медичних товарів і послуг.",
        "Створення платформи для вільного обміну знаннями та технологіями між медичними фахівцями й виробниками.",
        "Надання консультаційної та іншої підтримки членам Асоціації."
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
      // режим 2: просто абзацы (другой текст для второго баннера)
      paragraphs: [
        "Дослідницько-Аналітичний Центр є одним з партнерів у проекті COR-Lab",
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
              <img src={p.logo} alt={`Логотип ${p.title}`} className={s.logo} loading="lazy" decoding="async" />
              <h3 className={s.heading}>{p.title}</h3>

              <div className={s.lead}>
                <p className={s.leadText}>
                  {Array.isArray(p.lead)
                    ? p.lead.join(" ").replace(/\s+/g, " ").trim()
                    : p.lead}
                </p>
              </div>

              <button
                type="button"
                className={s.btn}
                onClick={() => setOpened(p)}
              >
                Детальніше
              </button>
            </div>

            <div className={s.right}>
              <img src={p.image} alt={`Зображення ${p.title}`} className={s.image} loading="lazy" decoding="async" />
            </div>
          </article>
        ))}
      </div>

      {opened && (
        <Modal
          title={opened.modal.title}
          // режим 1 (первый проект)
          lead={opened.modal.lead}
          subtitle={opened.modal.subtitle}
          list={opened.modal.list}
          // режим 2 (второй проект)
          paragraphs={opened.modal.paragraphs}
          onClose={() => setOpened(null)}
        />
      )}
    </section>
  );
}
