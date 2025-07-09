"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import "../../app/animation.scss";
import { useIsVisible } from "@/hooks/useIsVisible";
import { socialLinks } from "@/data/socialLinks";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbarRef, isVisible] = useIsVisible({ threshold: 0 });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.active : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        ref={navbarRef}
        className={`${styles.navbar} ${isVisible ? "fade-in-top" : styles.invisible}`}
        style={isVisible ? { animationDelay: "1s" } : undefined}
      >
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
              <img
                src="/logo.svg"
                alt="Logo"
                height={40}
                width={40}
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
            {[
              { label: "Головна", href: "#main" },
              { label: "Про нас", href: "#about-us" },
              { label: "Наші цифри", href: "#stats" },
              { label: "Наші послуги", href: "#services" },
              { label: "Військова техніка", href: "#millitary" },
              { label: "Лоти", href: "#dashboard" },
              { label: "Калькулятор", href: "#calculator" },
              { label: "Відгуки", href: "#reviews" },
              { label: "Контакти", href: "#contact-us" }
            ].map((item, index) => (
              <div
                key={index}
                className={`${styles.linkWrapper} scale-hover-text`}
                tabIndex={0}
              >
                <a 
                  href={item.href}
                  className={styles.link}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.bottomBlock}>
            {socialLinks.map((social, index) => (
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