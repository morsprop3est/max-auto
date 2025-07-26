import styles from './DashboardLotCard.module.scss';

import PhotoSlider from "../PhotoSlider/PhotoSlider";

export default function DashboardLotCard({ lot, bodyTypes, fuelTypes }) {
  const bodyType = bodyTypes.find((type) => type.id === lot.bodyTypeId)?.name || "Невідомо";
  const fuelType = fuelTypes.find((type) => type.id === lot.fuelTypeId)?.name || "Невідомо";
  const isActive = lot.status === "active";
  
  const isElectric = fuelType.toLowerCase().includes('електро') || 
                     fuelType.toLowerCase().includes('electric') ||
                     fuelType.toLowerCase().includes('електричний') ||
                     fuelType.toLowerCase().includes('гібрид') ||
                     fuelType.toLowerCase().includes('hybrid');
  
  const engineDisplay = isElectric 
    ? `Потужність: ${lot.engineSize} кВт`
    : `Об'єм: ${lot.engineSize} л`;

  const getColorLabel = (color) => {
    const colorMap = {
      'White': 'Білий',
      'Black': 'Чорний',
      'Silver': 'Срібний',
      'Gray': 'Сірий',
      'Red': 'Червоний',
      'Blue': 'Синій',
      'Green': 'Зелений',
      'Yellow': 'Жовтий',
      'Orange': 'Помаранчевий',
      'Purple': 'Фіолетовий',
      'Brown': 'Коричневий',
      'Beige': 'Бежевий',
      'Pink': 'Рожевий',
      'Gold': 'Золотий',
      'Bronze': 'Бронзовий'
    };
    return colorMap[color] || color;
  };

  const getTransmissionLabel = (transmission) => {
    const transmissionMap = {
      'Automatic': 'Автоматична',
      'Manual': 'Механічна',
      'CVT': 'Безступінчаста',
      'Semi-Automatic': 'Напівавтоматична'
    };
    return transmissionMap[transmission] || transmission;
  };

  const BASE_URL = process.env.NEXT_PUBLIC_URL || "";
  const photoUrls = (lot.photos || []).map(photo =>
    photo.photoUrl.startsWith("http")
      ? photo.photoUrl
      : `${BASE_URL}${photo.photoUrl}`
  );

  return (
    <div className={styles.lotCard}>
      <div className={styles.lotCol}>
        {photoUrls.length > 1 ? (
          <PhotoSlider photos={photoUrls} />
        ) : photoUrls.length === 1 ? (
          <img src={photoUrls[0]} alt={lot.title} className={styles.lotImage} />
        ) : (
          <img src="/default-preview.svg" alt="default" />
        )}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.mainInfo}>
          <div className={styles.lotTitle}>{lot.title}</div>
          <div className={styles.lotYear}>Рік: {lot.year}</div>
          <div className={styles.lotBodyFuel}>
            <span>{bodyType}</span>
            <span>{fuelType}</span>
          </div>
          <div className={styles.lotDetails}>
            <div>Пробіг: {lot.odometer} км</div>
            <div>{engineDisplay}</div>
            <div>Трансмісія: {getTransmissionLabel(lot.transmission)}</div>
            <div>Привід: {lot.drive}</div>
            {lot.color && <div>Колір: {getColorLabel(lot.color)}</div>}
          </div>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.lotPrice}>
            Ціна: <span>{lot.price === 0 ? "не вказана" : `${lot.price} $`}</span>
          </div>
          <div className={`${styles.statusText} ${isActive ? styles.active : styles.inactive}`}>
            {isActive ? "В наявності" : "Немає в наявності"}
          </div>
        </div>
      </div>
    </div>
  );
}