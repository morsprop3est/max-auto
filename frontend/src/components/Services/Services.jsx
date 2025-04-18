'use client';

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./Services.module.scss";
import ServiceCard from "./ServiceCard";
import { animateScaleUp, animateScaleDown, animatePress } from "../../utils/animation";

export default function Services({ component }) {
  if (!component || !Array.isArray(component)) {
    return <div>No services available</div>;
  }

  const sectionTitle = component.find((item) => item.slug === "service_h1")?.text || "Наші послуги";
  const sectionDescription =
    component.find((item) => item.slug === "service_p1")?.text ||
    "Ми пропонуємо повний комплекс послуг, щоб ви отримали своє авто швидко, вигідно та без зайвих клопотів.";

  const servicesData = component
    .filter((item) => item.slug.startsWith("service_h1_"))
    .map((service, index) => ({
      title: service.text,
      description: component.find((item) => item.slug === `service_p1_${index + 1}`)?.text || "",
      photoUrl: service.photoUrl || "",
    }));

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 20,
    },
  });

  const handleMouseEnter = (e) => {
    animateScaleUp(e.currentTarget);
  };

  const handleMouseLeave = (e) => {
    animateScaleDown(e.currentTarget);
  };

  const handleMouseDown = (e) => {
    animatePress(e.currentTarget);
  };

  const handleMouseUp = (e) => {
    animateScaleUp(e.currentTarget);
  };

  return (
    <div className={styles.servicesWrapper}>
      <div className="container">
        <div className={styles.serviceWrapper}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{sectionTitle}</h1>
            </div>
            <p className={styles.description}>{sectionDescription}</p>
          </div>

          <div className={styles.slider}>
            <div ref={sliderRef} className={`keen-slider ${styles.keenSlider}`}>
              {servicesData.map((service, index) => (
                <div key={index} className={`keen-slider__slide ${styles.slide}`}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
            <div className={styles.sliderControls}>
              <button
                className={styles.sliderButton}
                onClick={() => slider.current?.prev()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <img
                  src="/slideButton2.svg"
                  alt="Previous"
                  className={styles.sliderIcon}
                />
              </button>
              <button
                className={styles.sliderButton}
                onClick={() => slider.current?.next()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <img
                  src="/slideButton2.svg"
                  alt="Next"
                  className={`${styles.sliderIcon} ${styles.mirrored}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}