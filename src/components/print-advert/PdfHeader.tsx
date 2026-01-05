import QRCode from "react-qr-code";
import type { StockSmanDto } from "./StockSmanPdf";

export default function PdfHeader({ data }: { data: StockSmanDto }) {
  return (
    <div className="bg-linear-to-r from-primary via-primary/70 text-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-2 sm:p-3">
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {data.companyInfo?.logoUrl && (
            <div className="bg-white/95 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg shadow-md shrink-0">
              <img
                src={data.companyInfo.logoUrl}
                className="h-8 sm:h-10 w-auto object-contain"
                alt="Company Logo"
              />
            </div>
          )}
          <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
            <h1 className="font-bold text-sm sm:text-lg md:text-xl tracking-tight text-white line-clamp-1">
              {data.companyInfo?.companyName ?? ""}
            </h1>
            <div className="flex flex-col sm:grid sm:grid-cols-2 text-white/95 text-[9px] sm:text-[11px] md:text-[12px] gap-0.5 sm:gap-1">
              <div className="flex flex-col gap-0.5">
                {data.companyInfo?.url && (
                  <span className="flex items-center gap-1 truncate">
                    <span className="text-white/70 shrink-0">🌐</span>
                    <span className="font-medium truncate">{data.companyInfo.url}</span>
                  </span>
                )}
                {data.companyInfo?.contactInfo?.infoEmailAddress && (
                  <span className="flex items-center gap-1 truncate">
                    <span className="text-white/70 shrink-0">✉️</span>
                    <span className="font-medium truncate">
                      {data.companyInfo.contactInfo.infoEmailAddress}
                    </span>
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                {data.companyInfo?.contactInfo?.phoneNumber && (
                  <span className="flex items-center gap-1 truncate">
                    <span className="text-white/70 shrink-0">📞</span>
                    <span className="font-medium truncate">
                      {data.companyInfo.contactInfo.phoneNumber}
                    </span>
                  </span>
                )}
                {data.companyInfo?.fullAddress && (
                  <span className="flex items-center gap-1 truncate">
                    <span className="text-white/70 shrink-0">📍</span>
                    <span className="font-medium truncate">
                      {data.companyInfo.fullAddress}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
          {data.stockDetailsUrl && (
            <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md">
              <QRCode size={40} value={`https://${data.stockDetailsUrl}`} className="sm:hidden" />
              <QRCode size={50} value={`https://${data.stockDetailsUrl}`} className="hidden sm:block" />
              <p className="text-[7px] sm:text-[8px] text-gray-600 text-center mt-0.5 font-medium">
                Scan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
