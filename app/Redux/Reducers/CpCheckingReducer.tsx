import { CP_CHECKING_LIST_ERROR, GET_CP_CHECKING_LIST } from "../types";

const initialState = {
    response: null,
    list: false,
};

export function CpCheckingReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_CP_CHECKING_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case CP_CHECKING_LIST_ERROR:
            return {
                ...state,
                list: false,
                response: action.payload,
            };
        default:
            return state;
    }
}