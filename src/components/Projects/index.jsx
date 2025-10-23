import { useMemo, useState } from "react";
import s from "./index.module.scss";
import Modal from "./project-modal.jsx";

import project1Logo from "../../assets/project1.png";
import project1Photo from "../../assets/photo1.png";
import project2Logo from "../../assets/project2.png";
import project2Photo from "../../assets/photo2.png";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

const DATA = [
  {
    id: "assoc-med",
    tone: "dark",
    logo: project1Logo,
    titleKey: "Асоціація Еволюції Медицини",
    leadKeys: [
      "Розробка сумісних проєктів підвищення кваліфікації",
      "спеціалістів медичної галузі. Створення бібліотеки",
      "цифрових патоморфологічних зображень.",
    ],
    image: project1Photo,
    modal: {
      titleKey: "Асоціація Еволюції Медицини",
      leadKey: "Дослідницько-Аналітичний Центр є членом Асоціації еволюції медицини.",
      subtitleKey: "Ключові напрямки діяльності Асоціації:",
      listKeys: [
        "Об’єднання фахівців задля впровадження інновцій у сфері профілактики, діагностики та лікування.",
        "Координація освітніх і професійних ініціатив учасників.",
        "Проведення інформаційно-просвітницьких кампаній, спрямованих на розвиток медичної галузі.",
        "Підтримка громадських організацій, проєктів та ініціатив, що відповідають цілям Асоціації.",
        "Сприяння розвитку ринку медичних товарів і послуг.",
        "Створення платформи для вільного обміну знаннями та технологіями між медичними фахівцями й виробниками.",
        "Надання консультаційної та іншої підтримки членам Асоціації.",
      ],
    },
  },
  {
    id: "cor-lab",
    tone: "light",
    logo: project2Logo,
    titleKey: "Cor-Lab",
    leadKeys: [
      "Деперсоналізація та системний аналіз даних",
      "пацієнтів, що проходять онкологічне обстеження.",
    ],
    image: project2Photo,
    modal: {
      titleKey: "Cor-Lab",
      paragraphKeys: [
        "Дослідницько-Аналітичний Центр є одним з партнерів у проекті COR-Lab",
        "Компанія забезпечує деперсоналізацію, стандартизацію та аналітичну обробку медичних даних, отриманих із лабораторних інформаційних систем, розроблених у профільними партнерами.",
        "Мета — захист персональної інформації пацієнтів, а також створення інструментів для досліджень, статистики й клінічного прогнозування на основі анонімізованих даних.",
      ],
    },
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const [openedId, setOpenedId] = useState(null);

  const translatedData = useMemo(
    () =>
      DATA.map((item) => ({
        ...item,
        title: t(item.titleKey),
        lead: Array.isArray(item.leadKeys) ? item.leadKeys.map((key) => t(key)) : item.leadKeys ? [t(item.leadKeys)] : [],
        modalContent: {
          title: t(item.modal.titleKey),
          lead: item.modal.leadKey ? t(item.modal.leadKey) : undefined,
          subtitle: item.modal.subtitleKey ? t(item.modal.subtitleKey) : undefined,
          list: item.modal.listKeys?.map((key) => t(key)) || [],
          paragraphs: item.modal.paragraphKeys?.map((key) => t(key)) || [],
        },
      })),
    [t]
  );

  const openedProject = useMemo(
    () => (openedId ? translatedData.find((item) => item.id === openedId) || null : null),
    [openedId, translatedData]
  );

  return (
    <section id="projects" className={s.projects}>
      <h2 className={s.title}>{t("Проєкти. Новини. Дослідження")}</h2>

      <div className={s.list}>
        {translatedData.map((p) => (
          <article
            key={p.id}
            className={`${s.card} ${p.tone === "dark" ? s.toneDark : s.toneLight}`}
          >
            <div className={s.left}>
              <img src={p.logo} alt={p.title} className={s.logo} loading="lazy" decoding="async" />
              <h3 className={s.heading}>{p.title}</h3>

              <div className={s.lead}>
                <p className={s.leadText}>
                  {p.lead.join(" ").replace(/\s+/g, " ").trim()}
                </p>
              </div>

              <button
                type="button"
                className={s.btn}
                onClick={() => setOpenedId(p.id)}
              >
                {t("Детальніше")}
              </button>
            </div>

            <div className={s.right}>
              <img src={p.image} alt={p.title} className={s.image} loading="lazy" decoding="async" />
            </div>
          </article>
        ))}
      </div>

      {openedProject && (
        <Modal
          title={openedProject.modalContent.title}
          lead={openedProject.modalContent.lead}
          subtitle={openedProject.modalContent.subtitle}
          list={openedProject.modalContent.list}
          paragraphs={openedProject.modalContent.paragraphs}
          onClose={() => setOpenedId(null)}
        />
      )}
    </section>
  );
}
