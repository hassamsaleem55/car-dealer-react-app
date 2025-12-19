import { useMemo } from "react";
import moment from "moment-timezone";
import CalendarOne from "@components-dir/calendar";
import type { WizardStepProps } from "../sell-car-wizard.types";
import Button from "@elements-dir/button";

export default function SetAppointment({
  formData,
  vehicleDetails,
  updateData,
  onNext,
  onBack,
  setStep,
}: WizardStepProps) {
  const TODAY = useMemo(() => moment.tz("Europe/London"), []);
  return (
    <div className="flex flex-col">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Summary */}
        <div className="md:col-span-1">
          <div className="rounded-3xl bg-white shadow-xl border border-primary overflow-hidden">
            <div className="p-8 flex flex-col gap-2">
              <div>
                <h3 className="text-3xl font-bold">
                  {vehicleDetails?.make} {vehicleDetails?.model}
                </h3>
                <p className="text-base text-gray-500">
                  {vehicleDetails?.derivative}
                </p>
              </div>
              <div className="flex items-center gap-4 mb-6">
                {/* <span className="bg-yellow-300 border border-black px-4 py-1 rounded font-mono font-bold text-xl uppercase shadow-sm"> */}
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg font-bold text-xl uppercase bg-linear-to-r from-primary/15 to-primary/5 text-primary border border-primary/30 shadow-sm">
                  {vehicleDetails?.registration}
                </span>
                <span className="text-sm text-bold">
                  Not your car?{" "}
                  <button
                    onClick={() => setStep && setStep(1)}
                    className="text-primary underline"
                  >
                    Change
                  </button>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: "Year",
                    value: new Date(
                      vehicleDetails?.firstRegistrationDate
                    ).getFullYear(),
                  },
                  { icon: "Fuel", value: vehicleDetails?.fuelType },
                  { icon: "Trans", value: vehicleDetails?.transmissionType },
                  { icon: "Body", value: vehicleDetails?.bodyType },
                  { icon: "Color", value: vehicleDetails?.colour },
                ].map((spec, idx) => (
                  <div
                    key={idx}
                    className="bg-linear-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 text-center px-2 py-2 group"
                  >
                    <div className="flex justify-center mb-1 text-gray-500 group-hover:text-primary transition-colors">
                      {spec.icon}
                    </div>
                    <p className="text-xs font-bold text-gray-800">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-2 flex flex-col">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <CalendarOne
              TODAY={TODAY}
              selectedDate={formData.appointmentDate}
              setSelectedDate={(date: Date | null) =>
                updateData({ appointmentDate: date })
              }
              selectedTime={formData.appointmentTime}
              setSelectedTime={(time: string | null) =>
                updateData({ appointmentTime: time || undefined })
              }
            />
          </div>
          <div className="flex w-sm gap-4 pt-4 ml-auto">
            <Button variant="secondary" btnText="Back" clickEvent={onBack} />
            <Button variant="primary" btnText="Continue" clickEvent={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
}
