import { type DealerSectionProps } from "@types-dir/dealer-props";
import centeredDefaultSectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered.module.css";
import centeredWhiteBGSectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered-white.module.css";
// import centeredWhiteCarDetailsStyles from "@app-layout-dir/sections/section-layout-one/css/centered-white.car-details.module.css";
import centeredLightSectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered-light.module.css";
import centeredDarkSectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered-dark.module.css";
import RightChoiceOne from "@sections-dir/shared/right-choice/layouts/right-choice-one";
import defaultRightChoiceOneStyles from "../layouts/right-choice-one/css/modern-light.module.css";
import carDetailsRightChoiceOneStyles from "../layouts/right-choice-one/css/modern-light.car-details.module.css";
import darkRightChoiceOneStyles from "../layouts/right-choice-one/css/modern-dark.module.css";

export function RightChoiceDefault({ props }: { props: DealerSectionProps }) {
  return (
    <RightChoiceOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={centeredDefaultSectionStyles}
      rightChoiceStyles={defaultRightChoiceOneStyles}
    />
  );
}

export function RightChoiceWithWhiteBG({
  props,
}: {
  props: DealerSectionProps;
}) {
  return (
    <RightChoiceOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={centeredWhiteBGSectionStyles}
      rightChoiceStyles={defaultRightChoiceOneStyles}
    />
  );
}

export function RightChoiceForDetailsPage({
  props,
}: {
  props: DealerSectionProps;
}) {
  return (
    <RightChoiceOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={centeredDefaultSectionStyles}
      rightChoiceStyles={carDetailsRightChoiceOneStyles}
    />
  );
}

export function RightChoiceLight({ props }: { props: DealerSectionProps }) {
  return (
    <RightChoiceOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={centeredLightSectionStyles}
      rightChoiceStyles={defaultRightChoiceOneStyles}
    />
  );
}

export function RightChoiceDark({ props }: { props: DealerSectionProps }) {
  return (
    <RightChoiceOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={centeredDarkSectionStyles}
      rightChoiceStyles={darkRightChoiceOneStyles}
    />
  );
}
