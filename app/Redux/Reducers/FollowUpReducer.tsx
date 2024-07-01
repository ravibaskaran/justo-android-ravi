import { ADD_FOLLOWUP, ADD_FOLLOWUP_ERROR, FOLLOWUP_DETAILS, FOLLOWUP_DETAILS_ERROR, FOLLOWUP_ERROR, GET_FOLLOWUP_LIST, REMOVE_FOLLOWUP_DATA, UPDATE_FOLLOWUP, UPDATE_FOLLOWUP_ERROR } from "../types";

const initialState = {
    response: null,
    detail: false,
    create: false,
    list: false,
    update: false
};

export function followUpReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_FOLLOWUP_LIST:
            return {
                ...state,
                create: false,
                detail: false,
                list: true,
                update: false,
                response: action.payload,
            };
        case FOLLOWUP_ERROR:
            return {
                ...state,
                create: false,
                detail: false,
                list: true,
                update: false,
                response: action.payload,
            };
        case FOLLOWUP_DETAILS:
            return {
                ...state,
                create: false,
                detail: true,
                list: false,
                update: false,
                response: action.payload,
            };
        case FOLLOWUP_DETAILS_ERROR:
            return {
                ...state,
                create: false,
                detail: true,
                list: false,
                update: false,
                response: action.payload,
            };
        case UPDATE_FOLLOWUP:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: true,
                response: action.payload,
            };
        case UPDATE_FOLLOWUP_ERROR:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: true,
                response: action.payload,
            };
        case ADD_FOLLOWUP:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: false,
                response: action.payload,
            };
        case ADD_FOLLOWUP_ERROR:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function AddfollowUpReducer(state = initialState, action: any) {
    switch (action.type) {

        case ADD_FOLLOWUP:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: false,
                response: action.payload,
            };
        case ADD_FOLLOWUP_ERROR:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: false,
                response: action.payload,
            };
        case REMOVE_FOLLOWUP_DATA:
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