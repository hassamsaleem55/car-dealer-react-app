import { type FilterCardProps } from "../filter-card.types";
import SimpleStyles from "./css/simple.module.css";
import ModernStyles from "./css/modern.module.css";
import { Link } from "react-router-dom";

export function FilterCardSimple({ type, filterKey, item }: FilterCardProps) {
  return (
    <Link
      to={`/stock?${filterKey.toLowerCase()}=${item.name.toLowerCase()}`}
      key={item.id}
      className={`${SimpleStyles["filter-card"]}`}
    >
      {type === "image" ? (
        <img alt={item.name} src={item.media} />
      ) : type === "icon" ? (
        <div className={SimpleStyles["filter-card-icon"]}>
          {/* SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            {/* SVG content unchanged */}
          </svg>
        </div>
      ) : null}

      <span className={SimpleStyles["filter-card-title"]}>{item.name}</span>
    </Link>
  );
}

export function FilterCardModern({ filterKey, item }: FilterCardProps) {
  return (
    <Link
      to={`/stock?${filterKey.toLowerCase()}=${item.name.toLowerCase()}`}
      key={item.id}
      className={`${ModernStyles["filter-card"]}`}
    >
      <img
        src={item.media}
        alt={item.media}
        onError={(e) => {
          e.currentTarget.src = item.fallbackMedia; // Set fallback image
        }}
        loading="lazy"
      />
      <h3 className={ModernStyles["filter-card-title"]}>{item.name}</h3>
    </Link>
  );
}
