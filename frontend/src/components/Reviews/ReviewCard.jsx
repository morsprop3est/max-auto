import { useEffect, useRef } from "react";
import { animateScaleUp } from "../../utils/animation";
import styles from "./ReviewCard.module.scss";

export default function ReviewCard({ name, rating, comment, photo }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      animateScaleUp(cardRef.current, 1, 0.3);
    }
  }, []);

  return (
    <div ref={cardRef} className={styles.card}>
      {photo ? (
        <img src={photo} alt={name} className={styles.photo} />
      ) : (
        <div className={styles.placeholder}></div>
      )}
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.rating}>Rating: {rating}</p>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
}