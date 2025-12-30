// import { useMediaQuery } from "react-responsive";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";

export default function AABannerOne() {
  // const isMobile = useMediaQuery({ maxWidth: 639 });
  // const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });

  // const distance = isMobile ? 40 : isTablet ? 100 : 300;

  return (
    <section className="w-full bg-[#FFD302] overflow-hidden flex flex-row justify-center items-center py-1.5 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 lg:px-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
      {/* <MotionReveal preset="slideRight" distance={distance} duration={1.2}> */}
      <MotionReveal preset="slideRight" duration={1.2}>
        <img
          src="../../images/AACars/aa-logo-left.webp"
          alt="AA Logo Left"
          className="object-contain transition-transform duration-300 hover:scale-105 w-60 sm:w-80 md:w-100 lg:w-125"
        />
      </MotionReveal>

      <div className="h-16 sm:h-24 md:30 lg:h-34 w-[3px] bg-black/50 rounded-full" />

      {/* <MotionReveal preset="slideLeft" distance={distance} duration={1.2}> */}
      <MotionReveal preset="slideLeft" duration={1.2}>
        <img
          src="../../images/AACars/aa-standards-trading.webp"
          alt="AA Logo Right"
          className="w-36 sm:w-52 md:w-64 lg:w-68 object-contain transition-transform duration-300 hover:scale-105"
        />
      </MotionReveal>
    </section>
  );
}
