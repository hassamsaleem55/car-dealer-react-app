import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import HeroImg from "@dealers-dir/images/hero.jpg";

export default function index({
  heading,
  subHeading,
  styles,
  children,
}: {
  heading: string;
  subHeading: string;
  styles: any;
  children?: React.ReactNode;
}) {
  return (
    <section className={styles["hero"]}>
      <img
        src={HeroImg}
        alt="Hero background"
        className={styles["hero-bg"]}
      />

      <div className={styles["hero-content"]}>
        <div className={styles["hero-text"]}>
          <MotionReveal preset="slideDown">
            <h1 className={styles["hero-title"]}>{heading}</h1>
          </MotionReveal>
          <MotionReveal preset="zoomOut">
            <p className={styles["hero-subtitle"]}>{subHeading}</p>
          </MotionReveal>
        </div>
        <MotionReveal
          preset="slideUp"
          className={styles["hero-filter__wrapper"]}
        >
          {children}
        </MotionReveal>
      </div>

      {/* Mobile-only Filter */}
      <div className={styles["hero-filter__wrapper-mobile"]}>{children}</div>
    </section>
  );
}
