import { useEffect, useState } from "react";
import { useDealerContext } from "@core-dir/dealer-provider";
import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import DotLoader from "@components-dir/loader";
import SwiperComponent from "@components-dir/swiper";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import CarCardOne from "@components-dir/car-card/car-card-one";
import SectionStyles from "@app-layout-dir/sections/section-layout-one/css/default.module.css";
import CarCardStyles from "@components-dir/car-card/car-card-one/css/default.module.css";
import { fetchApi } from "@core-dir/services/Api.service";
import { processCarCardData } from "@core-dir/helpers/CarCardDataProcessor";

export default function FeaturedOne({ heading }: { heading: string }) {
  const { dealerAuthToken } = useDealerContext();
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState<Array<any>>([]);
  const queryString = "SortBy=DateAdded&PageSize=10";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchApi(
          `/stocks/list?${queryString}`,
          dealerAuthToken
        );
        const processedData = await processCarCardData(response.stockList);
        setCarData(processedData);
      } catch (error) {
        console.error("Error fetching stock featured list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <SectionLayoutOne
      headingText={heading}
      headingLink={{
        text: "View All",
        link: `stock?${queryString}`,
      }}
      styles={SectionStyles}
    >
      {loading && carData.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh]">
          <DotLoader size="lg" />
        </div>
      ) : (
        <SwiperComponent
          data={carData}
          className="rounded-2xl"
          breakpoints={{
            "480": { slidesPerView: 1, spaceBetween: 12 },
            "640": { slidesPerView: 2, spaceBetween: 12 },
            "768": { slidesPerView: 3, spaceBetween: 12 },
            "1024": { slidesPerView: 3, spaceBetween: 12 },
            "1280": { slidesPerView: 4, spaceBetween: 12 },
            "1536": { slidesPerView: 4, spaceBetween: 12 },
          }}
          renderItem={(item, index) => (
            <MotionReveal preset="slideLeft" delay={index * 0.15}>
              <CarCardOne car={item} styles={CarCardStyles} />
            </MotionReveal>
          )}
        />
      )}
    </SectionLayoutOne>
  );
}
