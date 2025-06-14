'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchAllReviews } from '../../api/reviews';
import Map from './Map';
import styles from './Reviews.module.scss';
import { useIsVisible } from "@/hooks/useIsVisible";

export default function Reviews({ component }) {
  const [wrapperRef, isVisible] = useIsVisible({ threshold: 0.2 });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [regionReviews, setRegionReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reviewsHeaderData = Array.isArray(component)
    ? {
        title: component.find((item) => item.slug === 'reviews_h1')?.text || '',
        description: component.find((item) => item.slug === 'reviews_p1')?.text || '',
      }
    : {};

  useEffect(() => {
    if (isVisible && allReviews.length === 0 && !loading) {
      setLoading(true);
      setError(false);
      fetchAllReviews()
        .then((data) => {
          setAllReviews(data.reviews || []);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [isVisible]);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    if (region && allReviews.length > 0) {
      const filtered = allReviews.filter(r => r.regionId === region.id);
      setRegionReviews(filtered);
      setCurrentReviewIndex(0);
    } else {
      setRegionReviews([]);
    }
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : regionReviews.length - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex < regionReviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={styles.reviewsWrapper} ref={wrapperRef} style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s" }}>
      <div className="container">
        <div className={styles.flexWrapper}>
          <div className="container">
            <div className={styles.header}>
              <div className={styles.titleWrapper}>
                <div className={styles.line}></div>
                <h1 className={styles.title}>{reviewsHeaderData.title}</h1>
              </div>
              <p className={styles.description}>{reviewsHeaderData.description}</p>
              <div className={styles.scrollMouse}>
                Наведіть курсором на область
                <img src='/mouseScroll.svg' />
              </div>
            </div>
          </div>
          <div className={styles.reviewsWrapper2}>
            <div className={styles.mapContainer}>
              <Map
                onRegionClick={handleRegionClick}
                selectedRegion={selectedRegion}
                review={regionReviews[currentReviewIndex]}
                regionReviews={regionReviews}
                onPrevReview={handlePrevReview}
                onNextReview={handleNextReview}
                onCloseReview={() => setSelectedRegion(null)}
                loading={loading}
                noReviews={regionReviews.length === 0 && !loading && !error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}