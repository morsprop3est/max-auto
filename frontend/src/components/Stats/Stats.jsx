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

  return (
    <div className={styles.container}>
      {statsData.map((stat, index) => (
        <div key={index} className={styles.statItem}>
          <div className={styles.trapezoid}>
            <div className={styles.content}>
              <h3 className={styles.value}>{stat.value}</h3>
              <p className={styles.name}>{stat.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}