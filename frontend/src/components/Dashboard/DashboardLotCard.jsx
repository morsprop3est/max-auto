import styles from './DashboardLotCard.module.scss';

const bodyTypes = [
  { id: 1, name: "Седан" },
  { id: 2, name: "Хетчбек" },
  { id: 3, name: "Універсал" },
  { id: 4, name: "Купе" },
  { id: 5, name: "Позашляховик" },
  { id: 6, name: "Кросовер" },
  { id: 7, name: "Пікап" },
  { id: 8, name: "Мінівен" },
];

const fuelTypes = [
  { id: 1, name: "Бензин" },
  { id: 2, name: "Дизель" },
  { id: 3, name: "Електро" },
  { id: 4, name: "Гібрид" },
];

export default function DashboardLotCard({ lot }) {
  const bodyType = bodyTypes.find((type) => type.id === lot.bodyTypeId)?.name || "Невідомо";
  const fuelType = fuelTypes.find((type) => type.id === lot.fuelTypeId)?.name || "Невідомо";
  const isActive = lot.status === "active";

  return (
    <div className={styles.lotCard}>
      <div className={styles.lotCol}>
        <img src={lot.image} alt={lot.title} className={styles.lotImage} />
      </div>
      <div className={styles.lotCol}>
        <div className={styles.lotTitle}>{lot.title}</div>
        <div className={styles.lotYear}>Рік: {lot.year}</div>
        <div className={styles.lotBodyFuel}>
          <span>{bodyType}</span>
          <span>{fuelType}</span>
        </div>
        <div className={styles.lotPrice}>Ціна: <span>{lot.price} $</span></div>
      </div>
      <div className={styles.lotCol}>
        <div>Пробіг: {lot.odometer} км</div>
        <div>Об'єм: {lot.engineSize} л</div>
        <div>Трансмісія: {lot.transmission}</div>
        <div>Привід: {lot.drive}</div>
      </div>
      <div className={styles.lotCol} style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
        <button
          className={`${styles.statusButton} ${isActive ? styles.active : styles.inactive}`}
          disabled={!isActive}
        >
          {isActive ? (
            <img src="/dashboardIcons/active.svg" alt="active" className={styles.statusIcon} />
          ) : (
            <img src="/dashboardIcons/inactive.svg" alt="inactive" className={styles.statusIcon} />
          )}
        </button>
      </div>
    </div>
  );
}