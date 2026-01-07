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
import { useRef, useEffect } from "react";
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
  
  // Use optimized static values - CSS handles responsiveness better than JS
  const optimizedDistance = Math.min(distance, 40);
  const optimizedDuration = Math.min(duration, 0.5);

  /** All animation presets - simplified and optimized */
  const offsets = {
    // Basic Slides
    slideUp: { y: optimizedDistance, x: 0 },
    slideDown: { y: -optimizedDistance, x: 0 },
    slideLeft: { x: optimizedDistance, y: 0 },
    slideRight: { x: -optimizedDistance, y: 0 },

    // Fade / Zoom
    fadeIn: { x: 0, y: 0 },
    zoomIn: { scale: 0.9 },
    zoomOut: { scale: 1.1 },

    // Rotations - reduced intensity
    rotateIn: { rotate: -10 },
    rotateInDownLeft: { rotate: -15, x: -optimizedDistance, y: optimizedDistance },
    rotateInUpRight: { rotate: 15, x: optimizedDistance, y: -optimizedDistance },

    // Flips - reduced
    flipIn: { rotateY: 45 },
    flipX: { rotateX: 45 },

    // Advanced - simplified
    bounceUp: { y: optimizedDistance },
    bounceDown: { y: -optimizedDistance },
    popIn: { scale: 0.8, opacity: 0 },
    skewIn: { skewX: 8, opacity: 0 },
    tiltIn: { rotateZ: -5, opacity: 0 },
    blurIn: { opacity: 0 },
    floatIn: { y: optimizedDistance / 2, opacity: 0 },

    none: {},
  }[preset];

  /** Dynamic transitions depending on preset */
  const transitionMap = {
    bounceUp: { type: "spring", stiffness: 200, damping: 12 },
    bounceDown: { type: "spring", stiffness: 200, damping: 12 },
    popIn: { type: "spring", stiffness: 180, damping: 10 },
    blurIn: { duration: optimizedDuration + 0.2, ease: "easeOut" },
    rotateIn: { type: "spring", stiffness: 100, damping: 15 },
    rotateInDownLeft: { type: "spring", stiffness: 100, damping: 15 },
    rotateInUpRight: { type: "spring", stiffness: 100, damping: 15 },
    default: { delay, duration: optimizedDuration, type: "spring", stiffness: 80, damping: 20 },
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
    const yMove = useTransform(smooth, [0, 1], [optimizedDistance, -optimizedDistance]);

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
