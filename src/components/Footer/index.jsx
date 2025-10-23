import React from "react";
import styles from "./index.module.scss";
import { useTranslation } from "../../i18n/TranslationProvider.jsx";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__divider} />
      <div className={styles.footer__legal}>
        {t("© 2025, RA-CENTRUM. Всі права захищені.")}
      </div>
    </footer>
  );
}
