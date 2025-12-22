import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import moment from "moment-timezone";
import Button from "@elements-dir/button";
import CalendarOne from "@components-dir/calendar";
import Breadcrumb from "../breadcrumbs";
import type { SetAppointmentStepProps } from "../sell-car-wizard.types";

export default function SetAppointment({
  formData,
  updateFormData,
  vehicleDetails,
  onNext,
  onBack,
  setStep,
}: SetAppointmentStepProps) {
  const [loading, setLoading] = useState(false);
  const TODAY = useMemo(() => moment.tz("Europe/London"), []);
  useEffect(() => {
    if (!formData.scheduleDate) {
      updateFormData({ scheduleDate: TODAY.toDate() });
    }
  }, [formData.scheduleDate, TODAY, updateFormData]);

  const validate = () => {
    if (!formData.scheduleDate) {
      toast.error("Please select a date for your appointment.");
      return false;
    }
    if (!formData.scheduleDayId) {
      toast.error("Please select a time before proceeding.");
      return false;
    }
    return true;
  };

  

  const handleNext = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 500));
      onNext(); // move to success step
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb pageName="Set Appointment" />
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Vehicle Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-linear-to-br from-white via-gray-50/50 to-white shadow-2xl border border-gray-200/60 overflow-hidden h-full">
            <div className="p-6 flex flex-col gap-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Your Vehicle
                </h4>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {vehicleDetails?.make} {vehicleDetails?.model}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {vehicleDetails?.derivative}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="inline-flex items-center px-4 py-2 rounded-lg font-bold text-lg uppercase bg-linear-to-r from-primary/20 via-primary/10 to-primary/5 text-primary border-2 border-primary/40 shadow-md">
                  {vehicleDetails?.regNo}
                </span>
                {formData?.mileage && (
                  <div className="bg-gray-100 rounded-lg px-3 py-1.5">
                    <p className="text-[10px] text-gray-500 font-medium">
                      Mileage
                    </p>
                    <p className="text-xs font-bold text-gray-900">
                      {Number(formData.mileage).toLocaleString()} mi
                    </p>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Not your car?{" "}
                <button
                  onClick={() => setStep(1)}
                  className="text-primary font-semibold underline hover:no-underline transition-all cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 p-5 shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                <p className="text-xs text-gray-700 font-semibold uppercase tracking-wider mb-1 relative z-10">
                  Estimated Value
                </p>
                <p className="text-3xl font-bold text-primary relative z-10">
                  £{vehicleDetails?.retailPrice?.toLocaleString() || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Year",
                    value: vehicleDetails?.year
                      ? new Date(vehicleDetails.year).getFullYear()
                      : "N/A",
                  },
                  { label: "Fuel", value: vehicleDetails?.fuel || "N/A" },
                  {
                    label: "Trans",
                    value: vehicleDetails?.transmission || "N/A",
                  },
                  { label: "Body", value: vehicleDetails?.body || "N/A" },
                  { label: "Color", value: vehicleDetails?.color || "N/A" },
                ].map((spec, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center p-3 group"
                  >
                    <p className="text-[10px] text-gray-500 font-medium mb-1 group-hover:text-primary transition-colors uppercase tracking-wide">
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

        {/* Right: Calendar */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-linear-to-br from-white via-blue-50/20 to-white rounded-2xl shadow-2xl border border-blue-200/60 p-6 md:p-8 flex-1">
            <CalendarOne
              TODAY={TODAY}
              setScheduleDayId={(dayId: number | null) =>
                updateFormData({ scheduleDayId: dayId })
              }
              selectedDate={formData.scheduleDate}
              setSelectedDate={(date: Date | null) =>
                updateFormData({ scheduleDate: date })
              }
              selectedTime={formData.scheduleTime}
              setSelectedTime={(time: string | null) =>
                updateFormData({ scheduleTime: time || "" })
              }
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" btnText="Back" clickEvent={onBack} />
            <Button
              variant={loading ? "disabled" : "primary"}
              btnText={loading ? "Processing..." : "Complete Submission"}
              clickEvent={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
