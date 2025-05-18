import styles from "./AnimatedText.module.scss";

export default function AnimatedText({ text }) {
  const safeText = typeof text === "string" ? text : "";
  const wrappedText = safeText.split(" ").map((word, index) => (
    <span
      key={index}
      className={styles.word}
      style={{ animationDelay: `${0.5 + index * 0.05}s` }}
    >
      {word}&nbsp;
    </span>
  ));

  return <div className={styles.textWrapper}>{wrappedText}</div>;
}