import styles from "./ColorLegend.module.scss";
import { useIsVisible } from "@/hooks/useIsVisible";

export default function ColorLegend() {
  const [legendRef, isVisible] = useIsVisible({ threshold: 0.2 });
  
  const colorLevels = [
    { level: 0, label: "0", description: "Немає відгуків", color: "#038405" },
    { level: 1, label: "1", description: "1 відгук", color: "#027704" },
    { level: 2, label: "2-4", description: "2-4 відгуки", color: "#016a05" },
    { level: 3, label: "5-9", description: "5-9 відгуків", color: "#015a00" },
    { level: 4, label: "10+", description: "10+ відгуків", color: "#024e03" },
  ];

  return (
    <div 
      className={styles.legendContainer} 
      ref={legendRef}
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s" }}
    >
      <div className={styles.legendTitle}>Кількість відгуків в області:</div>
      <div className={styles.legendItems}>
        {colorLevels.map((item) => (
          <div key={item.level} className={styles.legendItem}>
            <div className={styles.colorIndicator}>
              <div 
                className={styles.sampleRegion}
                style={{ background: item.color }}
              ></div>
            </div>
            <div className={styles.legendText}>
              <span className={styles.description}>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 