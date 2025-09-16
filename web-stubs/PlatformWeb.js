// Extended Platform module for react-native-web with constants
import { Platform as WebPlatform } from 'react-native-web';

// Extend the existing react-native-web Platform with constants property
const Platform = {
  ...WebPlatform,
  constants: {
    Release: '30', // Android API level equivalent for web
    Brand: 'generic',
    Model: 'Web Browser',
    Manufacturer: 'Unknown',
    ...(WebPlatform.constants || {})
  }
};

export default Platform;