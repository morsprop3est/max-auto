import { useEffect, useState } from "react";
import { gsap } from "gsap";
import regions from "../../data/regions";
import styles from "./Map.module.scss";

export default function Map({ onRegionClick, selectedRegion }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  useEffect(() => {
    const svgElement = document.querySelector(`.${styles.map}`);

    const handleMouseEnter = (event) => {
      const region = event.target.closest(`.${styles.region}`);
      if (region) {
        gsap.to(region, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        setHoveredRegion(region.id);
      }
    };

    const handleMouseLeave = (event) => {
      const region = event.target.closest(`.${styles.region}`);
      if (region) {
        gsap.to(region, { scale: 1, duration: 0.3, ease: "power2.out" });
        setHoveredRegion(null);
      }
    };

    const handleMouseDown = (event) => {
      const region = event.target.closest(`.${styles.region}`);
      if (region) {
        gsap.to(region, { scale: 0.975, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseUp = (event) => {
      const region = event.target.closest(`.${styles.region}`);
      if (region) {
        gsap.to(region, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      }
    };

    if (svgElement) {
      svgElement.addEventListener("mouseenter", handleMouseEnter, true);
      svgElement.addEventListener("mouseleave", handleMouseLeave, true);
      svgElement.addEventListener("mousedown", handleMouseDown, true);
      svgElement.addEventListener("mouseup", handleMouseUp, true);
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener("mouseenter", handleMouseEnter, true);
        svgElement.removeEventListener("mouseleave", handleMouseLeave, true);
        svgElement.removeEventListener("mousedown", handleMouseDown, true);
        svgElement.removeEventListener("mouseup", handleMouseUp, true);
      }
    };
  }, []);

  return (
    <div className={styles.mapContainer}>
      <svg className={styles.map}>
        {regions.map((region) => {
          const { svgPath, id, x, y } = region;
          return (
            <g
              key={id}
              id={`region-${id}`}
              onClick={() => onRegionClick(region)}
              className={`${styles.region} ${selectedRegion?.id === id ? styles.selected : ""}`}
              transform={`translate(${x}, ${y})`}
            >
              <image href={svgPath} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}