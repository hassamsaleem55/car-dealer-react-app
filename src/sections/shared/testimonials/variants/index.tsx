import { type DealerSectionProps} from "@types-dir/dealer-props";
import TestimonialsOne from "../layouts/testimonials-one";
import styles from "../layouts/testimonials-one/css/base.module.css";

export function TestimonialsDefault({ props }: { props: DealerSectionProps; }) {
  return (
    <TestimonialsOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      styles={styles}
    />
  );
}
