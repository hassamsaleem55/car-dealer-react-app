import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import DotLoader from "@components-dir/loader";
import Breadcrumb from "@components-dir/car-details/breadcrumbs";
import CarSlider from "@components-dir/car-details/car-slider";
import CarHeader from "@components-dir/car-details/car-header";
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
import { RightChoiceForDetailsPage } from "@sections-dir/shared/right-choice/variants";
import { FeaturedDefault } from "@sections-dir/shared/featured/variants";
import type { Car } from "@components-dir/car-card/car-card.types";
import { FaqDefault } from "@sections-dir/shared/faqs/variants";
import { AABannerDefault } from "@sections-dir/shared/AA/variants";
import { AchievementsDefault } from "@sections-dir/shared/achievements/variants";

export default function CarDetailsOne() {
  const location = useLocation();
  const { dealerData, dealerAuthToken } = useDealerContext();
  const { setReservationModalOpen, setReservationCarData } = useOutletContext<{
    setReservationModalOpen: (qs: boolean) => void;
    setReservationCarData: (data: Car) => void;
  }>();
  // const [isFavorite, setIsFavorite] = useState(false);
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
  // === Fetch data on mount
  useEffect(() => {
    const searchParams = location.search.startsWith("?")
      ? location.search.substring(1)
      : location.search;

    const fetchData = async () => {
      try {
        setLoading(true);
        const stockId = Number(searchParams.split("=")[1]);

        const [carRes, imgRes, featureRes] = await Promise.all([
          fetchApi(`/stocks/${stockId}`, dealerAuthToken),
          fetchApi(`/stocks/${stockId}/media`, dealerAuthToken),
          fetchApi(`/stocks/${stockId}/features`, dealerAuthToken),
        ]);

        const processedCarArray = await processCarCardData([carRes]);
        const processedCar = processedCarArray[0];
        processedCar.stockId = stockId; // Add stockId to car data
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

  // === Loading state
  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <DotLoader size="lg" />
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
        <Breadcrumb title={carData.title} stockId={carData.stockId} />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-start">
          {/* === Left Column (Car Details) === */}
          <div className="col-span-2 space-y-8">
            {/* Slider */}
            <CarSlider
              isReserved={carData.isReserved}
              images={
                carImages.length
                  ? carImages
                  : [{ photoPath: carData.profilePicture }]
              }
            />

            <aside className="space-y-4 md:hidden">
              <MotionReveal preset="slideLeft">
                <CarHeader
                  carData={carData}
                  // isFavorite={isFavorite}
                  // toggleFavorite={() => setIsFavorite(!isFavorite)}
                />
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
                {dealerData.CompanyFinanceDetails.FinanceApiKeyDecoded && (
                  <div id="codeweaver-finance-section">
                    <CodeWeaverFinance
                      model={carDetails}
                      userFCA={dealerData.FCANumber}
                      codeWeaverApi={
                        dealerData.CompanyFinanceDetails.FinanceApiKeyDecoded
                      }
                      websiteUrl={dealerData.Url}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* === Right Column (Sticky Aside) === */}
          <aside className="col-span-1 relative md:sticky md:top-23 space-y-4 hidden md:block">
            <MotionReveal preset="slideLeft">
              <CarHeader
                carData={carData}
                // isFavorite={isFavorite}
                // toggleFavorite={() => setIsFavorite(!isFavorite)}
              />
            </MotionReveal>
          </aside>
        </main>
      </div>
      {/* <section className="bg-white"> */}
      <div className="container mx-auto px-4">
        <FeaturedDefault props={{ heading: "Latest Stock" }} />
      </div>
      <AABannerDefault />
      {/* </section> */}
      <div className="mb-18 pb-18 bg-white border border-gray-200">
        <RightChoiceForDetailsPage
          props={{
            heading: "Why We're the Right Choice for You",
            subHeading:
              "Your needs first — expert service, honest pricing, no hassle.",
          }}
        />
      </div>
      <AchievementsDefault props={{ heading: "Our Achievements", subHeading: "We take pride in our milestones — each one built on trust, excellence, and passion for what we do." }} />
      <FaqDefault props={{ heading: "Frequently Asked Questions" }} />
      <GetDirectionV1 />
    </>
  );
}
