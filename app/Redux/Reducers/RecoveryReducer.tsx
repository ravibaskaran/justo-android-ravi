import { GET_RECOVERY_LIST, GET_RECOVERY_LIST_ERROR } from "../types";

const initialStateForm = {
    response: null,
    list: false
};
export function RecoveryReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case GET_RECOVERY_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case GET_RECOVERY_LIST_ERROR:
            return {
                ...state,
                list: false,
                response: action.payload,
            };
        default:
            return state;
    }
}