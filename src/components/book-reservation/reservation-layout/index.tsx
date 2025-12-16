import React from "react";
import type { Car } from "@components-dir/car-card/car-card.types";

export default function ReservationLayout({
  carData,
  children,
}: {
  carData: Car;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-center p-4 gap-4">
      {/* LEFT COLUMN - Car Information */}
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

            {/* Car Specifications */}
            <div className="flex flex-wrap gap-1">
              {carData.specs?.slice(0, 6).map((spec) => (
                <span
                  key={spec.key}
                  className="border border-primary/50 text-xs rounded-xl px-2 py-1 flex items-center gap-1"
                  title={spec.key}
                >
                  <span className="w-4 h-4">{spec.icon}</span>
                  {spec.value}
                </span>
              ))}
            </div>

            {/* Reservation Info */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <h2 className="text-md font-semibold text-primary">
                Vehicle Reservation
              </h2>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Reservation Fee:{" "}
                  <span className="font-semibold text-primary">£99</span>
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Secure this vehicle for 48 hours. The reservation fee will be
                  deducted from your final purchase price.
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Need to cancel? Full refund available within 24 hours of
                  reservation.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold">
                  What's Included:
                </h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <svg
                      className="w-3 h-3 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    48-hour hold on the vehicle
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-3 h-3 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Priority viewing appointment
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-3 h-3 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dedicated sales consultant
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-3 h-3 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Vehicle history report
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN - Form Content */}
      <main className="w-full md:w-2/3">{children}</main>
    </div>
  );
}
