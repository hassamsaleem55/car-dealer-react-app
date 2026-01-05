import type { StockSmanDto } from "./StockSmanPdf";

export default function PdfFooter({
  data,
  generatedAt,
}: {
  data: StockSmanDto;
  generatedAt?: string;
}) {
  return (
    <div className="mt-3 sm:mt-5 pt-2 sm:pt-3.5 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-[9px] sm:text-[10px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <div className="bg-linear-to-r from-primary via-primary/95 to-primary/90 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-bold shadow-md tracking-wide text-[8px] sm:text-[10px]">
            Stock #{data.stockId}
          </div>
          <div className="text-slate-500 font-medium text-[8px] sm:text-[10px]">
            <span className="font-semibold text-slate-700">Generated:</span> {generatedAt ?? new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
          </div>
        </div>
        <div className="text-slate-400 italic text-[8px] sm:text-[9px] tracking-wide">
          All specifications and prices subject to change without notice • E&OE
        </div>
      </div>
    </div>
  );
}
