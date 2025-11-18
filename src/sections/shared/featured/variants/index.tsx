import FeaturedOne from "../layouts/FeaturedOne";
import { type DealerSectionProps} from "@types-dir/dealer-props";

export function FeaturedDefault({ props }: { props: DealerSectionProps; }) {
  return <FeaturedOne heading={props.heading || ""} />;
}
