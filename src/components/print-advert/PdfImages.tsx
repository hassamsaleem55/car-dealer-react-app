import type { StockSmanDto } from "./StockSmanPdf";

const FALLBACK_IMAGE = "/fallback.png";

export default function PdfImages({ data }: { data: StockSmanDto }) {
  const images = data.stockMedia?.flatMap((s) => s.images || []) ?? [];

  return (
    <div className="flex flex-col h-full space-y-1.5">
      {/* Main Featured Image */}
      <div className="relative overflow-hidden aspect-video rounded-lg shadow-lg border border-gray-200/70 bg-linear-to-br from-gray-100 to-white flex-1">
        <img
          src={images[0]?.photoPath ?? FALLBACK_IMAGE}
          className="w-full h-full object-cover object-center"
          alt="Main vehicle"
        />
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {images.slice(0, 3).map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-md shadow-md border border-gray-200/50 bg-gray-100 "
          >
            <img
              src={img.photoPath}
              className="w-full h-full object-cover"
              alt={`View ${i + 2}`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
