/**
 * Testing System Integration
 * Provides development interface for running QA tests and monitoring system health
 */

import { qaTestSuite } from './QATestSuite';
import { transactionTester } from './TransactionTester';
import { performanceMonitor } from './performanceMonitor';
import { errorHandler } from './errorHandler';
import { enableMocking, disableMocking, isDevelopmentMode, isTestEnvironment } from './testMocks';

class TestingSystem {
  constructor() {
    this.isInitialized = false;
    this.testResults = {};
    this.developmentMode = isDevelopmentMode();
  }

  /**
   * Initialize testing system (only in development)
   */
  init() {
    if (!this.developmentMode || this.isInitialized) return;

    console.log('🧪 Initializing Testing System...');
    
    // Setup global testing interface for development
    if (typeof window !== 'undefined') {
      window.JUSTO_TESTING = {
        // QA Test Suite
        runAllTests: this.runAllTests.bind(this),
        runTransactionTests: this.runTransactionTests.bind(this),
        runPerformanceTests: this.runPerformanceTests.bind(this),
        
        // Performance Monitoring
        getPerformanceReport: this.getPerformanceReport.bind(this),
        clearMetrics: this.clearMetrics.bind(this),
        
        // Error Handling
        getErrorStats: this.getErrorStats.bind(this),
        
        // Test Controls
        enableMocking: enableMocking,
        disableMocking: disableMocking,
        
        // System Status
        getSystemHealth: this.getSystemHealth.bind(this)
      };

      console.log('🔧 Development testing interface available at window.JUSTO_TESTING');
      this.logAvailableCommands();
    }

    this.isInitialized = true;
  }

  /**
   * Run complete QA test suite
   */
  async runAllTests() {
    console.log('🚀 Running Complete QA Test Suite...');
    
    try {
      const results = await qaTestSuite.runCompleteQASuite();
      this.testResults.complete = results;
      
      console.log('✅ QA Test Suite completed:', results.summary);
      return results;
    } catch (error) {
      console.error('❌ QA Test Suite failed:', error);
      return { error: error.message };
    }
  }

  /**
   * Run only transaction tests
   */
  async runTransactionTests() {
    console.log('🔄 Running Transaction Tests...');
    
    try {
      const results = await transactionTester.runCompleteTransactionTest();
      this.testResults.transaction = results;
      
      console.log('✅ Transaction tests completed');
      return results;
    } catch (error) {
      console.error('❌ Transaction tests failed:', error);
      return { error: error.message };
    }
  }

  /**
   * Run performance tests
   */
  runPerformanceTests() {
    console.log('⚡ Running Performance Tests...');
    
    try {
      const report = performanceMonitor.getPerformanceReport();
      this.testResults.performance = report;
      
      console.log('✅ Performance tests completed');
      return report;
    } catch (error) {
      console.error('❌ Performance tests failed:', error);
      return { error: error.message };
    }
  }

  /**
   * Get performance report
   */
  getPerformanceReport() {
    return performanceMonitor.getPerformanceReport();
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    performanceMonitor.clearMetrics();
    errorHandler.clearErrorLog();
    console.log('🧹 Metrics cleared');
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    return errorHandler.getErrorStats();
  }

  /**
   * Get system health status
   */
  getSystemHealth() {
    const performanceReport = performanceMonitor.getPerformanceReport();
    const errorStats = errorHandler.getErrorStats();
    
    const health = {
      performance: {
        status: performanceReport.summary.totalErrors > 10 ? 'WARNING' : 'GOOD',
        apiResponseTime: performanceReport.summary.averageApiResponseTime,
        componentRenderTime: performanceReport.summary.averageComponentRenderTime,
        memoryUsage: performanceReport.summary.currentMemoryUsage
      },
      errors: {
        status: errorStats.totalErrors > 5 ? 'WARNING' : 'GOOD',
        totalErrors: errorStats.totalErrors,
        recentErrors: errorStats.recentErrors.length
      },
      testing: {
        lastTestRun: this.testResults.complete?.generatedAt || 'Never',
        testsPassed: this.testResults.complete?.summary?.successful || 0,
        testsFailed: this.testResults.complete?.summary?.failed || 0
      },
      timestamp: new Date().toISOString()
    };

    console.log('🏥 System Health:', health);
    return health;
  }

  /**
   * Log available development commands
   */
  logAvailableCommands() {
    console.log(`
📋 Available Testing Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧪 Test Suite Commands:
  JUSTO_TESTING.runAllTests()         - Run complete QA test suite
  JUSTO_TESTING.runTransactionTests() - Run transaction flow tests
  JUSTO_TESTING.runPerformanceTests() - Run performance tests

⚡ Performance Monitoring:
  JUSTO_TESTING.getPerformanceReport() - Get current performance metrics
  JUSTO_TESTING.clearMetrics()         - Clear all performance metrics

🔧 Error Monitoring:
  JUSTO_TESTING.getErrorStats()        - Get error statistics

🎛️ Test Controls:
  JUSTO_TESTING.enableMocking()        - Enable API mocking for tests
  JUSTO_TESTING.disableMocking()       - Disable API mocking
  
🏥 System Status:
  JUSTO_TESTING.getSystemHealth()      - Get overall system health report

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  }

  /**
   * Auto-run system health check
   */
  autoHealthCheck() {
    if (!this.developmentMode) return;

    setTimeout(() => {
      const health = this.getSystemHealth();
      
      if (health.performance.status === 'WARNING' || health.errors.status === 'WARNING') {
        console.warn('⚠️ System health warning detected. Run JUSTO_TESTING.getSystemHealth() for details.');
      }
    }, 5000);
  }

  /**
   * Development mode banner
   */
  showBanner() {
    if (!this.developmentMode || typeof console === 'undefined') return;

    console.log(`
🧪 JUSTO TESTING FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Development mode active
Testing interface: window.JUSTO_TESTING
Mocking: ${isTestEnvironment() ? 'Enabled' : 'Disabled'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  }
}

// Create singleton instance
const testingSystem = new TestingSystem();

// Auto-initialize in development mode
if (testingSystem.developmentMode) {
  // Initialize after DOM is ready
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        testingSystem.init();
        testingSystem.showBanner();
        testingSystem.autoHealthCheck();
      });
    } else {
      testingSystem.init();
      testingSystem.showBanner();
      testingSystem.autoHealthCheck();
    }
  } else {
    // React Native environment
    setTimeout(() => {
      testingSystem.init();
      testingSystem.showBanner();
      testingSystem.autoHealthCheck();
    }, 1000);
  }
}

export { testingSystem };
export default testingSystem;