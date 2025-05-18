import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import styles from "./Slider.module.scss";

export default function Slider({
  children,
  cardsPerView = 1,
  className = "",
  style = {},
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    loop: true,
    align: "start",
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <>
        <div className={`${styles.sliderWrapper} ${className}`} style={style}>
        <div className={styles.sliderTrack} ref={emblaRef}>
            <div className={styles.emblaContainer}>
            {Array.isArray(children) &&
                children.map((child, idx) => (
                <div
                    className={styles.emblaSlide}
                    style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                    key={idx}
                >
                    {child}
                </div>
                ))}
            </div>
        </div>
        
        </div>
            <div className={styles.sliderControls}>
            <button
            className={styles.sliderButton}
            onClick={scrollPrev}
            >
            <img
                src="/slideButton2.svg"
                alt="Previous"
                className={styles.sliderIcon}
            />
            </button>
            <button
            className={styles.sliderButton}
            onClick={scrollNext}
            >
            <img
                src="/slideButton2.svg"
                alt="Next"
                className={`${styles.sliderIcon} ${styles.mirrored}`}
            />
            </button>
        </div>
    </>
  );
}