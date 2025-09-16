/**
 * Performance Monitoring and Optimization System
 * Tracks API response times, memory usage, app performance, and Web Vitals
 */

// Import Web Vitals safely
let webVitalsImport = null;
try {
  webVitalsImport = require('web-vitals');
} catch (error) {
  console.warn('Web Vitals not available:', error.message);
}

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      apiCalls: [],
      componentRenders: [],
      memoryUsage: [],
      errors: [],
      webVitals: {},
      bundlePerformance: {}
    };
    this.thresholds = {
      apiResponseTime: 5000, // 5 seconds
      componentRenderTime: 100, // 100ms
      memoryUsageLimit: 100 * 1024 * 1024 // 100MB
    };
    this.isWeb = typeof window !== 'undefined';
    
    // Auto-initialize Web Vitals if available
    if (this.isWeb && webVitalsImport) {
      this.initWebVitals();
    }
    
    // Auto-measure bundle performance
    if (this.isWeb) {
      setTimeout(() => this.measureBundlePerformance(), 1000);
    }
  }

  /**
   * Start monitoring API call
   */
  startApiCall(endpoint, params = {}) {
    const callId = this.generateCallId();
    const startTime = performance.now();
    
    const apiCall = {
      id: callId,
      endpoint,
      params,
      startTime,
      timestamp: new Date().toISOString()
    };
    
    this.metrics.apiCalls.push(apiCall);
    return callId;
  }

  /**
   * End monitoring API call
   */
  endApiCall(callId, response, error = null) {
    const endTime = performance.now();
    const apiCall = this.metrics.apiCalls.find(call => call.id === callId);
    
    if (apiCall) {
      apiCall.endTime = endTime;
      apiCall.duration = endTime - apiCall.startTime;
      apiCall.response = response;
      apiCall.error = error;
      apiCall.status = error ? 'ERROR' : 'SUCCESS';
      
      // Check if response time exceeds threshold
      if (apiCall.duration > this.thresholds.apiResponseTime) {
        this.logPerformanceWarning('SLOW_API_CALL', {
          endpoint: apiCall.endpoint,
          duration: apiCall.duration,
          threshold: this.thresholds.apiResponseTime
        });
      }
    }
    
    return apiCall;
  }

  /**
   * Monitor component render time
   */
  monitorComponentRender(componentName, renderFunction) {
    const startTime = performance.now();
    
    try {
      const result = renderFunction();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.metrics.componentRenders.push({
        componentName,
        duration,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      });
      
      if (duration > this.thresholds.componentRenderTime) {
        this.logPerformanceWarning('SLOW_COMPONENT_RENDER', {
          component: componentName,
          duration,
          threshold: this.thresholds.componentRenderTime
        });
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.metrics.componentRenders.push({
        componentName,
        duration,
        timestamp: new Date().toISOString(),
        status: 'ERROR',
        error: error.message
      });
      
      throw error;
    }
  }

  /**
   * Check memory usage
   */
  checkMemoryUsage() {
    if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
      const memory = {
        used: window.performance.memory.usedJSHeapSize,
        total: window.performance.memory.totalJSHeapSize,
        limit: window.performance.memory.jsHeapSizeLimit,
        timestamp: new Date().toISOString()
      };
      
      this.metrics.memoryUsage.push(memory);
      
      if (memory.used > this.thresholds.memoryUsageLimit) {
        this.logPerformanceWarning('HIGH_MEMORY_USAGE', {
          currentUsage: memory.used,
          limit: this.thresholds.memoryUsageLimit,
          percentage: Math.round((memory.used / memory.limit) * 100)
        });
      }
      
      return memory;
    }
    return null;
  }

  /**
   * Log error with performance context
   */
  logError(error, context = {}) {
    const errorEntry = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      memoryUsage: this.checkMemoryUsage()
    };
    
    this.metrics.errors.push(errorEntry);
    console.error('🔥 Performance Monitor Error:', errorEntry);
  }

  /**
   * Log performance warning
   */
  logPerformanceWarning(type, data) {
    console.warn(`⚠️ Performance Warning [${type}]:`, data);
  }

  /**
   * Get performance report
   */
  getPerformanceReport() {
    const apiStats = this.calculateApiStats();
    const componentStats = this.calculateComponentStats();
    const memoryStats = this.calculateMemoryStats();
    
    return {
      summary: {
        totalApiCalls: this.metrics.apiCalls.length,
        averageApiResponseTime: apiStats.averageResponseTime,
        slowApiCalls: apiStats.slowCalls,
        totalComponentRenders: this.metrics.componentRenders.length,
        averageComponentRenderTime: componentStats.averageRenderTime,
        slowComponentRenders: componentStats.slowRenders,
        totalErrors: this.metrics.errors.length,
        currentMemoryUsage: memoryStats.current,
        peakMemoryUsage: memoryStats.peak
      },
      details: {
        apiCalls: this.metrics.apiCalls,
        componentRenders: this.metrics.componentRenders,
        memoryUsage: this.metrics.memoryUsage,
        errors: this.metrics.errors
      },
      recommendations: this.generateRecommendations(),
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Calculate API statistics
   */
  calculateApiStats() {
    const apiCalls = this.metrics.apiCalls.filter(call => call.duration);
    const totalDuration = apiCalls.reduce((sum, call) => sum + call.duration, 0);
    const averageResponseTime = apiCalls.length > 0 ? totalDuration / apiCalls.length : 0;
    const slowCalls = apiCalls.filter(call => call.duration > this.thresholds.apiResponseTime);
    
    return {
      totalCalls: apiCalls.length,
      averageResponseTime: Math.round(averageResponseTime),
      slowCalls: slowCalls.length,
      fastestCall: Math.min(...apiCalls.map(call => call.duration)) || 0,
      slowestCall: Math.max(...apiCalls.map(call => call.duration)) || 0
    };
  }

  /**
   * Calculate component statistics
   */
  calculateComponentStats() {
    const renders = this.metrics.componentRenders.filter(render => render.duration);
    const totalDuration = renders.reduce((sum, render) => sum + render.duration, 0);
    const averageRenderTime = renders.length > 0 ? totalDuration / renders.length : 0;
    const slowRenders = renders.filter(render => render.duration > this.thresholds.componentRenderTime);
    
    return {
      totalRenders: renders.length,
      averageRenderTime: Math.round(averageRenderTime),
      slowRenders: slowRenders.length,
      fastestRender: Math.min(...renders.map(render => render.duration)) || 0,
      slowestRender: Math.max(...renders.map(render => render.duration)) || 0
    };
  }

  /**
   * Calculate memory statistics
   */
  calculateMemoryStats() {
    const memoryEntries = this.metrics.memoryUsage;
    const currentUsage = memoryEntries.length > 0 ? memoryEntries[memoryEntries.length - 1] : null;
    const peakUsage = Math.max(...memoryEntries.map(entry => entry.used)) || 0;
    
    return {
      current: currentUsage,
      peak: peakUsage,
      entries: memoryEntries.length
    };
  }

  /**
   * Generate performance recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    const apiStats = this.calculateApiStats();
    const componentStats = this.calculateComponentStats();
    
    if (apiStats.averageResponseTime > 3000) {
      recommendations.push({
        type: 'API_OPTIMIZATION',
        priority: 'HIGH',
        message: 'API response times are slow. Consider implementing caching, pagination, or API optimization.',
        metric: `Average response time: ${apiStats.averageResponseTime}ms`
      });
    }
    
    if (componentStats.averageRenderTime > 50) {
      recommendations.push({
        type: 'COMPONENT_OPTIMIZATION',
        priority: 'MEDIUM',
        message: 'Component render times could be improved. Consider using React.memo, useMemo, or useCallback.',
        metric: `Average render time: ${componentStats.averageRenderTime}ms`
      });
    }
    
    if (this.metrics.errors.length > 10) {
      recommendations.push({
        type: 'ERROR_HANDLING',
        priority: 'HIGH',
        message: 'High error rate detected. Review error handling and API validation.',
        metric: `Total errors: ${this.metrics.errors.length}`
      });
    }
    
    return recommendations;
  }

  /**
   * Initialize Web Vitals monitoring (web only)
   */
  initWebVitals() {
    if (!this.isWeb || !webVitalsImport) return;

    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitalsImport;
      
      getCLS(this.onWebVital.bind(this, 'CLS'));
      getFID(this.onWebVital.bind(this, 'FID'));
      getFCP(this.onWebVital.bind(this, 'FCP'));
      getLCP(this.onWebVital.bind(this, 'LCP'));
      getTTFB(this.onWebVital.bind(this, 'TTFB'));
    } catch (error) {
      console.warn('Web Vitals monitoring failed:', error);
    }
  }

  /**
   * Handle web vital metrics
   */
  onWebVital(metricName, metric) {
    this.metrics.webVitals[metricName] = metric.value;
    
    // Log performance metrics in development
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.log(`📊 ${metricName}:`, metric.value);
    }

    // Send to analytics if available
    this.sendToAnalytics(metricName, metric);
  }

  /**
   * Measure bundle performance
   */
  measureBundlePerformance() {
    if (!this.isWeb) return;

    const perfEntries = performance.getEntriesByType('navigation');
    if (perfEntries.length > 0) {
      const timing = perfEntries[0];
      
      this.metrics.bundlePerformance = {
        bundleLoadTime: timing.loadEventEnd - timing.fetchStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.fetchStart,
        domInteractive: timing.domInteractive - timing.fetchStart,
        timestamp: new Date().toISOString()
      };

      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.log('📦 Bundle Performance:', this.metrics.bundlePerformance);
      }
    }
  }

  /**
   * React Native performance monitoring  
   */
  measureRNPerformance() {
    if (this.isWeb) return;

    // Monitor navigation performance
    const startTime = Date.now();
    return {
      startTiming: () => startTime,
      endTiming: (label) => {
        const duration = Date.now() - startTime;
        this.metrics[label] = duration;
        
        if (typeof __DEV__ !== 'undefined' && __DEV__) {
          console.log(`⚡ ${label}:`, duration + 'ms');
        }
        
        return duration;
      }
    };
  }

  /**
   * Send metrics to analytics
   */
  sendToAnalytics(metricName, metric) {
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metricName, {
        event_category: 'Web Vitals',
        value: Math.round(metric.value),
        custom_parameter_1: metric.id
      });
    }
  }

  /**
   * Generate unique call ID
   */
  generateCallId() {
    return 'call_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics = {
      apiCalls: [],
      componentRenders: [],
      memoryUsage: [],
      errors: []
    };
  }

  /**
   * Export metrics to file (for debugging)
   */
  exportMetrics() {
    const report = this.getPerformanceReport();
    const dataStr = JSON.stringify(report, null, 2);
    
    // In a React Native environment, you might save to AsyncStorage or a file
    console.log('📊 Performance Metrics Export:', dataStr);
    return dataStr;
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();
export default PerformanceMonitor;