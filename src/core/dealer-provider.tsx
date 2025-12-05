import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import dealerConfig from "@dealers-dir/setup.json";
import { getDealerData } from "./helpers/DealerDataProcessor";
import PageLoader from "@app-layout-dir/PageLoader";

const DealerContext = createContext<any>(null);
export function DealerProvider({ children }: { children: ReactNode }) {
  const [dealerAuthToken, setDealerAuthToken] = useState<any>(null);
  const [dealerData, setDealerData] = useState<any>(null);

  useEffect(() => {
    const fetchDealersData = async () => {
      const data = await getDealerData();
      setDealerAuthToken(data.authToken);
      setDealerData(data.dealerData);
      console.log("Dealer Data:", data.dealerData);
    };

    fetchDealersData();
  }, []);

  const contextValue = useMemo(
    () => ({
      dealerConfig,
      dealerAuthToken,
      dealerData,
    }),
    [dealerAuthToken, dealerData]
  );

  return (
    <DealerContext.Provider value={contextValue}>
      {dealerData ? children : <PageLoader />}
    </DealerContext.Provider>
  );
}

export function useDealerContext() {
  return useContext(DealerContext);
}
