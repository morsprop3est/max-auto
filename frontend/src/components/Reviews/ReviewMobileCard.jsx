import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./ReviewMobileCard.module.scss";

export default function ReviewMobileCard({
  region,
  reviews = [],
  currentIndex,
  setCurrentIndex,
  onClose,
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
      setTimeout(() => {
        if (overlayRef.current) overlayRef.current.style.opacity = "1";
      }, 10);
    }
  }, []);

  if (!region) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : reviews.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < reviews.length - 1 ? prev + 1 : 0
    );
  };

  let touchStartX = null;
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 40) handlePrev();
    if (dx < -40) handleNext();
    touchStartX = null;
  };

  const review = reviews[currentIndex];
  const BASE_URL = process.env.NEXT_PUBLIC_URL;
  const userPhotoUrl =
    review?.userPhoto && review?.userPhoto !== "null"
      ? `${BASE_URL}${review.userPhoto}`
      : "/default-review-user-icon.svg";

  return createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      style={{ opacity: 1, transition: "opacity 0.3s" }}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрити">✖</button>
        <div className={styles.regionTitle}>{region.name}</div>
        {reviews.length > 0 ? (
          <div className={styles.slider}>
            <div className={styles.card}>
              <div className={styles.userBlock}>
                <div className={styles.userPhotoBox}>
                  <img
                    src={userPhotoUrl}
                    alt={review?.name}
                    className={styles.userPhoto}
                  />
                </div>
                <div className={styles.userInfoBox}>
                  <div className={styles.name}>{review?.name}</div>
                  <div className={styles.rating}>
                    {[1,2,3,4,5].map(i => (
                      <img
                        key={i}
                        src={i <= (review?.rating || 0) ? "/starFilled.svg" : "/star.svg"}
                        alt={i <= (review?.rating || 0) ? "Filled Star" : "Empty Star"}
                        className={styles.star}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.commentText}>{review?.comment}</div>
              {Array.isArray(review?.reviewPhotos) && review.reviewPhotos.length > 0 && (
                <div className={styles.sliderCol}>
                  <img
                    src={`${BASE_URL}${review.reviewPhotos[0].photoUrl}`}
                    alt="review"
                    className={styles.reviewImg}
                  />
                </div>
              )}
            </div>
            <div className={styles.pagination}>
              <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Попередній">‹</button>
              <span>{currentIndex + 1} / {reviews.length}</span>
              <button className={styles.arrowBtn} onClick={handleNext} aria-label="Наступний">›</button>
            </div>
          </div>
        ) : (
          <div className={styles.noReviews}>Коментарів до цієї області ще немає</div>
        )}
      </div>
    </div>,
    document.body
  );
}