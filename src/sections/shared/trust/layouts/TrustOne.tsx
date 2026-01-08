import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { InfoCardModernLight } from "@components-dir/info-card/variants";
import { useOutletContext } from "react-router-dom";

export default function TrustOne({
  heading,
  subHeading,
  sectionStyles,
}: {
  heading: string;
  subHeading: string;
  sectionStyles: any;
}) {
  const { achievementsData } = useOutletContext<{
    achievementsData: any;
  }>();
  const trustContent = [
    {
      id: 1,
      title: `${achievementsData.availableStockCount}+ Cars in store`,
      description:
        "Choose from reliable, stylish, and affordable cars, all in one convenient location ready for you.",
    },
    {
      id: 2,
      title: "£200 Deposit secures car",
      description:
        "Found your dream car? Secure it for up to 48 hours with a £200 deposit",
    },
    {
      id: 3,
      title: "All Points Check",
      description:
        "Multiple point vehicle inspection and vehicle provenance check for peace of mind",
    },
    {
      id: 4,
      title: "14-Day Refund",
      description:
        "Not sure? We offer a 14 days money back guarantee on all unseen deliveries",
    },
  ];
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
