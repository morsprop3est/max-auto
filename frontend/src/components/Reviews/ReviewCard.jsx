import { useRef, useEffect, useState } from "react";
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import styles from "./ReviewCard.module.scss";
import { gsap } from "gsap";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export default function ReviewCard({
  name,
  rating,
  comment,
  userPhoto,
  reviewPhotos = [],
  onClose,
  onPrev,
  onNext,
  hasReviews,
}) {
  const cardRef = useRef(null);
  const commentRef = useRef(null);
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, x: -200, scale: 0.1 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      );
    }
    return () => {
      if (cardRef.current) {
        gsap.set(cardRef.current, { clearProps: "all" });
      }
    };
  }, []);

  const animateAnd = (callback) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 60,
        x: -200,
        scale: 0.1,
        duration: 0.35,
        ease: "power3.in",
        onComplete: callback,
      });
    } else {
      callback();
    }
  };

  const animateComment = (callback) => {
    if (commentRef.current) {
      gsap.to(commentRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          callback();
          setTimeout(() => {
            if (commentRef.current) {
              gsap.fromTo(
                commentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.2, ease: "power2.out" }
              );
            }
          }, 10);
        },
      });
    } else {
      callback();
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0,  },
        { opacity: 1, duration: 0.1, ease: "power2.out" }
      );
    }
  }, [reviewPhotos]);

  const handleClose = () => animateAnd(onClose);
  const handlePrev = () => animateComment(onPrev);
  const handleNext = () => animateComment(onNext);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? "/starFilled.svg" : "/star.svg"}
          alt={i <= rating ? "Filled Star" : "Empty Star"}
          className={styles.star}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.25, duration: 0.1 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.1 })}
        />
      );
    }
    return stars;
  };

  const userPhotoUrl =
    userPhoto && userPhoto !== "null"
      ? `${BASE_URL}${userPhoto}`
      : "/default-review-user-icon.svg";

  const hasSliderPhotos = Array.isArray(reviewPhotos) && reviewPhotos.length > 0;
  const hasAnyComment = Boolean(name || rating || comment);

  if (!isVisible) return null;

  return (
    <div className={styles.card} ref={cardRef}>
      <button className={styles.closeButton} onClick={handleClose}>
        ✖
      </button>
      <div className={styles.row}>
        {hasAnyComment && (
          <div className={styles.sideNav}>
            <button className={styles.navBtn} onClick={handlePrev} aria-label="Попередній відгук">
              <img src="/slideButton.svg" alt="Prev" className={styles.sliderIcon} />
            </button>
          </div>
        )}
        <div
          className={
            hasSliderPhotos
              ? styles.commentCol
              : `${styles.commentCol} ${styles.fullWidth}`
          }
        >
          <div ref={commentRef}>
            {hasAnyComment ? (
              <>
                <div className={styles.userBlock}>
                  <div className={styles.userPhotoBox}>
                    <img
                      src={userPhotoUrl}
                      alt={name}
                      className={styles.userPhoto}
                      onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.18, duration: 0.2 })}
                      onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                    />
                  </div>
                  <div className={styles.userInfoBox}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.rating}>{renderStars()}</div>
                  </div>
                </div>
                <div className={styles.commentText}>{comment}</div>
              </>
            ) : (
              <div className={styles.noComments}>
                Коментарів до цієї області ще немає
              </div>
            )}
          </div>
        </div>
        {hasSliderPhotos && (
          <div className={styles.sliderCol} ref={sliderRef}>
            <PhotoSlider photos={reviewPhotos.map((photo) => `${BASE_URL}${photo.photoUrl}`)} />
          </div>
        )}
        {hasAnyComment && (
          <div className={styles.sideNav}>
            <button className={styles.navBtn} onClick={handleNext} aria-label="Наступний відгук">
              <img src="/slideButton.svg" alt="Next" className={`${styles.sliderIcon} ${styles.mirrored}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}