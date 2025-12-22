import type { FormData, VehicleDetails } from "../sell-car-wizard.types";

export default function VehicleDetailsPanel({
  formData,
  vehicleDetails,
  setStep,
}: {
  formData: FormData;
  vehicleDetails: VehicleDetails;
  setStep?: (step: number) => void;
}) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-white via-gray-50/50 to-white shadow-2xl border border-gray-200/60 overflow-hidden h-full">
      <div className="p-6 flex flex-col gap-4">
        {/* Vehicle Header */}
        <div className="border-b border-gray-200 pb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Your Vehicle
          </h4>
          <h3 className="text-2xl font-bold text-gray-900 leading-tight">
            {vehicleDetails.make} {vehicleDetails.model}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {vehicleDetails.derivative}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-4 py-2 rounded-lg font-bold text-lg uppercase bg-linear-to-r from-primary/20 via-primary/10 to-primary/5 text-primary border-2 border-primary/40 shadow-md">
            {formData.regNo}
          </span>
          <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-center">
            <p className="text-xs text-gray-500 font-medium">Mileage</p>
            <p className="text-sm font-bold text-gray-900">
              {formData.mileage !== null
                ? formData.mileage.toLocaleString()
                : "N/A"}{" "}
              mi
            </p>
          </div>
        </div>
        {setStep && (
          <div className="text-sm text-gray-600 text-right px-2">
            Not your car?{" "}
            <button
              onClick={() => setStep(1)}
              className="text-primary font-semibold underline hover:no-underline transition-all cursor-pointer"
            >
              Change
            </button>
          </div>
        )}

        {vehicleDetails.retailPrice && (
          <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 p-5 shadow-inner">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <p className="text-xs text-gray-700 font-semibold uppercase tracking-wider mb-1 relative z-10">
              Estimated Value
            </p>
            <p className="text-3xl font-bold text-primary relative z-10">
              £{vehicleDetails.retailPrice.toLocaleString() || "N/A"}
            </p>
          </div>
        )}

        {/* Vehicle Specs */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Year",
                value: vehicleDetails.year
                  ? new Date(vehicleDetails.year).getFullYear()
                  : "N/A",
              },
              { label: "Fuel", value: vehicleDetails.fuel || "N/A" },
              { label: "Color", value: vehicleDetails.color || "N/A" },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center p-3 group"
              >
                <p className="text-[10px] text-gray-500 font-medium mb-1 group-hover:text-primary transition-colors">
                  {spec.label}
                </p>
                <p className="text-xs font-bold text-gray-900 truncate">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Transmission",
                value: vehicleDetails.transmission || "N/A",
              },
              { label: "Body", value: vehicleDetails.body || "N/A" },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center p-3 group"
              >
                <p className="text-[10px] text-gray-500 font-medium mb-1 group-hover:text-primary transition-colors">
                  {spec.label}
                </p>
                <p className="text-xs font-bold text-gray-900 truncate">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
