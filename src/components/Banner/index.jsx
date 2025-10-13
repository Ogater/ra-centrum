import styles from "./index.module.scss";

export default function Banner({ imageSrc, title, subtitle, alt = "Banner" }) {
  return (
    <div className={styles.banner} aria-label={alt} role="img">
      <img className={styles.banner__image} src={imageSrc} alt={alt} />
      <div className={styles.banner__overlay}>
        <h2 className={styles.banner__title}>{title}</h2>
        <p className={styles.banner__subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
