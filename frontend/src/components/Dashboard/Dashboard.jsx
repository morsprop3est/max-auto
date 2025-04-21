'use client';

import { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import DashboardFilters from './DashboardFilters';
import DashboardLotCard from './DashboardLotCard';
import { fetchLots } from '@/api/lots';

export default function Dashboard() {
  const [lots, setLots] = useState([]);
  const [page, setPage] = useState(1);
  const [totalLots, setTotalLots] = useState(0);
  const [filters, setFilters] = useState({
    bodyType: '',
    fuelType: '',
    minPrice: 0,
    maxPrice: 100000,
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadLots = async (reset = false) => {
    setIsLoading(true);
    try {
      const { lots: newLots, totalLots } = await fetchLots({
        page,
        limit: 10,
        filters,
      });

      setLots((prev) => (reset ? newLots : [...prev, ...newLots]));
      setTotalLots(totalLots);
    } catch (error) {
      console.error('Error fetching lots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    loadLots(true); // Перезавантажити лоти з новими фільтрами
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (lots.length < totalLots && !isLoading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    loadLots();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lots, totalLots, isLoading]);

  return (
    <div className={styles.dashboardWrapper}>
      <div className="container">
        <div className={styles.innerWrapper}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.line}></div>
              <h1 className={styles.title}>Рекомендуємо в бюджет</h1>
            </div>
            <p className={styles.description}>
              Ми пропонуємо повний комплекс послуг, щоб ви отримали своє авто швидко, вигідно та без зайвих клопотів. MAKS AUTO супроводжує кожен етап – від підбору до повного оформлення в Україні.
            </p>
          </div>

          <div className={styles.dashboardPanel}>
            <div className={styles.leftBlock}>
              <h2 className={styles.filterTitle}>Оберіть характеристики</h2>
              <DashboardFilters onChange={handleFiltersChange} />
            </div>

            <div className={styles.rightBlock}>
              <div className={styles.lotsList}>
                {lots.map((lot) => (
                  <DashboardLotCard key={lot.id} lot={lot} />
                ))}
                {isLoading && <p>Завантаження...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}