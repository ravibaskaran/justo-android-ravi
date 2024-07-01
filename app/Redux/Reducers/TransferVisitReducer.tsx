import {
  GET_CP_ACTIVE_LEAD,
  GET_CP_ACTIVE_LEAD_ERROR,
  REMOVE_TRANSFER_VISIT_DATA,
  TRANSFER_VISIT_DATA,
  TRANSFER_VISIT_ERROR,
} from "../types";

const initialStateForm = {
  response: null,
  list: false,
  update: false,
};

export function transferVisitReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case GET_CP_ACTIVE_LEAD:
      return {
        ...state,
        list: true,
        response: action.payload,
      };
    case GET_CP_ACTIVE_LEAD_ERROR:
      return {
        ...state,
        list: false,
        response: action.payload,
      };
    // case TRANSFER_VISIT_DATA:
    //   return {
    //     ...state,
    //     response: action.payload,
    //     update: true,
    //     // authToken: false
    //   };
    case TRANSFER_VISIT_ERROR:
      return {
        ...state,
        response: action.payload,
        update: false,
        // authToken: false
      };
    default:
      return state;
  }
}
export function transferVisitorReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case TRANSFER_VISIT_DATA:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_TRANSFER_VISIT_DATA:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    default:
      return state;
  }
}
