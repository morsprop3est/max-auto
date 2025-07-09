'use client';

import Image from 'next/image';
import styles from './Footer.module.scss';
import { useIsVisible } from "@/hooks/useIsVisible";
import "@/app/animation.scss";
import { socialLinks } from "@/data/socialLinks";

export default function Footer() {
  const [footerRef, isVisible] = useIsVisible({ threshold: 0.1 });
  const invisible = !isVisible ? styles.invisible : "";
  const anim = isVisible ? "fade-in-bottom" : "";
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const contact = document.getElementById("main");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`${styles.footerWrapper} ${anim} ${invisible}`}
      ref={footerRef}
    >
      <div className="container">
        <div className={styles.footerWrapper2}>
          <div className={styles.logoBlock}>
            <Image src="/logo.svg" alt="Logo" className={styles.logo} width={200} height={200} />
          </div>

          <div className={styles.socialBlock}>
            <div className={styles.empty}></div>
            <div className={styles.socialIcons}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                  tabIndex={0}
                >
                  <Image 
                    src={`/socialNetworkIcons/${social.icon}`} 
                    alt={social.alt} 
                    className={styles.icon} 
                    width={32} 
                    height={32} 
                  />
                </a>
              ))}
            </div>
            <div
              className={styles.scrollTop}
              onClick={scrollToTop}
              tabIndex={0}
            >
              <Image src="/scrollTop.svg" alt="Scroll to top" width={32} height={32} />
            </div>
          </div>

          <div className={styles.line}></div>
          <div className={styles.copyright}>
            Maks-Auto {currentYear} © All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}