import TrustOne from "../layouts/TrustOne";
import { type DealerSectionProps} from "@types-dir/dealer-props";

import CenteredSectionDefaultStyles from "@app-layout-dir/sections/section-layout-one/css/centered.module.css";
import CenteredSectionLightStyles from "@app-layout-dir/sections/section-layout-one/css/centered-light.module.css";
import CenteredSectionDarkStyles from "@app-layout-dir/sections/section-layout-one/css/centered-dark.module.css";

export function TrustDefault({ props }: { props: DealerSectionProps; }) {
  return (
    <TrustOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={CenteredSectionDefaultStyles}
    />
  );
}

export function TrustLight({ props }: { props: DealerSectionProps; }) {
  return (
    <TrustOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={CenteredSectionLightStyles}
    />
  );
}

export function TrustDark({ props }: { props: DealerSectionProps; }) {
  return (
    <TrustOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={CenteredSectionDarkStyles}
    />
  );
}

export function TrustFarhan({ props }: { props: DealerSectionProps; }) {
  return (
    <TrustOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      sectionStyles={CenteredSectionDarkStyles}
    />
  );
}
