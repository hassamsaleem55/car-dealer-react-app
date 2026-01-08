import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import "./car-slider.css";

export default function CarSlider({ isReserved, images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  
  const getInitialConfig = () => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const isMobileView = viewportWidth < 768;
    
    return {
      count: isMobileView ? (viewportWidth < 480 ? 3 : 4) : 4,
      height: isMobileView ? "90px" : "500px",
      isVertical: !isMobileView,
    };
  };
  
  const [thumbnailConfig, setThumbnailConfig] = useState(getInitialConfig());
  const mainSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateThumbnailConfig = () => {
      const viewportWidth = window.innerWidth;
      const isMobileView = viewportWidth < 768;

      if (isMobileView) {
        // Mobile: horizontal layout
        setThumbnailConfig({
          count: viewportWidth < 480 ? 3 : 4,
          height: "90px",
          isVertical: false,
        });
      } else {
        // Desktop: vertical layout - measure actual main image height
        const mainImageContainer = mainSliderRef.current;
        if (!mainImageContainer) return;

        // Get the actual rendered height of the main image
        const mainHeight = mainImageContainer.offsetHeight;
        
        // Calculate how many thumbnails can fit based on actual height
        // Each thumbnail: 80px height + 8px gap
        const thumbnailHeight = 80;
        const gap = 8;
        const paddingAndButtons = 60; // Container padding + navigation buttons
        
        const availableHeight = mainHeight - paddingAndButtons;
        const thumbnailsPerItem = thumbnailHeight + gap;
        const calculatedCount = Math.floor(availableHeight / thumbnailsPerItem);
        
        // Ensure at least 3, max of available images
        const count = Math.max(3, Math.min(calculatedCount, images.length));

        setThumbnailConfig({
          count,
          height: `${mainHeight}px`, // Match main image height exactly
          isVertical: true,
        });
      }
    };

    // Initial calculation with delay for DOM readiness
    const timer = setTimeout(updateThumbnailConfig, 150);

    // Use ResizeObserver to watch main image size changes
    const resizeObserver = new ResizeObserver(() => {
      updateThumbnailConfig();
    });

    if (mainSliderRef.current) {
      resizeObserver.observe(mainSliderRef.current);
    }

    // Update on window resize
    const handleResize = () => {
      updateThumbnailConfig();
      // Reset thumbs connection to prevent stale reference
      setThumbsSwiper(null);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [images.length]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* === Thumbnail Slider (Responsive) === */}
      {images.length > 1 && (
        <div
          className="w-full md:bg-white/30 md:backdrop-blur-xl rounded-2xl shadow-2xl md:border md:border-white/40 p-2 md:w-28 lg:w-36 md:shrink-0 order-2 md:order-1 relative"
          style={{ height: thumbnailConfig.height }}
        >
          <Swiper
            modules={[Navigation, Thumbs]}
            spaceBetween={8}
            slidesPerView={thumbnailConfig.count}
            direction={thumbnailConfig.isVertical ? "vertical" : "horizontal"}
            watchSlidesProgress={true}
            onSwiper={setThumbsSwiper}
            navigation={{
              nextEl: ".thumb-nav-next",
              prevEl: ".thumb-nav-prev",
            }}
            className="h-auto md:h-full thumb-slider"
          >
            {images.map((img: any, idx: number) => (
              <SwiperSlide key={idx}>
                <img
                  src={img.photoPath}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full cursor-pointer rounded-xl object-center object-contain transition-all duration-200 ease-in-out"
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
      <section
        ref={mainSliderRef}
        className="relative shadow-2xl rounded-2xl flex-1 min-w-0 order-1 md:order-2"
      >
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
          >
            {images.map((img: any, idx: number) => (
              <SwiperSlide key={idx}>
                <div className="flex items-center justify-center">
                  <img
                    src={img.photoPath}
                    alt={`Car image ${idx + 1}`}
                    className="object-center object-contain rounded-2xl w-full mx-auto transition-all duration-300 ease-in-out"
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
