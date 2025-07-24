import { useState, useRef, useEffect } from "react";
import styles from "./DashboardMobileFilters.module.scss";
import ReactSlider from "react-slider";

export default function DashboardMobileFilters({
  open,
  onClose,
  onApplyFilters,
  onResetFilters,
  bodyTypes,
  fuelTypes,
  initialFilters = {}
}) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const [selectedBodyTypeSlug, setSelectedBodyTypeSlug] = useState(initialFilters.bodyTypeSlug || null);
  const [selectedFuelTypeSlug, setSelectedFuelTypeSlug] = useState(initialFilters.fuelTypeSlug || null);
  const [priceRange, setPriceRange] = useState([
    initialFilters.minPrice ?? 0,
    initialFilters.maxPrice ?? 100000,
  ]);
  const [yearRange, setYearRange] = useState([
    initialFilters.minYear ?? 2000,
    initialFilters.maxYear ?? 2025,
  ]);
  const [engineSizeRange, setEngineSizeRange] = useState([
    initialFilters.minEngineSize ?? 0,
    initialFilters.maxEngineSize ?? 5,
  ]);

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
  const engineMax = isElectricSelected ? 150 : 5;
  const engineStep = isElectricSelected ? 1 : 0.1;

  useEffect(() => {
    if (!open) {
      setIsClosing(false);
    }
  }, [open]);

  useEffect(() => {
    if (isElectricSelected) {
      setEngineSizeRange([0, 150]);
    } else {
      setEngineSizeRange([0, 5]);
    }
  }, [isElectricSelected]);

  const handleClose = () => {
    setIsClosing(true);
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    if (modal && overlay) {
      modal.classList.add(styles.closing);
      overlay.classList.add(styles.closing);

      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onClose();
    }
  };

  if (!open) return null;

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
    handleClose();
  };

  const handleResetFilters = () => {
    setSelectedBodyTypeSlug(null);
    setSelectedFuelTypeSlug(null);
    setPriceRange([0, 100000]);
    setYearRange([2000, 2025]);
    setEngineSizeRange([0, isElectricSelected ? 150 : 5]);
    if (onResetFilters) onResetFilters();
  };

  return (
    <div className={styles.overlay} onClick={handleClose} ref={overlayRef}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} ref={modalRef}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Закрити">
          <span className={styles.closeLine1}></span>
          <span className={styles.closeLine2}></span>
        </button>
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
              min={2000}
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
      </div>
    </div>
  );
}