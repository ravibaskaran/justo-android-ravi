// AsyncStorage stub using localStorage for web
const AsyncStorage = {
  getItem: async (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('AsyncStorage setItem failed:', error);
    }
  },
  removeItem: async (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('AsyncStorage removeItem failed:', error);
    }
  },
  clear: async () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('AsyncStorage clear failed:', error);
    }
  },
};

export default AsyncStorage;