import Button from "@elements-dir/button";

export default function CarConfirmView({
  vehicleDetails,
  onNext,
  onBack,
}: {
  vehicleDetails: any;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* <div className="p-12 flex flex-col items-center justify-center gap-2">
        <h2 className="text-5xl md:text-7xl font-black text-center uppercase tracking-tighter text-gray-900 mb-4">
          Sell My Car
        </h2>
        <p className="mb-8 text-gray-600 text-lg max-w-lg text-center leading-relaxed">
          <span className="font-bold text-gray-900">Get a free valuation</span>,
          the best offer from our experts, and free home collection with
          same-day payment.
        </p>
      </div> */}
      <h2 className="text-xl md:text-4xl font-bold uppercase mb-4 ml-2 ">
        Is this your car?
      </h2>
      <div className="min-w-4xl rounded-3xl bg-white shadow-xl border border-primary overflow-hidden">
        <div className="p-8 flex flex-col gap-2">
          <div className="">
            <h3 className="text-3xl font-bold">
              {vehicleDetails.make} {vehicleDetails.model}
            </h3>
            <p className="text-base text-gray-500">
              {vehicleDetails.derivative}
            </p>
          </div>
          <div className="flex items-center gap-4 mb-6">
            {/* <span className="bg-yellow-300 border border-black px-4 py-1 rounded font-mono font-bold text-xl uppercase shadow-sm"> */}
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg font-bold text-xl uppercase bg-linear-to-r from-primary/15 to-primary/5 text-primary border border-primary/30 shadow-sm">
              {vehicleDetails.registration}
            </span>
            <span className="text-sm text-bold">
              Not your car?{" "}
              <button onClick={onBack} className="text-primary underline">
                Change
              </button>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {[
              {
                icon: "Year",
                value: new Date(
                  vehicleDetails.firstRegistrationDate
                ).getFullYear(),
              },
              { icon: "Fuel", value: vehicleDetails.fuelType },
              { icon: "Trans", value: vehicleDetails.transmissionType },
              { icon: "Body", value: vehicleDetails.bodyType },
              { icon: "Color", value: vehicleDetails.colour },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 text-center px-2 py-2 group"
              >
                <div className="flex justify-center mb-1 text-gray-500 group-hover:text-primary transition-colors">
                  {spec.icon}
                </div>
                <p className="text-xs font-bold text-gray-800">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Button
              variant="primary"
              btnText="Yes, this is my car"
              clickEvent={onNext}
            />
            <Button
              variant="secondary"
              btnText="No, search again"
              clickEvent={onBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
