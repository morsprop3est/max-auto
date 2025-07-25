import { useRef, useEffect, useState } from "react";
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./ReviewCard.module.scss";
import { gsap } from "gsap";
import { createPortal } from "react-dom";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const tooltipStyles = {
  position: 'absolute',
  background: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '4px',
  fontSize: '14px',
  maxWidth: '300px',
  zIndex: 9999,
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-10px)',
  transition: 'opacity 0.2s, transform 0.2s, visibility 0.2s',
  pointerEvents: 'none',
};

const tooltipArrowStyles = {
  content: '""',
  position: 'absolute',
  left: '10px',
  top: '-12px',
  border: '6px solid transparent',
  borderBottomColor: 'rgba(0, 0, 0, 0.8)',
};

const visibleStyles = {
  opacity: 1,
  visibility: 'visible',
  transform: 'translateY(0)',
};

function TooltipPortal({ text, targetRef, isVisible }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (targetRef.current && isVisible) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
  }, [isVisible, targetRef]);

  if (!isVisible) return null;

  return createPortal(
    <div 
      style={{
        ...tooltipStyles,
        ...(isVisible ? visibleStyles : {}),
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div style={tooltipArrowStyles} />
      {text}
    </div>,
    document.body
  );
}

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const commentTextRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
    return () => {
      if (cardRef.current) {
        gsap.set(cardRef.current, { clearProps: "all" });
      }
    };
  }, [shiftRight, visible]);

  useEffect(() => {
    if (commentTextRef.current) {
      const textHeight = commentTextRef.current.scrollHeight;
      const maxHeight = parseInt(getComputedStyle(commentTextRef.current).maxHeight);
      setShowMoreButton(textHeight > maxHeight);
    }
  }, [comment]);

  const animateAnd = (callback) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
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
                {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out",
                }
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

  const renderSkeleton = () => (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.sideNav}>
          <button className={styles.navBtn} aria-label="Попередній відгук">
            <img src="/slideButton.svg" alt="Prev" className={styles.sliderIcon} />
          </button>
        </div>
        <div className={styles.commentCol}>
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
        <div className={styles.sliderCol}>
          <div className={styles.skeletonSlider}>
            <div className={`${styles.skeleton} ${styles.skeletonPhoto}`} />
            <div className={styles.skeletonDots}>
              {[1,2,3].map(i => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonDot}`} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.sideNav}>
          <button className={styles.navBtn} aria-label="Наступний відгук">
            <img src="/slideButton.svg" alt="Next" className={`${styles.sliderIcon} ${styles.mirrored}`} />
          </button>
        </div>
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className={styles.card} ref={cardRef}>
      <button className={styles.closeButton} onClick={handleClose}>
        ✖
      </button>
      {loading ? renderSkeleton() : (
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
              {noReviews ? (
                <div className={styles.noComments}>
                  Коментарів до цієї області ще немає
                </div>
              ) : hasAnyComment ? (
                <>
                  <div className={styles.userBlock}>
                    {/* <div className={styles.userPhotoBox}>
                      <img
                        src={userPhotoUrl}
                        alt={name}
                        className={styles.userPhoto}
                      />
                    </div> */}
                    <div className={styles.userInfoBox}>
                      <div className={styles.name}>{name}</div>
                      <div className={styles.rating}>{renderStars()}</div>
                    </div>
                  </div>
                  <div 
                    className={styles.commentWrapper}
                    onMouseEnter={() => setIsTooltipVisible(true)}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                  >
                    <div className={styles.commentText} ref={commentRef}>
                      {comment}
                    </div>
                    <TooltipPortal 
                      text={comment}
                      targetRef={commentRef}
                      isVisible={isTooltipVisible}
                    />
                  </div>
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
      )}
    </div>
  );
}