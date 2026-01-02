import QRCode from "react-qr-code";
import type { StockSmanDto } from "./StockSmanPdf";

export default function PdfHeader({ data }: { data: StockSmanDto }) {
  return (
    <div className="bg-linear-to-r from-primary via-primary/70 text-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          {data.companyInfo?.logoUrl && (
            <div className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md shrink-0">
              <img
                src={data.companyInfo.logoUrl}
                className="h-10 w-auto object-contain"
                alt="Company Logo"
              />
            </div>
          )}
          <div className="space-y-1">
            <h1 className="font-bold text-xl tracking-tight text-white">
              {data.companyInfo?.companyName ?? ""}
            </h1>
            <div className="grid grid-cols-2 text-white/95 text-[12px]">
              <div className="items-center gap-3">
                {data.companyInfo?.url && (
                  <span className="flex items-center gap-1">
                    <span className="text-white/70">🌐</span>
                    <span className="font-medium">{data.companyInfo.url}</span>
                  </span>
                )}
                {data.companyInfo?.contactInfo?.infoEmailAddress && (
                  <span className="flex items-center gap-1">
                    <span className="text-white/70">✉️</span>
                    <span className="font-medium">
                      {data.companyInfo.contactInfo.infoEmailAddress}
                    </span>
                  </span>
                )}
              </div>
              <div className="items-center gap-3">
                {data.companyInfo?.contactInfo?.phoneNumber && (
                  <span className="flex items-center gap-1">
                    <span className="text-white/70">📞</span>
                    <span className="font-medium">
                      {data.companyInfo.contactInfo.phoneNumber}
                    </span>
                  </span>
                )}
                {data.companyInfo?.fullAddress && (
                  <span className="flex items-center gap-1">
                    <span className="text-white/70">📍</span>
                    <span className="font-medium">
                      {data.companyInfo.fullAddress}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* {data.companyInfo?.fullAddress && (
            <div className="text-right">
              <p className="text-[7.5px] text-white/85 max-w-[140px] leading-snug">
                <span className="text-white/60"></span> {data.companyInfo.fullAddress}
              </p>
            </div>
          )} */}
          {data.stockDetailsUrl && (
            <div className="bg-white p-2 rounded-lg shadow-md">
              <QRCode size={50} value={`https://${data.stockDetailsUrl}`} />
              <p className="text-[8px] text-gray-600 text-center mt-0.5 font-medium">
                Scan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
