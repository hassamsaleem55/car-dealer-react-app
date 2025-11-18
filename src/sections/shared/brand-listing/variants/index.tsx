import BrandListingOne from "../layouts/BrandListingOne";
import { type DealerSectionProps } from "@types-dir/dealer-props";

export function BrandListingDefault({ props }: { props: DealerSectionProps; }) {
  return <BrandListingOne heading={props.heading || ""} />;
}
