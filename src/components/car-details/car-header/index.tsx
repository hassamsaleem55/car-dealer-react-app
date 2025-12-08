import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
// import { Heart } from "lucide-react";
import Button from "@elements-dir/button";
import AppointmentModal from "@components-dir/book-appointment/appointment-modal";
import type { Car } from "@components-dir/car-card/car-card.types";

export default function CarHeader({
  carData,
}: // isFavorite,
// toggleFavorite,
{
  carData: Car;
  // isFavorite: boolean;
  // toggleFavorite: () => void;
}) {
  const { dealerData } = useDealerContext();
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const { setReservationModalOpen } = useOutletContext<{
    setReservationModalOpen: (qs: boolean) => void;
  }>();
  const [requestType, setRequestType] = useState<
    "" | "Appointment" | "testdrive" | "vehicledetails"
  >("");

  return (
    <header className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4">
      {/* === Title, Registration, Tags & Favorite Button === */}
      <div>
        <div className="flex">
          <h1 className="grow text-xl md:text-3xl font-bold">
            {carData.title}
          </h1>
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
        </div>

        <div className="flex gap-2">
          {carData.registrationNo && (
            <span className="text-[10px] md:text-xs bg-primary/20 font-semibold px-2 py-1 rounded-full">
              {carData.registrationNo}
            </span>
          )}
          <span className="text-[10px] md:text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
            ULEZ Compliant
          </span>
        </div>
      </div>

      {/* === Derivative === */}
      {carData.derivative && (
        <div>
          <p className="text-sm md:text-base font-medium line-clamp-3">
            {carData.derivative}
          </p>
        </div>
      )}

      {/* === Pricing === */}
      {carData.pricePerMonth ? (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-8">
          <div className="flex-1 md:flex-none space-y-1 text-center md:text-left">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
              Finance from
            </p>
            <p className="text-xl md:text-2xl font-bold text-primary">
              {carData.pricePerMonth}
              <span className="text-xs font-medium text-gray-500 ml-1">
                /mo
              </span>
            </p>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-gray-200"></div>
          <div className="flex-1 md:flex-none space-y-1 text-center md:text-left">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
              Cash Price
            </p>
            <p className="text-xl md:text-2xl font-bold">
              {carData.retailPrice}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
            Price
          </p>
          <p className="text-2xl md:text-3xl font-bold text-primary">
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
      {appointmentModalOpen && (
        <AppointmentModal
          isOpen={appointmentModalOpen}
          setIsOpen={setAppointmentModalOpen}
          carData={carData}
          requestType={requestType}
        />
      )}
    </header>
  );
}
