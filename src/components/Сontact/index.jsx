import React from "react";
import styles from "./index.module.scss";
import background from "../../assets/Contact.png";

export default function Contact() {
  return (
    <section
      id="contacts"
      className={styles.section}
      style={{ backgroundImage: `url(${background})` }}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <h2 id="contact-title" className={styles.title}>
          Звʼяжіться з нами
        </h2>

        <div className={styles.rows}>
          {/*
          <div className={styles.formBox}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Введіть ваше ім’я прізвище"
            />
            <input
              className={styles.inputField}
              type="email"
              placeholder="Введіть ваш e-mail"
            />
            <input
              className={styles.inputField}
              type="text"
              placeholder="Напишіть ваше запитання"
            />
            <button className={styles.submitButton}>Надіслати</button>
          </div>
          */}

          {/* Правый контейнер — статичные контакты */}
          <div className={styles.infoBox}>
            <div className={styles.infoRow}>
              <div className={styles.iconBox} aria-hidden>
                {/* телефон 28x28 */}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M26.0039 27.75C11.3789 27.75 0.253906 16.5 0.253906 2C0.253906 0.999999 1.00391 0.25 2.00391 0.25H6.50391C7.37891 0.25 8.12891 0.875 8.25391 1.75C8.50391 3.75 9.12891 5.75 10.0039 7.625L10.1289 8C10.2539 8.25 10.2539 8.5 10.2539 8.875C10.1289 9.125 10.0039 9.375 9.75391 9.5C8.37891 10.5 7.87891 12.5 8.87891 14.125C10.2539 16.125 12.0039 17.875 14.0039 19.25C15.6289 20.375 17.6289 19.75 18.6289 18.375C18.7539 18.125 19.0039 18 19.2539 17.875C19.5039 17.75 19.7539 17.875 20.1289 18L20.5039 18.125C22.3789 19 24.3789 19.625 26.3789 19.875C27.2539 20 27.8789 20.75 27.8789 21.625V26.125C27.8789 26.375 27.8789 26.625 27.7539 26.75C27.6289 27 27.5039 27.125 27.3789 27.375C27.2539 27.5 27.0039 27.625 26.7539 27.75C26.5039 27.75 26.2539 27.75 26.0039 27.75Z" fill="#1B3AB5"/>
                </svg>
              </div>
              <div className={styles.infoText}>+380 63 041 6293</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.iconBox} aria-hidden>
                {/* пошта 28x24 */}
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M25.0039 6.375L14.0039 13.375L3.00391 6.375V3.625L14.0039 10.625L25.0039 3.625M25.0039 0.875H3.00391C1.50391 0.875 0.253906 2.125 0.253906 3.625V20.375C0.253906 21.125 0.503907 21.875 1.00391 22.375C1.50391 22.875 2.25391 23.25 3.00391 23.25H25.0039C25.7539 23.25 26.3789 23 27.0039 22.375C27.50391 21.875 27.7539 21.125 27.7539 20.375V3.625C27.7539 2.875 27.5039 2.125 27.0039 1.625C26.3789 1.125 25.7539 0.875 25.0039 0.875Z" fill="#1B3AB5"/>
                </svg>
              </div>
              <div className={styles.infoText}>office@ra-centrum.com</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.iconBox} aria-hidden>
                <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12.0039 0.249023C9.00391 0.249023 6.25391 1.37402 4.12891 3.37402C2.00391 5.37402 0.878906 8.12402 0.878906 10.999C0.878906 13.374 1.62891 15.624 3.12891 17.499C3.12891 17.499 3.37891 17.874 3.50391 17.999L12.0039 27.749L20.6289 17.999L21.0039 17.499C22.5039 15.624 23.2539 13.374 23.2539 10.999C23.2539 8.12402 22.0039 5.37402 20.0039 3.37402C17.7539 1.37402 15.0039 0.249023 12.0039 0.249023ZM12.0039 14.999C11.2539 14.999 10.3789 14.749 9.75391 14.374C9.12891 13.874 8.62891 13.374 8.25391 12.624C8.00391 11.874 7.8789 11.124 8.0039 10.374C8.1289 9.62402 8.50391 8.87402 9.12891 8.37402C9.75391 7.87402 10.3789 7.49902 11.2539 7.24902C12.0039 7.12402 12.8789 7.12402 13.6289 7.49902C14.3789 7.87402 15.0039 8.24902 15.5039 8.99902C16.0039 9.62402 16.1289 10.374 16.1289 11.249C16.1289 12.249 15.7539 13.249 15.0039 13.999C14.1289 14.624 13.1289 14.999 12.0039 14.999Z" fill="#1B3AB5"/>
                </svg>
              </div>
              <div className={styles.infoText}>
                Київ вул. Миру, 36 оф.2
              </div>
            </div>
          </div>
          {/* /infoBox */}
        </div>
      </div>
    </section>
  );
}
