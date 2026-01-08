import BodyTypeOne from "../layouts/BodyTypeOne";
import type { DealerSectionProps } from "@types-dir/dealer-props";

export function BodyTypeDefault({ props }: { props: DealerSectionProps }) {
  return <BodyTypeOne heading={props.heading || ""} />;
}
