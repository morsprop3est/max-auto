'use client';

import styles from "./Millitary.module.scss";
import { useIsVisible } from "@/hooks/useIsVisible";
import Slider from "../Slider/Slider";
import "@/app/animation.scss";

export default function Millitary({ component }) {
  const millitaryData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === "millitary_h1")?.text || "",
        text: component.find((item) => item.slug === "millitary_p1")?.text || "",
      }
    : {};

  const sliderImages = Array.from({ length: 5 }, (_, i) => `/millitary/millitary${i + 1}.jpg`);

  const [wrapperRef, isVisible] = useIsVisible({ threshold: 0.4 });

  const anim = isVisible ? "fade-in-bottom" : "";
  const invisible = !isVisible ? styles.invisible : "";


  return (
    <div className={styles.millitaryWrapper} ref={wrapperRef}>
      <div className="container">
        <div className={styles.millitaryWrapper2}>
          <div className={`${styles.topBlock} ${anim} ${invisible}`}>
            <div className={styles.titleBlock}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{millitaryData.title}</h1>
            </div>
            <img
              src="/millitary-vehicle.png"
              alt="Military Vehicle"
              className={styles.image}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={`${styles.bottomBlock} ${anim} ${invisible}`}>
            <p className={styles.text}>{millitaryData.text}</p>
            {/* Якщо потрібна кнопка, розкоментуйте:
            <button
              className={styles.button}
              onClick={handleButtonClick}
            >
              Дізнатися більше
            </button>
            */}
            <div className={styles.slider}>
            <Slider>
              {sliderImages.map((img, idx) => (
                <div className={styles.slide} key={idx}>
                  <img
                    src={img}
                    alt={`military ${idx + 1}`}
                    className={styles.sliderImage}
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}