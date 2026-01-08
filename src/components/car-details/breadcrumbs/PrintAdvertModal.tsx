import { useRef, useEffect, useState } from "react";
import { X, Download, Printer } from "lucide-react";
import { StockSmanPdfContainer } from "@components-dir/print-advert";
import Button from "@elements-dir/button";

type PrintMode = "detailed" | "minified";

interface PrintAdvertModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockId: number;
}

export default function PrintAdvertModal({
  isOpen,
  onClose,
  stockId,
}: PrintAdvertModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);
  const [printMode, setPrintMode] = useState<PrintMode>("minified");

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    if (printAreaRef.current) {
      const printContent = printAreaRef.current.innerHTML;

      // Extract all computed styles from the page
      const allStyles: string[] = [];

      // Get all stylesheet rules
      for (const styleSheet of Array.from(document.styleSheets)) {
        try {
          const rules = Array.from(
            styleSheet.cssRules || styleSheet.rules || []
          );
          for (const rule of rules) {
            allStyles.push(rule.cssText);
          }
        } catch (e) {
          // CORS or other access issues - try to get href
          if (styleSheet.href) {
            allStyles.push(`@import url('${styleSheet.href}');`);
          }
        }
      }

      // Get inline styles from style tags
      document.querySelectorAll("style").forEach((styleTag) => {
        allStyles.push(styleTag.innerHTML);
      });

      const printWindow = window.open("", "_blank");

      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print Advert ${
                printMode === "minified" ? "" : "(Detailed view)"
              } - Stock ${stockId}</title>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=1024">
              <style>
                /* Injected styles from parent page */
                ${allStyles.join("\n")}
                
                /* Force screen-width rendering for print */
                @media print {
                  html {
                    width: 210mm;
                    height: 297mm;
                  }
                  
                  body { 
                    margin: 0; 
                    padding: 0; 
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    width: 210mm;
                    min-height: 297mm;
                    overflow: visible;
                    box-sizing: border-box;
                  }
                  
                  @page { 
                    margin: 0;
                    size: A4 portrait; 
                  }
                  
                  /* Prevent page breaks inside important elements */
                  div[class*="rounded"],
                  div[class*="shadow"],
                  div[class*="border"],
                  table,
                  tr,
                  img,
                  figure,
                  .grid > div {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                  }
                  
                  h1, h2, h3, h4, h5, h6 {
                    page-break-after: avoid !important;
                    break-after: avoid !important;
                  }
                  
                  .grid {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                  }
                  
                  p, li {
                    orphans: 3;
                    widows: 3;
                  }
                  
                  /* Force desktop/laptop styles */
                  * {
                    font-size: inherit !important;
                  }
                  
                  /* Ensure responsive classes use desktop styles */
                  .sm\\:text-xl { font-size: 1.25rem !important; }
                  .sm\\:text-lg { font-size: 1.125rem !important; }
                  .sm\\:text-base { font-size: 1rem !important; }
                  .sm\\:text-sm { font-size: 0.875rem !important; }
                  .sm\\:text-\\[12px\\] { font-size: 12px !important; }
                  .sm\\:text-\\[11px\\] { font-size: 11px !important; }
                  .sm\\:text-\\[10px\\] { font-size: 10px !important; }
                  .sm\\:text-\\[9px\\] { font-size: 9px !important; }
                  .sm\\:text-\\[8px\\] { font-size: 8px !important; }
                  
                  .md\\:text-2xl { font-size: 1.5rem !important; }
                  .md\\:text-xl { font-size: 1.25rem !important; }
                  .md\\:text-\\[15px\\] { font-size: 15px !important; }
                  .md\\:text-\\[12px\\] { font-size: 12px !important; }
                  .md\\:text-\\[10px\\] { font-size: 10px !important; }
                  .md\\:text-\\[9px\\] { font-size: 9px !important; }
                  
                  /* Force grid layouts */
                  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
                  .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
                  .md\\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)) !important; }
                  .md\\:col-span-7 { grid-column: span 7 / span 7 !important; }
                  .md\\:col-span-5 { grid-column: span 5 / span 5 !important; }
                  
                  /* Force padding and spacing */
                  .sm\\:p-2 { padding: 0.5rem !important; }
                  .sm\\:p-3 { padding: 0.75rem !important; }
                  .sm\\:px-2 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
                  .sm\\:py-1 { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
                  .sm\\:gap-1 { gap: 0.25rem !important; }
                  .sm\\:gap-1\\.5 { gap: 0.375rem !important; }
                  .sm\\:gap-2 { gap: 0.5rem !important; }
                  .sm\\:gap-2\\.5 { gap: 0.625rem !important; }
                  .sm\\:gap-4 { gap: 1rem !important; }
                  .sm\\:mt-3\\.5 { margin-top: 0.875rem !important; }
                  .sm\\:mt-2 { margin-top: 0.5rem !important; }
                  
                  /* Force rounded corners */
                  .sm\\:rounded-lg { border-radius: 0.5rem !important; }
                  .sm\\:rounded-xl { border-radius: 0.75rem !important; }
                  
                  /* Force shadow */
                  .sm\\:shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important; }
                  
                  /* Hide mobile-only, show desktop-only */
                  .sm\\:hidden { display: none !important; }
                  .sm\\:block { display: block !important; }
                  .sm\\:flex { display: flex !important; }
                  .sm\\:grid { display: grid !important; }
                  
                  /* Flex direction */
                  .sm\\:flex-row { flex-direction: row !important; }
                  
                  /* Height classes */
                  .sm\\:h-10 { height: 2.5rem !important; }
                  
                  /* Width classes */
                  .sm\\:w-auto { width: auto !important; }
                }
                
                body { 
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  overflow-x: hidden;
                  background: white;
                }
                
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
              </style>
            </head>
            <body>
              ${printContent}
              <script>
                window.onafterprint = function() {
                  window.close();
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();

        // Wait for styles and images to load
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
        }, 1500);
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      handlePrint();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 p-2 sm:p-4">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg sm:rounded-2xl shadow-2xl h-[95vh] overflow-hidden flex flex-col border border-gray-200/50"
      >
        {/* Header - Title and Actions */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">
              Vehicle Print Preview
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Stock #{stockId} • Ready to print or download
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="secondary"
              btnText="Download"
              paddingUtilities="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5"
              widthUtilities="w-auto"
              btnTextSize="text-xs sm:text-sm"
              btnIcon={<Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              clickEvent={handleDownloadPDF}
            />
            <Button
              variant="primary"
              btnText="Print"
              paddingUtilities="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5"
              widthUtilities="w-auto"
              btnTextSize="text-xs sm:text-sm"
              btnIcon={<Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              clickEvent={handlePrint}
            />
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Tab-style Mode Selector */}
        <div className="flex items-center gap-1 px-4 sm:px-6 md:px-8 pt-3 pb-0 bg-linear-to-b from-gray-50 to-transparent">
          <button
            onClick={() => setPrintMode("minified")}
            className={`relative px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
              printMode === "minified"
                ? "text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="relative z-10">Minified (1 Page)</span>
            {printMode === "minified" && (
              <div className="absolute inset-0 bg-white rounded-t-lg shadow-sm border-t-2 border-l border-r border-primary -bottom-px" />
            )}
          </button>
          <button
            onClick={() => setPrintMode("detailed")}
            className={`relative px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
              printMode === "detailed"
                ? "text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="relative z-10">Detailed View</span>
            {printMode === "detailed" && (
              <div className="absolute inset-0 bg-white rounded-t-lg shadow-sm border-t-2 border-l border-r border-primary -bottom-px" />
            )}
          </button>

          <div className="flex-1 border-b border-gray-200" />
        </div>

        {/* Content Area with Shadow Inset */}
        <div className="flex-1 overflow-auto bg-linear-to-br from-gray-50 via-gray-100/50 to-gray-50 p-4 sm:p-6 md:p-8">
          <div className="flex justify-center items-start min-h-full">
            <div
              ref={printAreaRef}
              className="bg-white shadow-xl rounded-md overflow-hidden transition-all duration-300"
            >
              <StockSmanPdfContainer stockId={stockId} mode={printMode} />
            </div>
          </div>
        </div>

        {/* Footer Info Bar */}
        <div className="px-4 sm:px-6 md:px-8 py-3 bg-white border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></span>
                <span className="font-medium">
                  {printMode === "detailed"
                    ? "Detailed Preview"
                    : "Minified Preview"}
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>A4 (210mm × 297mm)</span>
              </span>
              {printMode === "minified" && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 text-primary rounded text-[11px] font-medium">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Single Page
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="hidden sm:inline">Press</span>
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono shadow-sm">
                ESC
              </kbd>
              <span className="hidden sm:inline">to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
