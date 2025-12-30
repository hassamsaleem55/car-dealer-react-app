import { useDealerContext } from "@core-dir/dealer-provider";
import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
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
  const { dealerData } = useDealerContext();
  const imageRootPath = "../images/finance-logos/";
  return (
    <SectionLayoutOne
      headingText={heading}
      subHeadingText={subHeading}
      styles={sectionStyles}
    >
      <div className={styles["trusted-partner-wrapper"]}>
        <MotionReveal>
          <div className={styles["trusted-partner-container"]}>
            {dealerData.CompanyFinanceDetails?.FinanceCompanies.map(
              (item: string, index: number) => (
                <div
                  key={`${item}-${index}`}
                  className={`${styles["trusted-partner-card"]}`}
                >
                  <img
                    src={`${imageRootPath}${item}.webp`}
                    alt={item}
                    className={styles["trusted-partner-card__image"]}
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>
        </MotionReveal>
      </div>
    </SectionLayoutOne>
  );
}
