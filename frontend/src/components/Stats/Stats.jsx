import styles from "./Stats.module.scss";

export default function Stats({ component }) {
  const statsData = Array.isArray(component)
    ? [
        {
          value: component.find((item) => item.slug === "stat_h1_1")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_1")?.text || "",
        },
        {
          value: component.find((item) => item.slug === "stat_h1_2")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_2")?.text || "",
        },
        {
          value: component.find((item) => item.slug === "stat_h1_3")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_3")?.text || "",
        },
        {
          value: component.find((item) => item.slug === "stat_h1_4")?.text || "",
          name: component.find((item) => item.slug === "stat_p1_4")?.text || "",
        },
      ]
    : [];

  if (!statsData.length) return null;

  const splitValue = (value) => {
    const match = value.match(/^([0-9]+)\s*([^+\-*/%,]*)$/);
    if (match) {
      return { number: match[1], text: match[2] };
    }
    return { number: value, text: "" };
  };
  

  return (
    <div className={styles.statsWrapper}>
      <div className="container">
        {statsData.map((stat, index) => {
          const { number, text } = splitValue(stat.value); 
          return (
            <div key={index} className={styles.statItem}>
              <div className={styles.trapezoid}>
                <div className={styles.content}>
                  <div className={styles.valueWrapper}>
                    <h3 className={styles.number}>{number} {text && <span className={styles.text}>{text}</span>}</h3>
                  </div>
                  <p className={styles.name}>{stat.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}