import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function AppOutlet() {
  const [queryString, setQueryString] = useState("");
  const [achievementsData, setAchievementsData] = useState<{
    soldStockCount: number | null;
    availableStockCount: number | null;
  }>({
    soldStockCount: null,
    availableStockCount: null,
  });

  const location = useLocation();

  return (
    <div className={location.pathname !== "/" ? "mt-16 md:mt-20" : ""}>
      <Outlet
        context={{
          queryString,
          setQueryString,
          achievementsData,
          setAchievementsData,
        }}
      />
    </div>
  );
}

export default AppOutlet;
