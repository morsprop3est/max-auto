import { useEffect, useState } from "react";
import { gsap } from "gsap";
import regions from "../../data/regions";
import styles from "./Map.module.scss";

export default function Map({ onRegionClick, selectedRegion }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  useEffect(() => {
    regions.forEach((region) => {
      const element = document.getElementById(`region-${region.id}`);
      if (element) {
        element.style.transformOrigin = "end end";

        element.addEventListener("mouseenter", () => {
          gsap.to(element, { scale: 1.05, duration: 0.3, ease: "power2.out" });
          setHoveredRegion(region);
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, { scale: 1, duration: 0.3, ease: "power2.out" });
          setHoveredRegion(null);
        });

        element.addEventListener("mousedown", () => {
          gsap.to(element, { scale: 0.975, duration: 0.3, ease: "power2.out" });
        });

        element.addEventListener("mouseup", () => {
          gsap.to(element, { scale: 1.05, duration: 0.5, ease: "power2.out" });
        });
      }
    });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const selectedElement = document.getElementById(`region-${selectedRegion.id}`);
      if (selectedElement) {
        gsap.to(selectedElement, { zIndex: 9999, duration: 0 });
      }
    }

    regions.forEach((region) => {
      if (!selectedRegion || region.id !== selectedRegion.id) {
        const element = document.getElementById(`region-${region.id}`);
        if (element) {
          gsap.to(element, { zIndex: 0, duration: 0 }); 
        }
      }
    });
  }, [selectedRegion]);

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