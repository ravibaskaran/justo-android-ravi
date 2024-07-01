import { GET_APPOINTMENT_CHECKIN, GET_APPOINTMENT_CHECKIN_ERROR, GET_CITY_LIST, GET_CITY_LIST_ERROR, GET_ROLE_LIST, GET_ROLE_LIST_ERROR, GET_SOURCING_MANAGER, GET_SOURCING_MANAGER_ERROR, MASTER_ERROR, MASTER_LIST, PROPERTY_CONFIGURATION, REMOVE_MASTERS } from "../types";


const initialState = {
  response: null,
  detail: false,
  create: false,
};

export function masterDataReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_CITY_LIST:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
    case GET_CITY_LIST_ERROR:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
    case GET_ROLE_LIST:
      return {
        ...state,
        Roleresponse: action.payload,
        loading: false,
      }
    case MASTER_LIST:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case PROPERTY_CONFIGURATION:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };

    case GET_ROLE_LIST_ERROR:
      return {
        ...state,
        Roleresponse: action.payload,
        loading: false,
      }

    case MASTER_LIST:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };

    case MASTER_ERROR:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case GET_SOURCING_MANAGER:
      return {
        ...state,
        detail: false,
        create: false,
        response: action.payload,
      };

    case GET_SOURCING_MANAGER_ERROR:
      return {
        ...state,
        detail: false,
        create: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
export function masterRemoveReducer(state = initialState, action: any) {
  switch (action.type) {
    case REMOVE_MASTERS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
    case GET_APPOINTMENT_CHECKIN:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
    case GET_APPOINTMENT_CHECKIN_ERROR:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}
