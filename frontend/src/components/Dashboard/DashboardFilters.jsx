import { useState } from 'react';
import styles from './DashboardFilters.module.scss';

export default function DashboardFilters({ onChange }) {
    const [bodyType, setBodyType] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
  
    const handleApplyFilters = () => {
      onChange({ bodyType, fuelType, minPrice, maxPrice });
    };
  
    return (
      <div className={styles.filtersWrapper}>
        <div className={styles.filterRow}>
          <select onChange={(e) => setBodyType(e.target.value)}>
            <option value="">Всі кузови</option>
            <option value="Седан">Седан</option>
            <option value="Кросовер">Кросовер</option>
          </select>
          <select onChange={(e) => setFuelType(e.target.value)}>
            <option value="">Всі типи палива</option>
            <option value="Бензин">Бензин</option>
            <option value="Дизель">Дизель</option>
          </select>
        </div>
        <div className={styles.sliderWrapper}>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Мін. ціна"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Макс. ціна"
          />
        </div>
        <button onClick={handleApplyFilters}>Застосувати</button>
      </div>
    );
  }