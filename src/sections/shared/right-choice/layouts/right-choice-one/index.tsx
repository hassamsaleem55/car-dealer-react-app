import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { rightChoice } from "@core-dir/store/RightChoice.data";

export default function RightChoiceOne({
  heading,
  subHeading,
  sectionStyles,
  rightChoiceStyles,
}: {
  heading: string;
  subHeading: string;
  sectionStyles: any;
  rightChoiceStyles: any;
}) {
  return (
    <SectionLayoutOne
      headingText={heading}
      subHeadingText={subHeading}
      styles={sectionStyles}
    >
      <div className="grid-layout grid-layout__4-cols">
        {rightChoice.map((item, index) => (
          <MotionReveal key={item.id} preset="flipIn" delay={index * 0.15}>
            <div
              key={item.id}
              className={rightChoiceStyles["right-choice-card"]}
            >
              <div className={rightChoiceStyles["right-choice-card__title"]}>
                <div className={rightChoiceStyles["right-choice-card__number"]}>
                  {index + 1}
                </div>
                <div>{item.title}</div>
              </div>

              <div
                className={rightChoiceStyles["right-choice-card__description"]}
              >
                {item.description}
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
    </SectionLayoutOne>
  );
}
