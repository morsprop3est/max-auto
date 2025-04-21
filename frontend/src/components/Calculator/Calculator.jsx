import styles from "./Calculator.module.scss";

export default function Calculator({ formula, coeffs }) {
  return (
    <div className={styles.calculatorWrapper}>
      <div className="container">
        <div className={styles.innerWrapper}>
          <div className={styles.leftBlock}>
            <div className={styles.inputsBlock}>
              <input type="text" placeholder="Поле 1" className={styles.input} />
              <input type="text" placeholder="Поле 2" className={styles.input} />
              <input type="text" placeholder="Поле 3" className={styles.input} />
              <input type="text" placeholder="Поле 4" className={styles.input} />
            </div>
            <div className={styles.resultBlock}>
              <h3>Розрахована вартість:</h3>
              <div className={styles.priceField}>$0.00</div>
            </div>
          </div>

          <div className={styles.rightBlock}>
            <h2 className={styles.title}>Заголовок</h2>
            <p className={styles.description}>
              Опис тексту, який пояснює, як працює калькулятор або що він робить.
            </p>
            <div className={styles.infoBlocks}>
              <div className={styles.infoBlock}>Блок 1</div>
              <div className={styles.infoBlock}>Блок 2</div>
              <div className={styles.infoBlock}>Блок 3</div>
              <div className={styles.infoBlock}>Блок 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}