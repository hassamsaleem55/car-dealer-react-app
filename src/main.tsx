import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { registerServiceWorker } from '@core-dir/services/ServiceWorker.service'
import { getPerformanceMonitor } from '@core-dir/helpers/PerformanceMonitor'

// Register service worker for offline support and caching
registerServiceWorker();

// Initialize performance monitoring
if ('PerformanceObserver' in window) {
  const monitor = getPerformanceMonitor();
  
  // Log summary when page is about to unload (optional in development)
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('beforeunload', () => {
      console.log('Performance Summary:', monitor.getMetricSummary());
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
