// React Native Snackbar stub for web
const Snackbar = {
  LENGTH_LONG: 'LONG',
  LENGTH_SHORT: 'SHORT',
  
  show: (options) => {
    // Web implementation using browser notifications or a simple console log
    console.log('Snackbar:', options.text || options);
  },
  
  dismiss: () => {
    console.log('Snackbar dismissed');
  }
};

export default Snackbar;