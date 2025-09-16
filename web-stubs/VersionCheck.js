// Version check stub for web
const VersionCheck = {
  needUpdate: () => Promise.resolve({ isNeeded: false }),
  getCurrentVersion: () => '1.0.0',
  getLatestVersion: () => Promise.resolve('1.0.0'),
};

export default VersionCheck;