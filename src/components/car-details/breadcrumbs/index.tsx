// import { ChevronRight, Printer, Share } from "lucide-react";
import { ChevronRight } from "lucide-react";
// import Button from "@elements-dir/button";

export default function Breadcrumb({ title }: { title: string }) {
  return (
    <nav
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 gap-3"
      aria-label="breadcrumb"
    >
      <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2 truncate">
        <li>
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        <li>
          <a href="/stock" className="hover:text-primary transition-colors">
            Cars Listing
          </a>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        <li className="font-semibold text-basicFont truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
          {title}
        </li>
      </ol>

      {/* <div className="flex justify-start sm:justify-end space-x-2">
        <Button
          variant="secondary"
          btnText="Print Advert"
          paddingUtilities="px-2 py-1"
          widthUtilities="w-auto"
          btnTextSize="text-xs"
          btnIcon={<Printer className="w-3 h-3" />}
        />
        <Button
          variant="secondary"
          btnText="Share Advert"
          paddingUtilities="px-2 py-1"
          widthUtilities="w-auto"
          btnTextSize="text-xs"
          btnIcon={<Share className="w-3 h-3" />}
        />
      </div> */}
    </nav>
  );
}
