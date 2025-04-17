import { useEffect, useState } from "react";
import { animateScaleUp, animateScaleDown, animatePress, animateRelease } from "../../utils/animation";
import regions from "../../data/regions";
import styles from "./Map.module.scss";

export default function Map({ onRegionClick, selectedRegion }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  useEffect(() => {
    regions.forEach((region) => {
      const element = document.getElementById(`region-${region.id}`);
      if (element) {
        element.addEventListener("mouseenter", () => {
          animateScaleUp(element, 1.1, 0.3);
          setHoveredRegion(region);
        });

        element.addEventListener("mouseleave", () => {
          animateScaleDown(element, 1, 0.3);
          setHoveredRegion(null);
        });

        element.addEventListener("mousedown", () => animatePress(element, 0.9, 0.1));
        element.addEventListener("mouseup", () => animateRelease(element, 1.1, 0.1));
      }
    });
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