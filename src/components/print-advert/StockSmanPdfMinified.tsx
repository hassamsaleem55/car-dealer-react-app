import React from "react";
import type { StockSmanDto } from "./StockSmanPdf";
import QRCode from "react-qr-code";
import PdfImages from "./PdfImages";

// Utility function for grouping features by category
const groupBy = <T, K extends keyof any>(
  arr: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return arr.reduce((acc, item) => {
    const groupKey = key(item);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

// Reusable style constants
const CARD_BASE = "rounded-lg border overflow-hidden shadow-sm";
const CARD_HEADER = "px-2 py-1 border-b border-gray-200";
const CARD_BODY = "p-2 space-y-0.5";
const INFO_ROW =
  "flex justify-between border-b border-gray-100 pb-0.5 text-[8px]";
const INFO_LABEL = "text-slate-500 uppercase tracking-wide";
const INFO_VALUE = "font-semibold text-slate-700";

// Color schemes for different sections
const SECTION_COLORS = {
  default: {
    bg: "bg-linear-to-br from-slate-50 to-white",
    border: "border-slate-200/80",
    header: "bg-linear-to-r from-slate-100 to-transparent",
    headerText: "text-slate-700",
    accent: "text-primary",
  },
  economy: {
    bg: "bg-linear-to-br from-emerald-50 to-white",
    border: "border-emerald-200/80",
    header: "bg-linear-to-r from-emerald-100 to-transparent",
    headerText: "text-emerald-700",
    accent: "text-emerald-600",
  },
  performance: {
    bg: "bg-linear-to-br from-blue-50 to-white",
    border: "border-blue-200/80",
    header: "bg-linear-to-r from-blue-100 to-transparent",
    headerText: "text-blue-700",
    accent: "text-blue-600",
  },
  dimensions: {
    bg: "bg-linear-to-br from-purple-50 to-white",
    border: "border-purple-200/80",
    header: "bg-linear-to-r from-purple-100 to-transparent",
    headerText: "text-purple-700",
    accent: "text-purple-600",
  },
  additional: {
    bg: "bg-linear-to-br from-amber-50 to-white",
    border: "border-amber-200/80",
    header: "bg-linear-to-r from-amber-100 to-transparent",
    headerText: "text-amber-700",
    accent: "text-amber-600",
  },
};

interface StockSmanPdfMinifiedProps {
  data: StockSmanDto;
  companyInfo: any;
}

// Reusable Section Card Component
const SectionCard: React.FC<{
  title: string;
  colorScheme: keyof typeof SECTION_COLORS;
  children: React.ReactNode;
}> = ({ title, colorScheme, children }) => {
  const colors = SECTION_COLORS[colorScheme];
  return (
    <div className={`${CARD_BASE} ${colors.bg} ${colors.border}`}>
      <div className={`${CARD_HEADER} ${colors.header} ${colors.headerText}`}>
        <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

// Info Row Component
const InfoRow: React.FC<{
  label: string;
  value: string | number;
  highlight?: boolean;
  noBorder?: boolean;
}> = ({ label, value, highlight, noBorder }) => (
  <div
    className={noBorder ? "text-[8px] flex justify-between pb-0.5" : INFO_ROW}
  >
    <span className="text-slate-500">{label}:</span>
    <span className={`font-semibold ${highlight ? "text-primary" : INFO_VALUE}`}>
      {value}
    </span>
  </div>
);

export const StockSmanPdfMinified = React.forwardRef<
  HTMLDivElement,
  StockSmanPdfMinifiedProps
>(({ data, companyInfo }, ref) => {
  if (!data) return null;

  const {
    stockId,
    colour,
    fuelType,
    transmissionType,
    odometerReadingMiles,
  } = data;

  const year = data.aT_StockInfo?.vehicle?.yearOfManufacture;
  const vehicle = data.aT_StockInfo?.vehicle;
  const features = data.features || [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    }).format(price);

  const formatMileage = (miles: number) =>
    new Intl.NumberFormat("en-GB").format(miles);

  const stockDetailsUrl = `${companyInfo?.url}/stock/${stockId}` || "";

  const formattedFeatures =
    features.map((f: any) => ({
      name: f.name,
      category: f.category || "Other",
    })) || [];

  const groupedFeatures = groupBy(formattedFeatures, (f: any) => f.category);

  return (
    <div
      ref={ref}
      className="max-w-[210mm] w-full min-h-[297mm] bg-linear-to-br from-slate-50/30 via-white to-gray-50/20 mx-auto text-[10px] sm:text-[11px] font-sans print:bg-white print:max-w-full"
      style={
        {
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          colorAdjust: "exact",
          padding: "5mm",
        } as React.CSSProperties
      }
    >
      <div className="space-y-2 sm:space-y-3">
        {/* Header Section */}
        <header className="bg-linear-to-r from-primary via-primary/70 text-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between gap-3 sm:gap-4 p-2 sm:p-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {companyInfo?.logoUrl && (
                <div className="bg-white/95 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg shadow-md shrink-0">
                  <img
                    src={companyInfo.logoUrl}
                    className="h-8 sm:h-10 w-auto object-contain"
                    alt="Company Logo"
                  />
                </div>
              )}
              <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                <h1 className="font-bold text-sm sm:text-base tracking-tight text-white line-clamp-1">
                  {companyInfo?.companyName || ""}
                </h1>
                <div className="flex flex-wrap gap-x-3 sm:gap-x-4 text-white/95 text-[9px] sm:text-[10px]">
                  {companyInfo?.contactInfo?.phoneNumber && (
                    <span className="flex items-center gap-1.5">
                      <span className="text-white/70">📞</span>
                      <span className="font-medium">
                        {companyInfo.contactInfo.phoneNumber}
                      </span>
                    </span>
                  )}
                  {companyInfo?.url && (
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="text-white/70">🌐</span>
                      <span className="font-medium truncate">
                        {companyInfo.url}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            {stockDetailsUrl && (
              <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md shrink-0">
                <QRCode
                  value={stockDetailsUrl}
                  size={40}
                  className="sm:hidden"
                />
                <QRCode
                  value={stockDetailsUrl}
                  size={50}
                  className="hidden sm:block"
                />
              </div>
            )}
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4">
          {/* Left Column: Images (5 cols) */}
          <div className="col-span-1 md:col-span-7 space-y-2">
            <PdfImages data={data} />
          </div>

          {/* Right Column: Specifications (7 cols) */}
          <div className="col-span-1 md:col-span-5 space-y-2">
            <div className="bg-linear-to-br from-primary to-primary/90 text-white p-2 sm:p-3 rounded-md sm:rounded-lg shadow-md sm:shadow-lg">
              <div className="flex flex-col gap-2">
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-xs sm:text-sm md:text-[15px] mb-0.5 line-clamp-2">
                    {data.make} {data.model}{" "}
                    {vehicle?.trim && `• ${vehicle.trim}`}
                  </h2>
                  <p className="text-[9px] sm:text-[10px] md:text-[11px] text-white/90 uppercase tracking-wide line-clamp-1">
                    {year && year}
                    {vehicle?.derivative && ` • ${vehicle.derivative}`}
                  </p>
                </div>
                <div className="flex items-baseline justify-between sm:justify-end gap-2">
                  <p className="text-[8px] sm:text-[9px] text-white/60 uppercase tracking-wide">
                    Price:
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-black">
                    {formatPrice(data.retailPrice)}
                  </p>
                </div>
              </div>
            </div>
            {/* Key Specifications */}
            <SectionCard title="Key Specifications" colorScheme="default">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 p-2">
                {[
                  {
                    label: "Mileage",
                    value: `${formatMileage(odometerReadingMiles)} miles`,
                    highlight: true,
                  },
                  { label: "Fuel Type", value: fuelType },
                  { label: "Transmission", value: transmissionType },
                  { label: "Colour", value: colour },
                  { label: "Body Type", value: vehicle?.bodyType || "N/A" },
                  {
                    label: "Doors / Seats",
                    value: `${vehicle?.doors || "N/A"} / ${
                      vehicle?.seats || "N/A"
                    }`,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex flex-row justify-between items-center sm:text-[8px] px-2 rounded-lg bg-slate-50/50 border border-slate-100"
                  >
                    <span className={INFO_LABEL}>{spec.label}</span>
                    <span
                      className={`block mt-0.5 font-semibold ${
                        spec.highlight ? "text-primary" : "text-slate-700"
                      }`}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Technical Details Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Engine */}
              {vehicle && (
                <SectionCard title="Engine" colorScheme="default">
                  <div className={CARD_BODY}>
                    {vehicle.engineCapacityCC && (
                      <InfoRow
                        label="Capacity"
                        value={`${vehicle.engineCapacityCC}cc`}
                        highlight
                      />
                    )}
                    {vehicle.enginePowerBHP && (
                      <InfoRow
                        label="Power"
                        value={`${vehicle.enginePowerBHP} BHP`}
                      />
                    )}
                    {vehicle.engineTorqueNM && (
                      <InfoRow
                        label="Torque"
                        value={`${vehicle.engineTorqueNM} NM`}
                      />
                    )}
                    {vehicle.cylinders && vehicle.valves && (
                      <InfoRow
                        label="Config"
                        value={`${vehicle.cylinders} Cyl • ${vehicle.valves} Valves`}
                        noBorder
                      />
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Economy */}
              {vehicle && (
                <SectionCard title="Economy" colorScheme="economy">
                  <div className={CARD_BODY}>
                    {vehicle.fuelEconomyWLTPCombinedMPG && (
                      <InfoRow
                        label="WLTP MPG"
                        value={vehicle.fuelEconomyWLTPCombinedMPG.toFixed(1)}
                        highlight
                      />
                    )}
                    {vehicle.co2EmissionGPKM && (
                      <InfoRow
                        label="CO2"
                        value={`${vehicle.co2EmissionGPKM} g/km`}
                      />
                    )}
                    {vehicle.emissionClass && (
                      <InfoRow label="Class" value={vehicle.emissionClass} />
                    )}
                    {vehicle.vehicleExciseDutyWithoutSupplementGBP && (
                      <InfoRow
                        label="VED/Year"
                        value={`£${vehicle.vehicleExciseDutyWithoutSupplementGBP}`}
                        noBorder
                      />
                    )}
                  </div>
                </SectionCard>
              )}
            </div>

            {/* Performance & Dimensions Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Performance */}
              {vehicle &&
                (vehicle.topSpeedMPH || vehicle.zeroToSixtyMPHSeconds) && (
                  <SectionCard title="Performance" colorScheme="performance">
                    <div className={CARD_BODY}>
                      {vehicle.topSpeedMPH && (
                        <InfoRow
                          label="Top Speed"
                          value={`${vehicle.topSpeedMPH} MPH`}
                          highlight
                        />
                      )}
                      {vehicle.zeroToSixtyMPHSeconds && (
                        <InfoRow
                          label="0-60 MPH"
                          value={`${vehicle.zeroToSixtyMPHSeconds}s`}
                          noBorder
                        />
                      )}
                    </div>
                  </SectionCard>
                )}

              {/* Dimensions */}
              {vehicle && (vehicle.lengthMM || vehicle.widthMM) && (
                <SectionCard title="Dimensions" colorScheme="dimensions">
                  <div className={CARD_BODY}>
                    {vehicle.lengthMM &&
                      vehicle.widthMM &&
                      vehicle.heightMM && (
                        <InfoRow
                          label="L×W×H"
                          value={`${vehicle.lengthMM}×${vehicle.widthMM}×${vehicle.heightMM}mm`}
                        />
                      )}
                    {vehicle.minimumKerbWeightKG && (
                      <InfoRow
                        label="Weight"
                        value={`${vehicle.minimumKerbWeightKG}kg`}
                        noBorder
                      />
                    )}
                  </div>
                </SectionCard>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        {Object.keys(groupedFeatures).length > 0 && (
          <section className="bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200/80 p-2 sm:p-3">
            <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b-2 border-primary/20">
              <div className="w-1.5 h-4 bg-primary rounded-full shadow-sm" />
              <h3 className="font-bold text-[11px] text-primary uppercase tracking-wider">
                Premium Features
              </h3>
            </div>
            <div className="columns-1 sm:columns-2 space-y-3 sm:space-y-4">
              {Object.entries(groupedFeatures)
                .slice(0, 5)
                .map(([category, items]) => (
                  <div key={category} className="space-y-0.5 sm:space-y-1">
                    <p className="text-[8px] font-bold text-primary uppercase tracking-wide border-b border-primary/10 pb-0.5">
                      {category}
                    </p>
                    <div className="space-y-0.5">
                      {items.slice(0, 6).map((feature: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 text-[8px]"
                        >
                          <span className="text-primary font-bold shrink-0">
                            •
                          </span>
                          <span className="text-slate-700 leading-tight font-semibold">
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t-2 border-slate-200/70">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-linear-to-r from-primary via-primary/95 to-primary/90 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold shadow-lg tracking-wide">
                Stock #{stockId}
              </div>
              <div className="text-slate-500 font-medium">
                <span className="font-semibold text-slate-700">Generated:</span>{" "}
                {new Date().toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            {companyInfo?.fullAddress && (
              <div className="text-slate-600 flex items-center gap-1 sm:gap-1.5">
                <span>📍</span>
                <span className="font-medium">{companyInfo.fullAddress}</span>
              </div>
            )}
          </div>
          <div className="text-slate-400 italic text-center pt-1.5 sm:pt-2 border-t border-slate-100">
            All specifications and prices subject to change without notice •
            E&OE
          </div>
        </footer>
      </div>
    </div>
  );
});

StockSmanPdfMinified.displayName = "StockSmanPdfMinified";

export default StockSmanPdfMinified;
