import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import Button from "@elements-dir/button";
import { readySetSold } from "@core-dir/store/ReadySetSold.data";

export default function ReadySetSoldOne({
  heading,
  subHeading,
  sectionStyles,
  readySetSoldStyles,
}: {
  heading: string;
  subHeading: string;
  sectionStyles: any;
  readySetSoldStyles: any;
}) {
  return (
    <SectionLayoutOne
      headingText={heading}
      subHeadingText={subHeading}
      styles={sectionStyles}
    >
      <div className="grid-layout grid-layout__3-cols">
        {readySetSold.map((item, index) => (
          <MotionReveal key={item.id} delay={index * 0.15}>
            <div
              key={item.id}
              className={readySetSoldStyles["ready-set-sold-card"]}
            >
              <img src={item.imgSrc} alt={item.title} />
              <div
                className={readySetSoldStyles["ready-set-sold-card__content"]}
              >
                <div
                  className={readySetSoldStyles["ready-set-sold-card__title"]}
                >
                  <div
                    className={
                      readySetSoldStyles["ready-set-sold-card__number"]
                    }
                  >
                    {index + 1}
                  </div>
                  <div>{item.title}</div>
                </div>

                <div
                  className={
                    readySetSoldStyles["ready-set-sold-card__description"]
                  }
                >
                  {item.description}
                </div>
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
      <Button
        variant="primary"
        btnText="Sell your car today"
        widthUtilities="w-auto mx-auto mt-6"
      />
    </SectionLayoutOne>
  );
}
