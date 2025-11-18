import { type InfoCardProps } from "../info-card.types";
import SimpleStyles from "./css/base.module.css";
import ModernLight from "./css/modern-light.module.css";
import ModernDark from "./css/modern-dark.module.css";

export function InfoCardSimple({ item }: { item: InfoCardProps }) {
  return <InfoCardBase item={item} styles={SimpleStyles} />;
}

export function InfoCardModernLight({ item }: { item: InfoCardProps }) {
  return <InfoCardBase item={item} styles={ModernLight} />;
}

export function InfoCardModernDark({ item }: { item: InfoCardProps }) {
  return <InfoCardBase item={item} styles={ModernDark} />;
}

function InfoCardBase({ item, styles }: { item: InfoCardProps; styles: any }) {
  return (
    <div key={item.id} className={styles["info-card"]}>
      <div className={styles["info-card__title"]}>{item.title}</div>
      <div className={styles["info-card__description"]}>{item.description}</div>
    </div>
  );
}
