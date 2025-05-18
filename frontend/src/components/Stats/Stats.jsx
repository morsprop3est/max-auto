'use client';

import { useIsVisible } from "@/hooks/useIsVisible";
import { useAdaptive } from "@/context/AdaptiveContext";
import styles from "./Stats.module.scss";

export default function Stats({ component }) {
  const { device } = useAdaptive();
  const [statsRef, isVisible] = useIsVisible({ threshold: 0.5 });

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

  return (
    <div
      className={`${styles.statsWrapper} ${isVisible ? styles.visible : styles.invisible}`}
      ref={statsRef}
    >
      <div className="container">
        <div className={styles.wrapper}>
          {statsData.map((stat, index) => {
            const { number, text } = splitValue(stat.value);
            const animationClass = isVisible
              ? device === "mobile"
                ? "fade-in-top"
                : "fade-in-left"
              : "";
            return (
              <div
                key={index}
                className={`${styles.statItem} ${animationClass} ${!isVisible ? styles.invisible : ""}`}
                tabIndex={0}
                style={{ cursor: "pointer", animationDelay: `${0.2 * index}s` }}
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
    </div>
  );
}