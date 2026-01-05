import { forwardRef } from "react";
import PdfHeader from "./PdfHeader";
import PdfImages from "./PdfImages";
import PdfVehicleDetails from "./PdfVehicleDetails";
import PdfFeatures from "./PdfFeatures";
import PdfFooter from "./PdfFooter";
import PdfVehicleInfo from "./PdfVehicleInfo";

export interface StockSmanDto {
  stockId: number;
  registration: string;
  stockDetailsUrl?: string;
  make: string;
  model: string;
  retailPrice: number;
  odometerReadingMiles: number;
  colour: string;
  fuelType: string;
  transmissionType: string;
  features: { name: string; category: string; genericName?: string }[];
  stockMedia: {
    stockId: number;
    mediaType: string | null;
    images: {
      photoPath: string;
      name?: string;
      imageId?: number;
    }[];
  }[];
  advert?: {
    description?: string;
    description2?: string;
    dealerStrapline?: string;
  };
  companyInfo?: {
    companyName?: string;
    logoUrl?: string;
    url?: string;
    address1?: string;
    address2?: string;
    postCode?: string;
    fullAddress?: string;
    contactInfo?: {
      infoEmailAddress?: string;
      phoneNumber?: string;
      landlineNumber?: string;
      whatsAppNumber?: string;
    };
  };
  aT_StockInfo?: {
    vehicle?: {
      derivative?: string;
      yearOfManufacture?: number;
      firstRegistrationDate?: string;
      seats?: number;
      doors?: number;
      engineCapacityCC?: number;
      enginePowerBHP?: number;
      enginePowerPS?: number;
      bodyType?: string;
      sector?: string;
      owners?: number;
      fuelEconomyWLTPCombinedMPG?: number;
      fuelEconomyNEDCCombinedMPG?: number;
      fuelEconomyWLTPLowMPG?: number;
      fuelEconomyWLTPMediumMPG?: number;
      fuelEconomyWLTPHighMPG?: number;
      fuelEconomyWLTPExtraHighMPG?: number;
      co2EmissionGPKM?: number;
      bootSpaceSeatsUpLitres?: number;
      bootSpaceSeatsDownLitres?: number;
      insuranceGroup?: number;
      insuranceSecurityCode?: string;
      emissionClass?: string;
      topSpeedMPH?: number;
      zeroToSixtyMPHSeconds?: number;
      zeroToOneHundredKMPHSeconds?: number;
      engineTorqueNM?: number;
      engineTorqueLBFT?: number;
      fuelCapacityLitres?: number;
      lengthMM?: number;
      heightMM?: number;
      widthMM?: number;
      wheelbaseMM?: number;
      minimumKerbWeightKG?: number;
      grossVehicleWeightKG?: number;
      drivetrain?: string;
      cylinders?: number;
      valves?: number;
      gears?: number;
      cylinderArrangement?: string;
      fuelDelivery?: string;
      engineMake?: string;
      vehicleType?: string;
      vin?: string;
      generation?: string;
      trim?: string;
      motExpiryDate?: string;
      rde2Compliant?: boolean;
      vehicleExciseDutyWithoutSupplementGBP?: number;
      countryOfOrigin?: string;
      startStop?: boolean;
      axles?: number;
      boreMM?: number;
      strokeMM?: number;
    };
  };
}

interface Props {
  data: StockSmanDto;
  generatedAt?: string;
}

const StockSmanPdf = forwardRef<HTMLDivElement, Props>(
  ({ data, generatedAt }, ref) => (
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
      {/* Premium Header */}
      <PdfHeader data={data} />

      {/* Main Content - Refined Two Column Layout */}
      <div className="mt-2 sm:mt-3.5 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4">
        {/* Left Column - Premium Images (7/12) */}
        <div className="col-span-1 md:col-span-7">
          <PdfImages data={data} />
        </div>

        {/* Right Column - Elegant Vehicle Details (5/12) */}
        <div className="col-span-1 md:col-span-5">
          <PdfVehicleInfo data={data} />
        </div>
      </div>
      <div className="mt-1.5 sm:mt-2">
        <PdfVehicleDetails data={data} />
      </div>

      {/* Features Section - Full Width */}
      <PdfFeatures features={data.features} />

      {/* Footer - Full Width */}
      <PdfFooter data={data} generatedAt={generatedAt} />
    </div>
  )
);

StockSmanPdf.displayName = "StockSmanPdf";

export default StockSmanPdf;
