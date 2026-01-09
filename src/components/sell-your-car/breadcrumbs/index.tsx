import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ pageName }: { pageName: string }) {
  return (
    <nav
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-2 sm:gap-3"
      aria-label="breadcrumb"
    >
      <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2 truncate">
        <li>
          <a
            href="/sell-your-car"
            className="hover:text-primary hover:font-semibold active:text-primary/80 transition-all duration-200 touch-manipulation"
          >
            Sell Your Car
          </a>
        </li>
        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
        <li className="font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate max-w-[150px] sm:max-w-[180px] md:max-w-sm">
          {pageName}
        </li>
      </ol>
    </nav>
  );
}
