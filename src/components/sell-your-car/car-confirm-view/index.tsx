import { useState } from "react";
import Button from "@elements-dir/button";
import Breadcrumb from "../breadcrumbs";
import type { CarConfirmStepProps } from "../sell-car-wizard.types";

export default function CarConfirmView({
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
    <div className="flex flex-col gap-6">
      <Breadcrumb pageName="Car Confirmation" />
      <div className="min-w-5xl mx-auto w-full rounded-2xl bg-linear-to-br from-white via-blue-50/20 to-white shadow-2xl border border-blue-200/60 overflow-hidden">
        <div className="p-8 md:p-10 flex flex-col gap-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Vehicle Found
            </h4>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              {vehicleDetails.make} {vehicleDetails.model}
            </h3>
            <p className="text-base text-gray-600 mt-1">
              {vehicleDetails.derivative}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-lg font-bold text-xl uppercase bg-linear-to-r from-primary/20 via-primary/10 to-primary/5 text-primary border-2 border-primary/40 shadow-md">
              {vehicleDetails.regNo}
            </span>
            {vehicleDetails.mileage && (
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <p className="text-xs text-gray-500 font-medium">Mileage</p>
                <p className="text-sm font-bold text-gray-900">
                  {Number(vehicleDetails.mileage).toLocaleString()} mi
                </p>
              </div>
            )}
            <span className="text-sm text-gray-600">
              Not your car?{" "}
              <button
                onClick={onBack}
                className="text-primary font-semibold underline hover:no-underline transition-all"
              >
                Change
              </button>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-6">
            {[
              {
                icon: "Year",
                value:  vehicleDetails.year,
              },
              { icon: "Fuel", value: vehicleDetails.fuel },
              { icon: "Trans", value: vehicleDetails.transmission },
              { icon: "Body", value: vehicleDetails.body },
              { icon: "Color", value: vehicleDetails.color },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center p-3 group"
              >
                <p className="text-[10px] text-gray-500 font-medium mb-1 group-hover:text-primary transition-colors uppercase tracking-wide">
                  {spec.icon}
                </p>
                <p className="text-xs font-bold text-gray-900">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-2">
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
