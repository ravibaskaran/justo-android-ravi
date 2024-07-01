import { ADD_NEW_TICKET, ADD_NEW_TICKET_ERROR, ASSIGN_ESCALATE_TICKET, EDIT_TICKET, EDIT_TICKET_ERROR, ESCALATE_USER_LIST, REMOVE_TICKET, TICKET_DEATILS, TICKET_DEATILS_ERROR, TICKET_LIST, TICKET_LIST_ERROR, UPDATE_TICKET_STATUS, UPDATE_TICKET_STATUS_ERROR } from "../types";

const initialStateADD = {
    response: null,
    list: false,
    detail: false
};
const initialState = {
    response: null,
    list: false,
    detail: false
};

export function SupportAddReducer(state = initialStateADD, action: any) {
    switch (action.type) {
        case ADD_NEW_TICKET:
            return {
                ...state,
                response: action.payload
            }
        case ADD_NEW_TICKET_ERROR:
            return {
                ...state,
                response: action.payload
            }
        case EDIT_TICKET:
            return {
                ...state,
                response: action.payload
            }
        case EDIT_TICKET_ERROR:
            return {
                ...state,
                response: action.payload
            }
        case UPDATE_TICKET_STATUS:
            return {
                ...state,
                response: action.payload
            }
        case UPDATE_TICKET_STATUS_ERROR:
            return {
                ...state,
                response: action.payload
            }
        case ASSIGN_ESCALATE_TICKET:
            return {
                ...state,
                response: action.payload
            }
        case REMOVE_TICKET:
            return {
                ...state,
                response: action.payload
            }

        default: return state
    }
}
export function SupportReducer(state = initialState, action: any) {
    switch (action.type) {
        case TICKET_LIST:
            return {
                ...state,
                response: action.payload,
                list: true,
                detail: false
            }
        case TICKET_LIST_ERROR:
            return {
                ...state,
                response: action.payload,
                list: true,
                detail: false
            }
        case TICKET_DEATILS:
            return {
                ...state,
                response: action.payload,
                list: false,
                detail: true
            }
        case TICKET_DEATILS_ERROR:
            return {
                ...state,
                response: action.payload,
                list: false,
                detail: true
            }
        case ESCALATE_USER_LIST:
            return {
                ...state,
                response: action.payload,
                list: true,
                detail: false
            }

        default: return state
    }
}
