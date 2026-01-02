import type { StockSmanDto } from "./StockSmanPdf";

function groupBy<T, K extends string>(
  arr: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = getKey(item);
    (acc[key] ||= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export default function PdfFeatures({
  features,
}: {
  features: StockSmanDto["features"];
}) {
  const groups = groupBy(features ?? [], (f) => f.category);

  return (
    <div className="mt-4 bg-linear-to-br from-slate-50 via-white to-gray-50 rounded-xl p-4 shadow-lg border border-slate-200/60">
      <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-primary/70">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-5 bg-linear-to-b from-primary via-primary to-primary/80 rounded-full shadow-sm"></div>
          <div className="w-1 h-4 bg-linear-to-b from-primary/60 to-primary/40 rounded-full"></div>
        </div>
        <h3 className="font-bold text-[13px] text-slate-800 uppercase tracking-wider">
          Premium Features & Equipment
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {Object.entries(groups).map(([category, items]) => (
          <div
            key={category}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-slate-100/80 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-primary/15">
              <div className="w-1 h-3 bg-primary rounded-full"></div>
              <p className="font-bold text-[10px] text-primary uppercase tracking-widest">
                {category}
              </p>
            </div>
            <div className="space-y-0.5 text-[9px] mt-1.5">
              {items.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1.5 leading-tight text-slate-700"
                >
                  <span className="text-primary text-[10px] mt-0.5 font-bold">•</span>
                  <span className="font-medium">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
