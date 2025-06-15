'use client';

import styles from './Main.module.scss';
import AnimatedText from '@/components/AnimationComponents/AnimatedText/AnimatedText';
import Image from 'next/image';
import { useNotification } from "@/context/NotificationContext";
import { useAdaptive } from "@/context/AdaptiveContext";
import { useIsVisible } from "@/hooks/useIsVisible";
import ScrollMouse from './ScrollMouse';
import '../../app/animation.scss';

export default function Main({ component, onLoaded }) {
  const { addNotification } = useNotification();
  const { device } = useAdaptive();
  const [mainRef, isVisible] = useIsVisible();


  const mainData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === 'main_h1')?.text || '',
        subtitle: component.find((item) => item.slug === 'main_h2')?.text || '',
        description: component.find((item) => item.slug === 'main_p1')?.text || '',
        buttonText: component.find((item) => item.slug === 'main_button')?.text || '',
      }
    : {};

  const handleButtonClick = (e) => {
    e.preventDefault();
    const contact = document.getElementById("contact-us");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
    addNotification("info", "Заповніть дані, щоб дізнатись більше");
  };

const animationClassLeft = isVisible ? (device === "desktop" ? "fade-in-left" : "fade-in-bottom") : "";
const animationClassRight = isVisible ? (device === "desktop" ? "fade-in-right" : "fade-in-bottom") : "";
const animationClassBottom = isVisible ? "fade-in-bottom" : "";

  return (
    <div className={`${styles.mainWrapper} ${animationClassLeft} ${!isVisible ? styles.invisible : ""}`} id="main" ref={mainRef}>
      <div className={styles.contentWrapper}>
        <div className={`${styles.leftBlock} ${animationClassLeft}`}>
          <div className={styles.emptyBlock}></div>

          <div className={`${styles.contentBlock} ${animationClassLeft}`} style={{ animationDelay: '0.2s' }}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={150}
              className={`${styles.logo} scale-in scale-hover`}
              style={{ cursor: "pointer", animationDelay: '0.3s' }}
            />
            <h1
              className={`${animationClassLeft} scale-hover-text`}
              style={{ cursor: "pointer", animationDelay: '0.4s' }}
            >
              {mainData.title}
            </h1>
            <h2
              className={`${animationClassLeft} scale-hover-text`}
              style={{ cursor: "pointer", animationDelay: '0.5s' }}
            >
              {mainData.subtitle}
            </h2>
            <div
              className={`${styles.description} ${animationClassBottom} scale-hover-text`}
              style={{ cursor: "pointer", animationDelay: '0.6s' }}
            >
              <AnimatedText text={mainData.description} />
            </div>
            <button
              className={`${styles.greenButton} ${animationClassBottom} scale-hover-text`}
              onClick={handleButtonClick}
              style={{ animationDelay: '0.7s' }}
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
                className={`${styles.socialLink} ${animationClassBottom}`}
                style={{ display: "inline-block", animationDelay: `${0.8 + index * 0.1}s` }}
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

        <div className={styles.carImages}>
          <div
            className={`${styles.car1} scale-hover`}
            style={{ cursor: "pointer" }}
          >
            <Image src="/main/car1.png" alt="Car 1" width={800} height={500} />
          </div>
          <div
            className={`${styles.car2} scale-hover`}
            style={{ cursor: "pointer" }}
          >
            <Image src="/main/car2.png" alt="Car 2" width={800} height={500} />
          </div>
        </div>
      </div>

      <div className={`${styles.trapezoid} ${animationClassLeft}`} style={{ animationDelay: '0.1s' }}>
        <Image
          src="/main/background_optimized.webp"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={25}
          className={styles.trapezoidImage}
        />
      </div>
      <ScrollMouse mainRef={mainRef} />
    </div>
  );
}