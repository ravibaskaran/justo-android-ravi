// Platform stub for web that includes constants property
const Platform = {
  OS: 'web',
  Version: '1.0',
  constants: {
    Release: '30', // Android API level equivalent for web
    Brand: 'generic',
    Model: 'Web Browser',
    Manufacturer: 'Unknown'
  },
  select: (obj) => {
    if (obj.web) return obj.web;
    if (obj.default) return obj.default;
    return undefined;
  }
};

export default Platform;