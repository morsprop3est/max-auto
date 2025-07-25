'use client';

import { useIsVisible } from "@/hooks/useIsVisible";
import { useAdaptive } from "@/context/AdaptiveContext";
import styles from "./AboutUs.module.scss";
import Image from "next/image";
import AnimatedText from "../AnimationComponents/AnimatedText/AnimatedText";
import "@/app/animation.scss";
import React, { useState, useEffect } from "react";

export default function AboutUs({ component, onLoaded }) {
  const aboutUsData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === "about_us_h1")?.text || "",
        description: component.find((item) => item.slug === "about_us_p1")?.text || "",
        advantage1: component.find((item) => item.slug === "about_us_stat_1")?.text || "",
        advantage2: component.find((item) => item.slug === "about_us_stat_2")?.text || "",
        advantage3: component.find((item) => item.slug === "about_us_stat_3")?.text || "",
        advantage4: component.find((item) => item.slug === "about_us_stat_4")?.text || "",
      }
    : {};

  if (onLoaded) onLoaded();

  const [aboutRef, isVisible] = useIsVisible({ threshold: 0.5 });
  const { device } = useAdaptive();

  const animLeft = isVisible ? (device === "desktop" ? "fade-in-left" : "fade-in-bottom") : "";
  const animRight = isVisible ? (device === "desktop" ? "fade-in-right" : "fade-in-bottom") : "";
  const animBottom = isVisible ? "fade-in-bottom" : "";
  const invisible = !isVisible ? styles.invisible : "";

  return (
    <div className={styles.aboutUsWrapper} ref={aboutRef} id = "about-us">
      <div className="container">
        <div className={styles.aboutUsWrapper2}>
          <div className={styles.leftBlock}>
            <div className={`${animLeft} ${invisible} ${styles.titleWrapper}`}>
              <div className={styles.line}></div>
              <h1
                className={styles.title}
                style={isVisible ? { animationDelay: '0.2s' } : {}}
              >
                <AnimatedText text={aboutUsData.title} />
              </h1>
            </div>
            <div className={styles.mobileIconsBlock}>
              <div
                className={`${styles.mobileIconWrap} ${animLeft} ${invisible}`}
                style={isVisible ? { animationDelay: '0.2s' } : {}}
              >
                <video
                  className={styles.mobileIconVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/video/avtovoz.jpg"
                  tabIndex={0}
                >
                  <source src="/video/avtovoz.mp4" type="video/mp4" />
                  Ваш браузер не підтримує відео.
                </video>
                <div className={`${styles.hoverHint} ${isVisible ? styles.visible : ""}`}>
                  <img src="/mouseScroll.svg" alt="Наведіться" className={styles.hoverHintIcon} />
                  <span>Наведіться курсором на відео</span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.description} ${animLeft} ${invisible}`}
              style={isVisible ? { animationDelay: '0.4s' } : {}}
            >
              <AnimatedText text={aboutUsData.description} />
            </div>
            <h2
              className={`${animLeft} ${invisible} ${styles.advantagesTitle}`}
              style={isVisible ? { animationDelay: '0.4s' } : {}}
            >
              Наші переваги:
            </h2>
            <div className={styles.advantages}>
              {[aboutUsData.advantage1, aboutUsData.advantage2, aboutUsData.advantage3, aboutUsData.advantage4].map((adv, idx) => (
                <div
                  key={idx}
                  className={`${styles.advantageItem} ${animBottom} scale-hover-text ${invisible}`}
                  style={isVisible ? { animationDelay: `${0.5 + idx * 0.1}s`, cursor: "pointer" } : { cursor: "pointer" }}
                  tabIndex={0}
                >
                  <div className={styles.icon}>
                    <img
                      src={`/aboutUsIcons/icon${idx + 1}.svg`}
                      alt={`Advantage ${idx + 1}`}
                      width={40}
                      height={idx === 3 ? 24 : 32}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                  <p className={styles.advantageText}>{adv}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.rightBlock} ${invisible}`}>
            <div
              className={`${styles.trapezoid} ${styles.trapezoid1} ${animRight}`}
              tabIndex={0}
              style={isVisible ? { animationDelay: '0.2s' } : {}}
            >
              <video
                className={styles.trapezoidVideo}
                autoPlay
                loop
                muted
                playsInline
                poster="/video/avtovoz.jpg"
                tabIndex={0}
              >
                <source src="/video/avtovoz.mp4" type="video/mp4" />
                Ваш браузер не підтримує відео.
              </video>
            </div>
            <div className={`${styles.hoverHint} ${isVisible ? styles.visible : ""}`}>
              <img src="/mouseScroll.svg" alt="Наведіться" className={styles.hoverHintIcon} />
              <span>Наведіться курсором на відео</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}