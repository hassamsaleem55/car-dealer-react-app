import { useState, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  srcSet?: string;
}

/**
 * Optimized Image Component for better Lighthouse performance
 * - Lazy loading with intersection observer
 * - Automatic WebP fallback
 * - Proper aspect ratio handling
 * - fetchpriority support for LCP images
 * - Responsive images with srcset support
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  aspectRatio,
  loading,
  fetchPriority,
  className = '',
  sizes,
  srcSet,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    // Preload priority images immediately
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (srcSet) link.setAttribute('imagesrcset', srcSet);
      if (sizes) link.setAttribute('imagesizes', sizes);
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
    setCurrentSrc(src);
  }, [src, priority, srcSet, sizes]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const wrapperStyle = aspectRatio
    ? { aspectRatio, position: 'relative' as const, overflow: 'hidden' }
    : undefined;

  return (
    <div style={wrapperStyle} className={wrapperStyle ? 'bg-gray-100' : ''}>
      <picture>
        {/* WebP version for modern browsers */}
        {src.match(/\.(jpg|jpeg|png)$/i) && (
          <source
            srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
            type="image/webp"
            sizes={sizes}
          />
        )}
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : loading || 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : fetchPriority || 'auto'}
          onLoad={handleLoad}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          className={`${className} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          {...props}
        />
      </picture>
    </div>
  );
}
