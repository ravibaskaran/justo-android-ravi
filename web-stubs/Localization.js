// React Native Localization stub for web
import { Platform } from 'react-native';

const ReactNativeLocalization = {
  language: typeof navigator !== 'undefined' ? navigator.language : 'en',
  
  getInterfaceLanguage: () => {
    if (typeof navigator !== 'undefined') {
      return navigator.language || 'en';
    }
    return 'en';
  },
  
  formatString: (str, ...values) => {
    return str.replace(/{(\d+)}/g, (match, index) => {
      return typeof values[index] !== 'undefined' ? values[index] : match;
    });
  }
};

export default ReactNativeLocalization;