import { useState, useEffect } from "react";
import type { StockSmanDto } from "./StockSmanPdf";

const FALLBACK_IMAGE = "/fallback.png";

// Compress image to reduce PDF size
const compressImage = (src: string, maxWidth = 800, quality = 0.75): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Resize if too large
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Better image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(src);
      }
    };
    
    img.onerror = () => resolve(src);
    img.src = src;
  });
};

export default function PdfImages({ data }: { data: StockSmanDto }) {
  const images = data.stockMedia?.flatMap((s) => s.images || []) ?? [];
  const [compressedImages, setCompressedImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(true);
  
  useEffect(() => {
    const compressAll = async () => {
      setIsCompressing(true);
      const compressed = await Promise.all(
        images.slice(0, 3).map((img) => 
          compressImage(img.photoPath, 800, 0.75)
        )
      );
      setCompressedImages(compressed);
      setIsCompressing(false);
    };
    
    if (images.length > 0) {
      compressAll();
    } else {
      setIsCompressing(false);
    }
  }, []);
  
  if (isCompressing) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-sm text-gray-500">Optimizing images...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-1 sm:space-y-1.5">
      {/* Main Featured Image */}
      <div className="relative overflow-hidden aspect-4/3 rounded-md sm:rounded-lg shadow-md sm:shadow-lg border border-gray-200/70 bg-linear-to-br from-gray-100 to-white flex-1">
        <img
          src={compressedImages[0] ?? FALLBACK_IMAGE}
          className="w-full h-full object-cover object-center"
          alt="Main vehicle"
        />
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
        {compressedImages.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-md shadow-md border border-gray-200/50 bg-gray-100 aspect-4/3"
          >
            <img
              src={src}
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
