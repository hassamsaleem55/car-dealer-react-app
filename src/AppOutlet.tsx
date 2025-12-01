import { useState } from "react";
import { Outlet } from "react-router-dom";

function AppOutlet() {
  const [queryString, setQueryString] = useState("");
  const [achievementsData, setAchievementsData] = useState<{
    soldStockCount: number | null;
    availableStockCount: number | null;
  }>({
    soldStockCount: null,
    availableStockCount: null,
  });

  return (
    <Outlet
      context={{
        queryString,
        setQueryString,
        achievementsData,
        setAchievementsData,
      }}
    />
  );
}

export default AppOutlet;
