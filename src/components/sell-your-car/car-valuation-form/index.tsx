import { useState } from "react";
import type { WizardStepProps } from "../sell-car-wizard.types";
import { useDealerContext } from "@core-dir/dealer-provider";
import { postApi } from "@core-dir/services/Api.service";
import { toast } from "sonner";
import Button from "@elements-dir/button";
import { ChevronRight } from "lucide-react";

export default function CarValuationForm({
  formData,
  setVehicleDetails,
  updateData,
  onNext,
}: WizardStepProps) {
  const [loading, setLoading] = useState(false);
  const { dealerAuthToken } = useDealerContext();

  const handleNext = () => {
    // e.preventDefault();
    if (!formData.registration || !formData.registration) return;

    setLoading(true);
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        const body = {
          Registration: formData.registration,
          OdometerReadingMiles: formData.mileage,
        };
        const response = await postApi(
          "/stocks/add-selling-stock",
          body,
          dealerAuthToken
        );

        console.log("Stock list response:", response);

        setVehicleDetails?.(response);
        onNext();
      } catch (error) {
        // console.log(error);
        toast.error(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  return (
    <div className="max-w-4xl rounded-3xl bg-white shadow-xl border border-primary overflow-hidden">
      <div className="p-12 flex flex-col items-center justify-center gap-2">
        <h2 className="text-5xl md:text-7xl font-black text-center uppercase tracking-tighter text-gray-900 mb-4">
          Sell My Car
        </h2>
        <p className="mb-8 text-gray-600 text-lg max-w-lg text-center leading-relaxed">
          <span className="font-bold text-gray-900">Get a free valuation</span>,
          the best offer from our experts, and free home collection with
          same-day payment.
        </p>

        <div className="w-full bg-white p-2 rounded-2xl shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row gap-2 border border-gray-100">
          {/* Registration Input */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <img className="w-10" src="../images/uk-flag.png" />
            </div>
            <input
              type="text"
              placeholder="ENTER REG"
              maxLength={8}
              className="w-full h-16 pl-14 pr-4 bg-gray-50 rounded-xl text-2xl uppercase font-bold border border-transparent focus:border-primary/70 focus:bg-white outline-none transition-all"
              value={formData.registration}
              onChange={(e) =>
                updateData({
                  registration: e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, ""),
                })
              }
            />
          </div>

          {/* Mileage Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
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
              className="w-full h-16 pl-14 pr-4 bg-gray-50 rounded-xl text-2xl uppercase font-bold border border-transparent focus:border-primary/70 focus:bg-white outline-none transition-all"
              value={formData.mileage}
              onChange={(e) => updateData({ mileage: e.target.value })}
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
          {/* 
        <Button
          type="submit"
          disabled={loading}
          variant="outline"
          className="h-16 px-8 text-lg md:w-auto w-full"
        >
          {loading ? "Searching..." : "Value My Car"}
          {!loading && <ChevronRight className="w-5 h-5" />}
        </Button> */}
        </div>
      </div>
    </div>
  );
}
