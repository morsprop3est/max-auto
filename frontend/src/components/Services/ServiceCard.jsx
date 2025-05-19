import styles from "./ServiceCard.module.scss";
import { useNotification } from "@/context/NotificationContext";

export default function ServiceCard({ service }) {
  const { addNotification } = useNotification();

  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    const contact = document.getElementById("contact-us");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
    addNotification("info", "Заповніть дані, щоб дізнатись більше");
  };

  return (
    <div className={styles.card}>
      <div className={styles.background}>
        {service.photoUrl ? (
          <img
            src={service.photoUrl}
            alt={service.title}
            className={styles.backgroundImage}
          />
        ) : null}
      </div>
      <div className={styles.centerTitle}>
        <span>{service.title}</span>
      </div>
      <div className={styles.overlay}>
        <div className={styles.descriptionWrapper}>
          <h2 className={styles.title} title={service.title}>
            {service.title}
          </h2>
          <p className={styles.description} title={service.description}>
            {service.description}
          </p>
        </div>
        <a
          href="#contact-us"
          className={styles.learnMore}
          onClick={handleLearnMoreClick}
        >
          Дізнатись більше
          <img
            src="/slideButton2.svg"
            alt="Arrow"
            className={styles.learnMoreIcon}
          />
        </a>
      </div>
    </div>
  );
}