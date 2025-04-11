'use client';

import { useRef } from "react";
import styles from "./Service.module.scss";
import ServiceCard from "./ServiceCard";

export default function Services({ component }) {
  if (!component || !Array.isArray(component)) {
    return <div>No services available</div>;
  }

  const sliderRef = useRef(null);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const servicesData = component
    .filter((item) => item.slug.startsWith("service_h1_"))
    .map((service, index) => ({
      title: service.text,
      description: component.find((item) => item.slug === `service_p1_${index + 1}`)?.text || "",
      photoUrl: service.photoUrl || "",
    }));

  const title = component.find((item) => item.slug === "service_h1")?.text || "";
  const description = component.find((item) => item.slug === "service_p1")?.text || "";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.slider} ref={sliderRef}>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={handlePrev}>
          &lt;
        </button>
        <button className={styles.controlButton} onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}