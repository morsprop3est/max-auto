import React from 'react';
import styles from './DecorativeShape.module.scss';

export default function DecorativeShape({
  width = 200, 
  height = 100, 
  text = '', 
}) {
  const triangleSize = height;

  return (
    <div
      className={styles.decorativeShape}
      style={{ width: `${width + 2 * triangleSize}px`, height: `${height}px` }}
    >
      <div
        className={styles.leftTriangle}
        style={{
          borderBottomWidth: `${triangleSize}px`,
          borderRightWidth: `${triangleSize}px`,
        }}
      ></div>

      <div
        className={styles.centerBlock}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {text}
      </div>

      <div
        className={styles.rightTriangle}
        style={{
          borderTopWidth: `${triangleSize}px`,
          borderLeftWidth: `${triangleSize}px`,
        }}
      ></div>
    </div>
  );
}