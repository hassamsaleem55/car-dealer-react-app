import { useState } from "react";
import { Heart } from "lucide-react";
import Button from "@elements-dir/button";
import { type CarDataTypes } from "../car-details.types";
import AppointmentModal from "@components-dir/book-appointment/appointment-modal";
import ReservationModal from "@components-dir/book-reservation/reservation-modal";

export default function CarHeader({
  carData,
  isFavorite,
  toggleFavorite,
}: {
  carData: CarDataTypes;
  isFavorite: boolean;
  toggleFavorite: () => void;
}) {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
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
          </button>
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

      {/* === Derivative & Pricing === */}
      <div className="flex gap-8">
        <div className="grow">
          {/* Derivative (subtitle) */}
          {carData.derivative && (
            <span>
              <p className="text-sm md:text-base font-medium line-clamp-3">{carData.derivative}</p>
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="text-right space-y-1">
          <p className="text-xl md:text-3xl font-semibold text-primary">
            {carData.retailPrice}
          </p>
          {carData.pricePerMonth && (
            <p className="text-[10px] md:text-xs font-semibold">
              Starts from <span>{carData.pricePerMonth}/mo.</span>
            </p>
          )}
        </div>
      </div>

      {/* === Actions === */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          btnText="Book an Appointment"
          paddingUtilities="px-3 py-2"
          roundUtilities="rounded-lg group"
          btnTextSize="text-sm"
          clickEvent={() => {
            setRequestType("Appointment");
            setAppointmentModalOpen(true);
          }}
          btnIcon={
            <svg
              className="text-primary duration-300 transition ease-in-out size-4 group-hover:text-white"
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
            variant="secondary"
            btnText="Book Test Drive"
            paddingUtilities="px-3 py-2"
            roundUtilities="rounded-lg"
            btnTextSize="text-sm"
            clickEvent={() => {
              setRequestType("testdrive");
              setAppointmentModalOpen(true);
            }}
          />

          <Button
            variant="secondary"
            btnText="Enquire Now"
            paddingUtilities="px-3 py-2"
            roundUtilities="rounded-lg"
            btnTextSize="text-sm"
            clickEvent={() => {
              setRequestType("vehicledetails");
              setAppointmentModalOpen(true);
            }}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <Button
            variant="secondary"
            btnText="Apply Finance"
            paddingUtilities="px-3 py-2"
            roundUtilities="rounded-lg"
            btnTextSize="text-sm"
          />
          <Button
            variant="secondary"
            btnText="Reserve for £99"
            paddingUtilities="px-3 py-2"
            roundUtilities="rounded-lg"
            btnTextSize="text-sm"
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
      {reservationModalOpen && (
        <ReservationModal
          isOpen={reservationModalOpen}
          setIsOpen={setReservationModalOpen}
          carData={carData}
        />
      )}
    </header>
  );
}
