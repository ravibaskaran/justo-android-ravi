// React Native Vector Icons stub for web
import React from 'react';
import { Text } from 'react-native';

const Icon = ({ name, size = 24, color = '#000', ...props }) => (
  <Text style={{ fontSize: size, color, fontFamily: 'monospace' }} {...props}>
    📱
  </Text>
);

export default Icon;
export const createIconSet = () => Icon;
export const createIconSetFromFontello = () => Icon;
export const createIconSetFromIcoMoon = () => Icon;