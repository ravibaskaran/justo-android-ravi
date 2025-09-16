// Notifee stub for web
const notifee = {
  requestPermission: () => Promise.resolve({ authorizationStatus: 1 }),
  createChannel: ({ id, name }) => Promise.resolve(id),
  displayNotification: (notification) => {
    console.log('Notification (web stub):', notification);
    // Use browser notifications API if available
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, { body: notification.body });
    }
    return Promise.resolve();
  },
  onForegroundEvent: (callback) => () => {},
  onBackgroundEvent: (callback) => () => {},
};

export default notifee;
export const AndroidImportance = { HIGH: 4 };
export const EventType = { DISMISSED: 0, PRESS: 1, ACTION_PRESS: 2 };