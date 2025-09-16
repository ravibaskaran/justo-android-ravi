module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|@rneui|react-native-vector-icons|react-native-ratings|react-native-elements|react-native-paper|react-native-tab-view|react-native-gifted-chat|react-native-fast-image)/)',
  ],
  moduleNameMapper: {
    '^react-native-localization$': '<rootDir>/web-stubs/Localization.js',
    '^react-native-snackbar$': '<rootDir>/web-stubs/Snackbar.js',
    '^react-native-fast-image$': '<rootDir>/web-stubs/FastImage.js',
    '^react-native-image-crop-picker$': '<rootDir>/web-stubs/ImageCropPicker.js',
    '^react-native-tab-view$': '<rootDir>/web-stubs/TabView.js',
    '^react-native-gifted-chat$': '<rootDir>/web-stubs/GiftedChat.js',
    '^@react-native-firebase/(.*)$': '<rootDir>/web-stubs/Firebase.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/web-stubs/AsyncStorage.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/android/', '<rootDir>/ios/'],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/assets/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: process.env.ENFORCE_COVERAGE ? {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  } : undefined,
};
