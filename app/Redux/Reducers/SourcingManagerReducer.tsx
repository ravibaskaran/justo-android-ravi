import { ASSIGNCP_SM, ASSIGNCP_SM_ERROR, GET_ASSIGNCP_LIST, GET_ASSIGNCP_LIST_ERROR, GET_SOURCINGMANAGER_DETAIL, GET_SOURCINGMANAGER_DETAIL_ERROR, GET_SOURCINGMANAGER_LIST, GET_SOURCINGMANAGER_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
    detail: false,
    target:false,
    allocate: false
};

export function SourcingManagerReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_SOURCINGMANAGER_LIST:
            return {
                ...state,
                list: true,
                detail: false,
                target: false,
                allocate: false,
                response: action.payload,
            };
        case GET_SOURCINGMANAGER_LIST_ERROR:
            return {
                ...state,
                list: true,
                target: false,
                allocate: false,
                detail: false,
                response: action.payload,
            };
        case GET_SOURCINGMANAGER_DETAIL:
            return {
                ...state,
                list: false,
                target: false,
                allocate: false,
                detail: true,
                response: action.payload,
            };
        case GET_SOURCINGMANAGER_DETAIL_ERROR:
            return {
                ...state,
                list: false,
                target: false,
                allocate: false,
                detail: true,
                response: action.payload,
            };
        case GET_ASSIGNCP_LIST:
            return {
                ...state,
                list: false,
                target: false,
                allocate: false,
                detail: false,
                response: action.payload,
            };
        case GET_ASSIGNCP_LIST_ERROR:
            return {
                ...state,
                list: false,
                target: false,
                allocate: false,
                detail: false,
                response: action.payload,
            };
        case ASSIGNCP_SM:
            return {
                ...state,
                list: false,
                detail: false,
                target: true,
                allocate: true,
                response: action.payload,
            };
        case ASSIGNCP_SM_ERROR:
            return {
                ...state,
                list: false,
                target: false,
                allocate: false,
                detail: false,
                response: action.payload,
            };

        default:
            return state;
    }
}