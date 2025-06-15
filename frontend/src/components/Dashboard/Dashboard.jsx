'use client';

import { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import DashboardFilters from './DashboardFilters';
import DashboardLotCard from './DashboardLotCard';
import DashboardMobileFilters from './DashboardMobileFilters';
import { useIsVisible } from "@/hooks/useIsVisible";
import "@/app/animation.scss";

export default function Dashboard({ components, lots = [], bodyTypes, fuelTypes }) {
  const [dashboardRef, isVisible] = useIsVisible({ threshold: 0.5 });
  const invisible = !isVisible ? styles.invisible : "";
  const animBottom = isVisible ? "fade-in-bottom" : "";

  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const dashboardHeaderData = Array.isArray(components)
    ? {
        title: components.find((item) => item.slug === 'dashboard_h1')?.text || '',
        description: components.find((item) => item.slug === 'dashboard_p1')?.text || '',
      }
    : {};

  return (
    <div className={styles.dashboardWrapper} ref={dashboardRef}>
      <DashboardMobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        onApplyFilters={setFilters}
        onResetFilters={() => setFilters({})}
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
                onApplyFilters={setFilters}
                bodyTypes={bodyTypes}
                fuelTypes={fuelTypes}
              />
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.lotsList}>
                  {isLoading ? (
                    <p>Завантаження...</p>
                  ) : (
                    lots.map((lot) => <DashboardLotCard key={lot.id} lot={lot} />)
                  )}
                </div>
            </div>
                            <div className={styles.buttonsWrapper}>
                <button
                  className={styles.applyButton}
                >
                  Застосувати
                </button>
                <button
                  className={styles.resetButton}
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