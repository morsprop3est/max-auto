import styles from "./Map.module.scss";

function getDarknessLevel(count) {
  if (count >= 10) return 4;
  if (count >= 5) return 3;
  if (count >= 2) return 2;
  if (count === 1) return 1;
  return 0;
}

export default function Region({ region, isSelected, onClick, count }) {
  const darknessLevel = getDarknessLevel(count);
  const darkness = [1, 0.9, 0.8, 0.7, 0.6][darknessLevel];
  const Svg = region.Svg;
  return (
    <g
      id={`region-${region.id}`}
      className={`${styles.region} ${isSelected ? styles.selected : ""}`}
      transform={`translate(${region.x}, ${region.y})`}
      onClick={(e) => onClick(region, e)}
      style={{ cursor: "pointer" }}
    >
      <Svg style={{ filter: `brightness(${darkness})` }} />
    </g>
  );
}