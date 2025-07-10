import {
  CLOSE_FOLLOWUP,
  CLOSE_FOLLOWUP_ERROR,
  GET_SCHEDULED_ACTIVITY,
  REMOVE_CLOSE_FOLLOWUP_DATA,
  SCHEDULED_ACTIVITY_DETAILS,
  SCHEDULED_ACTIVITY_DETAILS_ERROR,
  SCHEDULED_ACTIVITY_ERROR,
} from "../types";

const initialState = {
  response: null,
  detail: false,
  create: false,
  list: false,
  update: false,
};

export function scheduledActivityReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_SCHEDULED_ACTIVITY:
      return {
        ...state,
        create: false,
        detail: false,
        list: true,
        update: false,
        response: action.payload,
      };
    case SCHEDULED_ACTIVITY_ERROR:
      return {
        ...state,
        create: false,
        detail: false,
        list: true,
        update: false,
        response: action.payload,
      };
    case SCHEDULED_ACTIVITY_DETAILS:
      return {
        ...state,
        create: false,
        detail: true,
        list: false,
        update: false,
        response: action.payload,
      };
    case SCHEDULED_ACTIVITY_DETAILS_ERROR:
      return {
        ...state,
        create: false,
        detail: true,
        list: false,
        update: false,
        response: action.payload,
      };
    default:
      return state;
  }
}

export function closefollowUpReducer(state = initialState, action: any) {
  switch (action.type) {
    case CLOSE_FOLLOWUP:
      return {
        ...state,
        create: false,
        detail: false,
        list: false,
        update: false,
        response: action.payload,
      };
    case CLOSE_FOLLOWUP_ERROR:
      return {
        ...state,
        create: false,
        detail: false,
        list: false,
        update: false,
        response: action.payload,
      };
    case REMOVE_CLOSE_FOLLOWUP_DATA:
      return {
        ...state,
        detail: false,
        create: false,
        list: false,
        update: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
