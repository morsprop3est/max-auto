'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AnimatedLoading.module.scss';

export default function GridAnimation({ onComplete }) {
  const logoRef = useRef(null);

  useEffect(() => {
    const logoTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    logoTimeline.to(logoRef.current, {
      y: -20,
      duration: 0.5,
      ease: 'power1.inOut',
    });

    const timeline = gsap.timeline({
      delay: 0.5, 
      onComplete: () => {
        logoTimeline.kill();
        onComplete(); 
      },
    });
  }, [onComplete]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.logo} ref={logoRef}>
        <img src="/logo.svg" alt="Logo" />
      </div>
    </div>
  );
}