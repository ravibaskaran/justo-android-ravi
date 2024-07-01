import { GET_USERS_LIST_FOR_SH, GET_USERS_LIST_FOR_SH_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
    detail: false
};

export function UserManagerReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USERS_LIST_FOR_SH:
            return {
                ...state,
                list: true,
                detail: false,
                response: action.payload,
            };
        case GET_USERS_LIST_FOR_SH_ERROR:
            return {
                ...state,
                list: false,
                detail: false,
                response: action.payload,
            };
        default:
            return state;
    }
}