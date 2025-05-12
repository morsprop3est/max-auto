import styles from './ContactUs.module.scss';
import { useRef, useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import { sendOrder } from "@/api/orders";

export default function ContactUs() {
  const { addNotification } = useNotification();
  const nameRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const [loading, setLoading] = useState(false);

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
    <div className={styles.contactUsWrapper}>
      <div className="container">
        <div className={styles.contactUsWrapper2}>
          <div className={styles.leftBlock}>
            <h1 className={styles.title}>Залишайте заявку</h1>
            <p className={styles.description}>
              Залиште заявку, і наші фахівці зв’яжуться з вами для консультації найближчим часом.
            </p>
          </div>
          <div className={styles.rightBlock}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  className={styles.input}
                  ref={nameRef}
                  disabled={loading}
                />
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  className={styles.input}
                  ref={phoneRef}
                  disabled={loading}
                />
              </div>
              <div className={styles.fullWidthInput}>
                <input
                  type="text"
                  placeholder="Ваше повідомлення"
                  className={styles.input}
                  ref={messageRef}
                  disabled={loading}
                />
              </div>
              <button className={styles.submitButton} type="submit" disabled={loading}>
                {loading ? "Відправка..." : "Відправити"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}