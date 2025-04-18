import styles from "./ServiceCard.module.scss";

export default function ServiceCard({ service }) {
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
      <div className={styles.overlay}>
        <div className={styles.descriptionWrapper}>
        <h2
          className={styles.title}
          title={service.title}
        >
          {service.title}
        </h2>
        <p
          className={styles.description}
          title={service.description}
        >
          {service.description}
        </p>
        </div>
        <a href="#" className={styles.learnMore}>
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