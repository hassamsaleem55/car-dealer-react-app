import { useState } from "react";
import { Heart } from "lucide-react";
import Button from "@elements-dir/button";
import { type CarData } from "../car-details.types";
import AppointmentModal from "@components-dir/modals/appointment-modal";

export default function CarHeader({
  carData,
  isFavorite,
  toggleFavorite,
}: {
  carData: CarData;
  isFavorite: boolean;
  toggleFavorite: () => void;
}) {
  return (
    <header className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4">
      {/* === Title, Registration, Tags & Favorite Button === */}
      <div>
        <div className="flex">
          <h1 className="grow text-2xl sm:text-3xl font-bold">
            {carData.title}
          </h1>

          <button
            className={`flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full transition cursor-pointer ${
              isFavorite
                ? "bg-primary text-white"
                : "text-primary hover:bg-primary/10"
            }`}
            onClick={toggleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          {carData.registrationNo && (
            <span className="text-xs bg-primary/20 font-semibold px-2 py-1 rounded-full">
              {carData.registrationNo}
            </span>
          )}
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
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
              <p className="font-medium line-clamp-3">{carData.derivative}</p>
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="text-right space-y-1">
          <p className="text-3xl font-semibold text-primary">
            {carData.retailPrice}
          </p>
          {carData.pricePerMonth && (
            <p className="text-xs font-semibold">
              Starts from <span>{carData.pricePerMonth}/mo.</span>
            </p>
          )}
        </div>
      </div>

      {/* === Actions === */}
      <CarActions />
    </header>
  );
}

function CarActions() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="primary"
        btnText="Book an Appointment"
        paddingUtilities="px-3 py-2"
        widthUtilities="w-full sm:w-auto"
        btnTextSize="text-sm"
        clickEvent={() => setAppointmentModalOpen(true)}
      />
      <Button
        variant="secondary"
        btnText="Reserve for £99"
        paddingUtilities="px-3 py-2"
        widthUtilities="w-full sm:w-auto"
        btnTextSize="text-sm"
      />
      <Button
        variant="secondary"
        btnText="Apply Finance"
        paddingUtilities="px-3 py-2"
        widthUtilities="w-full sm:w-auto"
        btnTextSize="text-sm"
      />
      {appointmentModalOpen && (
        <AppointmentModal
          isOpen={appointmentModalOpen}
          setIsOpen={setAppointmentModalOpen}
        />
      )}
    </div>
  );
}
