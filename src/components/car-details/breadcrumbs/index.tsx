import { useState } from "react";
import { ChevronRight, Printer, Share } from "lucide-react";
import Button from "@elements-dir/button";
import PrintAdvertModal from "./PrintAdvertModal";

interface BreadcrumbProps {
  title: string;
  stockId?: number;
}

export default function Breadcrumb({ title, stockId }: BreadcrumbProps) {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handlePrintClick = () => {
    if (stockId) {
      setIsPrintModalOpen(true);
    }
  };

  const handleShareClick = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `Check out this ${title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Take a look at this vehicle: ${title}`,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <>
      <nav
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs md:text-sm gap-3"
        aria-label="breadcrumb"
      >
        <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2 truncate">
          <li>
            <a
              href="/"
              className="hover:text-primary hover:font-semibold transition-all duration-200"
            >
              Home
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <li>
            <a
              href="/stock"
              className="hover:text-primary hover:font-semibold transition-all duration-200"
            >
              Cars Listing
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <li className="font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
            {title}
          </li>
        </ol>

        <div className="flex justify-start sm:justify-end space-x-2">
          <Button
            variant="secondary"
            btnText="Print Advert"
            paddingUtilities="px-2 py-1"
            widthUtilities="w-auto"
            btnTextSize="text-xs"
            btnIcon={<Printer className="w-3 h-3" />}
            clickEvent={handlePrintClick}
          />
          <Button
            variant="secondary"
            btnText="Share Advert"
            paddingUtilities="px-2 py-1"
            widthUtilities="w-auto"
            btnTextSize="text-xs"
            btnIcon={<Share className="w-3 h-3" />}
            clickEvent={handleShareClick}
          />
        </div>
      </nav>

      {stockId && (
        <PrintAdvertModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          stockId={stockId}
        />
      )}
    </>
  );
}
