import { type DealerSectionProps } from "@types-dir/dealer-props";
import PagesHeroOne from "../layouts/pages-hero-one";

export function PagesHeroDefault({ props }: { props: DealerSectionProps }) {
  return (
    <PagesHeroOne
      title={props.title || ""}
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
    />
  );
}
