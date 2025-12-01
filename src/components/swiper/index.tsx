import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { type Swiper as SwiperType } from "swiper";
import { type SwiperComponentProps } from "./swiper.types";
import "swiper/css";
import "swiper/css/effect-fade";

export default function SwiperComponent(props: Partial<SwiperComponentProps>) {
  const {
    data,
    speed = 1000,
    autoplay = {
      delay: 800,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    breakpoints = {
      480: { slidesPerView: 1, spaceBetween: 12 },
      768: { slidesPerView: 2, spaceBetween: 16 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
    },
    className,
    renderItem,
  } = props;

  /** ────────────────────────────────────────────────
   * Setup and defaults
   * ──────────────────────────────────────────────── */
  const FIRST_DELAY = (autoplay as any)?.firstDelay ?? 1000;
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firstDelayTimer = useRef<number | null>(null);
  const hasStarted = useRef(false);

  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });

  /** ────────────────────────────────────────────────
   * Swiper control
   * ──────────────────────────────────────────────── */
  const handleInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    swiper.autoplay?.stop();
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (!isInView) {
      swiper.autoplay?.stop();
      hasStarted.current = false;
      if (firstDelayTimer.current) {
        window.clearTimeout(firstDelayTimer.current);
        firstDelayTimer.current = null;
      }
      return;
    }

    if (isInView && !hasStarted.current) {
      firstDelayTimer.current = window.setTimeout(() => {
        swiper.autoplay?.start();
        hasStarted.current = true;
      }, FIRST_DELAY);
    }
  }, [isInView, FIRST_DELAY]);

  useEffect(() => {
    return () => {
      if (firstDelayTimer.current) window.clearTimeout(firstDelayTimer.current);
    };
  }, []);

  /** ────────────────────────────────────────────────
   * Render
   * ──────────────────────────────────────────────── */
  return (
    <div ref={sectionRef}>
      <Swiper
        modules={[Autoplay]}
        speed={speed}
        // autoplay={autoplay}
        breakpoints={breakpoints}
        className={className}
        onInit={handleInit}
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              {renderItem ? renderItem(item, index) : null}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
