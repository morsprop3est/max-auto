"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navbarRef = useRef(null);
  const interactiveRefs = useRef([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    interactiveRefs.current.forEach((el) => {
      if (el) {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.1, duration: 0.2 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, duration: 0.2 });
        });
        el.addEventListener("mousedown", () => {
          gsap.to(el, { scale: 0.9, duration: 0.1 });
        });
        el.addEventListener("mouseup", () => {
          gsap.to(el, { scale: 1.1, duration: 0.2 });
        });
      }
    });
  }, []);

  return (
    <>
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.active : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div ref={navbarRef} className={styles.navbar}>
        <div
          className={styles.burger}
          onClick={toggleSidebar}
          ref={(el) => (interactiveRefs.current[0] = el)}
        >
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </div>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.topBlock}>
            <div className={styles.logo}>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                ref={(el) => (interactiveRefs.current[1] = el)}
              />
            </div>
            <div
              className={styles.close}
              onClick={toggleSidebar}
              ref={(el) => (interactiveRefs.current[2] = el)}
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
                  className={styles.linkWrapper}
                  ref={(el) => (interactiveRefs.current[index + 3] = el)}
                >
                  <a href={`#section${index + 1}`} className={styles.link}>
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
                ref={(el) => (interactiveRefs.current[index + 7] = el)}
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