// React Native FS stub for web
const RNFS = {
  DocumentDirectoryPath: '/documents',
  CachesDirectoryPath: '/cache',
  ExternalDirectoryPath: '/external',
  
  writeFile: (path, content, encoding = 'utf8') => Promise.resolve(),
  readFile: (path, encoding = 'utf8') => Promise.resolve(''),
  exists: (path) => Promise.resolve(false),
  mkdir: (path, options) => Promise.resolve(),
  readDir: (path) => Promise.resolve([]),
  stat: (path) => Promise.resolve({ isFile: () => false, isDirectory: () => false }),
  unlink: (path) => Promise.resolve(),
  copyFile: (source, dest) => Promise.resolve(),
  moveFile: (source, dest) => Promise.resolve(),
  downloadFile: (options) => ({
    promise: Promise.resolve({ statusCode: 200, bytesWritten: 1000 }),
    jobId: 1,
  }),
};

export default RNFS;