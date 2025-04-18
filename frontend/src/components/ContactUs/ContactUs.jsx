import styles from './ContactUs.module.scss';

export default function ContactUs() {
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
            <div className={styles.form}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  className={styles.input}
                />
                <input
                  type="email"
                  placeholder="Ваш email"
                  className={styles.input}
                />
              </div>
              <div className={styles.fullWidthInput}>
                <input
                  type="text"
                  placeholder="Ваше повідомлення"
                  className={styles.input}
                />
              </div>
            </div>
            <button className={styles.submitButton}>Відправити</button>
          </div>
        </div>
      </div>
    </div>
  );
}