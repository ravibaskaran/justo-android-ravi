import { NOTIFICATION_STATUS, PERMISSION_MODULES, PERMISSION_MODULES_DEFAULT } from "../types";

const initialState = {
  response: null,
  isAdmin: false,
};
const initialStateNotification = {
  response: null,
  isAdmin: false,
};

export default function permissionReducer(state = initialState, action: any) {
  switch (action.type) {
    case PERMISSION_MODULES_DEFAULT:
      return {
        ...state,
        response: action.payload,
      };
    case PERMISSION_MODULES:
      return {
        ...state,
        detail: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
export function notificationCountReducer(state = initialStateNotification, action: any) {
  switch (action.type) {
    case NOTIFICATION_STATUS:
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
}
