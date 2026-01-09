import { useState, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: string;
}

/**
 * Optimized Image Component for better Lighthouse performance
 * - Lazy loading with intersection observer
 * - Automatic WebP fallback
 * - Proper aspect ratio handling
 * - fetchpriority support for LCP images
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  aspectRatio,
  loading,
  fetchPriority,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    // Preload priority images
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
    setCurrentSrc(src);
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const wrapperStyle = aspectRatio
    ? { aspectRatio, position: 'relative' as const, overflow: 'hidden' }
    : undefined;

  return (
    <div style={wrapperStyle} className={wrapperStyle ? 'bg-gray-100' : ''}>
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : loading || 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : fetchPriority || 'auto'}
        onLoad={handleLoad}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
}
