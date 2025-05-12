'use client';

import { useEffect, useState, useRef } from "react";
import styles from "./AboutUs.module.scss";
import Image from "next/image";
import AnimatedText from "../AnimationComponents/AnimatedText/AnimatedText";
import { animateInFromLeft, animateInFromRight, animateScaleUp, animateScaleDown, animatePress, animateRelease } from "@/utils/animation";

export default function AboutUs({ component }) {
  const [isVisible, setIsVisible] = useState(false);

  const aboutUsData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === "about_us_h1")?.text || "",
        description: component.find((item) => item.slug === "about_us_p1")?.text || "",
        image1: component.find((item) => item.slug === "about_us_image1")?.photoUrl || "",
        image2: component.find((item) => item.slug === "about_us_image2")?.photoUrl || "",
        advantage1: component.find((item) => item.slug === "about_us_stat_1")?.text || "",
        advantage2: component.find((item) => item.slug === "about_us_stat_2")?.text || "",
        advantage3: component.find((item) => item.slug === "about_us_stat_3")?.text || "",
        advantage4: component.find((item) => item.slug === "about_us_stat_4")?.text || "",
      }
    : {};

  const leftBlockRef = useRef(null);
  const rightBlockRef = useRef(null);

  const advantageRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateInFromLeft(leftBlockRef.current, 1, 0);

            const containers = rightBlockRef.current.querySelectorAll(`.${styles.trapezoid}`);
            containers.forEach((container, index) => {
              animateInFromRight(container, 1, 0.2 * index);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (leftBlockRef.current) observer.observe(leftBlockRef.current);
    if (rightBlockRef.current) observer.observe(rightBlockRef.current);

    return () => observer.disconnect();
  }, [isVisible]);

  const handleMouseEnter = (ref) => animateScaleUp(ref.current, 1.08, 0.25);
  const handleMouseLeave = (ref) => animateScaleDown(ref.current, 1, 0.25);
  const handleMouseDown = (ref) => animatePress(ref.current, 0.93, 0.12);
  const handleMouseUp = (ref) => animateScaleUp(ref.current, 1.08, 0.25);

  return (
    <div className={styles.aboutUsWrapper}>
      <div className="container">
        <div className={styles.aboutUsWrapper2}>
          <div className={`${styles.leftBlock} ${!isVisible ? styles.hidden : styles.visible}`} ref={leftBlockRef}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>
                <AnimatedText text={aboutUsData.title} />
              </h1>
            </div>
            <div className={styles.description}>
              <AnimatedText text={aboutUsData.description} />
            </div>
            <h2 className={styles.advantagesTitle}>Наші переваги:</h2>
            <div className={styles.advantages}>
              {[aboutUsData.advantage1, aboutUsData.advantage2, aboutUsData.advantage3, aboutUsData.advantage4].map((adv, idx) => (
                <div
                  key={idx}
                  className={styles.advantageItem}
                  ref={advantageRefs[idx]}
                  onMouseEnter={() => handleMouseEnter(advantageRefs[idx])}
                  onMouseLeave={() => handleMouseLeave(advantageRefs[idx])}
                  onMouseDown={() => handleMouseDown(advantageRefs[idx])}
                  onMouseUp={() => handleMouseUp(advantageRefs[idx])}
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.icon}>
                    <Image
                      src={`/aboutUsIcons/icon${idx + 1}.svg`}
                      alt={`Advantage ${idx + 1}`}
                      width={40}
                      height={idx === 3 ? 24 : 32}
                    />
                  </div>
                  <p className={styles.advantageText}>{adv}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.rightBlock} ${!isVisible ? styles.hidden : styles.visible}`} ref={rightBlockRef}>
            <div
              className={`${styles.trapezoid} ${styles.trapezoid1}`}
              ref={image1Ref}
              onMouseEnter={() => handleMouseEnter(image1Ref)}
              onMouseLeave={() => handleMouseLeave(image1Ref)}
              onMouseDown={() => handleMouseDown(image1Ref)}
              onMouseUp={() => handleMouseUp(image1Ref)}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <img
                src={aboutUsData.image1}
                alt="About Us 1"
                className={styles.trapezoidImage}
              />
            </div>
            <div
              className={`${styles.trapezoid} ${styles.trapezoid2}`}
              ref={image2Ref}
              onMouseEnter={() => handleMouseEnter(image2Ref)}
              onMouseLeave={() => handleMouseLeave(image2Ref)}
              onMouseDown={() => handleMouseDown(image2Ref)}
              onMouseUp={() => handleMouseUp(image2Ref)}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <img
                src={aboutUsData.image2}
                alt="About Us 2"
                className={styles.trapezoidImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}