import styles from "./Map.module.scss";

export default function Region({ region, isSelected, onClick, children }) {
  const Svg = region.Svg;
  return (
    <g
      id={`region-${region.id}`}
      className={`${styles.region} ${isSelected ? styles.selected : ""}`}
      transform={`translate(${region.x}, ${region.y})`}
      onClick={(e) => onClick(region, e)}
      style={{ cursor: "pointer" }}
    >
      <Svg />
      {isSelected && children}
    </g>
  );
}