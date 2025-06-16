'use client';

import styles from './ContactUs.module.scss';
import { useIsVisible } from "@/hooks/useIsVisible";
import { sendOrder } from "@/api/orders";
import { useNotification } from "@/context/NotificationContext";
import { useRef, useState } from "react";
import "@/app/animation.scss";
import { useUTM } from "@/context/UTMContext";

export default function ContactUs() {
  const [wrapperRef, isVisible] = useIsVisible({ threshold: 0.3 });
  const invisible = !isVisible ? styles.invisible : "";
  const anim = isVisible ? "fade-in-bottom" : "";

  const nameRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const { addNotification } = useNotification();
  const { utmParams } = useUTM();

  const isValidPhone = (phone) => {
    return /^(\+?\d{10,15})$/.test(phone.replace(/\s/g, ""));
  };


  const handlePhoneInput = (e) => {
    const value = e.target.value;
    const filtered = value.replace(/[^0-9+\-\s()]/g, "");
    if (filtered !== value) {
      e.target.value = filtered;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown) {
      addNotification("error", "Зачекайте 5 секунд перед повторною відправкою!");
      return;
    }
    const name = nameRef.current?.value.trim();
    const phone = phoneRef.current?.value.trim();
    const comment = messageRef.current?.value.trim();

    if (!name || !phone) {
      addNotification("error", "Вкажіть ім'я та номер телефону!");
      return;
    }
    if (name.length > 25) {
      addNotification("error", "Ім'я не може бути довше 255 символів!");
      return;
    }
    if (phone.length > 15) {
      addNotification("error", "Телефон не може бути довше 255 символів!");
      return;
    }
    if (comment.length > 255) {
      addNotification("error", "Повідомлення не може бути довше 255 символів!");
      return;
    }
    if (!isValidPhone(phone)) {
      addNotification("error", "Введіть коректний номер телефону!");
      return;
    }

    setLoading(true);
    try {
      await sendOrder({ 
        name, 
        phone, 
        comment,
        utmParams: {
          prodex24source: utmParams.utm_source,
          prodex24medium: utmParams.utm_medium,
          prodex24campaign: utmParams.utm_campaign,
          prodex24content: utmParams.utm_content,
          prodex24term: utmParams.utm_term,
          prodex24page: window.location.pathname,
          prodex24source_full: window.location.href
        }
      });
      addNotification("success", "Успішно подано, очікуйте — з вами зв'яжуться!");
      if (nameRef.current) nameRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";
      if (messageRef.current) messageRef.current.value = "";
      setCooldown(true);
      setTimeout(() => setCooldown(false), 5000);
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
              Залиште заявку, і наші фахівці зв'яжуться з вами для консультації найближчим часом.
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
                  maxLength={255}
                />
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  className={`fade-in-bottom ${styles.input}`}
                  style={isVisible ? { animationDelay: "0.6s" } : {}}
                  ref={phoneRef}
                  disabled={loading}
                  maxLength={255}
                  onInput={handlePhoneInput}
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
                  maxLength={255}
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