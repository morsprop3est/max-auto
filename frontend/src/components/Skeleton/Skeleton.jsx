import React from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.scss';

const Skeleton = ({ type = 'content', lines = 3 }) => {
  if (type === 'text') {
    return (
      <div className={styles.skeletonWrapper}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={clsx(styles.skeleton, styles.wave, styles.textLine)}
            style={{ width: `${90 - i * 5}%` }}
          />
        ))}
      </div>
    );
  }

  return <div className={clsx(styles.skeleton, styles.wave, styles.content)} />;
};

export default Skeleton;
