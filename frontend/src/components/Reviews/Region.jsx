import styles from "./Map.module.scss";

export default function Region({ region, isSelected, onClick, children }) {
  return (
    <g
      id={`region-${region.id}`}
      className={`${styles.region} ${isSelected ? styles.selected : ""}`}
      transform={`translate(${region.x}, ${region.y})`}
      onClick={() => onClick(region)}
      style={{ cursor: "pointer" }}
    >
      <image href={region.svgPath} />
      {isSelected && children}
    </g>
  );
}