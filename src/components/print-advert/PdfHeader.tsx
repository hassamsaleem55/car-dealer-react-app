import QRCode from "react-qr-code";

interface PdfHeaderProps {
  companyInfo: any;
  variant?: "full" | "minimal";
}

export default function PdfHeader({
  companyInfo,
  variant = "full",
}: PdfHeaderProps) {
  const getPrimaryColor = () => {
    if (typeof window !== "undefined") {
      const computedColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim();

      if (computedColor) {
        return computedColor;
      }
    }
    return "#F97316";
  };

  const solidPrimaryColor = getPrimaryColor();

  return (
    <div
      className="text-white shadow-lg rounded-lg overflow-hidden"
      style={
        {
          backgroundColor: solidPrimaryColor,
          backgroundImage: `linear-gradient(to right, ${solidPrimaryColor}, #FB923C)`,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          colorAdjust: "exact",
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-2 sm:p-3">
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
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
            <h1
              className={`font-bold tracking-tight text-white line-clamp-1 ${
                variant === "minimal"
                  ? "text-sm sm:text-base"
                  : "text-sm sm:text-lg md:text-xl"
              }`}
            >
              {companyInfo?.companyName ?? ""}
            </h1>
            {variant === "full" ? (
              <div className="flex flex-col sm:grid sm:grid-cols-2 text-white/95 text-[9px] sm:text-[11px] md:text-[12px] gap-0.5 sm:gap-1">
                <div className="flex flex-col gap-0.5">
                  {companyInfo?.url && (
                    <span className="flex items-center gap-1 truncate">
                      <span className="text-white/70 shrink-0">🌐</span>
                      <span className="font-medium truncate">
                        {companyInfo.url}
                      </span>
                    </span>
                  )}
                  {companyInfo?.contactInfo?.infoEmailAddress && (
                    <span className="flex items-center gap-1 truncate">
                      <span className="text-white/70 shrink-0">✉️</span>
                      <span className="font-medium truncate">
                        {companyInfo.contactInfo.infoEmailAddress}
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  {companyInfo?.contactInfo?.phoneNumber && (
                    <span className="flex items-center gap-1 truncate">
                      <span className="text-white/70 shrink-0">📞</span>
                      <span className="font-medium truncate">
                        {companyInfo.contactInfo.phoneNumber}
                      </span>
                    </span>
                  )}
                  {companyInfo?.fullAddress && (
                    <span className="flex items-center gap-1 truncate">
                      <span className="text-white/70 shrink-0">📍</span>
                      <span className="font-medium truncate">
                        {companyInfo.fullAddress}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
          <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md shrink-0">
            {/* {variant === "full" ? (
              <>
                <QRCode
                  size={60}
                  value={window.location.href}
                  level="M"
                  className="sm:hidden"
                />
                <QRCode
                  size={80}
                  value={window.location.href}
                  level="M"
                  className="hidden sm:block"
                />
                <p className="text-[7px] sm:text-[8px] text-gray-600 text-center mt-0.5 font-medium">
                  Scan
                </p>
              </>
            ) : (
              <>
                <QRCode
                  size={50}
                  value={window.location.href}
                  level="M"
                  className="sm:hidden"
                />
                <QRCode
                  size={60}
                  value={window.location.href}
                  level="M"
                  className="hidden sm:block"
                />
              </>
            )} */}
            <>
              <QRCode
                size={50}
                value={window.location.href}
                level="M"
                className="sm:hidden"
              />
              <QRCode
                size={60}
                value={window.location.href}
                level="M"
                className="hidden sm:block"
              />
              {variant === "full" && (
                <p className="text-[7px] sm:text-[8px] text-gray-600 text-center mt-0.5 font-medium">
                  Scan
                </p>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
