import { useRef, useEffect } from "react";
import { X, Download, Printer } from "lucide-react";
import { StockSmanPdfContainer } from "@components-dir/print-advert";
import Button from "@elements-dir/button";

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
          const rules = Array.from(styleSheet.cssRules || styleSheet.rules || []);
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
      document.querySelectorAll('style').forEach(styleTag => {
        allStyles.push(styleTag.innerHTML);
      });

      const printWindow = window.open("", "_blank");

      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print Advert - Stock ${stockId}</title>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                /* Injected styles from parent page */
                ${allStyles.join('\n')}
                
                /* Print-specific styles */
                @media print {
                  body { 
                    margin: 0; 
                    padding: 0; 
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    width: 100%;
                    overflow-x: hidden;
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
                }
                
                body { 
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  overflow-x: hidden;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="relative bg-linear-to-br from-gray-50 to-white rounded-2xl shadow-2xl w-[96vw] h-[96vh] max-w-[1400px] overflow-hidden flex flex-col border border-gray-200/50"
      >
        {/* Elegant Header */}
        <div className="flex items-center justify-between px-8 py-5 bg-linear-to-r from-primary/5 to-transparent border-b border-gray-200/50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              Vehicle Print Preview
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Stock #{stockId} • Ready to print or download
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              btnText="Download PDF"
              paddingUtilities="px-5 py-2.5"
              widthUtilities="w-auto"
              btnTextSize="text-sm"
              btnIcon={<Download className="w-4 h-4" />}
              clickEvent={handleDownloadPDF}
            />
            <Button
              variant="primary"
              btnText="Print Document"
              paddingUtilities="px-5 py-2.5"
              widthUtilities="w-auto"
              btnTextSize="text-sm"
              btnIcon={<Printer className="w-4 h-4" />}
              clickEvent={handlePrint}
            />
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 text-gray-500 hover:text-gray-700 border border-transparent hover:border-gray-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area with Shadow Inset */}
        <div className="flex-1 overflow-auto bg-linear-to-br from-gray-100 to-gray-50 p-8">
          <div className="flex justify-center">
            <div 
              ref={printAreaRef} 
              className="bg-white shadow-2xl rounded-lg overflow-hidden"
              style={{ width: '210mm', minHeight: '297mm' }}
            >
              <StockSmanPdfContainer stockId={stockId} />
            </div>
          </div>
        </div>

        {/* Footer Info Bar */}
        <div className="px-8 py-3 bg-linear-to-r from-gray-50 to-white border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Preview Mode
              </span>
              <span>Document Size: A4 (210mm × 297mm)</span>
            </div>
            <div className="text-gray-400">
              Press <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">ESC</kbd> to close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
