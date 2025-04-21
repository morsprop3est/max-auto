'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AnimatedLoading.module.scss';

export default function GridAnimation({ onComplete }) {
  const gridRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const logoTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    logoTimeline.to(logoRef.current, {
      y: -20,
      duration: 0.5,
      ease: 'power1.inOut',
    });

    const squares = gridRef.current.querySelectorAll(`.${styles.square}`);
    const timeline = gsap.timeline({
      delay: 0.5, 
      onComplete: () => {
        logoTimeline.kill();
        onComplete(); 
      },
    });

    squares.forEach((square) => {
      timeline.to(
        square,
        {
          opacity: 0,
          duration: 0.5,
          delay: Math.random() * 1.5, 
          ease: 'power3.out',
        },
        0 
      );
    });
  }, [onComplete]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid} ref={gridRef}>
        {Array.from({ length: 600 }).map((_, index) => (
          <div key={index} className={styles.square}></div>
        ))}
      </div>
      <div className={styles.logo} ref={logoRef}>
        <img src="/logo.svg" alt="Logo" />
      </div>
    </div>
  );
}