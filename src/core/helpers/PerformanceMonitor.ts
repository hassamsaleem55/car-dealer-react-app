/**
 * Lighthouse Performance Monitoring Utilities
 * Use these functions to monitor and log performance metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window === 'undefined') return;
    this.initObservers();
  }

  private initObservers() {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const value = lastEntry.renderTime || lastEntry.loadTime;
        
        this.addMetric({
          name: 'LCP',
          value,
          rating: this.getLCPRating(value),
          timestamp: Date.now(),
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const value = entry.processingStart - entry.startTime;
          
          this.addMetric({
            name: 'FID',
            value,
            rating: this.getFIDRating(value),
            timestamp: Date.now(),
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.addMetric({
          name: 'CLS',
          value: clsValue,
          rating: this.getCLSRating(clsValue),
          timestamp: Date.now(),
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS observer not supported');
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          this.addMetric({
            name: 'FCP',
            value: entry.startTime,
            rating: this.getFCPRating(entry.startTime),
            timestamp: Date.now(),
          });
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn('FCP observer not supported');
    }

    // Time to First Byte (TTFB)
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const ttfb = entry.responseStart - entry.requestStart;
          
          this.addMetric({
            name: 'TTFB',
            value: ttfb,
            rating: this.getTTFBRating(ttfb),
            timestamp: Date.now(),
          });
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navigationObserver);
    } catch (e) {
      console.warn('TTFB observer not supported');
    }
  }

  private addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric.name}:`, {
        value: `${metric.value.toFixed(2)}ms`,
        rating: metric.rating,
      });
    }
  }

  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  private getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  private getFCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  private getTTFBRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  getLatestMetric(name: string): PerformanceMetric | undefined {
    return this.metrics
      .filter((m) => m.name === name)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
  }

  getMetricSummary() {
    const summary: Record<string, { average: number; rating: string }> = {};
    
    ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].forEach((metricName) => {
      const metrics = this.metrics.filter((m) => m.name === metricName);
      if (metrics.length > 0) {
        const average = metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;
        const latestRating = metrics[metrics.length - 1].rating;
        summary[metricName] = { average, rating: latestRating };
      }
    });
    
    return summary;
  }

  // Send metrics to analytics service
  sendToAnalytics(analyticsFunction?: (metric: PerformanceMetric) => void) {
    if (analyticsFunction) {
      this.metrics.forEach((metric) => {
        analyticsFunction(metric);
      });
    }
  }

  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
  }
}

// Singleton instance
let monitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!monitor) {
    monitor = new PerformanceMonitor();
  }
  return monitor;
}

export function logPerformanceSummary() {
  const monitor = getPerformanceMonitor();
  const summary = monitor.getMetricSummary();
  
  console.table(summary);
  
  return summary;
}

// Export for use in analytics integrations
export function setupAnalytics(sendFunction: (metric: PerformanceMetric) => void) {
  const monitor = getPerformanceMonitor();
  
  // Send existing metrics
  monitor.sendToAnalytics(sendFunction);
  
  // Send future metrics
  window.addEventListener('beforeunload', () => {
    monitor.sendToAnalytics(sendFunction);
  });
}
