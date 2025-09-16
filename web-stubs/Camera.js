// Camera stub for web
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Camera = ({ onReadCode, ...props }) => (
  <View style={{ backgroundColor: '#f0f0f0', padding: 20, alignItems: 'center' }}>
    <Text>📷 Camera not available in web version</Text>
    <TouchableOpacity 
      onPress={() => onReadCode && onReadCode({ nativeEvent: { codeStringValue: 'sample-qr-code' } })}
      style={{ marginTop: 10, padding: 10, backgroundColor: '#007AFF', borderRadius: 5 }}
    >
      <Text style={{ color: 'white' }}>Simulate QR Code Scan</Text>
    </TouchableOpacity>
  </View>
);

const CameraKit = { Camera };
export default CameraKit;