import styles from "./index.module.scss";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

export default function Table() {
  const { t } = useTranslation();

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRowHeader}>
            <th className={styles.tableCellCheck}><span className={styles.checkbox} /></th>
            <th className={styles.tableCellTitle}>{t("Завдання")}</th>
            <th className={styles.tableCellDates}>{t("Дати")}</th>
            <th className={styles.tableCellPriority}>{t("Пріоритет")}</th>
            <th className={styles.tableCellStatus}>{t("Статус")}</th>
            <th className={styles.tableCellUsers}>{t("Користувачі")}</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <td className={styles.tableCellCheck}><span className={styles.checkbox} /></td>
            <td className={styles.tableCellTitle}>
              <div className={styles.taskTitle}>{t("Зробити банери 960×1040")}</div>
              <div className={styles.taskInfo}>
                <span className={styles.infoItem}>{t("#design")}</span>
                <span className={styles.infoItem}>{t("v1.0")}</span>
              </div>
            </td>
            <td className={styles.dateCell}>{t("08.10 — 10.10")}</td>
            <td className={styles.priorityCell}>{t("High")}</td>
            <td className={styles.statusCell}><span className={styles.statusDot} /> {t("In Progress")}</td>
            <td className={styles.usersCell}>
              <span className={styles.avatarWrapper}><img src="https://placehold.co/24x24" alt={t("U1")} /></span>
              <span className={styles.avatarWrapper}><img src="https://placehold.co/24x24" alt={t("U2")} /></span>
              <span className={`${styles.avatarWrapper} ${styles.moreAvatars}`}>{t("+2")}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
