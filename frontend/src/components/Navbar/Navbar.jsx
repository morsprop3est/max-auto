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
      gsap.to(navbarRef.current, { y: -100, duration: 0.5, ease: "power2.out" });
    }
  }, [isNavbarVisible]);

  useEffect(() => {
    interactiveRefs.current.forEach((el) => {
      if (el) {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.1, duration: 0.1 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, duration: 0.1 });
        });
        el.addEventListener("mousedown", () => {
          gsap.to(el, { scale: 0.9, duration: 0.1 });
        });
        el.addEventListener("mouseup", () => {
          gsap.to(el, { scale: 1.1, duration: 0.1 });
        });
      }
    });
  
    const links = document.querySelectorAll(`.${styles.link}`);
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { scale: 1.1, duration: 0.1 });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { scale: 1, duration: 0.1 });
      });
      link.addEventListener("mousedown", () => {
        gsap.to(link, { scale: 0.9, duration: 0.1 });
      });
      link.addEventListener("mouseup", () => {
        gsap.to(link, { scale: 1.1, duration: 0.1 });
      });
  
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1); 
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          gsap.to(window, { scrollTo: { y: targetElement.offsetTop, autoKill: false }, duration: 0.5 });
        }
  
        setIsSidebarOpen(false);
      });
    });
  }, []);

  return (
    <>
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
                width={50}
                height={50}
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
            <a href="#section1" className={styles.link}>
              Головна
            </a>
            <a href="#section2" className={styles.link}>
              Про нас
            </a>
            <a href="#section3" className={styles.link}>
              Наші цифри
            </a>
            <a href="#section3" className={styles.link}>
              Наші послуги
            </a>
            <a href="#section3" className={styles.link}>
              Рекомендуємо в бюджет
            </a>
            <a href="#section3" className={styles.link}>
              Калькулятор
            </a>
            <a href="#section3" className={styles.link}>
              Відгуки
            </a>
            <a href="#section3" className={styles.link}>
              Зв'язатися з нами
            </a>
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