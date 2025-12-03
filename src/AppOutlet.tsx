import { useState } from "react";
import { Outlet } from "react-router-dom";
import ReservationModal from "@components-dir/book-reservation/reservation-modal";
import type { Car } from "@components-dir/car-card/car-card.types";

function AppOutlet() {
  const [queryString, setQueryString] = useState("");
  const [achievementsData, setAchievementsData] = useState<{
    soldStockCount: number | null;
    availableStockCount: number | null;
  }>({
    soldStockCount: null,
    availableStockCount: null,
  });
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reservationCarData, setReservationCarData] = useState<Car>(null!);

  return (
    <>
      <Outlet
        context={{
          queryString,
          setQueryString,
          achievementsData,
          setAchievementsData,
          setReservationModalOpen,
          setReservationCarData,
        }}
      />
      {reservationModalOpen && (
        <ReservationModal
          isOpen={reservationModalOpen}
          setIsOpen={setReservationModalOpen}
          carData={reservationCarData}
        />
      )}
    </>
  );
}

export default AppOutlet;
