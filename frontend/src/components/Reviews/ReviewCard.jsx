import { useRef, useEffect, useState } from "react";
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import Skeleton from "../Skeleton/Skeleton";
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
  shiftRight = false,
  loading = false,
  noReviews = false,
  visible = true,
}) {
  const cardRef = useRef(null);
  const commentRef = useRef(null);
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!visible) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        shiftRight
          ? { opacity: 0, y: 60, x: 160, scale: 0.1 }
          : { opacity: 0, y: 60, x: -200, scale: 0.1 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        }
      );
    }
    return () => {
      if (cardRef.current) {
        gsap.set(cardRef.current, { clearProps: "all" });
      }
    };
  }, [shiftRight, visible]);

  const animateAnd = (callback) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 60,
        x: shiftRight ? 160 : -200,
        scale: 0.1,
        duration: 0.25,
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
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          callback();
          setTimeout(() => {
            if (commentRef.current) {
              gsap.fromTo(
                commentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.15, ease: "power2.out" }
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
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power2.out" }
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
            {loading ? (
              <div style={{ minHeight: 90, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <div style={{ width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#eee"
                    }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ width: 90, height: 18, borderRadius: 4, background: "#eee" }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} style={{ width: 18, height: 18, borderRadius: 3, background: "#eee" }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", height: 16, borderRadius: 4, background: "#eee", marginBottom: 6 }} />
                <div style={{ width: "80%", height: 16, borderRadius: 4, background: "#eee" }} />
              </div>
            ) : noReviews ? (
              <div className={styles.noComments}>
                Коментарів до цієї області ще немає
              </div>
            ) : hasAnyComment ? (
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
            ) : null}
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