import { useState, useEffect } from "react";
import styles from "./DashboardFilters.module.scss";
import ReactSlider from "react-slider";

export default function DashboardFilters({ onApplyFilters, bodyTypes, fuelTypes }) {
  const [selectedBodyTypeSlug, setSelectedBodyTypeSlug] = useState(null);
  const [selectedFuelTypeSlug, setSelectedFuelTypeSlug] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [yearRange, setYearRange] = useState([1990, 2025]);
  const [engineSizeRange, setEngineSizeRange] = useState([0, 10]);

  const selectedFuelType = fuelTypes.find(type => type.slug === selectedFuelTypeSlug);
  const isElectricSelected = selectedFuelType && (
    selectedFuelType.name.toLowerCase().includes('електро') || 
    selectedFuelType.name.toLowerCase().includes('electric') ||
    selectedFuelType.name.toLowerCase().includes('електричний') ||
    selectedFuelType.name.toLowerCase().includes('гібрид') ||
    selectedFuelType.name.toLowerCase().includes('hybrid')
  );

  const engineLabel = isElectricSelected ? "Потужність:" : "Об'єм двигуна:";
  const engineUnit = isElectricSelected ? "кВт" : "л";
  const engineMax = isElectricSelected ? 150 : 10;
  const engineStep = isElectricSelected ? 1 : 0.1;

  useEffect(() => {
    if (isElectricSelected) {
      setEngineSizeRange([0, 150]);
    } else {
      setEngineSizeRange([0, 10]);
    }
  }, [isElectricSelected]);

  const handleApplyFilters = () => {
    onApplyFilters({
      bodyTypeSlug: selectedBodyTypeSlug,
      fuelTypeSlug: selectedFuelTypeSlug,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minYear: yearRange[0],
      maxYear: yearRange[1],
      minEngineSize: engineSizeRange[0],
      maxEngineSize: engineSizeRange[1],
    });
  };

  const handleResetFilters = () => {
    setSelectedBodyTypeSlug(null);
    setSelectedFuelTypeSlug(null);
    setPriceRange([0, 100000]);
    setYearRange([1990, 2025]);
    setEngineSizeRange([0, 10]);
    onApplyFilters({});
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.bodyTypeWrapper}>
        <h3>Тип кузова</h3>
        <div className={styles.bodyTypeGrid}>
          {bodyTypes.map((type) => (
            <button
              key={type.id}
              className={`${styles.bodyTypeButton} ${
                selectedBodyTypeSlug === type.slug ? styles.active : ""
              }`}
              onClick={() => setSelectedBodyTypeSlug(type.slug)}
            >
              <img src={`/dashboardIcons/${type.slug}.svg`} alt={type.name} className={styles.icon} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.fuelTypeWrapper}>
        <h3>Тип палива</h3>
        <div className={styles.fuelTypeGrid}>
          {fuelTypes.map((type) => (
            <button
              key={type.id}
              className={`${styles.fuelTypeButton} ${
                selectedFuelTypeSlug === type.slug ? styles.active : ""
              }`}
              onClick={() => setSelectedFuelTypeSlug(type.slug)}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <label>Ціна:</label>
        <ReactSlider
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          min={0}
          max={100000}
          step={500}
          value={priceRange}
          onChange={(values) => setPriceRange(values)}
        />
        <div className={styles.rangeValues}>
          <span>{priceRange[0]} $</span>
          <span>{priceRange[1]} $</span>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <label>Рік:</label>
        <ReactSlider
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          min={1990}
          max={2025}
          step={1}
          value={yearRange}
          onChange={(values) => setYearRange(values)}
        />
        <div className={styles.rangeValues}>
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <label>{engineLabel}</label>
        <ReactSlider
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          min={0}
          max={engineMax}
          step={engineStep}
          value={engineSizeRange}
          onChange={(values) => setEngineSizeRange(values)}
        />
        <div className={styles.rangeValues}>
          <span>{engineSizeRange[0]} {engineUnit}</span>
          <span>{engineSizeRange[1]} {engineUnit}</span>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <button
          className={styles.applyButton}
          onClick={handleApplyFilters}
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
  );
}