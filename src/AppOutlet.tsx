import { useEffect, useState, useCallback, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
import { fetchApi } from "@core-dir/services/Api.service";
import ReservationModal from "@components-dir/book-reservation/reservation-modal";
import type { Car } from "@components-dir/car-card/car-card.types";
import { transformFilterData } from "@core-dir/helpers/FilterDataProcessor";

function AppOutlet() {
  const location = useLocation();
  const { dealerAuthToken, dealerData } = useDealerContext();
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
  const [filtersData, setFiltersData] = useState<Array<any>>([]);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filtersFirstLoad, setFiltersFirstLoad] = useState(true);

  useEffect(() => {
    if (!location.pathname.toLowerCase().startsWith("/stock")) {
      setQueryString("");
    }
  }, [location.pathname]);

  const fetchData = useCallback(async () => {
    if (!dealerAuthToken || !dealerData?.CompanyId) return;
    
    try {
      setFiltersLoading(true);
      const response = await fetchApi(
        `/companies/${dealerData.CompanyId}/car-filters${
          queryString ? `?${queryString}` : ""
        }`,
        dealerAuthToken
      );
      const transformedData = transformFilterData(response);
      setFiltersData(transformedData);
      if (
        achievementsData.soldStockCount === null &&
        achievementsData.availableStockCount === null
      ) {
        const soldStockCount = response.soldStockCount
          ? response.soldStockCount - 3
          : 0;
        const availableStockCount = transformedData[0]?.total
          ? transformedData[0]?.total - 3
          : 0;
        setAchievementsData({
          soldStockCount,
          availableStockCount,
        });
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    } finally {
      setFiltersLoading(false);
      setFiltersFirstLoad(false);
    }
  }, [queryString, dealerAuthToken, dealerData?.CompanyId, achievementsData.soldStockCount, achievementsData.availableStockCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const outletContext = useMemo(
    () => ({
      queryString,
      setQueryString,
      filtersData,
      filtersLoading,
      filtersFirstLoad,
      achievementsData,
      setReservationModalOpen,
      setReservationCarData,
    }),
    [
      queryString,
      filtersData,
      filtersLoading,
      filtersFirstLoad,
      achievementsData,
    ]
  );

  return (
    <div className="min-h-[calc(100vh-400px)]">
      <Outlet context={outletContext} />
      {reservationModalOpen && (
        <ReservationModal
          isOpen={reservationModalOpen}
          setIsOpen={setReservationModalOpen}
          carData={reservationCarData}
        />
      )}
    </div>
  );
}

export default AppOutlet;
