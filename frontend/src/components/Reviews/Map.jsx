import { useRef, useEffect, useState } from "react";
import regions from "../../data/regions";
import Region from "./Region";
import ReviewCard from "./ReviewCard";
import ReviewMobileCard from "./ReviewMobileCard"; 
import styles from "./Map.module.scss";

export default function Map({
  selectedRegion,
  onRegionClick,
  review,
  onPrevReview,
  onNextReview,
  onCloseReview,
  loading,
  noReviews,
  regionReviews = [],
}) {
  const mapContainerRef = useRef(null);
  const [cardPos, setCardPos] = useState({ left: 0, top: 0, visible: false });
  const [cursorPos, setCursorPos] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (selectedRegion && regionReviews.length > 0) setMobileIndex(0);
  }, [selectedRegion, regionReviews]);

  const handleRegionClick = (region, event) => {
    if (isAnimating) return;
    
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
    if (selectedRegion && cursorPos && mapContainerRef.current) {
      const containerWidth = mapContainerRef.current.offsetWidth;
      const isRightHalf = cursorPos.left > containerWidth / 2;
      setCardPos({
        left: isRightHalf ? cursorPos.left - 480 : cursorPos.left,
        top: cursorPos.top - 150,
        visible: true,
      });
    } else {
      setCardPos((pos) => ({ ...pos, visible: false }));
    }
  }, [selectedRegion, review, cursorPos]);

  useEffect(() => {
    const handle = () => {
      if (selectedRegion && cursorPos && mapContainerRef.current) {
        const containerWidth = mapContainerRef.current.offsetWidth;
        const isRightHalf = cursorPos.left > containerWidth / 2;
        setCardPos({
          left: isRightHalf ? cursorPos.left - 480 : cursorPos.left,
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

  const handleCloseReview = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onCloseReview();
      setIsAnimating(false);
    }, 300);
  };

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
      {!isMobile && (
        <div
          className={styles.reviewCardOverlay}
          style={{
            position: "absolute",
            left: cardPos.left,
            top: cardPos.top,
            pointerEvents: cardPos.visible ? "auto" : "none",
            opacity: cardPos.visible ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <ReviewCard
            {...(review || {})}
            onPrev={onPrevReview}
            onNext={onNextReview}
            onClose={handleCloseReview}
            hasReviews={true}
            shiftRight={cardPos.left < cursorPos?.left}
            loading={loading}
            noReviews={noReviews}
            visible={cardPos.visible}
          />
        </div>
      )}
      {isMobile && selectedRegion && (
        <ReviewMobileCard
          region={selectedRegion}
          reviews={regionReviews}
          currentIndex={mobileIndex}
          setCurrentIndex={setMobileIndex}
          onClose={handleCloseReview}
        />
      )}
    </div>
  );
}