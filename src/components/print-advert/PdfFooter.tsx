import type { StockSmanDto } from "./StockSmanPdf";

export default function PdfFooter({
  data,
  generatedAt,
}: {
  data: StockSmanDto;
  generatedAt?: string;
}) {
  return (
    <div className="mt-5 pt-3.5 border-t border-slate-200">
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-r from-primary via-primary/95 to-primary/90 text-white px-3 py-1.5 rounded-lg font-bold shadow-md tracking-wide">
            Stock #{data.stockId}
          </div>
          <div className="text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">Document Generated:</span> {generatedAt ?? new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
          </div>
        </div>
        <div className="text-slate-400 italic text-[9px] tracking-wide">
          All specifications and prices subject to change without notice • E&OE
        </div>
      </div>
    </div>
  );
}
