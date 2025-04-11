"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navbarRef = useRef(null);
  const closeRef = useRef(null);
  const interactiveRefs = useRef([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY) {
          setIsNavbarVisible(false);
        } else {
          setIsNavbarVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isNavbarVisible) {
      gsap.to(navbarRef.current, { y: 0, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(navbarRef.current, { y: -100, duration: 0.25, ease: "power2.out" });
    }
  }, [isNavbarVisible]);

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
          ref={(el) => (interactiveRefs.current[1] = el)}
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
                ref={(el) => (interactiveRefs.current[2] = el)}
              />
            </div>
            <div
              className={styles.close}
              onClick={toggleSidebar}
              ref={(el) => (interactiveRefs.current[3] = el)}
            >
              <div className={styles.closeLine1}></div>
              <div className={styles.closeLine2}></div>
            </div>
          </div>

          <div className={styles.centerBlock}>
            <div
              className={styles.linkWrapper}
              ref={(el) => (interactiveRefs.current[3] = el)}
            >
              <a href="#section1" className={styles.link}>
                Головна
              </a>
            </div>
            <div
              className={styles.linkWrapper}
              ref={(el) => (interactiveRefs.current[4] = el)}
            >
              <a href="#section2" className={styles.link}>
                Про нас
              </a>
            </div>
            <div
              className={styles.linkWrapper}
              ref={(el) => (interactiveRefs.current[5] = el)}
            >
              <a href="#section3" className={styles.link}>
                Наші цифри
              </a>
            </div>
            <div
              className={styles.linkWrapper}
              ref={(el) => (interactiveRefs.current[6] = el)}
            >
              <a href="#section4" className={styles.link}>
                Наші послуги
              </a>
            </div>
          </div>

          <div className={styles.bottomBlock}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (interactiveRefs.current[4] = el)}
            >
              <Image
                src="/socialNetworkIcons/facebook.svg"
                alt="Facebook"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (interactiveRefs.current[5] = el)}
            >
              <Image
                src="/socialNetworkIcons/instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (interactiveRefs.current[6] = el)}
            >
              <Image
                src="/socialNetworkIcons/telegram.svg"
                alt="Telegram"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}