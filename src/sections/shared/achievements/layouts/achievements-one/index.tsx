import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { achievements } from "@core-dir/store/Achievements.data";

export default function AchievementsOne({
  heading,
  subHeading,
  SectionStyles,
  styles,
}: {
  heading: string;
  subHeading: string;
  SectionStyles: any;
  styles: any;
}) {
  return (
    <SectionLayoutOne
      headingText={heading}
      subHeadingText={subHeading}
      styles={SectionStyles}
    >
      <div className={styles["achievements-wrapper"]}>
        {achievements.map((item, index) => (
          <AchievementCard
            key={item.id}
            title={item.title}
            value={item.value}
            suffix={item.suffix}
            delay={index * 0.15}
            styles={styles}
          />
        ))}
      </div>
    </SectionLayoutOne>
  );
}

function AchievementCard({
  title,
  value,
  suffix = "+",
  delay = 0,
  styles,
}: {
  title: string;
  value: number;
  suffix?: string;
  delay?: number;
  styles: any;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState("0");

  // update display value smoothly
  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(new Intl.NumberFormat("en-US").format(Math.floor(latest)));
    });
    return () => unsubscribe();
  }, [spring]);

  useEffect(() => {
    if (isInView) count.set(value);
  }, [isInView, value, count]);

  return (
    <div ref={ref}>
      <MotionReveal delay={delay} className={`${styles["achievements-info"]} group`}>
        <h3 className={styles["achievements-value"]}>
          <motion.span>{display}</motion.span>
          {suffix}
        </h3>
        <p className={styles["achievements-title"]}>{title}</p>
      </MotionReveal>
    </div>
  );
}
