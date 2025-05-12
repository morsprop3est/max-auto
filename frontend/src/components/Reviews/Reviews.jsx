'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchReviewsByRegion } from '../../api/reviews';
import Map from './Map';
import styles from './Reviews.module.scss';

export default function Reviews({ component }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewCardRef = useRef(null);

  const reviewsHeaderData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === 'reviews_h1')?.text || '',
        description: component.find((item) => item.slug === 'reviews_p1')?.text || '',
      }
    : {};

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

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : reviews.length - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex < reviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={styles.reviewsWrapper}>
      <div className="container">
        <div className={styles.flexWrapper}>
          <div className="container">
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{reviewsHeaderData.title}</h1>
            </div>
            <p className={styles.description}>{reviewsHeaderData.description}</p>
          </div>
          </div>
          <div className={styles.reviewsWrapper2}>
            <div className={styles.mapContainer}>
              <Map
                onRegionClick={handleRegionClick}
                selectedRegion={selectedRegion}
                review={reviews[currentReviewIndex]}
                onPrevReview={handlePrevReview}
                onNextReview={handleNextReview}
                onCloseReview={() => setSelectedRegion(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}