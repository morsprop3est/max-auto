'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './Footer.module.scss';

export default function Footer() {
  const socialIconsRef = useRef([]);
  const scrollTopRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    socialIconsRef.current.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, { scale: 1.1, duration: 0.2 });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { scale: 1, duration: 0.2 });
      });
    });

    if (scrollTopRef.current) {
      scrollTopRef.current.addEventListener('mouseenter', () => {
        gsap.to(scrollTopRef.current, { scale: 1.1, duration: 0.2 });
      });

      scrollTopRef.current.addEventListener('mouseleave', () => {
        gsap.to(scrollTopRef.current, { scale: 1, duration: 0.2 });
      });
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <Image src="/logo.svg" alt="Logo" className={styles.logo} width={200} height={200} />
        </div>

        <div className={styles.socialBlock}>
          <div className={styles.empty}></div>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (socialIconsRef.current[0] = el)}
            >
              <Image src="/socialNetworkIcons/facebook.svg" alt="Facebook" className={styles.icon} width={32} height={32} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (socialIconsRef.current[1] = el)}
            >
              <Image src="/socialNetworkIcons/instagram.svg" alt="Instagram" className={styles.icon} width={32} height={32} />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (socialIconsRef.current[2] = el)}
            >
              <Image src="/socialNetworkIcons/telegram.svg" alt="Telegram" className={styles.icon} width={32} height={32} />
            </a>
          </div>
          <div
            className={styles.scrollTop}
            onClick={scrollToTop}
            ref={scrollTopRef}
          >
            <Image src="/scrollTop.svg" alt="Scroll to top" width={32} height={32} />
          </div>
        </div>

        <div className={styles.line}></div>
        <div className={styles.copyright}>
          Maks-Auto © All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}