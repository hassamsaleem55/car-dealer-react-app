import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import SwiperComponent from "@components-dir/swiper";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { FilterCardModern } from "@components-dir/filter-card/variants";
import { carTypes } from "@core-dir/services/CarTypes.service";
import SectionStyles from "@app-layout-dir/sections/section-layout-one/css/default.module.css";

export default function BodyTypeOne({ heading }: { heading: string }) {
  return (
    <SectionLayoutOne
      headingText={heading}
      headingLink={{ text: "View All", link: "stock" }}
      styles={SectionStyles}
    >
      <SwiperComponent
        data={carTypes}
        speed={2000}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 12 },
          640: { slidesPerView: 2.5, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 12 },
          1024: { slidesPerView: 4, spaceBetween: 12 },
          1280: { slidesPerView: 6, spaceBetween: 12 },
          1536: { slidesPerView: 6, spaceBetween: 12 },
        }}
        renderItem={(item, index) => (
          <MotionReveal preset="slideUp" delay={index * 0.1}>
            <FilterCardModern filterKey="body-type" item={item} />
          </MotionReveal>
        )}
      />
    </SectionLayoutOne>
  );
}
