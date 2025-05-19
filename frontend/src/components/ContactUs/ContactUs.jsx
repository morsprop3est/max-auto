'use client';

import styles from './ContactUs.module.scss';
import { useIsVisible } from "@/hooks/useIsVisible";
import "@/app/animation.scss";

export default function ContactUs() {
  const [wrapperRef, isVisible] = useIsVisible({ threshold: 0.3 });
  const invisible = !isVisible ? styles.invisible : "";
  const anim = isVisible ? "fade-in-bottom" : "";

  return (
    <div
      className={`${styles.contactUsWrapper} ${anim} ${invisible}`}
      ref={wrapperRef}
    >
      <div className="container">
        <div className={styles.contactUsWrapper2} id="contact-us">
          <div className={styles.leftBlock}>
            <h1
              className={`fade-in- ${styles.title}`}
              style={isVisible ? { animationDelay: "0.15s" } : {}}
            >
              Залишайте заявку
            </h1>
            <p
              className={`fade-in-bottom`}
              style={isVisible ? { animationDelay: "0.3s" } : {}}
            >
              Залиште заявку, і наші фахівці зв’яжуться з вами для консультації найближчим часом.
            </p>
          </div>
          <div className={styles.rightBlock}>
            <form className={styles.form}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  className={`fade-in-bottom ${styles.input}`}
                  style={isVisible ? { animationDelay: "0.45s" } : {}}
                />
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  className={`fade-in-bottom ${styles.input}`}
                  style={isVisible ? { animationDelay: "0.6s" } : {}}
                />
              </div>
              <div className={styles.fullWidthInput}>
                <input
                  type="text"
                  placeholder="Ваше повідомлення"
                  className={`fade-in-bottom ${styles.input}`}
                  style={isVisible ? { animationDelay: "0.75s" } : {}}
                />
              </div>
              <button
                className={`fade-in-bottom ${styles.submitButton}`}
                type="submit"
                style={isVisible ? { animationDelay: "0.9s" } : {}}
              >
                Відправити
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}