import styles from "./AboutUs.module.scss";
import Image from "next/image";

export default function AboutUs({ component }) {
  const aboutUsData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === "about_us_h1")?.text || "",
        description: component.find((item) => item.slug === "about_us_p1")?.text || "",
        image1: component.find((item) => item.slug === "about_us_image1")?.photoUrl || "",
        image2: component.find((item) => item.slug === "about_us_image2")?.photoUrl || "",
        advantage1: component.find((item) => item.slug === "about_us_stat_1")?.text || "",
        advantage2: component.find((item) => item.slug === "about_us_stat_2")?.text || "",
        advantage3: component.find((item) => item.slug === "about_us_stat_3")?.text || "",
        advantage4: component.find((item) => item.slug === "about_us_stat_4")?.text || "",
      }
    : {};

  return (
    <div className={styles.aboutUsWrapper}>
      <div className="container">
        <div className={styles.aboutUsWrapper2}>
            <div className={styles.leftBlock}>
              <div className={styles.titleWrapper}>
                <div className={styles.line}></div>
                <h1 className={styles.title}>{aboutUsData.title}</h1>
              </div>
              <p className={styles.description}>{aboutUsData.description}</p>
              <h2 className={styles.advantagesTitle}>Наші переваги:</h2>
              <div className={styles.advantages}>
                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <Image
                      src="/aboutUsIcons/icon1.svg"
                      alt="Advantage 1"
                      width={40}
                      height={32}
                    />
                  </div>
                  <p className={styles.advantageText}>{aboutUsData.advantage1}</p>
                </div>
                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <Image
                      src="/aboutUsIcons/icon2.svg"
                      alt="Advantage 2"
                      width={40}
                      height={32}
                    />
                  </div>
                  <p className={styles.advantageText}>{aboutUsData.advantage2}</p>
                </div>
                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <Image
                      src="/aboutUsIcons/icon3.svg"
                      alt="Advantage 3"
                      width={40}
                      height={32}
                    />
                  </div>
                  <p className={styles.advantageText}>{aboutUsData.advantage3}</p>
                </div>
                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <Image
                      src="/aboutUsIcons/icon4.svg"
                      alt="Advantage 4"
                      width={40}
                      height={24}
                    />
                  </div>
                  <p className={styles.advantageText}>{aboutUsData.advantage4}</p>
                </div>
              </div>
            </div>

            <div className={styles.rightBlock}>
              <div className={styles.trapezoid1}>
                <img src={aboutUsData.image1} alt="About Us 1" className={styles.trapezoidImage} />
              </div>
              <div className={styles.trapezoid2}>
                <img src={aboutUsData.image2} alt="About Us 2" className={styles.trapezoidImage} />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}