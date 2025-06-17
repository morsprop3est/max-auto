import styles from './DashboardLotCard.module.scss';

import PhotoSlider from "../PhotoSlider/PhotoSlider";

export default function DashboardLotCard({ lot, bodyTypes, fuelTypes }) {
  const bodyType = bodyTypes.find((type) => type.id === lot.bodyTypeId)?.name || "Невідомо";
  const fuelType = fuelTypes.find((type) => type.id === lot.fuelTypeId)?.name || "Невідомо";
  const isActive = lot.status === "active";

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
            <div>Об'єм: {lot.engineSize} л</div>
            <div>Трансмісія: {lot.transmission}</div>
            <div>Привід: {lot.drive}</div>
          </div>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.lotPrice}>Ціна: <span>{lot.price} $</span></div>
          <div className={`${styles.statusText} ${isActive ? styles.active : styles.inactive}`}>
            {isActive ? "В наявності" : "Немає в наявності"}
          </div>
        </div>
      </div>
    </div>
  );
}