import { useState } from "react";
import type { CarConfirmStepProps } from "../sell-car-wizard.types";
import Button from "@elements-dir/button";
import Breadcrumb from "../breadcrumbs";

export default function CarConfirmView({
  formData,
  vehicleDetails,
  onNext,
  onBack,
}: CarConfirmStepProps) {
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    // Simulate brief processing
    setTimeout(() => {
      onNext();
      setLoading(false);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Breadcrumb pageName="Car Confirmation" />
      <div className="mx-auto w-full md:min-w-5xl rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-lg sm:shadow-xl md:shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 sm:gap-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Vehicle Found
            </h4>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {vehicleDetails.make} {vehicleDetails.model}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1.5">
              {vehicleDetails.derivative}
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-lg font-bold text-lg uppercase bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 text-primary border-2 border-primary/40 shadow-sm">
                {formData.regNo}
              </span>
              {formData.mileage && (
                <div className="bg-gray-100 rounded-lg px-4 py-2 flex-1">
                  <p className="text-[10px] text-gray-500 font-medium">Mileage</p>
                  <p className="text-sm font-bold text-gray-900">
                    {Number(formData.mileage).toLocaleString()} mi
                  </p>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-600">
              Not your car?{" "}
              <button
                onClick={onBack}
                className="text-primary font-semibold underline hover:no-underline active:text-primary/80 transition-all touch-manipulation"
              >
                Change
              </button>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-2">
            {[
              {
                icon: "Year",
                value: vehicleDetails.year,
              },
              { icon: "Fuel", value: vehicleDetails.fuel },
              { icon: "Trans", value: vehicleDetails.transmission },
              { icon: "Body", value: vehicleDetails.body },
              { icon: "Color", value: vehicleDetails.color },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg border border-gray-200 p-3 text-center hover:border-primary/40 hover:bg-white active:scale-[0.98] transition-all touch-manipulation"
              >
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-1">
                  {spec.icon}
                </p>
                <p className="text-xs font-bold text-gray-900 truncate">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-100">
            <Button
              variant="secondary"
              btnText="No, search again"
              clickEvent={onBack}
            />
            <Button
              variant={loading ? "disabled" : "primary"}
              btnText={loading ? "Processing..." : "Yes, this is my car"}
              clickEvent={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
