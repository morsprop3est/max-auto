'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Dashboard.module.scss';
import DashboardFilters from './DashboardFilters';
import DashboardLotCard from './DashboardLotCard';
import DashboardMobileFilters from './DashboardMobileFilters';
import DashboardLotCardSkeleton from './DashboardLotCardSkeleton';
import { useIsVisible } from "@/hooks/useIsVisible";
import "@/app/animation.scss";
import { fetchLots } from '@/api/lots';

export default function Dashboard({ components, initialLots = [], bodyTypes, fuelTypes }) {
  const [dashboardRef, isVisible] = useIsVisible({ threshold: 0.5 });
  const invisible = !isVisible ? styles.invisible : "";
  const animBottom = isVisible ? "fade-in-bottom" : "";

  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [lots, setLots] = useState(initialLots);
  const [totalLotsCount, setTotalLotsCount] = useState(initialLots.length);

  const dashboardHeaderData = Array.isArray(components)
    ? {
        title: components.find((item) => item.slug === 'dashboard_h1')?.text || '',
        description: components.find((item) => item.slug === 'dashboard_p1')?.text || '',
      }
    : {};

  const loadLots = useCallback(async (currentFilters) => {
    setIsLoading(true);
    try {
      const response = await fetchLots({ page: 1, limit: 50, filters: currentFilters });
      setLots(response.lots || []);
      setTotalLotsCount(response.lots?.length || 0);
    } catch (error) {
      console.error('Error loading lots:', error);
      setLots([]);
      setTotalLotsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialLots.length === 0) {
      loadLots({});
    }
  }, [initialLots.length, loadLots]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLots(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, loadLots]);

  const handleApplyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const filteredLots = lots.filter(lot => {
    if (filters.bodyTypeSlug) {
      const selectedBodyType = bodyTypes.find(type => type.slug === filters.bodyTypeSlug);
      if (!selectedBodyType || lot.bodyTypeId !== selectedBodyType.id) {
        return false;
      }
    }

    if (filters.fuelTypeSlug) {
      const selectedFuelType = fuelTypes.find(type => type.slug === filters.fuelTypeSlug);
      if (!selectedFuelType || lot.fuelTypeId !== selectedFuelType.id) {
        return false;
      }
    }

    if (filters.minPrice !== undefined && lot.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && lot.price > filters.maxPrice) {
      return false;
    }

    if (filters.minYear !== undefined && lot.year < filters.minYear) {
      return false;
    }
    if (filters.maxYear !== undefined && lot.year > filters.maxYear) {
      return false;
    }

    if (filters.minEngineSize !== undefined && lot.engineSize < filters.minEngineSize) {
      return false;
    }
    if (filters.maxEngineSize !== undefined && lot.engineSize > filters.maxEngineSize) {
      return false;
    }

    return true;
  });

  return (
    <div className={styles.dashboardWrapper} ref={dashboardRef}>
      <DashboardMobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        bodyTypes={bodyTypes}
        fuelTypes={fuelTypes}
        initialFilters={filters}
      />
      <div className="container">
        <div className={`${styles.innerWrapper} ${animBottom} ${invisible}`} style={isVisible ? { animationDelay: '0.2s' } : {}}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>{dashboardHeaderData.title}</h1>
            </div>
            <p className={styles.description}>{dashboardHeaderData.description}</p>
          </div>
          <div className={styles.dashboardPanel}>
            <div className={styles.mobileFiltersWrapper}>
              <button
                className={styles.mobileFiltersButton}
                onClick={() => setMobileFiltersOpen(true)}
              >
                <img src='/dashboardIcons/filters.svg' />
              </button>
            </div>
            <div className={styles.leftBlock}>
              <DashboardFilters
                onApplyFilters={handleApplyFilters}
                bodyTypes={bodyTypes}
                fuelTypes={fuelTypes}
              />
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.lotsList}>
                  {isLoading ? (
                    <>
                      {Array.from({ length: totalLotsCount || 3 }).map((_, index) => (
                        <DashboardLotCardSkeleton key={index} />
                      ))}
                    </>
                  ) : filteredLots.length === 0 ? (
                    <div className={styles.noLotsMessage}>
                      {lots.length === 0 ? (
                        <p>Наразі немає доступних лотів</p>
                      ) : (
                        <p>За вашими критеріями не знайдено лотів</p>
                      )}
                    </div>
                  ) : (
                    filteredLots.map((lot) => (
                      <DashboardLotCard 
                        key={lot.id} 
                        lot={lot} 
                        bodyTypes={bodyTypes}
                        fuelTypes={fuelTypes}
                      />
                    ))
                  )}
                </div>
            </div>
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.applyButton}
                onClick={() => handleApplyFilters(filters)}
              >
                Застосувати
              </button>
              <button
                className={styles.resetButton}
                onClick={handleResetFilters}
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}