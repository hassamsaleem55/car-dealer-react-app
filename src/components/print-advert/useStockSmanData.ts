import { useState, useEffect } from "react";
import { fetchApi } from "@core-dir/services/Api.service";
import type { StockSmanDto } from "./StockSmanPdf";

interface UseStockSmanDataResult {
  data: StockSmanDto | null;
  loading: boolean;
  error: string | null;
}

export function useStockSmanData(
  stockId: number,
  authToken: string | null
): UseStockSmanDataResult {
  const [data, setData] = useState<StockSmanDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authToken) {
      setError('Authentication token is missing');
      setLoading(false);
      return;
    }
    
    let isMounted = true;

    async function fetchStockSmanData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchApi<StockSmanDto>(
          `/stocks/${stockId}/stock-sman`,
          authToken
        );

        if (isMounted) {
          setData(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch stock data"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (stockId && authToken) {
      fetchStockSmanData();
    }

    return () => {
      isMounted = false;
    };
  }, [stockId, authToken]);

  return { data, loading, error };
}
