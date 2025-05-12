import { useState, useRef } from "react";
import ReactSlider from "react-slider";
import styles from "./DashboardFilters.module.scss";
import { animateScaleUp, animateScaleDown, animatePress } from "@/utils/animation";

export default function DashboardFilters({ onApplyFilters, bodyTypes, fuelTypes }) {
  const [selectedBodyTypeSlug, setSelectedBodyTypeSlug] = useState(null);
  const [selectedFuelTypeSlug, setSelectedFuelTypeSlug] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [yearRange, setYearRange] = useState([2000, 2025]);
  const [engineSizeRange, setEngineSizeRange] = useState([0, 5]);

  const handleScaleEnter = (e) => animateScaleUp(e.currentTarget);
  const handleScaleLeave = (e) => animateScaleDown(e.currentTarget);
  const handleScaleDown = (e) => animatePress(e.currentTarget);
  const handleScaleUp = (e) => animateScaleUp(e.currentTarget);

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
    setYearRange([2000, 2025]);
    setEngineSizeRange([0, 5]);
    onApplyFilters({});
  };

const renderThumb = (props, state) => {
  const { key, ...rest } = props;
  return (
    <div
      key={key}
      {...rest}
      className={styles.thumb}
      onMouseEnter={handleScaleEnter}
      onMouseLeave={handleScaleLeave}
      onMouseDown={handleScaleDown}
      onMouseUp={handleScaleUp}
    />
  );
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
              onMouseEnter={handleScaleEnter}
              onMouseLeave={handleScaleLeave}
              onMouseDown={handleScaleDown}
              onMouseUp={handleScaleUp}
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
              onMouseEnter={handleScaleEnter}
              onMouseLeave={handleScaleLeave}
              onMouseDown={handleScaleDown}
              onMouseUp={handleScaleUp}
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
          renderThumb={renderThumb}
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
          min={2000}
          max={2025}
          step={1}
          value={yearRange}
          onChange={(values) => setYearRange(values)}
          renderThumb={renderThumb}
        />
        <div className={styles.rangeValues}>
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <label>Об'єм двигуна:</label>
        <ReactSlider
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          min={0}
          max={5}
          step={0.1}
          value={engineSizeRange}
          onChange={(values) => setEngineSizeRange(values)}
          renderThumb={renderThumb}
        />
        <div className={styles.rangeValues}>
          <span>{engineSizeRange[0]} л</span>
          <span>{engineSizeRange[1]} л</span>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <button
          className={styles.applyButton}
          onClick={handleApplyFilters}
          onMouseEnter={handleScaleEnter}
          onMouseLeave={handleScaleLeave}
          onMouseDown={handleScaleDown}
          onMouseUp={handleScaleUp}
        >
          Застосувати
        </button>
        <button
          className={styles.resetButton}
          onClick={handleResetFilters}
          onMouseEnter={handleScaleEnter}
          onMouseLeave={handleScaleLeave}
          onMouseDown={handleScaleDown}
          onMouseUp={handleScaleUp}
        >
          ✖
        </button>
      </div>
    </div>
  );
}