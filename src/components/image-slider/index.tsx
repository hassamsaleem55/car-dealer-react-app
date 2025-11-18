import Slider from "react-slick";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageSliderProps = {
  images: { photoPath: string }[];
  settings?: any;
  className?: string;
  imageClassName?: string;
  alt?: string;
};

// === Custom Arrow Components ===
const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full transition-all cursor-pointer"
  >
    <ChevronRight className="w-5 h-5" />
  </button>
);

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full transition-all cursor-pointer"
  >
    <ChevronLeft className="w-5 h-5" />
  </button>
);

export default function ImageSlider({
  images,
  settings,
  className = "",
  imageClassName = "",
  alt = "Car image",
}: ImageSliderProps) {
  const defaultSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const mergedSettings = { ...defaultSettings, ...settings };

  return (
    <div className={`relative ${className}`}>
      <Slider {...mergedSettings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img.photoPath}
              alt={`${alt} ${idx + 1}`}
              className={`w-full object-cover rounded-2xl ${imageClassName}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
