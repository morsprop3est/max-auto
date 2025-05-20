import { useEffect, useState } from "react";
import styles from "./ScrollMouse.module.scss";

export default function ScrollMouse() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.scrollMouse} ${visible ? styles.visible : ""}`}>
      <img src="/mouseScroll.svg" alt="Scroll down" className={styles.animatedMouse} />
      <span>Прокрутіть вниз</span>
    </div>
  );
}