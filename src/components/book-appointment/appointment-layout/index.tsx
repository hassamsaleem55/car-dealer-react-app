import React from "react";
import type { Car } from "@components-dir/car-card/car-card.types";

export default function AppointmentLayout({
  requestType,
  carData,
  children,
}: {
  requestType: "" | "Appointment" | "testdrive" | "vehicledetails";
  carData: Car;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-center p-4 gap-4">
      {/* LEFT COLUMN */}
      <aside className="w-full md:w-1/3 rounded-xl">
        {/* Car Image + Title */}
        <div className="rounded-xl overflow-hidden">
          <div className="h-48 w-full">
            <img
              src={carData.profilePicture}
              alt={carData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="border border-t-0 border-b-0 border-gray-200 p-4 text-basicFont space-y-2">
            <div>
              <div className="flex">
                <h3 className="grow text-xl font-semibold">{carData.title}</h3>
                <span
                  className="text-xl text-primary font-bold"
                  title="Total Price"
                >
                  {carData.retailPrice}
                </span>
              </div>
              <p className="text-xs">{carData.derivative}</p>
            </div>
            {requestType === "vehicledetails" && (
              <div className="flex flex-wrap gap-1">
                {carData.specs?.map((spec) => (
                  <span
                    key={spec.label}
                    className="border border-primary/50 text-xs rounded-xl px-2 py-1"
                    title={spec.label}
                  >
                    {spec.value}
                  </span>
                ))}
              </div>
            )}
            {}
            {requestType !== "vehicledetails" && (
              <div className="space-y-1">
                <h2 className="text-md font-semibold">
                  {requestType === "testdrive"
                    ? "Test Drive"
                    : "Appointment Info"}
                </h2>
                <p className="text-sm text-gray-600">
                  Estimated Time: 30 - 60 minutes
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your{" "}
                  {requestType === "testdrive" ? "test drive" : "appointment"}{" "}
                  will take place at our main showroom. Once confirmed, we’ll
                  email directions and details.
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Need to reschedule? Please let us know at least 24 hours in
                  advance.
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN */}
      <main className="`w-full md:w-2/3">{children}</main>
    </div>
  );
}
