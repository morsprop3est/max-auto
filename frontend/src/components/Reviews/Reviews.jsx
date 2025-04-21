'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchReviewsByRegion } from '../../api/reviews';
import Map from './Map';
import ReviewCard from './ReviewCard';
import { gsap } from 'gsap';
import styles from './Reviews.module.scss';

export default function Reviews({ component }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewCardRef = useRef(null);

  const sectionTitle = component?.find((item) => item.slug === "reviews_h1")?.text || "Відгуки наших клієнтів";
  const sectionDescription =
    component?.find((item) => item.slug === "reviews_p1")?.text ||
    "Дізнайтеся, що говорять наші клієнти про нашу роботу. Ми завжди прагнемо досягти найкращого результату.";

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

  const closeReviewCard = () => {
    if (reviewCardRef.current) {
      gsap.to(reviewCardRef.current, {
        opacity: 0,
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
      const regionElement = document.getElementById(`region-${selectedRegion.id}`);
      if (regionElement) {
        const regionRect = regionElement.getBoundingClientRect();
        const cardX = regionRect.left + regionRect.width / 2;
        const cardY = regionRect.top + window.scrollY - 20; // Відступ над регіоном

        gsap.fromTo(
          reviewCardRef.current,
          { opacity: 0, x: cardX, y: cardY },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [selectedRegion]);

  return (
    <div className={styles.reviewsWrapper}>
      <div className="container">
        <div className={styles.flexWrapper}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{sectionTitle}</h1>
            </div>
            <p className={styles.description}>{sectionDescription}</p>
          </div>
          <div className={styles.reviewsWrapper2}>
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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}