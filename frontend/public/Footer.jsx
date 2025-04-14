'use client';

import styles from "./Footer.module.scss";
import Logo from "../../../backend/public/logo.svg"; 
import FacebookIcon from "../../../backend/public/socialNetworkIcons/facebook.svg";
import InstagramIcon from "../../../backend/public/socialNetworkIcons/instagram.svg";
import TelegramIcon from "../../../backend/public/socialNetworkIcons/telegram.svg";
import ScrollTopIcon from "../../../backend/public/scrollTop.svg";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <img src={Logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.socialBlock}>
          <div className={styles.empty}></div>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook" className={styles.icon} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram" className={styles.icon} />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <img src={TelegramIcon} alt="Telegram" className={styles.icon} />
            </a>
          </div>
          <div className={styles.scrollTop} onClick={scrollToTop}>
            <img src={ScrollTopIcon} alt="Scroll to top" />
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