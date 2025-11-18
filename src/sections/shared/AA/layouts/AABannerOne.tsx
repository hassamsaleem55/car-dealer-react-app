// import { useMediaQuery } from "react-responsive";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";

export default function AABannerOne() {
  // const isMobile = useMediaQuery({ maxWidth: 639 });
  // const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });

  // const distance = isMobile ? 40 : isTablet ? 100 : 300;

  return (
    <section className="w-full bg-[#FFD302] py-2 px-4 flex flex-row justify-center overflow-hidden items-center gap-4 md:gap-8">
      {/* <MotionReveal preset="slideRight" distance={distance} duration={1.2}> */}
      <MotionReveal preset="slideRight" duration={1.2}>
        <img
          src="../../images/aa-logo-left.jpg"
          alt="AA Logo Left"
          className="w-50 sm:w-86 md:w-86 lg:w-100 object-contain transition-transform duration-300 hover:scale-105"
        />
      </MotionReveal>

      <div className="h-16 md:h-22 w-[3px] bg-black/50 rounded-full" />

      {/* <MotionReveal preset="slideLeft" distance={distance} duration={1.2}> */}
      <MotionReveal preset="slideLeft" duration={1.2}>
        <img
          src="../../images/aa-logo-right.jpg"
          alt="AA Logo Right"
          className="w-36 sm:w-52 md:w-64 lg:w-72 object-contain transition-transform duration-300 hover:scale-105"
        />
      </MotionReveal>
    </section>
  );
}
