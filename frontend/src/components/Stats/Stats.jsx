'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.scss";
import { animateInFromLeft, animateScaleUp, animateScaleDown, animatePress, animateRelease } from "@/utils/animation";

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

  const splitValue = (value) => {
    const match = value.match(/^([\d\s.,]+)(.*)$/);
    if (match) {
      return {
        number: match[1].trim(),
        text: match[2].trim(),
      };
    }
    return { number: value, text: "" };
  };

  // GSAP анімації для item
  const handleMouseEnter = (e) => animateScaleUp(e.currentTarget, 1.08, 0.25);
  const handleMouseLeave = (e) => animateScaleDown(e.currentTarget, 1, 0.25);
  const handleMouseDown = (e) => animatePress(e.currentTarget, 0.93, 0.12);
  const handleMouseUp = (e) => animateScaleUp(e.currentTarget, 1.08, 0.25);

  return (
    <div className={`${styles.statsWrapper} ${!isVisible ? styles.hidden : styles.visible}`} ref={statsWrapperRef}>
      <div className="container">
        {statsData.map((stat, index) => {
          const { number, text } = splitValue(stat.value);
          return (
            <div
              key={index}
              className={`${styles.statItem} ${styles.hidden}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.trapezoid}>
                <div className={styles.content}>
                  <div className={styles.valueWrapper}>
                    <h3 className={styles.number}>
                      {number}
                      {text && (
                        <span className={styles.unit}>{text}</span>
                      )}
                    </h3>
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