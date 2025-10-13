import React from "react";
import styles from "./index.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__divider} />
      <div className={styles.footer__legal}>
        © 2025, RA-CENTRUM. Всі права захищені.
      </div>
    </footer>
  );
}
