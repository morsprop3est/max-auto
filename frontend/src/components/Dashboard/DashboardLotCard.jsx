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

  return (
    <div className={styles.lotCard}>
      <img src={lot.image} alt={lot.title} className={styles.lotImage} />
      <div className={styles.lotInfo}>
        <h3 className={styles.lotTitle}>{lot.title}</h3>
        <p>Рік: {lot.year}</p>
        <p>Кузов: {bodyType}</p>
        <p>Паливо: {fuelType}</p>
        <p>Ціна: {lot.price} $</p>
        <p>Пробіг: {lot.odometer} км</p>
        <p>Об'єм двигуна: {lot.engineSize} л</p>
        <p>Колір: {lot.color}</p>
        <p>Трансмісія: {lot.transmission}</p>
        <p>Привід: {lot.drive}</p>
        <p>Статус: {lot.status}</p>
        <a href={lot.link} target="_blank" rel="noopener noreferrer" className={styles.lotLink}>
          Детальніше
        </a>
      </div>
    </div>
  );
}