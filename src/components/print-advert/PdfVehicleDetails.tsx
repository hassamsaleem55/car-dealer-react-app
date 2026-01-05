import type { StockSmanDto } from "./StockSmanPdf";

// Reusable Section Header Component
const SectionHeader = ({
  title,
  colorClass = "slate",
}: {
  title: string;
  colorClass?: string;
}) => (
  <div
    className={`bg-linear-to-r from-${colorClass}-50 to-transparent px-1.5 sm:px-2 py-0.5 sm:py-1 border-b border-gray-200/50`}
  >
    <h3
      className={`font-bold text-[9px] sm:text-[10px] text-${colorClass}-700 uppercase tracking-wide`}
    >
      {title}
    </h3>
  </div>
);

// Reusable Grid Item Component
const GridItem = ({
  label,
  value,
  isHighlight = false,
}: {
  label: string;
  value: string | number;
  isHighlight?: boolean;
}) => (
  <div className="px-2 py-0.5 border-b border-r border-gray-100/50 last:border-r-0">
    <span className="text-gray-500">{label}:</span>
    <span
      className={`font-bold ml-1 ${
        isHighlight ? "text-primary" : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);

// Reusable Detail Row Component
const DetailRow = ({
  label,
  value,
  isHighlight = false,
}: {
  label: string;
  value: string | number;
  isHighlight?: boolean;
}) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}:</span>
    <span
      className={`font-bold ${
        isHighlight ? "text-emerald-600" : "text-gray-700"
      }`}
    >
      {value}
    </span>
  </div>
);

// Reusable Section Wrapper
const Section = ({
  title,
  colorClass,
  children,
}: {
  title: string;
  colorClass?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-linear-to-br from-gray-50 to-white rounded-md sm:rounded-lg shadow-sm border border-gray-200/80 overflow-hidden">
    <SectionHeader title={title} colorClass={colorClass} />
    {children}
  </div>
);

export default function PdfVehicleDetails({ data }: { data: StockSmanDto }) {
  const vehicle = data.aT_StockInfo?.vehicle;

  if (!vehicle) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
        {/* Engine Specifications */}
        <Section title="Engine">
          <div className="grid grid-cols-1 sm:grid-cols-2 text-[8px] sm:text-[9px]">
            {vehicle.engineCapacityCC && (
              <GridItem
                label="Capacity"
                value={`${vehicle.engineCapacityCC}cc`}
                isHighlight
              />
            )}
            {vehicle.enginePowerBHP && (
              <GridItem label="Power" value={`${vehicle.enginePowerBHP} BHP`} />
            )}
            {vehicle.enginePowerPS && (
              <GridItem
                label="Power (PS)"
                value={`${vehicle.enginePowerPS} PS`}
              />
            )}
            {vehicle.engineTorqueNM && (
              <GridItem label="Torque" value={`${vehicle.engineTorqueNM} NM`} />
            )}
            {vehicle.engineTorqueLBFT && (
              <GridItem
                label="Torque (lb-ft)"
                value={vehicle.engineTorqueLBFT.toFixed(1)}
              />
            )}
            {vehicle.cylinders && (
              <GridItem label="Cylinders" value={vehicle.cylinders} />
            )}
            {vehicle.valves && (
              <GridItem label="Valves" value={vehicle.valves} />
            )}
            {vehicle.gears && <GridItem label="Gears" value={vehicle.gears} />}
            {vehicle.cylinderArrangement && (
              <GridItem label="Config" value={vehicle.cylinderArrangement} />
            )}
            {vehicle.fuelDelivery && (
              <GridItem label="Fuel System" value={vehicle.fuelDelivery} />
            )}
            {vehicle.engineMake && (
              <GridItem label="Engine Make" value={vehicle.engineMake} />
            )}
            {vehicle.fuelCapacityLitres && (
              <GridItem
                label="Fuel Tank"
                value={`${vehicle.fuelCapacityLitres}L`}
              />
            )}
          </div>
        </Section>

        {/* Body & Cabin */}
        <Section title="Body & Cabin">
          <div className="grid grid-cols-1 sm:grid-cols-2 text-[8px] sm:text-[9px]">
            {vehicle.bodyType && (
              <GridItem label="Body" value={vehicle.bodyType} />
            )}
            {vehicle.vehicleType && (
              <GridItem label="Type" value={vehicle.vehicleType} />
            )}
            {vehicle.doors && <GridItem label="Doors" value={vehicle.doors} />}
            {vehicle.seats && <GridItem label="Seats" value={vehicle.seats} />}
            {vehicle.bootSpaceSeatsUpLitres && (
              <GridItem
                label="Boot"
                value={`${vehicle.bootSpaceSeatsUpLitres}L`}
              />
            )}
            {vehicle.bootSpaceSeatsDownLitres && (
              <GridItem
                label="Boot (down)"
                value={`${vehicle.bootSpaceSeatsDownLitres}L`}
              />
            )}
          </div>
        </Section>

        {/* Dimensions */}
        {(vehicle.lengthMM || vehicle.widthMM || vehicle.heightMM) && (
          <Section title="Dimensions" colorClass="purple">
            <div className="grid grid-cols-2 text-[9px]">
              {vehicle.lengthMM && (
                <GridItem label="Length" value={`${vehicle.lengthMM}mm`} />
              )}
              {vehicle.widthMM && (
                <GridItem label="Width" value={`${vehicle.widthMM}mm`} />
              )}
              {vehicle.heightMM && (
                <GridItem label="Height" value={`${vehicle.heightMM}mm`} />
              )}
              {vehicle.wheelbaseMM && (
                <GridItem
                  label="Wheelbase"
                  value={`${vehicle.wheelbaseMM}mm`}
                />
              )}
              {vehicle.minimumKerbWeightKG && (
                <GridItem
                  label="Kerb Weight"
                  value={`${vehicle.minimumKerbWeightKG}kg`}
                />
              )}
              {vehicle.grossVehicleWeightKG && (
                <GridItem
                  label="GVW"
                  value={`${vehicle.grossVehicleWeightKG}kg`}
                />
              )}
            </div>
          </Section>
        )}

        {/* <div className="grid grid-cols-2 gap-1.5"> */}
          {/* Economy & Emissions */}
          <Section title="Economy & Emissions" colorClass="emerald">
            <div className="text-[8px] sm:text-[9px] p-1.5 sm:p-2 space-y-0.5">
              <div className="grid grid-cols-2 gap-x-2">
                {vehicle.fuelEconomyWLTPCombinedMPG && (
                  <DetailRow
                    label="WLTP MPG"
                    value={vehicle.fuelEconomyWLTPCombinedMPG.toFixed(1)}
                    isHighlight
                  />
                )}
                {vehicle.fuelEconomyNEDCCombinedMPG && (
                  <DetailRow
                    label="NEDC MPG"
                    value={vehicle.fuelEconomyNEDCCombinedMPG.toFixed(1)}
                    isHighlight
                  />
                )}
              </div>
              {vehicle.fuelEconomyWLTPLowMPG && (
                <DetailRow
                  label="WLTP Low"
                  value={`${vehicle.fuelEconomyWLTPLowMPG.toFixed(1)} MPG`}
                />
              )}
              {vehicle.fuelEconomyWLTPMediumMPG && (
                <DetailRow
                  label="WLTP Medium"
                  value={`${vehicle.fuelEconomyWLTPMediumMPG.toFixed(1)} MPG`}
                />
              )}
              {vehicle.fuelEconomyWLTPHighMPG && (
                <DetailRow
                  label="WLTP High"
                  value={`${vehicle.fuelEconomyWLTPHighMPG.toFixed(1)} MPG`}
                />
              )}
              {vehicle.fuelEconomyWLTPExtraHighMPG && (
                <DetailRow
                  label="WLTP Extra High"
                  value={`${vehicle.fuelEconomyWLTPExtraHighMPG.toFixed(
                    1
                  )} MPG`}
                />
              )}
              {vehicle.co2EmissionGPKM && (
                <DetailRow
                  label="CO2 Emissions"
                  value={`${vehicle.co2EmissionGPKM} g/km`}
                />
              )}
              {vehicle.emissionClass && (
                <DetailRow
                  label="Emission Class"
                  value={vehicle.emissionClass}
                />
              )}
              {vehicle.rde2Compliant !== null && (
                <DetailRow
                  label="RDE2 Compliant"
                  value={vehicle.rde2Compliant ? "Yes" : "No"}
                />
              )}
              {vehicle.vehicleExciseDutyWithoutSupplementGBP && (
                <DetailRow
                  label="VED (Yearly)"
                  value={`£${vehicle.vehicleExciseDutyWithoutSupplementGBP}`}
                />
              )}
            </div>
          </Section>

          {/* Performance */}
          <Section title="Performance" colorClass="blue">
            <div className="text-[8px] sm:text-[9px] space-y-0.5 p-1.5 sm:p-2">
              {vehicle.topSpeedMPH && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Top Speed:</span>
                  <span className="font-bold text-blue-600">
                    {vehicle.topSpeedMPH} MPH
                  </span>
                </div>
              )}
              {vehicle.zeroToSixtyMPHSeconds && (
                <DetailRow
                  label="0-60 MPH"
                  value={`${vehicle.zeroToSixtyMPHSeconds}s`}
                />
              )}
              {vehicle.zeroToOneHundredKMPHSeconds && (
                <DetailRow
                  label="0-100 KM/H"
                  value={`${vehicle.zeroToOneHundredKMPHSeconds}s`}
                />
              )}
            </div>
          </Section>
        {/* </div> */}

        {/* Additional Information */}
        <Section title="Additional Info" colorClass="amber">
          <div className="text-[8px] sm:text-[9px] space-y-0.5 p-1.5 sm:p-2">
            {vehicle.insuranceGroup && (
              <DetailRow
                label="Insurance Group"
                value={`${vehicle.insuranceGroup}${
                  vehicle.insuranceSecurityCode
                    ? ` ${vehicle.insuranceSecurityCode}`
                    : ""
                }`}
              />
            )}
            {vehicle.countryOfOrigin && (
              <DetailRow label="Origin" value={vehicle.countryOfOrigin} />
            )}
            {vehicle.startStop !== null && (
              <DetailRow
                label="Start/Stop"
                value={vehicle.startStop ? "Yes" : "No"}
              />
            )}
            {vehicle.axles && <DetailRow label="Axles" value={vehicle.axles} />}
            {vehicle.boreMM && vehicle.strokeMM && (
              <DetailRow
                label="Bore × Stroke"
                value={`${vehicle.boreMM}mm × ${vehicle.strokeMM}mm`}
              />
            )}
          </div>
        </Section>
      </div>
    </>
  );
}
