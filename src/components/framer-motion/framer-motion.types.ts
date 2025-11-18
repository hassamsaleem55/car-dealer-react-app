import { type ReactNode } from "react";
import { type MotionProps } from "framer-motion";

export type MotionRevealPreset =
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "fadeIn"
  | "zoomIn"
  | "zoomOut"
  | "rotateIn"
  | "rotateInDownLeft"
  | "rotateInUpRight"
  | "flipIn"
  | "flipX"
  | "bounceUp"
  | "bounceDown"
  | "popIn"
  | "skewIn"
  | "tiltIn"
  | "blurIn"
  | "floatIn"
  | "none";

export interface MotionRevealProps extends MotionProps {
  children: ReactNode;
  /** Animation trigger type */
  trigger?: "scroll" | "inView";
  /** Whether to animate only once */
  once?: boolean;
  /** Directional offset distance */
  distance?: number;
  /** Delay before starting */
  delay?: number;
  /** Duration of animation */
  duration?: number;
  /** Type of animation preset */
  preset?: MotionRevealPreset;
  /** Custom class */
  className?: string;
}
