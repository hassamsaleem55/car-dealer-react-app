import { useEffect, useState } from "react";
import DotLoader from "@components-dir/loader";

interface VehicleInfo {
  derivativeId?: string;
  registration?: string;
  registrationDate?: string;
  profilePicture?: string;
  odometerReadingMiles?: number;
}

interface StockDetailsSectionDto {
  stockId: number;
  retailPrice: number;
  isPriceExcludingVAT: boolean;
  hideFinance: boolean;
  isReserved: boolean;
  profilePicture: string;
  registration: string;
  registrationDate: string;
  odometerReadingMiles: number;
  aT_StockInfo?: {
    vehicle?: VehicleInfo;
  };
}

interface Props {
  model: StockDetailsSectionDto;
  userFCA: string;
  codeWeaverApi: string;
  websiteUrl: string;
}

declare global {
  interface Window {
    codeweavers?: any;
  }
}

export default function CodeWeaverFinance({
  model,
  userFCA,
  codeWeaverApi,
  websiteUrl,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const depositAmount = Math.floor(model.retailPrice * 0.1);
  const cwVehicleType = model.isPriceExcludingVAT ? "lcv" : "car";
  const linkBackUrl = `${websiteUrl}/stock/${model.stockId}`;

  useEffect(() => {
    const container = document.getElementById("cw-plugin-container");
    if (!container) return;

    const shouldHide =
      !model.aT_StockInfo?.vehicle?.derivativeId ||
      !userFCA ||
      model.hideFinance ||
      model.isReserved;

    if (shouldHide) {
      container.style.display = "none";
      setIsLoading(false);
      console.warn("CodeWeavers hidden due to missing data or conditions");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://plugins.codeweavers.net/scripts/v1/platform/finance?ApiKey=${codeWeaverApi}`;
    // script.src = `https://plugins.codeweavers.net/scripts/v1/platform/finance?ApiKey=zFI826du651DPUPv32`;
    script.async = true;

    const initializePlugin = () => {
      if (!window.codeweavers?.main) {
        console.warn("CodeWeavers not ready, retrying...");
        setTimeout(initializePlugin, 300);
        return;
      }

      console.log("Initializing CodeWeavers plugin...");

      window.codeweavers.main({
        pluginContentDivId: "cw-plugin-container",
        vehicle: {
          identifierType: "AutoTraderDerivativeIdentifier",
          identifier: model.aT_StockInfo?.vehicle?.derivativeId ?? "123456", // fallback test id
          type: cwVehicleType,
          isNew: false,
          cashPrice: model.retailPrice,
          imageUrl: model.profilePicture,
          linkBackUrl,
          registration: {
            number: model.registration,
            date: model.registrationDate,
          },
          mileage: model.aT_StockInfo?.vehicle?.odometerReadingMiles,
          mileageUnit: "Miles",
        },
        defaultParameters: {
          disableCommercialVehicleCalculations: false,
          deposit: {
            defaultValue: depositAmount,
            defaultType: "amount",
          },
        },
        onDomainEvent: (name: string) => {
          console.log("CodeWeavers event:", name);
          if (name === "plugin.errored") {
            console.error("CodeWeavers plugin errored");
            setIsLoading(false);
          }
          if (name === "plugin.loaded") {
            console.log("CodeWeavers plugin successfully loaded");
            setIsLoading(false);
          }
        },
      });
    };

    script.onload = () => {
      console.log("CodeWeavers script loaded");
      setTimeout(initializePlugin, 300);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [model, userFCA, codeWeaverApi, websiteUrl]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="py-20">
          <DotLoader text="Finance Calculator is loading" />
        </div>
      )}
      <div
        id="cw-plugin-container"
        className={`mt-5 ${isLoading ? "hidden" : ""}`}
      ></div>
    </div>
  );
}
