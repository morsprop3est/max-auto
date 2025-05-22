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
  const [cursorPos, setCursorPos] = useState(null);

  // Зберігаємо координати курсора при кліку
  const handleRegionClick = (region, event) => {
    if (event) {
      const containerRect = mapContainerRef.current.getBoundingClientRect();
      setCursorPos({
        left: event.clientX - containerRect.left,
        top: event.clientY - containerRect.top,
      });
    }
    onRegionClick(region);
  };

  useEffect(() => {
    if (selectedRegion && cursorPos) {
      setCardPos({
        left: cursorPos.left,
        top: cursorPos.top - 150,
        visible: true,
      });
    } else {
      setCardPos((pos) => ({ ...pos, visible: false }));
    }
  }, [selectedRegion, review, cursorPos]);

  useEffect(() => {
    const handle = () => {
      if (selectedRegion && cursorPos) {
        setCardPos({
          left: cursorPos.left + 20,
          top: cursorPos.top - 20,
          visible: true,
        });
      }
    };
    window.addEventListener("scroll", handle);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [selectedRegion, review, cursorPos]);

  return (
    <div className={styles.mapContainer} ref={mapContainerRef}>
      <svg
        className={styles.map}
        viewBox="0 0 1200 800"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {regions.map((region) => (
          <Region
            key={region.id}
            region={region}
            isSelected={selectedRegion?.id === region.id}
            onClick={(r, e) => handleRegionClick(r, e)}
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