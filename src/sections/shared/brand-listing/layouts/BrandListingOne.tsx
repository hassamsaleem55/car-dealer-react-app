import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import SwiperComponent from "@components-dir/swiper";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { FilterCardSimple } from "@components-dir/filter-card/variants";
import SectionStyles from "@app-layout-dir/sections/section-layout-one/css/default.module.css";

export default function BrandListingOne({ heading }: { heading: string }) {
  const { filtersData } = useOutletContext<{
    filtersData: any;
  }>();
  const [carBrands, setCarBrands] = useState<any>([]);

  useEffect(() => {
    if (!filtersData || !filtersData[0]?.options) return;
    const imageRootPath = "../images/car-brands-logo/";
    const toTitleCase = (str: string) => {
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    const carBrandsList = filtersData[0].options.map((item: any) => ({
      id: item.id,
      name: item.value.toUpperCase(),
      media: `${imageRootPath}${toTitleCase(item.value)}.webp`,
    }));

    setCarBrands(carBrandsList);
  }, [filtersData]);

  return (
    <SectionLayoutOne
      headingText={heading}
      headingLink={{ text: "View All", link: "stock" }}
      styles={SectionStyles}
    >
      <SwiperComponent
        data={carBrands}
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
            <FilterCardSimple type="image" filterKey="make" item={item} />
          </MotionReveal>
        )}
      />
    </SectionLayoutOne>
  );
}
