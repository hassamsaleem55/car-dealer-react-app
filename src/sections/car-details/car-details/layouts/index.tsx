import { useEffect, useState, useMemo } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import Breadcrumb from "@components-dir/car-details/breadcrumbs";
import CarSlider from "@components-dir/car-details/car-slider";
import CarHeader from "@components-dir/car-details/car-header";
import CarOverview from "@components-dir/car-details/car-overview";
import CarDescription from "@components-dir/car-details/car-description";
import CarFeatures from "@components-dir/car-details/car-features";
import CarSpecifications from "@components-dir/car-details/car-specifications";
import CarFinanceCard from "@components-dir/car-details/car-finance-cards";
import CarCheckRecheck from "@components-dir/car-details/car-check-recheck";
import CarMOTInfo from "@components-dir/car-details/car-mot-info";
import CodeWeaverFinance from "@components-dir/car-details/code-weaver-finance";
import { GetDirectionV1 } from "@sections-dir/shared/get-dealer-direction";
import { fetchApi } from "@core-dir/services/Api.service";
import { processCarCardData } from "@core-dir/helpers/CarCardDataProcessor";
import { processCarDetailsSpecs } from "@core-dir/helpers/CarDetailsSpecsProcessor";
import { RightChoiceDefault } from "@sections-dir/shared/right-choice/variants";
import { FeaturedDefault } from "@sections-dir/shared/featured/variants";
import type { Car } from "@components-dir/car-card/car-card.types";

export function CarDetailsOne() {
  const location = useLocation();
  const { dealerData, dealerAuthToken } = useDealerContext();
  const { setReservationModalOpen, setReservationCarData } = useOutletContext<{
    setReservationModalOpen: (qs: boolean) => void;
    setReservationCarData: (data: Car) => void;
  }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState<Car | null>(null);
  const [carDetails, setCarDetails] = useState<any>(null);
  const [carImages, setCarImages] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [specifications, setSpecifications] = useState<any[]>([]);
  const [motDue, setMotDue] = useState<string>("");
  const [lastServiceDate, setLastServiceDate] = useState<string>("");
  const [fullPrice, setFullPrice] = useState<number | null>(null);
  const [financeOptions, setFinanceOptions] = useState<{
    PCP: number | null;
    HP: number | null;
  }>({
    PCP: null,
    HP: null,
  });
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);

  // === Fetch data on mount
  useEffect(() => {
    const searchParams = location.search.startsWith("?")
      ? location.search.substring(1)
      : location.search;

    const fetchData = async () => {
      try {
        setLoading(true);
        const stockId = searchParams.split("=")[1];

        const [carRes, imgRes, featureRes] = await Promise.all([
          fetchApi(`/stocks/${stockId}`, dealerAuthToken),
          fetchApi(`/stocks/${stockId}/media`, dealerAuthToken),
          fetchApi(`/stocks/${stockId}/features`, dealerAuthToken),
        ]);

        const processedCar = processCarCardData([carRes])[0];
        setCarData(processedCar);
        setReservationCarData(processedCar);
        setCarDetails(carRes);
        setCarImages(imgRes?.stockMedia?.[0]?.images || []);
        setFeatures(featureRes?.features || []);
        setSpecifications(processCarDetailsSpecs(carRes) || []);
        setMotDue(carRes.motDue || "");
        setLastServiceDate(carRes.history.historyInfo.lastServiceDate || "");
        setFullPrice(carRes.retailPrice || null);
        // Finance options
        const PCP =
          carRes.financeQuotes?.pcpQuote?.quote?.allInclusiveRegularPayment;
        const HP =
          carRes.financeQuotes?.hpQuote?.quote?.allInclusiveRegularPayment;

        setFinanceOptions({
          PCP: PCP,
          HP: HP,
        });
      } catch (err) {
        console.error("Error fetching car details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, dealerAuthToken]);

  // === Scroll to finance section if hash is present
  useEffect(() => {
    if (location.hash === "#codeweaver-finance-section" && !loading) {
      const timer = setTimeout(() => {
        const financeSection = document.getElementById(
          "codeweaver-finance-section"
        );
        if (financeSection) {
          financeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500); // Small delay to ensure page is fully rendered
      return () => clearTimeout(timer);
    }
  }, [location.hash, loading]);

  // === Slider settings
  const mainSliderSettings = useMemo(
    () => ({
      asNavFor: nav2,
      ref: (slider: any) => setNav1(slider),
      fade: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
    }),
    [nav2]
  );

  const thumbSliderSettings = useMemo(
    () => ({
      asNavFor: nav1,
      ref: (slider: any) => setNav2(slider),
      slidesToShow: 5,
      swipeToSlide: true,
      focusOnSelect: true,
      speed: 400,
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 4 } },
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 640, settings: { slidesToShow: 2 } },
      ],
    }),
    [nav1]
  );

  // === Loading state
  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
      </div>
    );

  // === Not found
  if (!carData)
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-500 text-lg text-center px-4">
        Car details not found.
      </div>
    );

  return (
    <>
      <div className="container mx-auto px-4 pt-6 space-y-6">
        {/* === Breadcrumb === */}
        <Breadcrumb title={carData.title} />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-start">
          {/* === Left Column (Car Details) === */}
          <div className="col-span-2 space-y-4">
            {/* Slider */}
            <CarSlider
              images={
                carImages.length
                  ? carImages
                  : [{ photoPath: carData.profilePicture }]
              }
              mainSettings={mainSliderSettings}
              thumbSettings={thumbSliderSettings}
            />

            <aside className="space-y-4 md:hidden">
              <MotionReveal preset="slideLeft">
                <CarHeader
                  carData={carData}
                  isFavorite={isFavorite}
                  toggleFavorite={() => setIsFavorite(!isFavorite)}
                />
              </MotionReveal>

              <MotionReveal preset="slideUp" delay={0.1}>
                <CarOverview specs={carData.specs || []} />
              </MotionReveal>
            </aside>

            {/* Description */}
            {carData.description && (
              <MotionReveal preset="slideRight">
                <CarDescription description={carData.description} />
              </MotionReveal>
            )}

            {/* Features */}
            {features.length > 0 && (
              <MotionReveal preset="slideRight">
                <CarFeatures features={features} />
              </MotionReveal>
            )}

            {/* Specifications */}
            {specifications.length > 0 && (
              <MotionReveal preset="slideRight">
                <CarSpecifications specifications={specifications} />
              </MotionReveal>
            )}

            {/* MOT Info */}
            {motDue && lastServiceDate && (
              <CarMOTInfo motDate={motDue} lastServiceDate={lastServiceDate} />
            )}

            {/* Check Recheck */}
            <CarCheckRecheck />

            {dealerData.FCANumber && (
              <>
                {/* Finance Cards */}
                {(financeOptions.PCP || financeOptions.HP) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 md:mt-2">
                    <MotionReveal preset="slideRight">
                      <CarFinanceCard
                        type="monthly"
                        price={{
                          monthly: financeOptions,
                        }}
                        benefits={[
                          "Spread the cost",
                          "Low deposit options",
                          "Get a quick decision",
                        ]}
                        btnText="Personalize your Finance"
                      />
                    </MotionReveal>
                    <MotionReveal preset="slideLeft">
                      <CarFinanceCard
                        type="full"
                        price={{
                          full: fullPrice,
                        }}
                        benefits={[
                          "Fully refundable £99",
                          "Secures this car for you",
                          "Hassle & haggle free",
                        ]}
                        btnText="Reserve for £99"
                        onButtonClick={() => setReservationModalOpen(true)}
                      />
                    </MotionReveal>
                  </div>
                )}
                {dealerData.CompanyFinanceDetails.FinanceApiKey && (
                  <div id="codeweaver-finance-section">
                    <CodeWeaverFinance
                      model={carDetails}
                      userFCA={dealerData.FCANumber}
                      codeWeaverApi={
                        dealerData.CompanyFinanceDetails.FinanceApiKey
                      }
                      websiteUrl={dealerData.Url}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* === Right Column (Sticky Aside) === */}
          <aside className="col-span-1 relative md:sticky md:top-20 space-y-4 hidden md:block">
            <MotionReveal preset="slideLeft">
              <CarHeader
                carData={carData}
                isFavorite={isFavorite}
                toggleFavorite={() => setIsFavorite(!isFavorite)}
              />
            </MotionReveal>

            <MotionReveal preset="slideUp" delay={0.1}>
              <CarOverview specs={carData.specs || []} />
            </MotionReveal>
          </aside>
        </main>
      </div>
      {/* <section className="bg-white"> */}
      <div className="container mx-auto px-4">
        <FeaturedDefault props={{ heading: "Latest Stock" }} />
      </div>
      {/* </section> */}
      <div className="pb-12">
        <RightChoiceDefault
          props={{
            heading: "Why We're the Right Choice for You",
            subHeading:
              "Your needs first — expert service, honest pricing, no hassle.",
          }}
        />
      </div>
      <GetDirectionV1 />
    </>
  );
}
