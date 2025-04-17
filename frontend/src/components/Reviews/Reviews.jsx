'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchReviewsByRegion } from '../../api/reviews';
import Map from './Map';
import ReviewCard from './ReviewCard';
import { gsap } from 'gsap';
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
    if (reviewCardRef.current) {
      gsap.to(reviewCardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
          setSelectedRegion(region);
          fetchReviews(region.id);
        },
      });
    } else {
      setSelectedRegion(region);
      fetchReviews(region.id);
    }
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
    if (reviewCardRef.current) {
      gsap.to(reviewCardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
          setSelectedRegion(null);
          setReviews([]);
        },
      });
    }
  };

  useEffect(() => {
    if (reviewCardRef.current && selectedRegion) {
      gsap.fromTo(
        reviewCardRef.current,
        { opacity: 0, scale: 0.9, top: `${selectedRegion.y + 100}px`, left: `${selectedRegion.x + 100}px` },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
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
            position: 'absolute',
          }}
        >
          <ReviewCard
            {...(reviews[currentReviewIndex] || {})}
            hasReviews={reviews.length > 0}
            onClose={closeReviewCard}
            onPrev={handlePrevReview}
            onNext={handleNextReview}
          />
        </div>
      )}
    </div>
  );
}