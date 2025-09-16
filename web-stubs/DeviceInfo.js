// Device Info stub for web
const DeviceInfo = {
  getUniqueId: () => Promise.resolve('web-unique-id'),
  getDeviceId: () => 'web-device',
  getSystemName: () => 'Web',
  getSystemVersion: () => '1.0.0',
  getBundleId: () => 'com.justo.web',
  getApplicationName: () => 'Justo',
  getBuildNumber: () => '1',
  getVersion: () => '1.0.0',
  hasNotch: () => false,
  hasSystemFeature: () => Promise.resolve(false),
  isEmulator: () => Promise.resolve(false),
};

export default DeviceInfo;