import styles from "./Main.module.scss";
import Image from "next/image";

export default function Main({ component }) {
  const mainData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === "main_h1")?.text || "",
        subtitle: component.find((item) => item.slug === "main_h2")?.text || "",
        description: component.find((item) => item.slug === "main_p1")?.text || "",
        buttonText: component.find((item) => item.slug === "main_button")?.text || "",
      }
    : {};

    console.log(mainData);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.carImages}>
        <div className={styles.car1}>
          <Image src="/main/car1.png" alt="Car 1" width={800} height={500} />
        </div>
        <div className={styles.car2}>
          <Image src="/main/car2.png" alt="Car 2" width={800} height={500} />
        </div>
        <div className={styles.car3}>
          <Image src="/main/car3.png" alt="Car 3" width={800} height={500} />
        </div>
      </div>

      <div className={styles.trapezoid}>
        <Image
          src="/main/background.webp"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className={styles.trapezoidImage}
        />
      </div>

      <div className={styles.contentBlock}>
        <Image src="/logo.svg" alt="Logo" width={150} height={150} className={styles.logo} />
        <h1>{mainData.title}</h1>
        <h2>{mainData.subtitle}</h2>
        <p>{mainData.description}</p>
        <button className={styles.greenButton}>{mainData.buttonText}</button>
      </div>
    </div>
  );
}