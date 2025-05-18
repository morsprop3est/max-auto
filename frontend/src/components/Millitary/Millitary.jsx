'use client';

import styles from "./Millitary.module.scss";
import { useRef, useEffect, useState } from "react";
import { animateInFromBottom, animateScaleUp, animateScaleDown, animatePress } from "../../utils/animation";
import { gsap } from "gsap";
import { useNotification } from "@/context/NotificationContext";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Millitary({ component }) {
  const millitaryData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === "millitary_h1")?.text || "",
        text: component.find((item) => item.slug === "millitary_p1")?.text || "",
      }
    : {};

  const sliderImages = [
    "/military/slider1.jpg",
    "/military/slider2.jpg",
    "/military/slider3.jpg",
    "/military/slider4.jpg",
    "/military/slider5.jpg",
  ];

  const wrapperRef = useRef(null);
  const titleBlockRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const sliderBlockRef = useRef(null); 
  const [isVisible, setIsVisible] = useState(false);
  const { addNotification } = useNotification();

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 20,
    },
  });
  const sliderCardRefs = useRef([]);
  const sliderControlsRef = useRef(null);

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

    if (titleBlockRef.current) gsap.set(titleBlockRef.current, { opacity: 0, y: 60 });
    if (imageRef.current) gsap.set(imageRef.current, { opacity: 0, y: 60 });
    if (textRef.current) gsap.set(textRef.current, { opacity: 0, y: 60 });
    if (buttonRef.current) gsap.set(buttonRef.current, { opacity: 0, y: 60 });
    if (sliderBlockRef.current) gsap.set(sliderBlockRef.current, { opacity: 0, y: 60 });
    if (sliderControlsRef.current) gsap.set(sliderControlsRef.current, { opacity: 0, y: 60 });

    if (titleBlockRef.current) animateInFromBottom(titleBlockRef.current, 0.7, 0, 60);
    if (imageRef.current) animateInFromBottom(imageRef.current, 0.7, 0.2, 60);
    if (textRef.current) animateInFromBottom(textRef.current, 0.7, 0.4, 60);
    if (buttonRef.current) animateInFromBottom(buttonRef.current, 0.7, 0.6, 60);
    if (sliderBlockRef.current) animateInFromBottom(sliderBlockRef.current, 0.7, 0.8, 60);
    if (sliderControlsRef.current) animateInFromBottom(sliderControlsRef.current, 0.7, 1.1, 60);
  }, [isVisible]);

  const handleMouseEnter = (e) => animateScaleUp(e.currentTarget);
  const handleMouseLeave = (e) => animateScaleDown(e.currentTarget);
  const handleMouseDown = (e) => animatePress(e.currentTarget);
  const handleMouseUp = (e) => animateScaleUp(e.currentTarget);

  const handleImageMouseEnter = (e) => animateScaleUp(e.currentTarget);
  const handleImageMouseLeave = (e) => animateScaleDown(e.currentTarget);
  const handleImageMouseDown = (e) => animatePress(e.currentTarget);
  const handleImageMouseUp = (e) => animateScaleUp(e.currentTarget);

  const handleButtonClick = (e) => {
    e.preventDefault();
    const contact = document.getElementById("contact-us");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
    addNotification("info", "Заповніть дані, щоб дізнатись більше");
  };

  if (!isVisible) {
    return <div ref={wrapperRef} style={{ minHeight: 400 }} />;
  }

  return (
    <div className={styles.millitaryWrapper} ref={wrapperRef}>
      <div className="container">
        <div className={styles.millitaryWrapper2}>
          <div className={styles.topBlock}>
            <div className={styles.titleBlock} ref={titleBlockRef}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{millitaryData.title}</h1>
            </div>
            <img
              ref={imageRef}
              src="/millitary-vehicle.png"
              alt="Military Vehicle"
              className={styles.image}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
              onMouseDown={handleImageMouseDown}
              onMouseUp={handleImageMouseUp}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.bottomBlock}>
            <p className={styles.text} ref={textRef}>{millitaryData.text}</p>
            {/* <button
              className={styles.button}
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={handleButtonClick}
            >
              Дізнатися більше
            </button> */}


            <div className={styles.slider} ref={sliderBlockRef}>
              <div ref={sliderRef} className={`keen-slider ${styles.keenSlider}`}>
              {sliderImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`keen-slider__slide ${styles.slide}`}
                  ref={el => (sliderCardRefs.current[idx] = el)}
                  style={{ opacity: 1, transition: "opacity 0.3s", cursor: "pointer" }}
                >
                  <img
                    src={img}
                    alt={`military ${idx + 1}`}
                    className={styles.sliderImage}
                    style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.sliderControls} ref={sliderControlsRef}>
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
    </div>
  );
}