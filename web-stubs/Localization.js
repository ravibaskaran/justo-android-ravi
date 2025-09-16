// React Native Localization stub for web - Constructor function
function ReactNativeLocalization(props) {
  // Initialize with props (translation strings)
  this.props = props || {};
  this.language = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
  
  // Set the current language's strings
  if (this.props[this.language]) {
    Object.assign(this, this.props[this.language]);
  } else if (this.props['en']) {
    Object.assign(this, this.props['en']);
  }
}

ReactNativeLocalization.prototype.getInterfaceLanguage = function() {
  if (typeof navigator !== 'undefined') {
    return navigator.language.split('-')[0] || 'en';
  }
  return 'en';
};

ReactNativeLocalization.prototype.formatString = function(str, ...values) {
  return str.replace(/{(\d+)}/g, (match, index) => {
    return typeof values[index] !== 'undefined' ? values[index] : match;
  });
};

ReactNativeLocalization.prototype.setLanguage = function(language) {
  this.language = language;
  if (this.props[language]) {
    Object.assign(this, this.props[language]);
  }
};

export default ReactNativeLocalization;