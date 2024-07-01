import { GET_DASHBOARD_SOURCING, DASHBOARD_SOURCING_ERROR, USER_STATUS_UPDATE, STATUS_UPDATE_DATA, GET_DASHBOARD_CLOSING, DASHBOARD_CLOSING_ERROR, GET_DASHBOARD_POSTSALES, DASHBOARD_POSTSALES_ERROR, GET_DASHBOARD_RECEPTIONIST, DASHBOARD_RECEPTIONIST_ERROR, GET_DASHBOARD_SITE_HEAD, GET_DASHBOARD_SITE_HEAD_ERROR } from "../types";
const initialStateForm = {
    response: null,
    update: false,
};

export function dashboardReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case GET_DASHBOARD_SOURCING:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case DASHBOARD_SOURCING_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        case GET_DASHBOARD_CLOSING:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case DASHBOARD_CLOSING_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        case GET_DASHBOARD_POSTSALES:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case DASHBOARD_POSTSALES_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        case GET_DASHBOARD_RECEPTIONIST:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case GET_DASHBOARD_SITE_HEAD:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case GET_DASHBOARD_SITE_HEAD_ERROR:
            return {
                ...state,
                data: false,
                response: action.payload,
            };
        case DASHBOARD_RECEPTIONIST_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}

export function statusUpdateReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case USER_STATUS_UPDATE:
            return {// get response
                ...state,
                data: true,
                response: action.payload,
            };
        case STATUS_UPDATE_DATA:
            return {// remove response
                ...state,
                data: false,
                response: action.payload,
            };
        default:
            return state;
    }
}