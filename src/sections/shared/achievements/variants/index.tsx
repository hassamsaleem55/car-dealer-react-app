import AchievementsOne from "../layouts/achievements-one";
import SectionDefaultStyles from "@app-layout-dir/sections/section-layout-one/css/centered.module.css";
import SectionLightStyles from "@app-layout-dir/sections/section-layout-one/css/centered-light.module.css";
import styles from "../layouts/achievements-one/css/default.module.css";
import type { DealerSectionProps } from "@types-dir/dealer-props";

export function AchievementsDefault({ props }: { props: DealerSectionProps }) {
  return (
    <AchievementsOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      SectionStyles={SectionDefaultStyles}
      styles={styles}
    />
  );
}

export function AchievementsLight({ props }: { props: DealerSectionProps }) {
  return (
    <AchievementsOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      SectionStyles={SectionLightStyles}
      styles={styles}
    />
  );
}
