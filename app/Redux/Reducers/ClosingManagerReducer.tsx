import { GET_CLOSINGMANAGER_DETAIL, GET_CLOSINGMANAGER_DETAIL_ERROR, GET_CLOSINGMANAGER_LIST, GET_CLOSINGMANAGER_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
    detail: false
};

export function ClosingManagerReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_CLOSINGMANAGER_LIST:
            return {
                ...state,
                list: true,
                detail: false,
                response: action.payload,
            };
        case GET_CLOSINGMANAGER_DETAIL:
            return {
                ...state,
                list: true,
                detail: false,
                response: action.payload,
            };
        case GET_CLOSINGMANAGER_LIST_ERROR:
            return {
                ...state,
                list: false,
                detail: true,
                response: action.payload,
            };
        case GET_CLOSINGMANAGER_DETAIL_ERROR:
            return {
                ...state,
                list: false,
                detail: true,
                response: action.payload,
            };

            
        default:
            return state;
    }
}