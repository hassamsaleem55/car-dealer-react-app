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
    <div className="flex flex-col h-full space-y-1.5">
      {/* Title & Price Header */}
      <div className="bg-linear-to-br from-primary to-primary/90 text-white p-3 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[15px] mb-0.5">
              {data.make} {data.model} {vehicle?.trim && `• ${vehicle.trim}`}
            </h2>
            <p className="text-[11px] text-white/90 uppercase tracking-wide">
              {year && year}
              {vehicle?.derivative && ` • ${vehicle.derivative}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-white/60 uppercase tracking-wide">
              Price
            </p>
            <p className="text-2xl font-black">
              {formatPrice(data.retailPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Identification */}
      {vehicle && (
        <div className="bg-linear-to-br from-slate-50 to-white rounded-lg border border-slate-200/80 overflow-hidden">
          <div className="bg-linear-to-r from-slate-100 to-transparent px-2 py-1 border-b border-slate-200/50">
            <h3 className="font-bold text-[10px] text-slate-700 uppercase tracking-wide">
              Vehicle ID
            </h3>
          </div>
          <div className="grid grid-cols-2 text-[9px] p-2 gap-1">
            {vehicle.vin && (
              <div className="col-span-2">
                <span className="text-gray-500">VIN:</span>
                <span className="font-bold text-gray-800 ml-1">
                  {vehicle.vin}
                </span>
              </div>
            )}
            {vehicle.generation && (
              <div className="col-span-2">
                <span className="text-gray-500">Generation:</span>
                <span className="font-bold text-gray-800 ml-1">
                  {vehicle.generation}
                </span>
              </div>
            )}
            {vehicle.owners !== null && (
              <div>
                <span className="text-gray-500">Owners:</span>
                <span className="font-bold text-primary ml-1">
                  {vehicle.owners}
                </span>
              </div>
            )}
            {vehicle.sector && (
              <div>
                <span className="text-gray-500">Sector:</span>
                <span className="font-bold text-gray-800 ml-1">
                  {vehicle.sector}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compact Grid Info */}

      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div className="bg-linear-to-br from-primary/5 to-white p-2 rounded-lg border border-primary/20">
          <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">
            Registration
          </p>
          <p className="font-bold text-primary">{data.registration}</p>
        </div>
        <div className="bg-linear-to-br from-primary/5 to-white p-2 rounded-lg border border-primary/20">
          <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">
            Mileage
          </p>
          <p className="font-bold text-primary">
            {formatMileage(data.odometerReadingMiles)} miles
          </p>
        </div>
        <div className="bg-linear-to-br from-gray-50 to-white p-2 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">
            Colour
          </p>
          <p className="font-bold text-gray-800">{data.colour}</p>
        </div>
        <div className="bg-linear-to-br from-gray-50 to-white p-2 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">
            Fuel Type
          </p>
          <p className="font-bold text-gray-800">{data.fuelType}</p>
        </div>
        <div className="bg-linear-to-br from-gray-50 to-white p-2 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">
            Transmission
          </p>
          <p className="font-bold text-gray-800">{data.transmissionType}</p>
        </div>
        {vehicle?.drivetrain && (
          <div className="bg-linear-to-br from-gray-50 to-white p-2 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">
              Drivetrain
            </p>
            <p className="font-bold text-gray-800">{vehicle.drivetrain}</p>
          </div>
        )}
        {vehicle?.motExpiryDate && (
          <div className="bg-linear-to-br from-gray-50 to-white p-2 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">
              MOT Expiry
            </p>
            <p className="font-bold text-gray-800">
              {new Date(vehicle.motExpiryDate).toLocaleDateString("en-GB")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
