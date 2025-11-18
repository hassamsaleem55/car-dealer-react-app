import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { trustedPartners } from "@core-dir/services/TrustedPartner.service";
import sectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered.module.css";

export default function TrustedPartnerOne({
  heading,
  subHeading,
  styles,
}: {
  heading: string;
  subHeading: string;
  styles: any;
}) {
  return (
    <SectionLayoutOne
      headingText={heading}
      subHeadingText={subHeading}
      styles={sectionStyles}
    >
      <MotionReveal className={styles["trusted-partner-scroll-wrapper"]}>
        <div className={styles["trusted-partner-scroll"]}>
          {trustedPartners.concat(trustedPartners).map((item, index) => (
            <div key={index} className={styles["trusted-partner-card"]}>
              <img
                src={item.image}
                alt={item.name}
                className={styles["trusted-partner-card__image"]}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </MotionReveal>
    </SectionLayoutOne>
  );
}
