import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import ImageSlider from "@components-dir/image-slider";

export default function CarSlider({
  images,
  mainSettings,
  thumbSettings,
}: any) {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-gray-100">
      {/* === Main Image Slider === */}
      <MotionReveal preset="fadeIn" once={true}>
        <ImageSlider
          images={images}
          settings={mainSettings}
          className="group w-full h-full"
          imageClassName="
            w-full 
            h-[240px] 
            sm:h-[320px] 
            md:h-[400px] 
            lg:h-[480px] 
            xl:h-[550px] 
            rounded-2xl 
            object-cover 
            transition-all 
            duration-300 
            ease-in-out
          "
        />
      </MotionReveal>

      {/* === Thumbnail Slider === */}
      {images.length > 1 && (
        // <MotionReveal preset="slideLeft">
          <div className="px-2">
            <ImageSlider
              images={images}
              settings={thumbSettings}
              className="w-full"
              imageClassName="
              h-16 
              sm:h-20 
              md:h-24 
              lg:h-28 
              xl:h-32 
              w-full 
              cursor-pointer 
              border-2 
              border-transparent 
              hover:border-primary 
              rounded-xl 
              object-fill 
              transition-all 
              duration-200 
              ease-in-out
            "
            />
          </div>
        // </MotionReveal>
      )}
    </section>
  );
}
