import type { StockSmanDto } from "./StockSmanPdf";

type Feature = NonNullable<StockSmanDto["features"]>[number];

function groupBy<T, K extends string>(
  arr: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

function splitIntoColumns<T>(items: T[]): [T[], T[]] {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

export default function PdfFeatures({
  features,
}: {
  features: StockSmanDto["features"];
}) {
  if (!features?.length) return null;

  const groupedFeatures = groupBy(features, (feature) => feature.category);

  return (
    <div className="mt-4 sm:mt-8">
      <SectionHeader />
      <div className="flex flex-col gap-1.5 sm:gap-2.5">
        {Object.entries(groupedFeatures).map(([category, items]) => (
          <FeatureCategory key={category} category={category} items={items} />
        ))}
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 mb-2 sm:mb-3 pb-1.5 sm:pb-2.5 border-b border-primary/70">
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div className="w-1 sm:w-1.5 h-4 sm:h-5 bg-linear-to-b from-primary via-primary to-primary/80 rounded-full shadow-sm" />
        <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-linear-to-b from-primary/60 to-primary/40 rounded-full" />
      </div>
      <h3 className="font-bold text-[11px] sm:text-[13px] text-slate-800 uppercase tracking-wider">
        Premium Features & Equipment
      </h3>
    </div>
  );
}

function FeatureCategory({
  category,
  items,
}: {
  category: string;
  items: Feature[];
}) {
  const [leftColumn, rightColumn] = splitIntoColumns(items);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm border border-slate-100/80 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 pb-1 sm:pb-1.5 border-b border-primary/15">
        <div className="w-0.5 sm:w-1 h-2.5 sm:h-3 bg-primary rounded-full" />
        <p className="font-bold text-[9px] sm:text-[10px] text-primary uppercase tracking-widest">
          {category}
        </p>
      </div>
      <div className="space-y-0.5 text-[8px] sm:text-[9px] mt-1 sm:mt-1.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-3">
          <FeatureColumn features={leftColumn} />
          <FeatureColumn features={rightColumn} />
        </div>
      </div>
    </div>
  );
}

function FeatureColumn({ features }: { features: Feature[] }) {
  return (
    <div>
      {features.map((feature, index) => (
        <div
          key={`${feature.name}-${index}`}
          className="flex items-center gap-1 sm:gap-1.5 mt-0.5 leading-tight text-slate-700"
        >
          <span className="text-primary text-[8px] sm:text-[10px] font-bold select-none" aria-hidden="true">
            •
          </span>
          <span className="font-medium">{feature.name}</span>
        </div>
      ))}
      </div>
  );
}
