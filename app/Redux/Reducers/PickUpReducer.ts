import { GET_PICKUP_LIST, GET_PICKUP_LIST_ERROR, UPDATE_PICKUP_STATUS, UPDATE_PICKUP_STATUS_ERROR } from "../types";

const initialState = {
    response: null,
    list: false
  };
const initialState1 = {
    response: null,
    update: false
  };
  
  
  
  export function PickUpReducer(state = initialState, action: any) {
    switch (action.type) {
  
      case GET_PICKUP_LIST:
        return {
          ...state,
          list: true,
          response: action.payload,
        };
      case GET_PICKUP_LIST_ERROR:
        return {
          ...state,
          list: true,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }
  export function UpdatePickUpStatusReducer(state = initialState1, action: any) {
    switch (action.type) {
  
      case UPDATE_PICKUP_STATUS:
        return {
          ...state,
          update: true,
          response: action.payload,
        };
      case UPDATE_PICKUP_STATUS_ERROR:
        return {
          ...state,
          update: false,
          response: action.payload,
        };
  
      default:
        return state;
    }
  }