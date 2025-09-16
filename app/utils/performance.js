// Performance monitoring utilities for web environment
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.isWeb = typeof window !== 'undefined';
  }

  // Initialize Web Vitals monitoring (web only)
  initWebVitals() {
    if (!this.isWeb) return;

    try {
      getCLS(this.onWebVital.bind(this, 'CLS'));
      getFID(this.onWebVital.bind(this, 'FID'));
      getFCP(this.onWebVital.bind(this, 'FCP'));
      getLCP(this.onWebVital.bind(this, 'LCP'));
      getTTFB(this.onWebVital.bind(this, 'TTFB'));
    } catch (error) {
      console.warn('Web Vitals monitoring failed:', error);
    }
  }

  // Handle web vital metrics
  onWebVital(metricName, metric) {
    this.metrics[metricName] = metric.value;
    
    // Log performance metrics in development
    if (__DEV__) {
      console.log(`📊 ${metricName}:`, metric.value);
    }

    // Send to analytics in production
    this.sendToAnalytics(metricName, metric);
  }

  // Bundle performance monitoring
  measureBundlePerformance() {
    if (!this.isWeb) return;

    const perfEntries = performance.getEntriesByType('navigation');
    if (perfEntries.length > 0) {
      const timing = perfEntries[0];
      
      this.metrics.bundleLoadTime = timing.loadEventEnd - timing.fetchStart;
      this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.fetchStart;
      this.metrics.domInteractive = timing.domInteractive - timing.fetchStart;

      if (__DEV__) {
        console.log('📦 Bundle Performance:', {
          loadTime: this.metrics.bundleLoadTime,
          domReady: this.metrics.domContentLoaded,
          interactive: this.metrics.domInteractive
        });
      }
    }
  }

  // React Native performance monitoring  
  measureRNPerformance() {
    if (this.isWeb) return;

    // Monitor navigation performance
    const startTime = Date.now();
    return {
      startTiming: () => startTime,
      endTiming: (label) => {
        const duration = Date.now() - startTime;
        this.metrics[label] = duration;
        
        if (__DEV__) {
          console.log(`⚡ ${label}:`, duration + 'ms');
        }
        
        return duration;
      }
    };
  }

  // Memory usage monitoring
  measureMemoryUsage() {
    if (!this.isWeb || !performance.memory) return;

    const memory = performance.memory;
    this.metrics.memoryUsage = {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };

    if (__DEV__) {
      console.log('🧠 Memory Usage:', this.metrics.memoryUsage);
    }
  }

  // Send metrics to analytics (placeholder)
  sendToAnalytics(metricName, metric) {
    // TODO: Integrate with analytics service (e.g., Sentry, Google Analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metricName, {
        event_category: 'Web Vitals',
        value: Math.round(metric.value),
        custom_parameter_1: metric.id
      });
    }
  }

  // Get all collected metrics
  getMetrics() {
    return this.metrics;
  }

  // Reset metrics
  reset() {
    this.metrics = {};
  }
}

// Singleton instance
const performanceMonitor = new PerformanceMonitor();

// Auto-initialize for web
if (typeof window !== 'undefined') {
  performanceMonitor.initWebVitals();
  
  // Measure bundle performance when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.measureBundlePerformance();
      performanceMonitor.measureMemoryUsage();
    });
  } else {
    performanceMonitor.measureBundlePerformance();
    performanceMonitor.measureMemoryUsage();
  }
}

export default performanceMonitor;