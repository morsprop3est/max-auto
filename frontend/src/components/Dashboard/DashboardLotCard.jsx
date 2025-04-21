import styles from './DashboardLotCard.module.scss';

export default function DashboardLotCard({ lot }) {
  return (
    <div className={styles.lotCard}>
      <img src={lot.image} alt={lot.title} className={styles.lotImage} />
      <div className={styles.lotInfo}>
        <h3 className={styles.lotTitle}>{lot.title}</h3>
        <p>Рік: {lot.year}</p>
        <p>Кузов: {lot.bodyType}</p>
        <p>Паливо: {lot.fuelType}</p>
      </div>
      <div className={styles.lotDetails}>
        <p>Ціна: {lot.price}</p>
        <p>Пробіг: {lot.mileage}</p>
      </div>
      <button className={styles.addButton}>+</button>
    </div>
  );
}