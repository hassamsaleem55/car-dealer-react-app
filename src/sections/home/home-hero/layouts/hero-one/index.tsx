import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import HeroImg from "@dealers-dir/images/hero.jpg";
import { Shield, Award, Clock, CheckCircle2, Star, TrendingUp } from "lucide-react";

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
  const trustFeatures = [
    { icon: Shield, text: "Warranty Protected" },
    { icon: Award, text: "Quality Assured" },
    { icon: Clock, text: "24/7 Support" },
    { icon: CheckCircle2, text: "HPI Checked" },
  ];

  const stats = [
    { value: "500+", label: "Premium Vehicles" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "15+", label: "Years Experience" },
  ];

  return (
    <>
      <section className={styles["hero"]}>
        <img
          src={HeroImg}
          alt="Hero background"
          className={styles["hero-bg"]}
        />
        
        {/* Gradient Overlay */}
        <div className={styles["hero-overlay"]}></div>
        
        {/* Decorative Elements */}
        <div className={styles["hero-decorative-top"]}></div>
        <div className={styles["hero-decorative-bottom"]}></div>

        <div className={styles["hero-content"]}>
          <div className={styles["hero-text"]}>
            {/* Premium Badge */}
            <MotionReveal preset="fadeIn">
              <div className={styles["hero-badge"]}>
                <Star className="w-4 h-4" fill="currentColor" />
                <span>Premium Car Dealership</span>
                <TrendingUp className="w-4 h-4" />
              </div>
            </MotionReveal>

            <MotionReveal preset="slideDown">
              <h1 className={styles["hero-title"]}>
                {heading}
                <span className={styles["hero-title-accent"]}>.</span>
              </h1>
            </MotionReveal>

            <MotionReveal preset="zoomOut">
              <p className={styles["hero-subtitle"]}>{subHeading}</p>
            </MotionReveal>

            {/* Trust Features */}
            <MotionReveal preset="fadeIn" delay={0.2}>
              <div className={styles["hero-features"]}>
                {trustFeatures.map((feature, index) => (
                  <div key={index} className={styles["hero-feature"]}>
                    <feature.icon className={styles["hero-feature-icon"]} />
                    <span className={styles["hero-feature-text"]}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>

          <MotionReveal
            preset="slideUp"
            className={styles["hero-filter__wrapper"]}
          >
            {children}
          </MotionReveal>

          {/* Stats Section */}
          <MotionReveal preset="fadeIn" delay={0.4}>
            <div className={styles["hero-stats"]}>
              {stats.map((stat, index) => (
                <div key={index} className={styles["hero-stat"]}>
                  <div className={styles["hero-stat-value"]}>{stat.value}</div>
                  <div className={styles["hero-stat-label"]}>{stat.label}</div>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>
      <div className={styles["hero-filter__wrapper-mobile"]}>{children}</div>
    </>
  );
}
