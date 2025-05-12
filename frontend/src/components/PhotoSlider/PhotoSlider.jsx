import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./PhotoSlider.module.scss";

export default function PhotoSlider({ photos = [] }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const photoRef = useRef(null);

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (photos.length > 1) {
      animatePhotoOut(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
      });
    }
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (photos.length > 1) {
      animatePhotoOut(() => {
        setCurrentPhotoIndex(
          (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
        );
      });
    }
  };

  const animatePhotoIn = () => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  };

  const animatePhotoOut = (onComplete) => {
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete,
      });
    }
  };

  useEffect(() => {
    animatePhotoIn();
  }, [currentPhotoIndex]);

  if (photos.length === 0) {
    return null;
  }

  const smallImgProps = {
    src: photos[currentPhotoIndex],
    alt: `Photo ${currentPhotoIndex + 1}`,
    width: 140,
    height: 90,
    quality: 30,
    placeholder: "blur",
    blurDataURL: "/placeholder.png",
    className: styles.photo,
    ref: photoRef,
    loading: "lazy",
    draggable: false,
  };

  const fullImgProps = {
    src: photos[currentPhotoIndex],
    alt: `Photo ${currentPhotoIndex + 1}`,
    fill: true,
    style: { objectFit: "contain" },
    quality: 90,
    priority: true,
    className: styles.fullscreenImg,
    draggable: false,
  };

  const photoContent = (
    <div
      className={styles.photoWrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFullscreen(true)}
      style={{ cursor: "zoom-in" }}
    >
      <Image {...smallImgProps} />
      <div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ""}`}>
        {photos.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.leftButton}`}
              onClick={handlePrevPhoto}
              tabIndex={hovered ? 0 : -1}
            >
              <img
                src="/slideButton2.svg"
                alt="Previous"
                className={styles.sliderIcon}
              />
            </button>
            <button
              className={`${styles.navButton} ${styles.rightButton}`}
              onClick={handleNextPhoto}
              tabIndex={hovered ? 0 : -1}
            >
              <img
                src="/slideButton2.svg"
                alt="Next"
                className={`${styles.sliderIcon} ${styles.mirrored}`}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );

  const fullscreenModal = fullscreen && typeof window !== "undefined"
    ? createPortal(
        <div className={styles.fullscreenOverlay} onClick={() => setFullscreen(false)}>
          <div
            className={styles.fullscreenPhotoWrapper}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.fullscreenImgBox}>
              <Image {...fullImgProps} />
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setFullscreen(false)}
              aria-label="Закрити"
            >
              <span className={styles.closeLine}></span>
              <span className={styles.closeLineRev}></span>
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div className={styles.slider}>
        {photoContent}
      </div>
      {fullscreenModal}
    </>
  );
}