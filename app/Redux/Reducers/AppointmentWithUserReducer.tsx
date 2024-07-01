import {
  ADD_USER_APPOINTMENT,
  ADD_USER_APPOINTMENT_ERROR,
  EDIT_USER_APPOINTMENT,
  EDIT_USER_APPOINTMENT_ERROR,
  GET_USER_APPOINTMENT_LIST,
  GET_USER_APPOINTMENT_LIST_ERROR,
  REMOVE_USER_APPOINTMENT,
  UPDATE_USERAPPOINTMENT_STATUS,
  UPDATE_USERAPPOINTMENT_STATUS_ERROR,
} from "../types";

const initialState = {
  response: null,
  create: false,
  list: false,
};
const editInitialState = {
  response: null,
  edit: false,
  update: false,
};

export function userAppointmentReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_USER_APPOINTMENT_LIST:
      return {
        ...state,
        list: true,
        response: action.payload,
      };
    case GET_USER_APPOINTMENT_LIST_ERROR:
    case ADD_USER_APPOINTMENT_ERROR:
      return {
        ...state,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function userEditAppointmentReducer(/////
  state = editInitialState,
  action: any
) {
  switch (action.type) {

    case ADD_USER_APPOINTMENT:
      return {
        ...state,
        create: true,
        response: action.payload,
      };
    case EDIT_USER_APPOINTMENT:
      return {
        ...state,
        edit: true,
        response: action.payload,
      };
    case UPDATE_USERAPPOINTMENT_STATUS:
      return {
        ...state,
        update: true,
        response: action.payload,
      };
    case UPDATE_USERAPPOINTMENT_STATUS_ERROR:
    case EDIT_USER_APPOINTMENT_ERROR:
      return {
        ...state,
        response: action.payload,
      };
    case REMOVE_USER_APPOINTMENT:
      return {
        ...state,
        response: action.payload,
      };

    default:
      return state;
  }
}
