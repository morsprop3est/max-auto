'use client';

import { useEffect, useRef } from 'react';
import {
  animateInFromLeft,
  animateInFromRight,
  animateInFromBottom,
  animateScaleUp,
  animateScaleDown,
  animatePress,
} from '@/utils/animation';
import styles from './Main.module.scss';
import AnimatedText from '@/components/AnimationComponents/AnimatedText/AnimatedText';
import gsap from 'gsap';
import Image from 'next/image';
import { useNotification } from "@/context/NotificationContext";

export default function Main({ component }) {
  const mainRef = useRef(null);
  const leftBlockRef = useRef(null);
  const trapezoidRef = useRef(null);
  const carImagesRef = useRef(null);
  const buttonRef = useRef(null);
  const socialButtonsRef = useRef([]);
  const carRefs = useRef([]);
  const logoRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const descRef = useRef(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateInFromLeft(leftBlockRef.current, 1, 0.5);
      animateInFromLeft(trapezoidRef.current, 1, 0);
      animateInFromLeft(buttonRef.current, 1, 0.5);

      socialButtonsRef.current.forEach((button, index) => {
        animateInFromBottom(button, 1, 0.2 * (index + 1));
      });

      carRefs.current.forEach((car, index) => {
        animateInFromRight(car, 1, 0.2 * (index + 1));
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const mainData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === 'main_h1')?.text || '',
        subtitle: component.find((item) => item.slug === 'main_h2')?.text || '',
        description: component.find((item) => item.slug === 'main_p1')?.text || '',
        buttonText: component.find((item) => item.slug === 'main_button')?.text || '',
      }
    : {};

  // GSAP анімації для всіх елементів
  const handleScaleEnter = (e) => animateScaleUp(e.currentTarget);
  const handleScaleLeave = (e) => animateScaleDown(e.currentTarget);
  const handleScaleDown = (e) => animatePress(e.currentTarget);
  const handleScaleUp = (e) => animateScaleUp(e.currentTarget);

  const handleButtonClick = (e) => {
    e.preventDefault();
    const contact = document.getElementById("contact-us");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
    addNotification("info", "Заповніть дані, щоб дізнатись більше");
  };

  return (
    <div ref={mainRef} className={styles.mainWrapper} id="main">
      <div className={styles.contentWrapper}>
        <div className={styles.leftBlock} ref={leftBlockRef}>
          <div className={styles.emptyBlock}></div>

          <div className={styles.contentBlock}>
            <Image
              ref={logoRef}
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={150}
              className={styles.logo}
              onMouseEnter={handleScaleEnter}
              onMouseLeave={handleScaleLeave}
              onMouseDown={handleScaleDown}
              onMouseUp={handleScaleUp}
              style={{ cursor: "pointer" }}
            />
            <h1
              ref={h1Ref}
              onMouseEnter={handleScaleEnter}
              onMouseLeave={handleScaleLeave}
              onMouseDown={handleScaleDown}
              onMouseUp={handleScaleUp}
              style={{ cursor: "pointer" }}
            >
              {mainData.title}
            </h1>
            <h2
              ref={h2Ref}
              onMouseEnter={handleScaleEnter}
              onMouseLeave={handleScaleLeave}
              onMouseDown={handleScaleDown}
              onMouseUp={handleScaleUp}
              style={{ cursor: "pointer" }}
            >
              {mainData.subtitle}
            </h2>
            <div
              className={styles.description}
              ref={descRef}
              onMouseEnter={handleScaleEnter}
              onMouseLeave={handleScaleLeave}
              onMouseDown={handleScaleDown}
              onMouseUp={handleScaleUp}
              style={{ cursor: "pointer" }}
            >
              <AnimatedText text={mainData.description} />
            </div>
            <button
              ref={buttonRef}
              className={styles.greenButton}
              onClick={handleButtonClick}
              onMouseEnter={handleScaleEnter}
              onMouseLeave={handleScaleLeave}
              onMouseDown={handleScaleDown}
              onMouseUp={handleScaleUp}
            >
              {mainData.buttonText}
            </button>
          </div>

          <div className={styles.socialBlock}>
            {[
              { href: 'https://facebook.com', icon: 'facebook.svg', alt: 'Facebook' },
              { href: 'https://instagram.com', icon: 'instagram.svg', alt: 'Instagram' },
              { href: 'https://telegram.org', icon: 'telegram.svg', alt: 'Telegram' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => (socialButtonsRef.current[index] = el)}
                onMouseEnter={handleScaleEnter}
                onMouseLeave={handleScaleLeave}
                onMouseDown={handleScaleDown}
                onMouseUp={handleScaleUp}
                style={{ display: "inline-block" }}
              >
                <Image
                  src={`/socialNetworkIcons/${social.icon}`}
                  alt={social.alt}
                  width={32}
                  height={32}
                />
              </a>
            ))}
          </div>
        </div>

        <div ref={carImagesRef} className={styles.carImages}>
          <div
            className={styles.car1}
            ref={(el) => (carRefs.current[0] = el)}
            onMouseEnter={handleScaleEnter}
            onMouseLeave={handleScaleLeave}
            onMouseDown={handleScaleDown}
            onMouseUp={handleScaleUp}
            style={{ cursor: "pointer" }}
          >
            <Image src="/main/car1.png" alt="Car 1" width={800} height={500} />
          </div>
          <div
            className={styles.car2}
            ref={(el) => (carRefs.current[1] = el)}
            onMouseEnter={handleScaleEnter}
            onMouseLeave={handleScaleLeave}
            onMouseDown={handleScaleDown}
            onMouseUp={handleScaleUp}
            style={{ cursor: "pointer" }}
          >
            <Image src="/main/car2.png" alt="Car 2" width={800} height={500} />
          </div>
        </div>
      </div>

      <div ref={trapezoidRef} className={styles.trapezoid}>
        <Image
          src="/main/background.webp"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className={styles.trapezoidImage}
        />
      </div>
    </div>
  );
}