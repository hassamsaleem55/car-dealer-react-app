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

// Check if user prefers reduced motion or device is low-powered
const shouldReduceAnimations = () => {
  if (typeof window === "undefined") return false;
  
  // Check prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  
  // Check for low-power device indicators
  const connection = (navigator as any).connection;
  if (connection?.saveData) return true;
  if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) return true;
  
  return false;
};

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
  
  // Disable animations for reduced motion or low-power devices
  const [animationsEnabled] = useState(!shouldReduceAnimations());

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

  // Responsive distance based on screen size (aggressive reduction for mobile)
  const getResponsiveDistance = () => {
    if (windowWidth < 640) return Math.min(distance, 20); // Mobile: max 20px
    if (windowWidth < 1024) return Math.min(distance, 40); // Tablet: max 40px
    return distance; // Desktop: original value
  };

  const responsiveDistance = getResponsiveDistance();
  
  // Reduce duration and delay on mobile
  const responsiveDuration = windowWidth < 768 ? Math.min(duration, 0.3) : duration;
  const responsiveDelay = windowWidth < 768 ? 0 : delay;

  /** All animation presets */
  const offsets = {
    // Basic Slides
    slideUp: { y: responsiveDistance, x: 0 },
    slideDown: { y: -responsiveDistance, x: 0 },
    slideLeft: { x: responsiveDistance, y: 0 },
    slideRight: { x: -responsiveDistance, y: 0 },

    // Fade / Zoom
    fadeIn: { x: 0, y: 0 },
    zoomIn: { scale: 0.8 },
    zoomOut: { scale: 1.2 },

    // Rotations
    rotateIn: { rotate: -15 },
    rotateInDownLeft: {
      rotate: -25,
      x: -responsiveDistance,
      y: responsiveDistance,
    },
    rotateInUpRight: {
      rotate: 25,
      x: responsiveDistance,
      y: -responsiveDistance,
    },

    // Flips
    flipIn: { rotateY: 90 },
    flipX: { rotateX: 90 },

    // Advanced / Stylized
    bounceUp: { y: responsiveDistance },
    bounceDown: { y: -responsiveDistance },
    popIn: { scale: 0.5, opacity: 0 },
    skewIn: { skewX: 15, opacity: 0 },
    tiltIn: { rotateZ: -10, opacity: 0 },
    blurIn: { filter: "blur(8px)", opacity: 0 },
    floatIn: { y: responsiveDistance / 2, opacity: 0 },

    none: {},
  }[preset];

  /** Dynamic transitions depending on preset */
  const transitionMap = {
    bounceUp: { type: "spring", stiffness: 200, damping: 12 },
    bounceDown: { type: "spring", stiffness: 200, damping: 12 },
    popIn: { type: "spring", stiffness: 180, damping: 10 },
    blurIn: { duration: duration + 0.3, ease: "easeOut" },
    rotateIn: { type: "spring", stiffness: 100, damping: 15 },
    rotateInDownLeft: { type: "spring", stiffness: 100, damping: 15 },
    rotateInUpRight: { type: "spring", stiffness: 100, damping: 15 },
    default: { delay, duration, type: "spring", stiffness: 80, damping: 20 },
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
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    });

    const opacity = useTransform(smooth, [0, 1], [0, 1]);
    const yVal =
      "y" in offsets ? useTransform(smooth, [0, 1], [offsets.y ?? 0, 0]) : 0;
    const xVal =
      "x" in offsets ? useTransform(smooth, [0, 1], [offsets.x ?? 0, 0]) : 0;
    const scaleVal =
      "scale" in offsets
        ? useTransform(smooth, [0, 1], [offsets.scale ?? 1, 1])
        : 1;

    return (
      <motion.div
        ref={ref}
        style={{ opacity, x: xVal, y: yVal, scale: scaleVal }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  /** InView trigger animation */
  useEffect(() => {
    if (!animationsEnabled) {
      controls.set({ opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }
    if (isInView) controls.start(visibleState);
    else if (!once) controls.set(hiddenState);
  }, [isInView, controls, once, animationsEnabled]);

  // Return simple div if animations disabled
  if (!animationsEnabled) {
    return <div ref={ref} className={className}>{children}</div>;
  }

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
