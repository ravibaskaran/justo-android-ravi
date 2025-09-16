// Firebase stub for web
const firebaseStub = {
  initializeApp: () => ({}),
  getApp: () => ({}),
  auth: () => ({
    signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'stub-user' } }),
    signOut: () => Promise.resolve(),
    onAuthStateChanged: () => () => {},
    currentUser: null,
  }),
  database: () => ({
    ref: () => ({
      on: () => {},
      off: () => {},
      set: () => Promise.resolve(),
      push: () => Promise.resolve({ key: 'stub-key' }),
    }),
  }),
  storage: () => ({
    ref: () => ({
      putFile: () => Promise.resolve({ downloadURL: 'stub-url' }),
      getDownloadURL: () => Promise.resolve('stub-url'),
    }),
  }),
};

const messaging = () => ({
  requestPermission: () => Promise.resolve(1),
  getToken: () => Promise.resolve('stub-fcm-token'),
  onMessage: () => () => {},
  onNotificationOpenedApp: () => {},
  getInitialNotification: () => Promise.resolve(null),
  setBackgroundMessageHandler: () => {},
  AuthorizationStatus: { AUTHORIZED: 1, PROVISIONAL: 2 },
});

export default firebaseStub;
export { messaging };
export const getApp = firebaseStub.getApp;
export const initializeApp = firebaseStub.initializeApp;