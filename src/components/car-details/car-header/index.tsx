import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
// import { Heart } from "lucide-react";
import Button from "@elements-dir/button";
import AppointmentModal from "@components-dir/book-appointment/appointment-modal";
import type { Car } from "@components-dir/car-card/car-card.types";
import { AutoTraderLogo, CarGuruLogo } from "@core-dir/svgs";

const isValidRating = (rating: string | undefined): boolean => {
  if (!rating) return false;

  const invalidRatings = ["null", "high", "noanalysis", ""];
  return !invalidRatings.includes(rating.toLowerCase());
};

export default function CarHeader({
  carData,
}: // isFavorite,
// toggleFavorite,
{
  carData: Car;
  // isFavorite: boolean;
  // toggleFavorite: () => void;
}) {
  const { dealerConfig, dealerData } = useDealerContext();
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const { setReservationModalOpen } = useOutletContext<{
    setReservationModalOpen: (qs: boolean) => void;
  }>();
  const [requestType, setRequestType] = useState<
    "" | "Appointment" | "testdrive" | "vehicledetails"
  >("");

  const hasAutoTraderRating = isValidRating(carData.autoTraderRating);
  const hasCarGuruRating =
    dealerConfig.dealer.isCarGuruRatingEnabled &&
    isValidRating(carData.carGuruRating);
  const showRatingFooter = hasAutoTraderRating || hasCarGuruRating;
  return (
    <div className="h-full rounded-xl flex flex-col bg-linear-to-br from-primary/70 via-primary p-0.5 shadow-2xl">
      {carData.attentionGrabber && (
        <div className="text-white text-lg font-semibold px-4 py-3 text-center">
          {carData.attentionGrabber}
        </div>
      )}

      <header className="bg-white rounded-xl shadow-xl p-6 space-y-5">
        <div className="space-y-4">
          {/* Title and Tags */}
          <div className="space-y-2">
            <h1 className="text-xl md:text-3xl font-semibold">
              {carData.title}
              {/* 
          <button
            className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border border-gray-200 rounded-full transition cursor-pointer ${
              isFavorite
                ? "bg-primary text-white"
                : "text-primary hover:bg-primary/10"
            }`}
            onClick={toggleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
          </button> */}
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              {carData.registrationNo && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-linear-to-r from-primary/15 to-primary/5 text-primary border border-primary/30 shadow-sm">
                  {carData.registrationNo}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-linear-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border border-emerald-300 shadow-sm">
                ULEZ Compliant
              </span>
            </div>
          </div>

          {/* Derivative */}
          {carData.derivative && (
            <p className="text-sm md:text-base text-gray-600">
              {carData.derivative}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {carData.specs.slice(0, 9).map((spec, idx) => (
            <div
              key={idx}
              className={`bg-linear-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 text-center px-3 py-3.5 group ${
                idx >= 8 ? "hidden md:block" : ""
              }`}
            >
              <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider group-hover:text-primary transition-colors">
                {spec.label}
              </h3>
              <p className="text-xs font-bold text-gray-800">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        {/* === Pricing === */}
        {carData.pricePerMonth ? (
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-12 py-5 px-4 bg-linear-to-br from-gray-50 to-primary/5 rounded-xl border border-gray-200 shadow-inner">
            <div
              onClick={() => {
                const financeSection = document.getElementById(
                  "codeweaver-finance-section"
                );
                if (financeSection) {
                  financeSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="flex-1 md:flex-none space-y-1 text-center md:text-left cursor-pointer hover:scale-105 transition-transform"
            >
              <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                Finance from
              </p>
              <p className="text-3xl md:text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {carData.pricePerMonth}
                <span className="text-xs font-medium text-gray-500 ml-1">
                  /mo
                </span>
              </p>
            </div>
            <div className="h-px md:h-12 w-full md:w-px bg-linear-to-b from-transparent via-gray-300 to-transparent"></div>
            <div className="flex-1 md:flex-none space-y-1 text-center md:text-left">
              <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                Total Price
              </p>
              <p className="text-3xl md:text-2xl font-semibold">
                {carData.retailPrice}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-5 px-4 bg-linear-to-br from-gray-50 to-primary/5 rounded-xl border border-gray-200 shadow-inner">
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wider">
              Price
            </p>
            <p className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent mt-1">
              {carData.retailPrice}
            </p>
          </div>
        )}

        {/* === Actions === */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={carData.isReserved ? "disabled-mobile" : "secondary"}
            btnText="Book an Appointment"
            paddingUtilities="px-3 py-2"
            roundUtilities="rounded-lg group"
            btnTextSize="text-xs md:text-sm"
            clickEvent={() => {
              setRequestType("Appointment");
              setAppointmentModalOpen(true);
            }}
            btnIcon={
              <svg
                className={`duration-300 transition ease-in-out size-4
                ${
                  carData.isReserved
                    ? "text-primary/50"
                    : "group-hover:text-white"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 19h6"></path>
                <path d="M16 2v4"></path>
                <path d="M19 16v6"></path>
                <path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5"></path>
                <path d="M3 10h18"></path>
                <path d="M8 2v4"></path>
              </svg>
            }
          />
          <div className="flex items-center gap-2 w-full">
            <Button
              variant={carData.isReserved ? "disabled-mobile" : "secondary"}
              btnText="Book Test Drive"
              paddingUtilities="px-3 py-2"
              roundUtilities="rounded-lg"
              btnTextSize="text-xs md:text-sm"
              clickEvent={() => {
                setRequestType("testdrive");
                setAppointmentModalOpen(true);
              }}
            />

            <Button
              variant={carData.isReserved ? "disabled-mobile" : "secondary"}
              btnText="Enquire Now"
              paddingUtilities="px-3 py-2"
              roundUtilities="rounded-lg"
              btnTextSize="text-xs md:text-sm"
              clickEvent={() => {
                setRequestType("vehicledetails");
                setAppointmentModalOpen(true);
              }}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            {dealerData.FCANumber && (
              <Button
                variant={carData.isReserved ? "disabled-mobile" : "secondary"}
                btnText="Apply Finance"
                paddingUtilities="px-3 py-2"
                roundUtilities="rounded-lg"
                btnTextSize="text-xs md:text-sm"
                clickEvent={() => {
                  const financeSection = document.getElementById(
                    "codeweaver-finance-section"
                  );
                  if (financeSection) {
                    financeSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              />
            )}

            <Button
              variant={carData.isReserved ? "disabled-mobile" : "secondary"}
              btnText="Reserve for £99"
              paddingUtilities="px-3 py-2"
              roundUtilities="rounded-lg"
              btnTextSize="text-xs md:text-sm"
              clickEvent={() => setReservationModalOpen(true)}
            />
          </div>
        </div>

        {showRatingFooter && (
          <div className="border-t border-t-gray-200 mt-5 pt-5 bg-linear-to-r from-transparent via-gray-50 to-transparent">
            <div
              className={`flex flex-row items-center w-full ${
                hasAutoTraderRating && hasCarGuruRating
                  ? "justify-between"
                  : "justify-center"
              }`}
            >
              {hasAutoTraderRating && (
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent font-bold capitalize">
                    {carData.autoTraderRating} Price
                  </span>
                  <AutoTraderLogo className="w-14 opacity-90" />
                </div>
              )}

              {hasCarGuruRating && (
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent font-bold capitalize">
                    {carData.carGuruRating} Price
                  </span>
                  <CarGuruLogo className="w-14 opacity-90" />
                </div>
              )}
            </div>
          </div>
        )}
        {appointmentModalOpen && (
          <AppointmentModal
            isOpen={appointmentModalOpen}
            setIsOpen={setAppointmentModalOpen}
            carData={carData}
            requestType={requestType}
          />
        )}
      </header>
    </div>
  );
}
