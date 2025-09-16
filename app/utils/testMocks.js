/**
 * Test Mocking System
 * Provides mock implementations for Redux actions and API calls to prevent hitting live APIs during testing
 */

// Mock data generators
export const MockDataGenerator = {
  visitor: () => ({
    _id: 'mock_visitor_' + Date.now(),
    first_name: 'Test',
    last_name: 'User',
    mobile: '1234567890',
    email: 'test@example.com',
    cp_id: 'mock_cp_123',
    created_at: new Date().toISOString(),
    status: 'active'
  }),

  property: () => ({
    _id: 'mock_property_' + Date.now(),
    property_title: 'Test Property',
    location: 'Test Location',
    price: 1000000,
    status: 'available',
    created_at: new Date().toISOString()
  }),

  appointment: () => ({
    _id: 'mock_appointment_' + Date.now(),
    visitor_id: 'mock_visitor_123',
    property_id: 'mock_property_123',
    date: new Date().toISOString(),
    status: 'scheduled',
    created_at: new Date().toISOString()
  }),

  booking: () => ({
    _id: 'mock_booking_' + Date.now(),
    appointment_id: 'mock_appointment_123',
    amount: 50000,
    status: 'confirmed',
    created_at: new Date().toISOString()
  })
};

// Mock API responses
export const MockAPIResponses = {
  success: (data) => ({
    data: {
      status: 200,
      message: 'Success',
      data: data
    }
  }),

  error: (message = 'Mock error', status = 400) => ({
    error: {
      response: {
        status: status,
        data: {
          message: message
        }
      }
    }
  }),

  list: (items) => ({
    data: {
      status: 200,
      message: 'Success',
      data: items || []
    }
  })
};

// Mock Redux Actions
export const mockActions = {
  // Lead Management Actions
  addVisitor: jest.fn().mockImplementation((visitorData) => {
    return Promise.resolve(MockAPIResponses.success(MockDataGenerator.visitor()));
  }),

  getAllLeadsList: jest.fn().mockImplementation((params) => {
    return Promise.resolve(MockAPIResponses.list([
      MockDataGenerator.visitor(),
      MockDataGenerator.visitor()
    ]));
  }),

  statusUpdate: jest.fn().mockImplementation((params) => {
    return Promise.resolve(MockAPIResponses.success({ updated: true }));
  }),

  // Property Actions
  getAllProperty: jest.fn().mockImplementation((params) => {
    return Promise.resolve(MockAPIResponses.list([
      MockDataGenerator.property(),
      MockDataGenerator.property()
    ]));
  }),

  allocatePropertyToUser: jest.fn().mockImplementation((params) => {
    return Promise.resolve(MockAPIResponses.success({ allocated: true }));
  }),

  // Appointment Actions
  addAppointment: jest.fn().mockImplementation((appointmentData) => {
    return Promise.resolve(MockAPIResponses.success(MockDataGenerator.appointment()));
  }),

  getAllAppointmentList: jest.fn().mockImplementation((params) => {
    return Promise.resolve(MockAPIResponses.list([
      MockDataGenerator.appointment(),
      MockDataGenerator.appointment()
    ]));
  }),

  // Booking Actions
  AddBooking: jest.fn().mockImplementation((bookingData) => {
    return Promise.resolve(MockAPIResponses.success(MockDataGenerator.booking()));
  }),

  getBookingList: jest.fn().mockImplementation((params) => {
    return Promise.resolve(MockAPIResponses.list([
      MockDataGenerator.booking(),
      MockDataGenerator.booking()
    ]));
  }),

  registerBooking: jest.fn().mockImplementation((registrationData) => {
    return Promise.resolve(MockAPIResponses.success({ registered: true }));
  })
};

// Mock Store for testing
export const createMockStore = () => {
  const mockState = {
    userDetail: { userData: { _id: 'mock_user_123', role: 'agent' } },
    leadReducer: { visitorDataList: [] },
    propertyReducers: { propertyData: [] },
    appointment: { userAppointmentData: [] },
    booking: { booking: [] }
  };

  return {
    getState: jest.fn().mockReturnValue(mockState),
    dispatch: jest.fn().mockImplementation((action) => {
      if (typeof action === 'function') {
        return action(mockStore.dispatch, mockStore.getState);
      }
      return Promise.resolve(action);
    }),
    subscribe: jest.fn(),
    replaceReducer: jest.fn()
  };
};

// Test Environment Detection
export const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || 
         process.env.JEST_WORKER_ID !== undefined ||
         typeof jest !== 'undefined';
};

// Development flag detection
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development' || 
         (typeof __DEV__ !== 'undefined' && __DEV__) ||
         isTestEnvironment();
};

// Mock HTTP Client
export const mockHttpClient = {
  get: jest.fn().mockResolvedValue({ data: { status: 200, data: [] } }),
  post: jest.fn().mockResolvedValue({ data: { status: 200, data: {} } }),
  put: jest.fn().mockResolvedValue({ data: { status: 200, data: {} } }),
  delete: jest.fn().mockResolvedValue({ data: { status: 200, data: {} } })
};

// Enable/disable mocking
let mockingEnabled = false;

export const enableMocking = () => {
  mockingEnabled = true;
  console.log('🧪 Test mocking enabled - APIs will return mock data');
};

export const disableMocking = () => {
  mockingEnabled = false;
  console.log('🔄 Test mocking disabled - APIs will use real endpoints');
};

export const isMockingEnabled = () => mockingEnabled;

// Auto-enable mocking in test environments
if (isTestEnvironment()) {
  enableMocking();
}

export default {
  MockDataGenerator,
  MockAPIResponses,
  mockActions,
  createMockStore,
  mockHttpClient,
  enableMocking,
  disableMocking,
  isMockingEnabled,
  isTestEnvironment,
  isDevelopmentMode
};