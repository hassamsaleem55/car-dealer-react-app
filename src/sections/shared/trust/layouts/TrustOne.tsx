import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { InfoCardModernLight } from "@components-dir/info-card/variants";
import { trustContent } from "@core-dir/store/TrustContent.data";

export default function TrustOne({
  heading,
  subHeading,
  sectionStyles,
}: {
  heading: string;
  subHeading: string;
  sectionStyles: any;
}) {
  return (
    <SectionLayoutOne
      headingText={heading}
      subHeadingText={subHeading}
      styles={sectionStyles}
    >
      <div className="grid-layout grid-layout__4-cols">
        {trustContent.map((item, index) => (
          <MotionReveal key={item.id} preset="zoomOut" delay={index * 0.2}>
            <InfoCardModernLight item={item} />
          </MotionReveal>
        ))}
      </div>
    </SectionLayoutOne>
  );
}
