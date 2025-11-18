import { type DealerSectionProps} from "@types-dir/dealer-props";
import FaqOne from "../layouts/faq-one";
import styles from "../layouts/faq-one/css/default.module.css";

export function FaqDefault({ props }: { props: DealerSectionProps; }) {
  return <FaqOne heading={props.heading || ""} styles={styles} />;
}
