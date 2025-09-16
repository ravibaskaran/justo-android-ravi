/**
 * Comprehensive Error Handling System
 * Handles API errors, validation errors, and runtime errors
 */

import { performanceMonitor } from './performanceMonitor';

class ErrorHandler {
  constructor() {
    this.errorLog = [];
    this.errorTypes = {
      API_ERROR: 'API_ERROR',
      VALIDATION_ERROR: 'VALIDATION_ERROR',
      NETWORK_ERROR: 'NETWORK_ERROR',
      RUNTIME_ERROR: 'RUNTIME_ERROR',
      PERMISSION_ERROR: 'PERMISSION_ERROR'
    };
  }

  /**
   * Handle API errors with context
   */
  handleApiError(error, endpoint, requestData = {}) {
    const errorDetails = {
      type: this.errorTypes.API_ERROR,
      message: error.message || 'API request failed',
      endpoint,
      requestData,
      statusCode: error.response?.status,
      responseData: error.response?.data,
      timestamp: new Date().toISOString(),
      stack: error.stack
    };

    this.logError(errorDetails);
    
    // Determine user-friendly message
    const userMessage = this.getUserFriendlyMessage(errorDetails);
    
    // Log to performance monitor
    performanceMonitor.logError(error, {
      endpoint,
      requestData,
      errorType: 'API_ERROR'
    });

    return {
      error: errorDetails,
      userMessage,
      shouldRetry: this.shouldRetry(errorDetails)
    };
  }

  /**
   * Handle validation errors
   */
  handleValidationError(validationResults, formData = {}) {
    const errorDetails = {
      type: this.errorTypes.VALIDATION_ERROR,
      message: 'Form validation failed',
      validationErrors: validationResults,
      formData,
      timestamp: new Date().toISOString()
    };

    this.logError(errorDetails);

    return {
      error: errorDetails,
      userMessage: this.formatValidationMessage(validationResults),
      shouldRetry: false
    };
  }

  /**
   * Handle network errors
   */
  handleNetworkError(error, requestConfig = {}) {
    const errorDetails = {
      type: this.errorTypes.NETWORK_ERROR,
      message: 'Network connection failed',
      originalError: error.message,
      requestConfig,
      timestamp: new Date().toISOString()
    };

    this.logError(errorDetails);
    
    performanceMonitor.logError(error, {
      requestConfig,
      errorType: 'NETWORK_ERROR'
    });

    return {
      error: errorDetails,
      userMessage: 'Please check your internet connection and try again.',
      shouldRetry: true
    };
  }

  /**
   * Handle runtime errors
   */
  handleRuntimeError(error, component = '', action = '') {
    const errorDetails = {
      type: this.errorTypes.RUNTIME_ERROR,
      message: error.message || 'Runtime error occurred',
      component,
      action,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };

    this.logError(errorDetails);
    
    performanceMonitor.logError(error, {
      component,
      action,
      errorType: 'RUNTIME_ERROR'
    });

    return {
      error: errorDetails,
      userMessage: 'Something went wrong. Please try again.',
      shouldRetry: true
    };
  }

  /**
   * Handle permission errors
   */
  handlePermissionError(requiredPermission, userRole) {
    const errorDetails = {
      type: this.errorTypes.PERMISSION_ERROR,
      message: `Permission denied: ${requiredPermission}`,
      requiredPermission,
      userRole,
      timestamp: new Date().toISOString()
    };

    this.logError(errorDetails);

    return {
      error: errorDetails,
      userMessage: 'You do not have permission to perform this action.',
      shouldRetry: false
    };
  }

  /**
   * Get user-friendly error message
   */
  getUserFriendlyMessage(errorDetails) {
    const statusCode = errorDetails.statusCode;
    const endpoint = errorDetails.endpoint;

    // Common HTTP status code mappings
    const statusMessages = {
      400: 'The request was invalid. Please check your input and try again.',
      401: 'You are not authorized to perform this action. Please log in again.',
      403: 'You do not have permission to access this resource.',
      404: 'The requested resource was not found.',
      409: 'This action conflicts with existing data. Please refresh and try again.',
      422: 'The data provided is not valid. Please check your input.',
      429: 'Too many requests. Please wait a moment before trying again.',
      500: 'Server error occurred. Please try again later.',
      502: 'Service temporarily unavailable. Please try again later.',
      503: 'Service unavailable. Please try again later.'
    };

    // Endpoint-specific messages
    const endpointMessages = {
      '/visit/addVisit': 'Failed to create visitor. Please check all required fields.',
      '/property/propertyAllocateToUsers': 'Failed to allocate property. Please try again.',
      '/appointment/addAppointment': 'Failed to create appointment. Please verify the date and time.',
      '/booking/addBooking': 'Failed to create booking. Please check booking details.',
      '/registration/addRegistration': 'Failed to complete registration. Please contact support.'
    };

    // Return specific message based on endpoint or status code
    return endpointMessages[endpoint] || 
           statusMessages[statusCode] || 
           'An error occurred. Please try again.';
  }

  /**
   * Format validation error messages
   */
  formatValidationMessage(validationResults) {
    if (!validationResults || validationResults.length === 0) {
      return 'Please check your input and try again.';
    }

    const messages = validationResults.map(result => result.message).filter(Boolean);
    return messages.length > 1 
      ? `Please fix the following issues:\n• ${messages.join('\n• ')}`
      : messages[0] || 'Please check your input and try again.';
  }

  /**
   * Determine if error should trigger retry
   */
  shouldRetry(errorDetails) {
    const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
    const retryableTypes = [this.errorTypes.NETWORK_ERROR];
    
    return retryableStatusCodes.includes(errorDetails.statusCode) ||
           retryableTypes.includes(errorDetails.type);
  }

  /**
   * Log error to internal system
   */
  logError(errorDetails) {
    this.errorLog.push(errorDetails);
    
    // Console log for development
    console.error(`🔥 [${errorDetails.type}]`, errorDetails);
    
    // Keep only last 100 errors to prevent memory issues
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100);
    }
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    const totalErrors = this.errorLog.length;
    const errorsByType = {};
    const errorsByEndpoint = {};
    const recentErrors = this.errorLog.slice(-10);

    // Count errors by type
    this.errorLog.forEach(error => {
      errorsByType[error.type] = (errorsByType[error.type] || 0) + 1;
      if (error.endpoint) {
        errorsByEndpoint[error.endpoint] = (errorsByEndpoint[error.endpoint] || 0) + 1;
      }
    });

    return {
      totalErrors,
      errorsByType,
      errorsByEndpoint,
      recentErrors,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Clear error log
   */
  clearErrorLog() {
    this.errorLog = [];
  }

  /**
   * Export error log
   */
  exportErrorLog() {
    const stats = this.getErrorStats();
    console.log('📋 Error Log Export:', stats);
    return stats;
  }

  /**
   * Create error boundary wrapper
   */
  createErrorBoundary(component, componentName = '') {
    try {
      return component;
    } catch (error) {
      const errorResult = this.handleRuntimeError(error, componentName);
      throw new Error(errorResult.userMessage);
    }
  }

  /**
   * Wrap async function with error handling
   */
  wrapAsyncFunction(asyncFn, context = '') {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (error) {
        const errorResult = this.handleRuntimeError(error, context);
        throw errorResult;
      }
    };
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();
export default ErrorHandler;