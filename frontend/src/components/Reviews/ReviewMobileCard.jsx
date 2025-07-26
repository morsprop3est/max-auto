import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ReviewMobileCard.module.scss";
import PhotoSlider from "../PhotoSlider/PhotoSlider";

export default function ReviewMobileCard({
  region,
  reviews = [],
  currentIndex,
  setCurrentIndex,
  onClose,
}) {
  const overlayRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
      setTimeout(() => {
        if (overlayRef.current) overlayRef.current.style.opacity = "1";
      }, 10);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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

  const reviewPhotos = Array.isArray(review?.reviewPhotos) 
    ? review.reviewPhotos.map(photo => `${BASE_URL}${photo.photoUrl}`)
    : [];

  const renderSkeleton = () => (
    <div className={styles.card}>
      <div className={styles.userBlock}>
        <div className={styles.userPhotoBox}>
          <div className={`${styles.skeleton} ${styles.skeletonUserPhoto}`} />
        </div>
        <div className={styles.userInfoBox}>
          <div className={`${styles.skeleton} ${styles.skeletonName}`} />
          <div className={styles.skeletonRating}>
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`${styles.skeleton} ${styles.star}`} />
            ))}
          </div>
        </div>
      </div>
      <div className={`${styles.skeleton} ${styles.skeletonComment}`} />
      <div className={`${styles.skeleton} ${styles.skeletonComment}`} />
      <div className={`${styles.skeleton} ${styles.skeletonComment}`} />
    </div>
  );

  return createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}
      ref={overlayRef}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.closing : ''}`}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Закрити">
          <span className={styles.closeLine1}></span>
          <span className={styles.closeLine2}></span>
        </button>
        <div className={styles.regionTitle}>{region.name}</div>
        {reviews.length > 0 ? (
          <div className={styles.slider}>
            {isLoading ? renderSkeleton() : (
              <div className={styles.card}>
                <div className={styles.userBlock}>
                  {/* <div className={styles.userPhotoBox}>
                    <img
                      src={userPhotoUrl}
                      alt={review?.name}
                      className={styles.userPhoto}
                    />
                  </div> */}
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
              </div>
            )}
            {reviewPhotos.length > 0 && (
              <div className={styles.sliderCol}>
                <PhotoSlider photos={reviewPhotos} />
              </div>
            )}
            <div className={styles.pagination}>
              <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Попередній">‹</button>
              <span>{currentIndex + 1} / {reviews.length}</span>
              <button className={styles.arrowBtn} onClick={handleNext} aria-label="Наступний">›</button>
            </div>
          </div>
        ) : (
          <div className={styles.noReviews}>Відгуків до цієї області ще немає</div>
        )}
      </div>
    </div>,
    document.body
  );
}