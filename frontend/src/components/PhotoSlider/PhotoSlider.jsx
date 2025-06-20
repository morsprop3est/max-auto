import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./PhotoSlider.module.scss";

export default function PhotoSlider({ photos = [] }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const photoRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const galleryRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (!fullscreen) {
      setIsClosing(false);
    }
  }, [fullscreen]);

  const handleClose = () => {
    setIsClosing(true);
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    if (modal && overlay) {
      modal.classList.add(styles.closing);
      overlay.classList.add(styles.closing);

      setTimeout(() => {
        setFullscreen(false);
      }, 300);
    } else {
      setFullscreen(false);
    }
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (photos.length > 1) {
      if (fullscreen) {
        animateFullscreenPhotoOut('right', () => {
          setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
        });
      } else {
        animatePhotoOut('right', () => {
          setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
        });
      }
    }
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (photos.length > 1) {
      if (fullscreen) {
        animateFullscreenPhotoOut('left', () => {
          setCurrentPhotoIndex(
            (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
          );
        });
      } else {
        animatePhotoOut('left', () => {
          setCurrentPhotoIndex(
            (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
          );
        });
      }
    }
  };

  const handlePhotoClick = (index) => {
    if (index === currentPhotoIndex) return;
    
    const direction = index > currentPhotoIndex ? 'right' : 'left';
    if (fullscreen) {
      animateFullscreenPhotoOut(direction, () => {
        setCurrentPhotoIndex(index);
      });
    } else {
      animatePhotoOut(direction, () => {
        setCurrentPhotoIndex(index);
      });
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && photos.length > 1) {
      handleNextPhoto({ stopPropagation: () => {} });
    }
    if (isRightSwipe && photos.length > 1) {
      handlePrevPhoto({ stopPropagation: () => {} });
    }
  };

  const animatePhotoIn = (direction = 'center') => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { 
          opacity: 0
        },
        { 
          opacity: 1,
          duration: 0.3, 
          ease: "power2.out" 
        }
      );
    }
  };

  const animatePhotoOut = (direction = 'center', onComplete) => {
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete,
      });
    }
  };

  const fullImgProps = {
    src: photos[currentPhotoIndex],
    alt: `Photo ${currentPhotoIndex + 1}`,
    fill: true,
    style: { objectFit: "contain" },
    quality: 100,
    priority: true,
    className: styles.fullscreenImg,
    draggable: false,
    ref: photoRef,
  };

  const animateFullscreenPhotoIn = (direction = 'center') => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { 
          opacity: 0
        },
        { 
          opacity: 1,
          duration: 0.4, 
          ease: "power2.out" 
        }
      );
    }
  };

  const animateFullscreenPhotoOut = (direction = 'center', onComplete) => {
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete,
      });
    }
  };

  useEffect(() => {
    if (fullscreen) {
      animateFullscreenPhotoIn();
    } else {
      animatePhotoIn();
    }
  }, [currentPhotoIndex, fullscreen]);

  useEffect(() => {
    if (galleryRef.current && fullscreen) {
      const activeThumbnail = galleryRef.current.querySelector(`.${styles.activeThumbnail}`);
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentPhotoIndex, fullscreen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreen) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          handlePrevPhoto(e);
          break;
        case 'ArrowRight':
          handleNextPhoto(e);
          break;
      }
    };

    if (fullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [fullscreen, photos.length]);

  if (photos.length === 0) {
    return null;
  }

  const smallImgProps = {
    src: photos[currentPhotoIndex],
    alt: `Photo ${currentPhotoIndex + 1}`,
    width: 140,
    height: 90,
    quality: 75,
    placeholder: "blur",
    blurDataURL: "/placeholder.png",
    className: styles.photo,
    ref: photoRef,
    loading: "lazy",
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
        <div className={styles.fullscreenOverlay} onClick={handleClose} ref={overlayRef}>
          <div
            className={styles.fullscreenPhotoWrapper}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={e => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={modalRef}
          >
            {/* Close button */}
            <button
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Закрити"
            >
              <span className={styles.closeLine}></span>
              <span className={styles.closeLineRev}></span>
            </button>

            {/* Photo counter */}
            {photos.length > 1 && (
              <div className={styles.photoCounter}>
                {currentPhotoIndex + 1} / {photos.length}
              </div>
            )}

            {/* Main photo */}
            <div className={styles.fullscreenImgBox}>
              <Image {...fullImgProps} />
            </div>

            {/* Navigation buttons */}
            {photos.length > 1 && (
              <>
                <button
                  className={`${styles.fullscreenNavButton} ${styles.fullscreenNavLeft}`}
                  onClick={handlePrevPhoto}
                  aria-label="Попереднє фото"
                >
                  <img
                    src="/slideButton2.svg"
                    alt="Previous"
                    className={styles.fullscreenNavIcon}
                  />
                </button>
                <button
                  className={`${styles.fullscreenNavButton} ${styles.fullscreenNavRight}`}
                  onClick={handleNextPhoto}
                  aria-label="Наступне фото"
                >
                  <img
                    src="/slideButton2.svg"
                    alt="Next"
                    className={`${styles.fullscreenNavIcon} ${styles.mirrored}`}
                  />
                </button>
              </>
            )}

            {/* Gallery thumbnails */}
            {photos.length > 1 && (
              <div className={styles.galleryContainer} ref={galleryRef}>
                <div className={styles.galleryWrapper}>
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className={`${styles.galleryThumbnail} ${
                        index === currentPhotoIndex ? styles.activeThumbnail : ''
                      }`}
                      onClick={() => handlePhotoClick(index)}
                    >
                      <Image
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        width={60}
                        height={40}
                        quality={50}
                        className={styles.thumbnailImg}
                        draggable={false}
                      />
                      {index === currentPhotoIndex && (
                        <div className={styles.currentIndicator}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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