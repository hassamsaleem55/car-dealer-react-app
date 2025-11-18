import { type DealerSectionProps} from "@types-dir/dealer-props";

import centeredDefaultSectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered.module.css";

import ReadySetSoldOne from "../layouts/ready-set-sold-one";
import readySetSoldOnestyles from "../layouts/ready-set-sold-one/css/modern-light.module.css";

export function ReadySetSoldDefault({ props }: { props: DealerSectionProps; }) {
  return (
    <ReadySetSoldOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={centeredDefaultSectionStyles}
      readySetSoldStyles={readySetSoldOnestyles}
    />
  );
}
