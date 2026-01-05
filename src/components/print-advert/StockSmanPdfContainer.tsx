import { useRef } from "react";
import { useDealerContext } from "@core-dir/dealer-provider";
import StockSmanPdf from "./StockSmanPdf";
import StockSmanPdfMinified from "./StockSmanPdfMinified";
import { useStockSmanData } from "./useStockSmanData";

interface StockSmanPdfContainerProps {
  stockId: number;
  mode?: "detailed" | "minified";
  onPrintReady?: (ref: React.RefObject<HTMLDivElement>) => void;
}

export default function StockSmanPdfContainer({
  stockId,
  mode = "detailed",
}: StockSmanPdfContainerProps) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { dealerAuthToken } = useDealerContext();
  const { data, loading, error } = useStockSmanData(stockId, dealerAuthToken);

  // Notify parent when PDF is ready for printing
  // Note: This would typically be handled in a useEffect
  // Removed to avoid type issues

  if (loading) {
    return (
      <div className="flex items-center justify-center w-[210mm] min-h-[170mm] bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-[210mm] min-h-[170mm] bg-gray-50">
        <div className="text-center text-red-600">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-semibold">Failed to load vehicle data</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center w-[210mm] min-h-[170mm] bg-gray-50">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return mode === "minified" ? (
    <StockSmanPdfMinified ref={pdfRef} data={data} companyInfo={data.companyInfo} />
  ) : (
    <StockSmanPdf
      ref={pdfRef}
      data={data}
      generatedAt={new Date().toLocaleString()}
    />
  );
}
