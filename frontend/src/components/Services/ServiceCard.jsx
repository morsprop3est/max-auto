import styles from "./ServiceCard.module.scss";
import { useRef } from "react";
import { gsap } from "gsap";
import { useNotification } from "@/context/NotificationContext";

export default function ServiceCard({ service }) {
  const overlayRef = useRef(null);
  const centerTitleRef = useRef(null);
  const learnMoreRef = useRef(null);
  const { addNotification } = useNotification();

  const handleEnter = () => {
    gsap.to(centerTitleRef.current, { opacity: 0, y: -20, duration: 0.1, pointerEvents: "none" });
    gsap.to(overlayRef.current, { opacity: 1, y: 0, duration: 0.3, pointerEvents: "auto" });
  };

  const handleLeave = () => {
    gsap.to(centerTitleRef.current, { opacity: 1, y: 0, duration: 0.3, pointerEvents: "auto" });
    gsap.to(overlayRef.current, { opacity: 0, y: 100, duration: 0.3, pointerEvents: "none" });
  };

  // GSAP анімації для "Дізнатись більше"
  const handleLearnMoreEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.08, duration: 0.18 });
  };
  const handleLearnMoreLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.18 });
  };
  const handleLearnMoreDown = (e) => {
    gsap.to(e.currentTarget, { scale: 0.93, duration: 0.12 });
  };
  const handleLearnMoreUp = (e) => {
    gsap.to(e.currentTarget, { scale: 1.08, duration: 0.18 });
  };

  // Плавний скролл і нотифікація
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    const contact = document.getElementById("contact-us");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
    addNotification("info", "Заповніть дані, щоб дізнатись більше");
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ position: "relative" }}
    >
      <div className={styles.background}>
        {service.photoUrl ? (
          <img
            src={service.photoUrl}
            alt={service.title}
            className={styles.backgroundImage}
          />
        ) : null}
      </div>
      <div
        ref={centerTitleRef}
        className={styles.centerTitle}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 3,
          opacity: 1,
          pointerEvents: "auto",
        }}
      >
        <span>{service.title}</span>
      </div>
      <div
        ref={overlayRef}
        className={styles.overlay}
      >
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
          ref={learnMoreRef}
          onMouseEnter={handleLearnMoreEnter}
          onMouseLeave={handleLearnMoreLeave}
          onMouseDown={handleLearnMoreDown}
          onMouseUp={handleLearnMoreUp}
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