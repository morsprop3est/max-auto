import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import styles from "./Slider.module.scss";
import { useAdaptive } from "@/context/AdaptiveContext";

export default function Slider({
  children,
  cardsPerView, // опціонально: якщо явно передати, буде пріоритет
  className = "",
  style = {},
}) {
  const { device } = useAdaptive();

  // 3 карточки для desktop/tablet, 1 для mobile
  let adaptiveCardsPerView = 3;
  if (device === "mobile") adaptiveCardsPerView = 1;
  const slidesToShow = cardsPerView || adaptiveCardsPerView;

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
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
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