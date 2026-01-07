import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useAnimation,
  AnimatePresence,
  type MotionProps,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { type MotionRevealProps } from "./framer-motion.types";

export default function MotionReveal(props: Partial<MotionRevealProps>) {
  const {
    children,
    trigger = "inView",
    once = false,
    distance = 80,
    delay = 0,
    duration = 0.6,
    preset = "floatIn",
    className = "",
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once, margin: "-100px" });
  
  // Track window width in state to avoid forced reflows
  const [windowWidth, setWindowWidth] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Use ResizeObserver for efficient window size tracking
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateWidth = () => {
      // Use requestAnimationFrame to batch layout reads
      requestAnimationFrame(() => {
        setWindowWidth(window.innerWidth);
      });
    };

    // Initial size
    updateWidth();

    window.addEventListener("resize", updateWidth, { passive: true });
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Responsive distance based on screen size
  const getResponsiveDistance = () => {
    if (windowWidth < 640) return Math.min(distance, 30); // Mobile: max 30px
    if (windowWidth < 1024) return Math.min(distance, 50); // Tablet: max 50px
    return distance; // Desktop: original value
  };

  const responsiveDistance = getResponsiveDistance();
  
  // Reduce duration and complexity on mobile
  const responsiveDuration = windowWidth < 768 ? Math.min(duration, 0.3) : duration;
  const simplifyAnimations = windowWidth < 768;

  /** All animation presets */
  const offsets = {
    // Basic Slides
    slideUp: { y: responsiveDistance, x: 0 },
    slideDown: { y: -responsiveDistance, x: 0 },
    slideLeft: { x: responsiveDistance, y: 0 },
    slideRight: { x: -responsiveDistance, y: 0 },

    // Fade / Zoom - simplify on mobile
    fadeIn: { x: 0, y: 0 },
    zoomIn: simplifyAnimations ? {} : { scale: 0.8 },
    zoomOut: simplifyAnimations ? {} : { scale: 1.2 },

    // Rotations - disable on mobile
    rotateIn: simplifyAnimations ? { y: responsiveDistance } : { rotate: -15 },
    rotateInDownLeft: simplifyAnimations 
      ? { y: responsiveDistance }
      : { rotate: -25, x: -responsiveDistance, y: responsiveDistance },
    rotateInUpRight: simplifyAnimations
      ? { y: -responsiveDistance }
      : { rotate: 25, x: responsiveDistance, y: -responsiveDistance },

    // Flips - disable on mobile
    flipIn: simplifyAnimations ? { y: responsiveDistance } : { rotateY: 90 },
    flipX: simplifyAnimations ? { y: responsiveDistance } : { rotateX: 90 },

    // Advanced - simplify on mobile
    bounceUp: { y: responsiveDistance },
    bounceDown: { y: -responsiveDistance },
    popIn: simplifyAnimations ? { opacity: 0 } : { scale: 0.5, opacity: 0 },
    skewIn: simplifyAnimations ? { opacity: 0 } : { skewX: 15, opacity: 0 },
    tiltIn: simplifyAnimations ? { opacity: 0 } : { rotateZ: -10, opacity: 0 },
    blurIn: simplifyAnimations ? { opacity: 0 } : { filter: "blur(8px)", opacity: 0 },
    floatIn: { y: responsiveDistance / 2, opacity: 0 },

    none: {},
  }[preset];

  /** Dynamic transitions depending on preset */
  const transitionMap = {
    bounceUp: { type: "spring", stiffness: 200, damping: 12 },
    bounceDown: { type: "spring", stiffness: 200, damping: 12 },
    popIn: { type: "spring", stiffness: 180, damping: 10 },
    blurIn: { duration: responsiveDuration + 0.3, ease: "easeOut" },
    rotateIn: { type: "spring", stiffness: 100, damping: 15 },
    rotateInDownLeft: { type: "spring", stiffness: 100, damping: 15 },
    rotateInUpRight: { type: "spring", stiffness: 100, damping: 15 },
    default: { delay, duration: responsiveDuration, type: "spring", stiffness: 80, damping: 20 },
  } as const;

  const transition =
    preset in transitionMap
      ? transitionMap[preset as keyof typeof transitionMap]
      : transitionMap.default;

  /** States */
  const visibleState: MotionProps["animate"] = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    rotateY: 0,
    rotateX: 0,
    skewX: 0,
    rotateZ: 0,
    filter: "blur(0px)",
    transition,
  };

  const hiddenState: MotionProps["initial"] = {
    opacity: 0,
    ...offsets,
  };

  /** Scroll-based animation */
  if (trigger === "scroll") {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 90%", "end 100%"],
    });

    const smooth = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });

    const opacity = useTransform(smooth, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const yMove = useTransform(smooth, [0, 1], [responsiveDistance, -responsiveDistance]);

    return (
      <motion.div
        ref={ref}
        style={{
          opacity,
          y: yMove,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  /** InView trigger animation */
  useEffect(() => {
    if (isInView) controls.start(visibleState);
    else if (!once) controls.set(hiddenState);
  }, [isInView, controls, once]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        initial={hiddenState}
        animate={controls}
        exit={{ opacity: 0 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
