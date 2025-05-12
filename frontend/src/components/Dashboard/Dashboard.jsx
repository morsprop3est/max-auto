'use client';

import { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import DashboardFilters from './DashboardFilters';
import DashboardLotCard from './DashboardLotCard';
import { fetchLots } from '@/api/lots';

export default function Dashboard({ components, bodyTypes, fuelTypes }) {
  const [lots, setLots] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dashboardHeaderData = Array.isArray(components)
    ? {
        title: components.find((item) => item.slug === 'dashboard_h1')?.text || '',
        description: components.find((item) => item.slug === 'dashboard_p1')?.text || '',
      }
    : {};

  const loadLots = async () => {
    setIsLoading(true);
    try {
      const { lots: newLots } = await fetchLots({ page: 1, limit: 10, filters });
      setLots(newLots);
    } catch (error) {
      console.error('Error fetching lots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLots();
  }, [filters]);

  return (
    <div className={styles.dashboardWrapper}>
      <div className="container">
        <div className={styles.innerWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>{dashboardHeaderData.title}</h1>
            <p className={styles.description}>{dashboardHeaderData.description}</p>
          </div>
          <div className={styles.dashboardPanel}>
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
          </div>
        </div>
      </div>
    </div>
  );
}