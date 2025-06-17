import styles from './DashboardLotCardSkeleton.module.scss';

export default function DashboardLotCardSkeleton() {
  return (
    <div className={styles.lotCardSkeleton}>
      <div className={styles.lotCol}>
        <div className={styles.imageSkeleton} />
      </div>
      <div className={styles.lotCol}>
        <div className={styles.titleSkeleton} />
        <div className={styles.yearSkeleton} />
        <div className={styles.bodyFuelSkeleton} />
        <div className={styles.priceSkeleton} />
      </div>
      <div className={styles.lotCol}>
        <div className={styles.infoSkeleton} />
        <div className={styles.infoSkeleton} />
        <div className={styles.infoSkeleton} />
        <div className={styles.infoSkeleton} />
      </div>
      <div className={styles.lotCol}>
        <div className={styles.statusSkeleton} />
      </div>
    </div>
  );
} 