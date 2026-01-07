// Mobile-specific performance optimizations
// Conditionally reduce animations and heavy features on mobile

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

export const isSlowDevice = () => {
  // Check for slow device indicators
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection) {
    // 2G or slow-2g connection
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      return true;
    }
    // Save-Data mode enabled
    if (connection.saveData) {
      return true;
    }
  }
  
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }
  
  // Check device memory
  if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) {
    return true;
  }
  
  return false;
};

// Get optimal animation settings based on device
export const getAnimationSettings = () => {
  if (isSlowDevice()) {
    return {
      enabled: false,
      duration: 0,
      delay: 0,
    };
  }
  
  if (isMobile()) {
    return {
      enabled: true,
      duration: 0.3, // Reduced from 0.6
      delay: 0,
    };
  }
  
  return {
    enabled: true,
    duration: 0.6,
    delay: 0,
  };
};

// Lazy load images with better mobile handling
export const setupLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    return;
  }
  
  // Fallback for older browsers
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: isMobile() ? '50px' : '100px', // Smaller margin on mobile
    }
  );
  
  images.forEach((img) => imageObserver.observe(img));
};

// Reduce motion for accessibility and performance
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Adaptive loading strategy
export const shouldLoadFeature = (feature: 'animations' | 'video' | 'heavy-images') => {
  const slow = isSlowDevice();
  const mobile = isMobile();
  
  switch (feature) {
    case 'animations':
      return !slow && !prefersReducedMotion();
    case 'video':
      return !slow && !mobile;
    case 'heavy-images':
      return !slow;
    default:
      return true;
  }
};
