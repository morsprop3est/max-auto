import { useRef, useEffect, useState } from "react";
import regions from "../../data/regions";
import Region from "./Region";
import ReviewCard from "./ReviewCard";
import styles from "./Map.module.scss";

export default function Map({
  selectedRegion,
  onRegionClick,
  review,
  onPrevReview,
  onNextReview,
  onCloseReview,
}) {
  const mapContainerRef = useRef(null);
  const [cardPos, setCardPos] = useState({ left: 0, top: 0, visible: false });

  useEffect(() => {
    if (selectedRegion) {
      const regionElement = document.getElementById(`region-${selectedRegion.id}`);
      const containerElement = mapContainerRef.current;
      if (regionElement && containerElement) {
        const regionRect = regionElement.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();
        const left = regionRect.left - containerRect.left + 100;
        const top = regionRect.top - containerRect.top - 50;
        setCardPos({ left, top, visible: true });
      }
    } else {
      setCardPos((pos) => ({ ...pos, visible: false }));
    }
  }, [selectedRegion, review]);

  useEffect(() => {
    const handle = () => {
      if (selectedRegion) {
        const regionElement = document.getElementById(`region-${selectedRegion.id}`);
        const containerElement = mapContainerRef.current;
        if (regionElement && containerElement) {
          const regionRect = regionElement.getBoundingClientRect();
          const containerRect = containerElement.getBoundingClientRect();
          const left = regionRect.left - containerRect.left + regionRect.width + 20;
          const top = regionRect.top - containerRect.top - 20;
          setCardPos({ left, top, visible: true });
        }
      }
    };
    window.addEventListener("scroll", handle);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [selectedRegion, review]);

  return (
    <div className={styles.mapContainer} ref={mapContainerRef}>
      <svg className={styles.map} width={1500} height={1000}>
        {regions.map((region) => (
          <Region
            key={region.id}
            region={region}
            isSelected={selectedRegion?.id === region.id}
            onClick={onRegionClick}
          />
        ))}
      </svg>
      {cardPos.visible && selectedRegion && (        
        <div
          className={styles.reviewCardOverlay}
          style={{
            position: "absolute",
            left: cardPos.left,
            top: cardPos.top,
            pointerEvents: "auto",
          }}
        >
          <ReviewCard
            {...review}
            onPrev={onPrevReview}
            onNext={onNextReview}
            onClose={onCloseReview}
            hasReviews={true}
          />
        </div>
      )}
    </div>
  );
}