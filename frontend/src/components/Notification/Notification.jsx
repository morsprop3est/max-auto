import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Notification.module.scss";

export default function Notification({ type, message, onRemove }) {
  const [progress, setProgress] = useState(100);
  const notificationRef = useRef(null); 
  const onRemoveRef = useRef(onRemove);

  useEffect(() => {
    gsap.fromTo(
      notificationRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 2, 0));
    }, 100);

    const timeout = setTimeout(() => {
      gsap.to(notificationRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          onRemoveRef.current();
        },
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={notificationRef}
      className={`${styles.notification} ${styles[type]}`}
    >
      <p>{message}</p>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
    </div>
  );
}