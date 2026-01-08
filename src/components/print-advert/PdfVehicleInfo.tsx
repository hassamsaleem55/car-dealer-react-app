import type { StockSmanDto } from "./StockSmanPdf";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(miles: number): string {
  return new Intl.NumberFormat("en-GB").format(miles);
}

export default function PdfVehicleInfo({ data }: { data: StockSmanDto }) {
  const year = data.aT_StockInfo?.vehicle?.firstRegistrationDate
    ? new Date(data.aT_StockInfo.vehicle.firstRegistrationDate).getFullYear()
    : "";

  const vehicle = data.aT_StockInfo?.vehicle;
  return (
    <div className="flex flex-col h-full space-y-1 sm:space-y-1.5">
      {/* Title & Price Header */}
      <div className="bg-linear-to-br from-primary to-primary/90 text-white p-2 sm:p-3 rounded-md sm:rounded-lg shadow-md sm:shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-xs sm:text-sm md:text-[15px] mb-0.5">
              {data.make} {data.model} {vehicle?.trim && `• ${vehicle.trim}`}
            </h2>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-white/90 uppercase tracking-wide">
              {year && year}
              {vehicle?.derivative && ` • ${vehicle.derivative}`}
            </p>
          </div>
          <div className="flex items-baseline justify-between sm:justify-end gap-2">
            <p className="text-[8px] sm:text-[9px] text-white/60 uppercase tracking-wide">
              Price:
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-black">
              {formatPrice(data.retailPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Identification */}
      {vehicle && (
        <div className="bg-linear-to-br from-slate-50 to-white rounded-md sm:rounded-lg border border-slate-200/80 overflow-hidden">
          <div className="bg-linear-to-r from-slate-100 to-transparent px-1.5 sm:px-2 py-0.5 sm:py-1 border-b border-slate-200/50">
            <h3 className="font-bold text-[8px] sm:text-[9px] md:text-[10px] text-slate-700 uppercase tracking-wide">
              Vehicle ID
            </h3>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 text-[7px] sm:text-[8px] md:text-[9px] p-1.5 sm:p-2 gap-0.5 sm:gap-1"> */}
          <div className="flex flex-col text-[8px] sm:text-[9px] md:text-[10px] p-1.5 sm:p-2 gap-0.5 sm:gap-1">
            {vehicle.vin && (
              <div>
                <span className="text-gray-500">VIN:</span>
                <span className="font-bold text-gray-800 ml-1">
                  {vehicle.vin}
                </span>
              </div>
            )}
            {vehicle.generation && (
              <div>
                <span className="text-gray-500">Generation:</span>
                <span className="font-bold text-gray-800 ml-1">
                  {vehicle.generation}
                </span>
              </div>
            )}
            {/* {vehicle.owners !== null && (
              <div>
                <span className="text-gray-500">Owners:</span>
                <span className="font-bold text-primary ml-1">
                  {vehicle.owners}
                </span>
              </div>
            )} */}
            {vehicle.sector && (
              <div>
                <span className="text-gray-500">Sector:</span>
                <span className="font-bold text-gray-800 ml-1">
                  {vehicle.sector}
                </span>
              </div>
            )}
            {vehicle.countryOfOrigin && (
              <div>
                <span className="text-gray-500">Country of Origin:</span>
                <span className="font-bold text-gray-800 ml-1">
                  {vehicle.countryOfOrigin}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compact Grid Info */}

      <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[8px] sm:text-[9px] md:text-[10px]">
        <div className="bg-linear-to-br from-primary/5 to-white p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-primary/20">
          <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wide mb-0.5">
            Registration
          </p>
          <p className="font-bold text-primary truncate">{data.registration}</p>
        </div>
        <div className="bg-linear-to-br from-primary/5 to-white p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-primary/20">
          <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wide mb-0.5">
            Mileage
          </p>
          <p className="font-bold text-primary truncate">
            {formatMileage(data.odometerReadingMiles)} miles
          </p>
        </div>
        <div className="bg-linear-to-br from-gray-50 to-white p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-gray-200">
          <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wide mb-0.5">
            Colour
          </p>
          <p className="font-bold text-gray-800 truncate">{data.colour}</p>
        </div>
        <div className="bg-linear-to-br from-gray-50 to-white p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-gray-200">
          <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wide mb-0.5">
            Fuel Type
          </p>
          <p className="font-bold text-gray-800 truncate">{data.fuelType}</p>
        </div>
        <div className="bg-linear-to-br from-gray-50 to-white p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-gray-200">
          <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wide mb-0.5">
            Transmission
          </p>
          <p className="font-bold text-gray-800 truncate">
            {data.transmissionType}
          </p>
        </div>
        {vehicle?.drivetrain && (
          <div className="bg-linear-to-br from-gray-50 to-white p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-gray-200">
            <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wide mb-0.5">
              Drivetrain
            </p>
            <p className="font-bold text-gray-800 truncate">
              {vehicle.drivetrain}
            </p>
          </div>
        )}
        {vehicle?.motExpiryDate && (
          <div className="bg-linear-to-br from-gray-50 to-white p-1.5 sm:p-2 rounded-md sm:rounded-lg border border-gray-200">
            <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wide mb-0.5">
              MOT Expiry
            </p>
            <p className="font-bold text-gray-800 truncate">
              {new Date(vehicle.motExpiryDate).toLocaleDateString("en-GB")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
