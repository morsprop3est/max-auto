'use client';

import styles from './ContactUs.module.scss';
import { useIsVisible } from "@/hooks/useIsVisible";
import { sendOrder } from "@/api/orders";
import { useNotification } from "@/context/NotificationContext";
import { useRef, useState } from "react";
import "@/app/animation.scss";

export default function ContactUs() {
  const [wrapperRef, isVisible] = useIsVisible({ threshold: 0.3 });
  const invisible = !isVisible ? styles.invisible : "";
  const anim = isVisible ? "fade-in-bottom" : "";

  // refs для інпутів
  const nameRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim();
    const phone = phoneRef.current?.value.trim();
    const comment = messageRef.current?.value.trim();

    if (!name || !phone) {
      addNotification("error", "Вкажіть ім'я та номер телефону!");
      return;
    }

    setLoading(true);
    try {
      await sendOrder({ name, phone, comment });
      addNotification("success", "Успішно подано, очікуйте — з вами зв'яжуться!");
      if (nameRef.current) nameRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";
      if (messageRef.current) messageRef.current.value = "";
    } catch (err) {
      addNotification("error", err.message || "Не вдалося відправити заявку");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.contactUsWrapper} ${anim} ${invisible}`}
      ref={wrapperRef}
    >
      <div className="container">
        <div className={styles.contactUsWrapper2} id="contact-us">
          <div className={styles.leftBlock}>
            <h1
              className={`fade-in-bottom ${styles.title}`}
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
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  className={`fade-in-bottom ${styles.input}`}
                  style={isVisible ? { animationDelay: "0.45s" } : {}}
                  ref={nameRef}
                  disabled={loading}
                />
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  className={`fade-in-bottom ${styles.input}`}
                  style={isVisible ? { animationDelay: "0.6s" } : {}}
                  ref={phoneRef}
                  disabled={loading}
                />
              </div>
              <div className={styles.fullWidthInput}>
                <input
                  type="text"
                  placeholder="Ваше повідомлення"
                  className={`fade-in-bottom ${styles.input}`}
                  style={isVisible ? { animationDelay: "0.75s" } : {}}
                  ref={messageRef}
                  disabled={loading}
                />
              </div>
              <button
                className={`fade-in-bottom ${styles.submitButton}`}
                type="submit"
                style={isVisible ? { animationDelay: "0.9s" } : {}}
                disabled={loading}
              >
                {loading ? "Відправка..." : "Відправити"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}