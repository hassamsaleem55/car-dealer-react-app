import TrustedPartnerOne from "@sections-dir/shared/trusted-partner/layouts/trusted-partner-one";
import { type DealerSectionProps} from "@types-dir/dealer-props";
import TrustedOneStyles from "../layouts/trusted-partner-one/css/default.module.css";

export function TrustedPartnerDefault({ props }: { props: DealerSectionProps; }) {
  return (
    <TrustedPartnerOne
      heading={props.heading || ""}
      subHeading={props.subHeading || ""}
      styles={TrustedOneStyles}
    />
  );
}
