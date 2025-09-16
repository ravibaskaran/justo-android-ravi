// Jest setup for React Native testing
import '@testing-library/jest-native/extend-expect';

// Mock React Native components and modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  return {
    ...RN,
    Platform: {
      OS: 'web',
      select: (platforms) => platforms.web || platforms.default,
    },
    Dimensions: {
      get: () => ({ width: 375, height: 667 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => style,
    },
  };
});

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

// Mock Redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
  Provider: ({ children }) => children,
}));

// Global test setup
global.fetch = jest.fn();
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};