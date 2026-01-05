import { forwardRef } from "react";
import type { StockSmanDto } from "./StockSmanPdf";

interface StockSmanPdfMinifiedProps {
  data: StockSmanDto;
}

const StockSmanPdfMinified = forwardRef<HTMLDivElement, StockSmanPdfMinifiedProps>(
  ({ data }, ref) => {
    const {
      make,
      model,
      registration,
      retailPrice,
      odometerReadingMiles,
      colour,
      fuelType,
      transmissionType,
      stockMedia,
      companyInfo,
      aT_StockInfo,
    } = data;

    const mainImage = stockMedia?.[0]?.images?.[0]?.photoPath;
    const specs = [
      { label: "Mileage", value: `${odometerReadingMiles?.toLocaleString()} miles` },
      { label: "Fuel Type", value: fuelType },
      { label: "Transmission", value: transmissionType },
      { label: "Colour", value: colour },
      { label: "Year", value: aT_StockInfo?.vehicle?.yearOfManufacture || "N/A" },
      { label: "Body Type", value: aT_StockInfo?.vehicle?.bodyType || "N/A" },
      { label: "Engine Size", value: aT_StockInfo?.vehicle?.engineCapacityCC ? `${aT_StockInfo.vehicle.engineCapacityCC}cc` : "N/A" },
      { label: "Doors", value: aT_StockInfo?.vehicle?.doors || "N/A" },
    ];

    return (
      <div
        ref={ref}
        className="bg-white"
        style={{
          width: "210mm",
          height: "297mm",
          padding: "10mm",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-gray-200">
          <div className="flex-1">
            <h1 className="sm:text-2xl font-bold text-gray-900 mb-1">
              {make} {model}
            </h1>
            <p className="sm:text-lg text-gray-600">{registration}</p>
          </div>
          {companyInfo?.logoUrl && (
            <img
              src={companyInfo.logoUrl}
              alt={companyInfo.companyName || "Dealer Logo"}
              className="sm:h-10 w-auto object-contain"
            />
          )}
        </div>

        {/* Price */}
        <div className="bg-primary/5 sm:rounded-lg sm:p-3 mb-4 border-l-4 border-primary">
          <p className="text-xs text-gray-600 mb-0.5">Retail Price</p>
          <p className="sm:text-xl font-bold text-primary">
            £{retailPrice?.toLocaleString()}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid sm:grid-cols-12 sm:gap-4 flex-1">
          {/* Image */}
          <div className="sm:col-span-7">
            {mainImage ? (
              <img
                src={mainImage}
                alt={`${make} ${model}`}
                className="w-full h-full object-cover sm:rounded-lg"
                style={{ maxHeight: "160mm" }}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 sm:rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="sm:col-span-5">
            <h2 className="sm:text-lg font-bold text-gray-800 mb-3">Vehicle Specifications</h2>
            <div className="grid gap-2">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between sm:py-1 border-b border-gray-200"
                >
                  <span className="sm:text-[10px] text-gray-600 font-medium">{spec.label}:</span>
                  <span className="sm:text-[10px] text-gray-900 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            {data.advert?.description && (
              <div className="sm:mt-3.5">
                <h3 className="sm:text-[12px] font-bold text-gray-800 mb-1.5">Description</h3>
                <p className="sm:text-[9px] text-gray-600 line-clamp-6">
                  {data.advert.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sm:mt-2 pt-3 border-t-2 border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex-1">
              {companyInfo?.companyName && (
                <p className="sm:text-[12px] font-bold text-gray-900">
                  {companyInfo.companyName}
                </p>
              )}
              {companyInfo?.fullAddress && (
                <p className="sm:text-[9px] text-gray-600">{companyInfo.fullAddress}</p>
              )}
            </div>
            <div className="text-right">
              {companyInfo?.contactInfo?.phoneNumber && (
                <p className="sm:text-[10px] font-semibold text-gray-900">
                  📞 {companyInfo.contactInfo.phoneNumber}
                </p>
              )}
              {companyInfo?.contactInfo?.infoEmailAddress && (
                <p className="sm:text-[9px] text-gray-600">
                  ✉️ {companyInfo.contactInfo.infoEmailAddress}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StockSmanPdfMinified.displayName = "StockSmanPdfMinified";

export default StockSmanPdfMinified;
