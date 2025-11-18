
import HeroOne from "../layouts/hero-one";
import HeroOneHorizontalStyles from "../layouts/hero-one/css/horizontal.module.css";
import HeroOneVerticalLeftStyles from "../layouts/hero-one/css/vertical-left.module.css";
import HeroOneVerticalRightStyles from "../layouts/hero-one/css/vertical-right.module.css";

import FilterOne from "@components-dir/filter/filter-one";
import FilterOneHorizontalStyles from "@components-dir/filter/filter-one/css/horizontal.module.css";
import FilterOneVerticalStyles from "@components-dir/filter/filter-one/css/vertical.module.css";

export function HeroOneHorizontal({ props }: any) {
  const { heading, subHeading } = props;
  return (
    <HeroOne
      heading={heading}
      subHeading={subHeading}
      styles={HeroOneHorizontalStyles}
    >
      <FilterOne styles={FilterOneHorizontalStyles} />
    </HeroOne>
  );
}

export function HeroOneVerticalLeft({ props }: any) {
  return (
    <HeroOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      styles={HeroOneVerticalLeftStyles}
    >
      <FilterOne styles={FilterOneVerticalStyles} />
    </HeroOne>
  );
}

export function HeroOneVerticalRight({ props }: any) {
  return (
    <HeroOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      styles={HeroOneVerticalRightStyles}
    >
      <FilterOne styles={FilterOneVerticalStyles} />
    </HeroOne>
  );
}
