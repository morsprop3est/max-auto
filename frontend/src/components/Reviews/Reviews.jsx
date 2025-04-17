'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchReviewsByRegion } from '../../api/reviews';
import Map from './Map';
import ReviewCard from './ReviewCard';
import { animateScaleUp, animateScaleDown } from '../../utils/animation';
import styles from './Reviews.module.scss';

export default function Reviews() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewCardRef = useRef(null);

  const fetchReviews = async (regionId) => {
    try {
      const data = await fetchReviewsByRegion(regionId);
      setReviews(data.reviews || []);
      setCurrentReviewIndex(0);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    }
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    fetchReviews(region.id);
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const closeReviewCard = () => {
    setSelectedRegion(null);
    setReviews([]);
  };

  useEffect(() => {
    if (reviewCardRef.current) {
      animateScaleUp(reviewCardRef.current, 1, 0.3);
    }
  }, [selectedRegion]);

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map onRegionClick={handleRegionClick} selectedRegion={selectedRegion} />
      </div>
      {selectedRegion && (
        <div
          ref={reviewCardRef}
          className={styles.reviewCardContainer}
          style={{
            top: `${selectedRegion.y - 150}px`,
            left: `${selectedRegion.x}px`,
          }}
        >
          <button className={styles.closeButton} onClick={closeReviewCard}>
            ✖
          </button>
          {reviews.length > 0 ? (
            <>
              <button onClick={handlePrevReview} className={styles.navButton}>
                &lt;
              </button>
              <ReviewCard {...reviews[currentReviewIndex]} />
              <button onClick={handleNextReview} className={styles.navButton}>
                &gt;
              </button>
            </>
          ) : (
            <div className={styles.noReviews}>
              <p>Поки немає відгуків для цієї області.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}