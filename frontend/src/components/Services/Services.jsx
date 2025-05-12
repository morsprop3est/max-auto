
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./Services.module.scss";
import ServiceCard from "./ServiceCard";
import { useRef, useEffect, useState } from "react";
import { animateScaleUp, animateScaleDown, animatePress, animateInFromBottom } from "../../utils/animation";
import { gsap } from "gsap";

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

  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRefs = useRef([]);
  const controlsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  if (wrapperRef.current) observer.observe(wrapperRef.current);
  return () => observer.disconnect();
}, [isVisible]);


useEffect(() => {
  if (!isVisible) return;

  if (headerRef.current) {
    gsap.set(headerRef.current, { opacity: 0, y: 60 });
  }
  if (descriptionRef.current) {
    gsap.set(descriptionRef.current, { opacity: 0, y: 60 });
  }
  cardRefs.current.forEach((ref) => {
    if (ref) gsap.set(ref, { opacity: 0, y: 80 });
  });
  if (controlsRef.current) {
    gsap.set(controlsRef.current, { opacity: 0, y: 60 });
  }

  if (headerRef.current) {
    animateInFromBottom(headerRef.current, 0.7, 0, 60);
  }
  if (descriptionRef.current) {
    animateInFromBottom(descriptionRef.current, 0.7, 0.15, 60);
  }
  cardRefs.current.forEach((ref, idx) => {
    if (ref) {
      animateInFromBottom(ref, 0.7, 0.2 * (idx + 1), 80);
    }
  });
  if (controlsRef.current) {
    animateInFromBottom(controlsRef.current, 0.7, 0.8, 60);
  }
}, [isVisible]);

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

  if (!isVisible) {
    return <div ref={wrapperRef} style={{ }} />;
  }

  return (
    <div
      className={styles.servicesWrapper}
      ref={wrapperRef}
    >
      <div className="container">
        <div className={styles.serviceWrapper}>
          <div className={styles.header} ref={headerRef}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{sectionTitle}</h1>
            </div>
            <p className={styles.description} ref={descriptionRef}>{sectionDescription}</p>
          </div>

          <div className={styles.slider}>
            <div ref={sliderRef} className={`keen-slider ${styles.keenSlider}`}>
              {servicesData.map((service, index) => (
                <div
                  key={index}
                  className={`keen-slider__slide ${styles.slide}`}
                  ref={el => (cardRefs.current[index] = el)}
                  style={{ opacity: 1, transition: "opacity 0.3s" }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
            <div className={styles.sliderControls} ref={controlsRef}>
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