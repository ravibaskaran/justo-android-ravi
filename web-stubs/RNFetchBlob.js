// rn-fetch-blob stub for web
const RNFetchBlob = {
  config: (options) => RNFetchBlob,
  fetch: (method, url, headers, data) => {
    console.warn('RNFetchBlob.fetch called in web - using fetch API fallback');
    return fetch(url, { method, headers, body: data }).then(response => ({
      status: response.status,
      data: response.text(),
      json: () => response.json(),
      text: () => response.text(),
    }));
  },
  fs: {
    dirs: {
      DocumentDir: '/documents',
      CacheDir: '/cache',
      MainBundleDir: '/bundle',
    },
    readFile: () => Promise.resolve(''),
    writeFile: () => Promise.resolve(),
    exists: () => Promise.resolve(false),
    unlink: () => Promise.resolve(),
  },
  android: {},
  ios: {},
  wrap: (path) => ({ path }),
  base64: {
    encode: (str) => btoa(str),
    decode: (str) => atob(str),
  },
};

export default RNFetchBlob;
export const fs = RNFetchBlob.fs;