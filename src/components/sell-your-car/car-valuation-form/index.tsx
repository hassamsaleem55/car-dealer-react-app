import { useState } from "react";
import type { CarValuationStepProps } from "../sell-car-wizard.types";
import { useDealerContext } from "@core-dir/dealer-provider";
import { postApi } from "@core-dir/services/Api.service";
import { toast } from "sonner";
import Button from "@elements-dir/button";
import { ChevronRight } from "lucide-react";

export default function CarValuationForm({
  formData,
  updateFormData,
  updateVehicleDetails,
  onNext,
}: CarValuationStepProps) {
  const [loading, setLoading] = useState(false);
  const { dealerAuthToken } = useDealerContext();

  const handleNext = () => {
    if (!formData.regNo || !formData.mileage) {
      toast.error("Please enter both registration number and mileage.");
      return;
    }

    setLoading(true);
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        const body = {
          Registration: formData.regNo,
          OdometerReadingMiles: formData.mileage,
        };
        const response = await postApi(
          "/stocks/add-selling-stock",
          body,
          dealerAuthToken
        );

        if (
          !response.stockId ||
          response.stockId <= 0 ||
          response.stockId === null
        ) {
          toast.error(
            "Something went wrong. Please check your details and try again."
          );
        }
        updateFormData({ stockId: response.stockId });
        updateVehicleDetails({
          regNo: response.registration,
          mileage: response.odometerReadingMiles,
          make: response.make,
          model: response.model,
          derivative: response.derivative,
          year: new Date(response.firstRegistrationDate).getFullYear(),
          color: response.colour,
          fuel: response.fuelType,
          transmission: response.transmissionType,
          body: response.bodyType,
        });
        onNext();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto rounded-2xl bg-linear-to-br from-white via-gray-50/50 to-white shadow-2xl border border-gray-200/60 overflow-hidden">
      <div className="p-10 md:p-14 flex flex-col items-center justify-center gap-4">
        <div className="text-center mb-6">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 mb-3">
            Sell My Car
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            <span className="font-bold text-primary">Get a free valuation</span>{" "}
            from our experts, plus free home collection with same-day payment.
          </p>
        </div>

        <div className="w-full bg-linear-to-br from-white to-gray-50/50 p-3 rounded-2xl shadow-xl border border-gray-200/60 flex flex-col md:flex-row gap-3">
          {/* Registration Input */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <img className="w-10" src="../images/uk-flag.png" />
            </div>
            <input
              type="text"
              placeholder="ENTER REG"
              maxLength={8}
              className="w-full h-16 pl-16 pr-4 bg-white rounded-xl text-2xl uppercase font-bold border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              value={formData.regNo}
              onChange={(e) =>
                updateFormData({
                  regNo: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
                })
              }
            />
          </div>

          {/* Mileage Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-9 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
            </div>
            <input
              type="number"
              placeholder="Mileage"
              className="w-full h-16 pl-16 pr-4 bg-white rounded-xl text-2xl uppercase font-bold border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              value={formData.mileage}
              onChange={(e) => updateFormData({ mileage: e.target.value })}
            />
          </div>
          <Button
            variant={loading ? "disabled" : "primary"}
            btnIcon={!loading && <ChevronRight className="w-5 h-5" />}
            btnText={loading ? "Searching..." : "Value My Car"}
            btnTextSize="text-lg"
            paddingUtilities="px-8"
            widthUtilities="md:w-auto w-full"
            roundUtilities="rounded-xl"
            clickEvent={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
