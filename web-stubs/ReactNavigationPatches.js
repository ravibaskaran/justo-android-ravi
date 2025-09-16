// React Navigation missing modules stub for web
export const addCancelListener = () => () => {};
export const MaskedView = ({ children, ...props }) => children;
export const NativeStackView = ({ children, ...props }) => children;
export const useBackButton = () => {};
export const useDocumentTitle = () => {};
export const useLinking = () => ({ getInitialState: () => {}, getStateFromPath: () => {}, getPathFromState: () => {} });

// Fix for useFrameSize hook that uses raw require() calls
export const useFrameSize = () => {
  if (typeof window !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  return { width: 375, height: 812 }; // Default mobile dimensions
};

// FrameSizeProvider component for React Navigation Elements
export const FrameSizeProvider = ({ children }) => children;

export default {
  addCancelListener,
  MaskedView,
  NativeStackView,
  useBackButton,
  useDocumentTitle,
  useLinking,
  useFrameSize,
  FrameSizeProvider,
};