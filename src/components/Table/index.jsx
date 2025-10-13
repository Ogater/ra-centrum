import styles from "./index.module.scss";

export default function Table(){
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRowHeader}>
            <th className={styles.tableCellCheck}><span className={styles.checkbox} /></th>
            <th className={styles.tableCellTitle}>Завдання</th>
            <th className={styles.tableCellDates}>Дати</th>
            <th className={styles.tableCellPriority}>Пріоритет</th>
            <th className={styles.tableCellStatus}>Статус</th>
            <th className={styles.tableCellUsers}>Користувачі</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <td className={styles.tableCellCheck}><span className={styles.checkbox} /></td>
            <td className={styles.tableCellTitle}>
              <div className={styles.taskTitle}>Зробити банери 960×1040</div>
              <div className={styles.taskInfo}>
                <span className={styles.infoItem}>#design</span>
                <span className={styles.infoItem}>v1.0</span>
              </div>
            </td>
            <td className={styles.dateCell}>08.10 — 10.10</td>
            <td className={styles.priorityCell}>High</td>
            <td className={styles.statusCell}><span className={styles.statusDot} /> In Progress</td>
            <td className={styles.usersCell}>
              <span className={styles.avatarWrapper}><img src="https://placehold.co/24x24" alt="U1"/></span>
              <span className={styles.avatarWrapper}><img src="https://placehold.co/24x24" alt="U2"/></span>
              <span className={`${styles.avatarWrapper} ${styles.moreAvatars}`}>+2</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
