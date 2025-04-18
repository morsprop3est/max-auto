import styles from "./Millitary.module.scss";

export default function Millitary({ component }) {
  const millitaryData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === "millitary_h1")?.text || "",
        text: component.find((item) => item.slug === "millitary_p1")?.text || "",
      }
    : {};

  return (
    <div className={styles.millitaryWrapper}>
      <div className="container">
        <div className={styles.millitaryWrapper2}>
        <div className={styles.topBlock}>
          <div className={styles.titleBlock}>
            <div className={styles.line}></div>
            <h1 className={styles.title}>{millitaryData.title}</h1>
          </div>

          <img
            src="/millitary-vehicle.png"
            alt="Military Vehicle"
            className={styles.image}
          />
        </div>

        <div className={styles.bottomBlock}>
          <p className={styles.text}>{millitaryData.text}</p>
          <button className={styles.button}>Дізнатися більше</button>
        </div>
        </div>
      </div>
    </div>
  );
}