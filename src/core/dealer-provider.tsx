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

interface DealerContextType {
  dealerConfig: typeof dealerConfig;
  dealerAuthToken: string | null;
  dealerData: any | null;
}

const DealerContext = createContext<DealerContextType | null>(null);

export function DealerProvider({ children }: { children: ReactNode }) {
  const [dealerAuthToken, setDealerAuthToken] = useState<string | null>(null);
  const [dealerData, setDealerData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchDealersData = async () => {
      try {
        const data = await getDealerData();
        if (mounted) {
          setDealerAuthToken(data.authToken);
          setDealerData(data.dealerData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load dealer data'));
        }
      }
    };

    fetchDealersData();
    
    return () => {
      mounted = false;
    };
  }, []);

  const contextValue = useMemo<DealerContextType>(
    () => ({
      dealerConfig,
      dealerAuthToken,
      dealerData,
    }),
    [dealerAuthToken, dealerData]
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Dealer Data</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <DealerContext.Provider value={contextValue}>
      {dealerData ? children : <PageLoader />}
    </DealerContext.Provider>
  );
}

export function useDealerContext() {
  const context = useContext(DealerContext);
  if (!context) {
    throw new Error('useDealerContext must be used within DealerProvider');
  }
  return context;
}
