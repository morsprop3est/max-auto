'use client';

import styles from "./Services.module.scss";
import ServiceCard from "./ServiceCard";
import Slider from "../Slider/Slider";
import { useIsVisible } from "@/hooks/useIsVisible";
import "@/app/animation.scss";

export default function Services({ component }) {
  if (!component || !Array.isArray(component)) {
    return <div>No services available</div>;
  }

  const sectionTitle = component.find((item) => item.slug === "service_h1")?.text || "Наші послуги";
  const sectionDescription =
    component.find((item) => item.slug === "service_p1")?.text ||
    "Ми пропонуємо повний комплекс послуг, щоб ви отримали своє авто швидко, вигідно та без зайвих клопотів.";

const servicesData = component
  .filter((item) => /^service_h1_\d+$/.test(item.slug))
  .map((service) => {
    const match = service.slug.match(/^service_h1_(\d+)$/);
    const num = match ? match[1] : null;
    const description = component.find((item) => item.slug === `service_p1_${num}`)?.text || "";
    const photoUrl = `/services/service${num}.jpg` || "/default-preview.svg";
    return {
      title: service.text,
      description,
      photoUrl,
    };
  });

  const [wrapperRef, isVisible] = useIsVisible({ threshold: 0.4 });
  const anim = isVisible ? "fade-in-bottom" : "";
  const invisible = !isVisible ? styles.invisible : "";

  return (
    <div className={styles.servicesWrapper} ref={wrapperRef} id="services">
      <div className="container">
        <div className={`${styles.serviceWrapper} ${anim} ${invisible}`}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{sectionTitle}</h1>
            </div>
            <p className={styles.description}>{sectionDescription}</p>
          </div>

          <div className={styles.slider}>
            <Slider>
              {servicesData.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}