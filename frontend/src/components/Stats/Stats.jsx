'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.scss";
import { animateInFromLeft } from "@/utils/animation";

export default function Stats({ component }) {
  const [isVisible, setIsVisible] = useState(false);
  const statsWrapperRef = useRef(null);

  const statsData = Array.isArray(component)
    ? [
        {
          value: component.find((item) => item.slug === "stat_h1_1")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_1")?.text || "",
        },
        {
          value: component.find((item) => item.slug === "stat_h1_2")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_2")?.text || "",
        },
        {
          value: component.find((item) => item.slug === "stat_h1_3")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_3")?.text || "",
        },
        {
          value: component.find((item) => item.slug === "stat_h1_4")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_4")?.text || "",
        },
      ]
    : [];

  if (!statsData.length) return null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            const statItems = statsWrapperRef.current.querySelectorAll(`.${styles.statItem}`);
            statItems.forEach((item, index) => {
              animateInFromLeft(item, 1, 0.2 * index); 
            });

            observer.disconnect(); 
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsWrapperRef.current) {
      observer.observe(statsWrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.statsWrapper} ${!isVisible ? styles.hidden : styles.visible}`} ref={statsWrapperRef}>
      <div className="container">
        {statsData.map((stat, index) => {
          return (
            <div key={index} className={`${styles.statItem} ${styles.hidden}`}>
              <div className={styles.trapezoid}>
                <div className={styles.content}>
                  <div className={styles.valueWrapper}>
                    <h3 className={styles.number}>{stat.value}</h3>
                  </div>
                  <p className={styles.name}>{stat.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}