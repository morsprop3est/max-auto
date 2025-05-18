'use client';

import styles from "./Services.module.scss";
import ServiceCard from "./ServiceCard";
import Slider from "../Slider/Slider";

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
      return {
        title: service.text,
        description,
        photoUrl: service.photoUrl,
      };
    });

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
            <Slider cardsPerView={3}>
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