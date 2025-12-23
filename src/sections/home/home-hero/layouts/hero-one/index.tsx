import { useOutletContext } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import {
  Shield,
  Award,
  Clock,
  CheckCircle2,
  Star,
  TrendingUp,
  StarIcon,
} from "lucide-react";
import { AutoTraderIconLogo, GoogleIconLogo } from "@core-dir/svgs";

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
  const { dealerData } = useDealerContext();
  const { achievementsData } = useOutletContext<{
    achievementsData: any;
  }>();
  const trustFeatures = [
    { icon: Shield, text: "Warranty Protected" },
    { icon: Award, text: "Quality Assured" },
    { icon: Clock, text: "24/7 Support" },
    { icon: CheckCircle2, text: "HPI Checked" },
  ];

  const stats = [
    {
      value: `${achievementsData.availableStockCount}+`,
      label: "Premium Vehicles",
    },
    { value: "97%", label: "Customer Satisfaction" },
    { value: "11+", label: "Years Experience" },
  ];

  return (
    <>
      <section className={styles["hero"]}>
        <video
          src="https://cdn.pixabay.com/video/2023/04/10/158316-816359649_large.mp4"
          className={styles["hero-bg"]}
          muted
          autoPlay
          loop
          playsInline
        />

        {/* Gradient Overlay */}
        <div className={styles["hero-overlay"]}></div>

        <div className={styles["hero-content"]}>
          <MotionReveal preset="fadeIn">
            <div className={styles["hero-badge"]}>
              <Star
                className="w-4 h-4 text-primary animate-pulse"
                fill="currentColor"
              />
              <span>Premium Car Dealership</span>
              <TrendingUp className="w-4 h-4" />
            </div>
          </MotionReveal>
          <div className={styles["hero-text"]}>
            {/* Premium Badge */}

            <MotionReveal preset="slideDown">
              <h1 className={styles["hero-title"]}>
                {heading.split(".").map((part, index, arr) => (
                  <span key={index}>
                    <span>{part}</span>
                    {index !== arr.length - 1 && (
                      <span className={styles["hero-title-accent"]}>.</span>
                    )}
                  </span>
                ))}
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
            <MotionReveal preset="fadeIn" delay={0.2}>
              <div className="flex flex-row gap-8 md:gap-18 w-full items-center justify-center">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto justify-center">
                  <GoogleIconLogo className="w-6 h-6 md:w-8 md:h-8" />
                  <div className="flex flex-col items-center">
                    <p className="flex gap-2 items-center text-sm md:text-base text-white/90">
                      <span className="font-bold">4.8</span>
                      <span className="text-xs">(75+ reviews)</span>
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          fill="currentColor"
                          className="w-3 h-3 text-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto justify-center">
                  <AutoTraderIconLogo className="w-8 h-8 md:w-12 md:h-12" />
                  <div className="flex flex-col items-center">
                    <p className="flex gap-2 items-center text-sm md:text-base text-white/90">
                      <span className="font-bold">4.8</span>
                      <span className="text-xs">(75+ reviews)</span>
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          fill="currentColor"
                          className="w-3 h-3 text-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal
            preset="slideUp"
            className={styles["hero-filter__wrapper"]}
          >
            {children}
          </MotionReveal>

          {/* Stats Section --- web */}
          <MotionReveal preset="fadeIn" delay={0.4}>
            <div className={styles["hero-stats__web"]}>
              {stats.map((stat, index) => (
                <div key={index} className={styles["hero-stat"]}>
                  <div className={styles["hero-stat-value"]}>{stat.value}</div>
                  <div className={styles["hero-stat-label"]}>{stat.label}</div>
                </div>
              ))}
            </div>
          </MotionReveal>

          {/* Stats Section --- mobile */}
          <MotionReveal preset="fadeIn" delay={0.4}>
            <div className="md:hidden flex flex-row justify-center rounded-lg gap-8 px-4 py-4 border border-primary/50 bg-white/10">
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-4xl">{stat.value}</div>
                  <div className="text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </MotionReveal>

          <div className="bg-white/30 md:absolute md:z-50 flex flex-row md:flex-col md:right-2 gap-3 md:gap-2 p-2 rounded-lg shadow-lg">
            {Object.entries(dealerData?.SocialMediaInfo || {}).map(
              ([platform, url]) => {
                if (!url || typeof url !== "string") return null; // skip empty links

                let iconSrc = "";
                if (platform === "Facebook") {
                  iconSrc = "/images/social/facebook.png";
                } else if (platform === "Instagram") {
                  iconSrc = "/images/social/instagram.png";
                } else if (platform === "LinkedIn") {
                  iconSrc = "/images/social/linkedin.png";
                } else if (platform === "YouTube") {
                  iconSrc = "/images/social/youtube.png";
                } else if (platform === "Twitter") {
                  iconSrc = "/images/social/twitter.png";
                } else {
                  return null;
                }

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-md group hover:scale-105 hover:bg-white/80 transition-all duration-300"
                    aria-label={platform}
                  >
                    <img
                      src={iconSrc}
                      alt={platform}
                      className="w-4.5 h-4.5 object-contain group-hover:scale-110 transition-all duration-300"
                    />
                  </a>
                );
              }
            )}
          </div>
        </div>
      </section>
      <div className={styles["hero-filter__wrapper-mobile"]}>{children}</div>
    </>
  );
}
