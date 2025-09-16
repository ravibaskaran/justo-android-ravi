import React from 'react';

// Web stub for react-native-drawer-layout
const Drawer = ({ children, ...props }) => {
  // Simple web implementation - just render children
  return React.createElement('div', { style: { display: 'flex', flex: 1 } }, children);
};

// Export both named and default exports for compatibility
export { Drawer };
export const DrawerProgressContext = React.createContext(0);
export const useDrawerProgress = () => 0;

export default Drawer;