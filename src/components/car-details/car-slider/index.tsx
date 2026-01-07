import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import "swiper/css";
import "swiper/css/effect-fade";
import "./car-slider.css";

export default function CarSlider({ isReserved, images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* === Thumbnail Slider (Responsive) === */}
      {images.length > 1 && (
        <div className="w-full h-full md:bg-white/30 md:backdrop-blur-xl rounded-2xl shadow-2xl md:border md:border-white/40 px-2 pt-2 pb-1 md:w-28 lg:w-36 md:shrink-0 order-2 md:order-1 relative">
          <Swiper
            modules={[Navigation, Thumbs]}
            spaceBetween={8}
            slidesPerView={4}
            watchSlidesProgress={true}
            onSwiper={setThumbsSwiper}
            direction="horizontal"
            navigation={{
              nextEl: ".thumb-nav-next",
              prevEl: ".thumb-nav-prev",
            }}
            breakpoints={{
              0: {
                direction: "horizontal",
                slidesPerView: 3,
              },
              480: {
                direction: "horizontal",
                slidesPerView: 4,
              },
              768: {
                direction: "vertical",
                slidesPerView: 4,
              },
              1440: {
                direction: "vertical",
                slidesPerView: 6,
              },
            }}
            // className="h-20 md:h-[630px] thumb-slider"
            className="h-20 md:h-[630px] thumb-slider"
          >
            {images.map((img: any, idx: number) => (
              <SwiperSlide key={idx}>
                <img
                  src={img.photoPath}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-19 md:h-24 w-full cursor-pointer rounded-xl object-cover transition-all duration-200 ease-in-out"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Horizontal Navigation (Mobile) */}
          <button className="thumb-nav-prev md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-1.5 rounded-full transition-all cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="thumb-nav-next md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-1.5 rounded-full transition-all cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
          {/* Vertical Navigation (Desktop) */}
          <button className="thumb-nav-prev hidden md:block absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-1.5 rounded-full transition-all cursor-pointer">
            <ChevronLeft className="w-4 h-4 rotate-90" />
          </button>
          <button className="thumb-nav-next hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-1.5 rounded-full transition-all cursor-pointer">
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>
      )}

      {/* === Main Image Slider === */}
      <section className="relative bg-white/30 backdrop-blur-xl rounded-2xl md:shadow-2xl border border-white/40 flex-1 min-w-0 order-1 md:order-2">
        <MotionReveal preset="fadeIn" once={true}>
          <Swiper
            modules={[Navigation, Thumbs]}
            spaceBetween={10}
            slidesPerView={1}
            speed={300}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            navigation={{
              nextEl: ".main-nav-next",
              prevEl: ".main-nav-prev",
            }}
            // className="h-[300px] md:h-[640px]"
            className="h-auto"
          >
            {images.map((img: any, idx: number) => (
              <SwiperSlide key={idx}>
                <div className="flex items-center justify-center h-full">
                  <img
                    src={img.photoPath}
                    alt={`Car image ${idx + 1}`}
                    className="rounded-2xl w-full h-full object-cover object-center mx-auto transition-all duration-300 ease-in-out"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="main-nav-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full transition-all cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="main-nav-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full transition-all cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
          {isReserved && (
            <div className="absolute top-3 left-3 bg-neutral-700/90 text-white text-base md:text-lg font-medium px-4 md:px-5 py-2 rounded-xl z-20">
              Reserved
            </div>
          )}
        </MotionReveal>
      </section>
    </div>
  );
}
