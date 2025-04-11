import styles from "./ServiceCard.module.scss";
import Image from "next/image";

export default function ServiceCard({ service }) {
  return (
    <div className={styles.card}>
      <div className={styles.background}>
        <Image
          src={service.photoUrl}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.overlay}>
        <div className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </div>
        <h2 className={styles.title}>{service.title}</h2>
        <div className={styles.hiddenContent}>
          <p className={styles.description}>{service.description}</p>
          <button className={styles.learnMore}>Дізнатись більше</button>
        </div>
      </div>
    </div>
  );
}