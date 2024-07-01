import { CHAT_ERROR, GET_ALL_USER_CHAT_LIST, GET_CHAT_PROPERTY_LIST, GET_RECENT_CHAT_LIST, GET_RECENT_CHAT_LIST_ERROR, PROPERTY_LIST_ERROR, UPDATE_CHAT_STATUS, UPDATE_CHAT_STATUS_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
};
const initialState2 = {
    response: null,
    update: false,
};
const initialState3 = {
    response: null,
    list: false,
};
const initialState4 = {
    response: null,
    list: false,
};

export function ChatReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_ALL_USER_CHAT_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case CHAT_ERROR:
            return {
                ...state,
                list: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function updateChatStatus(state = initialState2, action: any) {
    switch (action.type) {
        case UPDATE_CHAT_STATUS:
            return {
                ...state,
                update: true,
                response: action.payload,
            };
        case UPDATE_CHAT_STATUS_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function getRecentChatList(state = initialState3, action: any) {
    switch (action.type) {
        case GET_RECENT_CHAT_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case GET_RECENT_CHAT_LIST_ERROR:
            return {
                ...state,
                list: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function propertyChatReducer(state = initialState4, action: any) {
    switch (action.type) {
      case GET_CHAT_PROPERTY_LIST:
        return {
          ...state,
          list: true,
          response: action.payload,
        };
      case PROPERTY_LIST_ERROR:
        return {
          ...state,
          list: false,
          response: action.payload,
        };
      default:
        return state;
    }
  }