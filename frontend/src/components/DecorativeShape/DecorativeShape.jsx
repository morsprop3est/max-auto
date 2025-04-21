import React from 'react';
import styles from './DecorativeShape.module.scss';

export default function DecorativeShape({
  width = 200, // Ширина центрального блоку
  height = 100, // Висота центрального блоку
  text = '', // Текст всередині
}) {
  // Довжина сторін трикутників дорівнює висоті центрального блоку
  const triangleSize = height;

  return (
    <div
      className={styles.decorativeShape}
      style={{ width: `${width + 2 * triangleSize}px`, height: `${height}px` }}
    >
      {/* Лівий трикутник */}
      <div
        className={styles.leftTriangle}
        style={{
          borderBottomWidth: `${triangleSize}px`,
          borderRightWidth: `${triangleSize}px`,
        }}
      ></div>

      {/* Центральний блок із текстом */}
      <div
        className={styles.centerBlock}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {text}
      </div>

      {/* Правий трикутник */}
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