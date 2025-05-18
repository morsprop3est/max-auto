"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import "../../app/animation.scss";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.active : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div ref={navbarRef} className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navbarWrapper}>
            <div
              className={`${styles.burger} scale-hover`}
              onClick={toggleSidebar}
              tabIndex={0}
            >
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
              <div className={styles.line3}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.topBlock}>
            <div className={`${styles.logo} scale-hover`}>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
              />
            </div>
            <div
              className={`${styles.close} scale-hover`}
              onClick={toggleSidebar}
              tabIndex={0}
            >
              <div className={styles.closeLine1}></div>
              <div className={styles.closeLine2}></div>
            </div>
          </div>

          <div className={styles.centerBlock}>
            {["Головна", "Про нас", "Наші цифри", "Наші послуги"].map(
              (label, index) => (
                <div
                  key={index}
                  className={`${styles.linkWrapper} scale-hover-text`}
                  tabIndex={0}
                >
                  <a 
                    href={`#section${index + 1}`} 
                    className={styles.link}
                    onClick={() => setIsSidebarOpen(false)}
                    >
                    {label}
                  </a>
                </div>
              )
            )}
          </div>

          <div className={styles.bottomBlock}>
            {[
              { href: "https://facebook.com", icon: "facebook.svg", alt: "Facebook" },
              { href: "https://instagram.com", icon: "instagram.svg", alt: "Instagram" },
              { href: "https://telegram.org", icon: "telegram.svg", alt: "Telegram" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="scale-hover"
                tabIndex={0}
                onClick={() => setIsSidebarOpen(false)}
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
      </div>
    </>
  );
}