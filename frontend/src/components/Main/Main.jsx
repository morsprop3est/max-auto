'use client';

import { useEffect, useRef } from 'react';
import {
  animateInFromLeft,
  animateInFromRight,
  animateInFromBottom,
} from '@/utils/animation';
import styles from './Main.module.scss';
import AnimatedText from '@/components/AnimationComponents/AnimatedText/AnimatedText';
import gsap from 'gsap';
import Image from 'next/image';

export default function Main({ component }) {
  const mainRef = useRef(null);
  const leftBlockRef = useRef(null);
  const trapezoidRef = useRef(null);
  const carImagesRef = useRef(null);
  const buttonRef = useRef(null);
  const socialButtonsRef = useRef([]); 
  const carRefs = useRef([]); 

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

  return (
    <div ref={mainRef} className={styles.mainWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftBlock} ref={leftBlockRef}>
          <div className={styles.emptyBlock}></div>

          <div className={styles.contentBlock}>
            <Image src="/logo.svg" alt="Logo" width={150} height={150} className={styles.logo} />
            <h1>{mainData.title}</h1>
            <h2>{mainData.subtitle}</h2>
            <div className={styles.description}>
              <AnimatedText text={mainData.description} />
            </div>
            <button ref={buttonRef} className={styles.greenButton}>
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
          >
            <Image src="/main/car1.png" alt="Car 1" width={800} height={500} />
          </div>
          <div
            className={styles.car2}
            ref={(el) => (carRefs.current[1] = el)} 
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