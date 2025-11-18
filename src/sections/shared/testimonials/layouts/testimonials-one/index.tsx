import { Star } from "lucide-react";
import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import SwiperComponent from "@components-dir/swiper";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { testimonialsData } from "@core-dir/services/Testimonials.service";
import SectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered.module.css";

export default function TestimonialsOne({
  heading,
  subHeading,
  styles,
}: {
  heading: string;
  subHeading: string;
  styles: any;
}) {
  return (
    <SectionLayoutOne
      headingText={heading}
      subHeadingText={subHeading}
      styles={SectionStyles}
    >
      <SwiperComponent
        data={testimonialsData}
        // speed={1500}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 2, spaceBetween: 12 },
          1024: { slidesPerView: 3, spaceBetween: 12 },
          1280: { slidesPerView: 4, spaceBetween: 12 },
          1536: { slidesPerView: 4, spaceBetween: 12 },
        }}
        renderItem={(item, index) => (
          <MotionReveal preset="fadeIn" delay={index * 0.1}>
            <div className={`${styles["testimonial-card"]} group`}>
              <div className={`${styles["testimonial-rating"]} flex gap-1`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < item.rating ? "fill-yellow-500" : "fill-gray-200"
                    }
                  />
                ))}
              </div>

              <p
                className={`${styles["testimonial-text"]} italic mt-3`}
              >
                “{item.testimonial}”
              </p>

              <div className={`${styles["testimonial-customer"]}mt-4`}>
                <h4 className="font-semibold text-lg">{item.customerName}</h4>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
            </div>
          </MotionReveal>
        )}
      />
    </SectionLayoutOne>
  );
}
