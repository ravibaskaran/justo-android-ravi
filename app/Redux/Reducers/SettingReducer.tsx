import { UPDATE_PROFILE, UPDATE_PROFILE_ERROR, USERREGISTER, USERREGISTER_ERROR } from "../types";
const initialStateForm = {
  response: null,
  update: false,
};

export function settingReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        update: true,
        response: action.payload,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    case USERREGISTER:
      return {
        ...state,
        response: action.payload,
        // authToken: false
      }
    case USERREGISTER_ERROR:
      return {
        ...state,
        response: action.payload,
        // authToken: false
      }
    default:
      return state;
  }
}