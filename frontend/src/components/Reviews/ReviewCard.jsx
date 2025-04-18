import { useRef } from "react";
import {
  animateScaleUp,
  animateScaleDown,
  animatePress,
  animateRelease,
} from "../../utils/animation";
import styles from "./ReviewCard.module.scss";

export default function ReviewCard({
  name,
  rating,
  comment,
  photo,
  onClose,
  onPrev,
  onNext,
  hasReviews,
}) {
  const cardRef = useRef(null);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? "/starFilled.svg" : "/star.svg"}
          alt={i <= rating ? "Filled Star" : "Empty Star"}
          className={styles.star}
          onMouseEnter={(e) => animateScaleUp(e.target, 1.2, 0.2)}
          onMouseLeave={(e) => animateScaleDown(e.target, 1, 0.2)}
        />
      );
    }
    return stars;
  };

  return (
    <div ref={cardRef} className={styles.card}>
      <div className={styles.topBlock}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => animateScaleUp(e.target, 1.1, 0.2)}
          onMouseLeave={(e) => animateScaleDown(e.target, 1, 0.2)}
          onMouseDown={(e) => animatePress(e.target, 0.9, 0.1)}
          onMouseUp={(e) => animateRelease(e.target, 1.1, 0.2)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.closeIcon}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className={styles.bottomBlock}>
        {hasReviews ? (
          <>
            <button
              className={styles.sliderButton}
              onClick={onPrev}
              onMouseEnter={(e) => animateScaleUp(e.target, 1.1, 0.2)}
              onMouseLeave={(e) => animateScaleDown(e.target, 1, 0.2)}
              onMouseDown={(e) => animatePress(e.target, 0.9, 0.1)}
              onMouseUp={(e) => animateRelease(e.target, 1.1, 0.2)}
            >
              <img
                src="/slideButton.svg"
                alt="Previous"
                className={styles.sliderIcon}
              />
            </button>

            <div className={styles.content}>
              {photo && <img src={photo} alt={name} className={styles.photo} />}
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.comment}>{comment}</p>
              <div className={styles.rating}>{renderStars()}</div>
            </div>

            <button
              className={styles.sliderButton}
              onClick={onNext}
              onMouseEnter={(e) => animateScaleUp(e.target, 1.1, 0.2)}
              onMouseLeave={(e) => animateScaleDown(e.target, 1, 0.2)}
              onMouseDown={(e) => animatePress(e.target, 0.9, 0.1)}
              onMouseUp={(e) => animateRelease(e.target, 1.1, 0.2)}
            >
              <img
                src="/slideButton.svg"
                alt="Next"
                className={`${styles.sliderIcon} ${styles.mirrored}`}
              />
            </button>
          </>
        ) : (
          <div className={styles.noReviews}>
            <p>Поки немає відгуків для цієї області.</p>
          </div>
        )}
      </div>
    </div>
  );
}