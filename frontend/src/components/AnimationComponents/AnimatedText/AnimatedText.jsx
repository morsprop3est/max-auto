import { useEffect, useRef } from "react";
import { animateWordsIn } from "@/utils/animation";
import styles from "./AnimatedText.module.scss";

export default function AnimatedText({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const wordSpans = containerRef.current.querySelectorAll("span");
    animateWordsIn(wordSpans);
  }, []);

  const wrappedText = text.split(" ").map((word, index) => (
    <span key={index} className={styles.word}>
      {word}&nbsp;
    </span>
  ));

  return <div ref={containerRef} className={styles.textWrapper}>{wrappedText}</div>;
}
