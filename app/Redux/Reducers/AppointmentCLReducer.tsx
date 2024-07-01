import { ADD_BOOKING, ADD_BOOKING_ERROR, ADD_DROPLOCATION, ADD_DROPLOCATION_ERROR, ALLOCATE_CM_APPOINTMENT, ALLOCATE_CM_APPOINTMENT_ERROR, BOOKING_STATUS_UPDATE, REMOVE_ADD_BOOKING } from "../types";

const initialState = {
    response: null,
};

export function appointmentCLReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_DROPLOCATION:
            return {
                ...state,
                response: action.payload,
            };
        case ADD_DROPLOCATION_ERROR:
            return {
                ...state,
                response: action.payload,
            };
        case ADD_BOOKING:
            return {
                ...state,
                response: action.payload,
            };
        case ADD_BOOKING_ERROR:
            return {
                ...state,
                response: action.payload,
            };
        case ALLOCATE_CM_APPOINTMENT:
            return {
                ...state,
                response: action.payload,
            };
        case ALLOCATE_CM_APPOINTMENT_ERROR:
            return {
                ...state,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function addBookingReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_BOOKING:
            return {
                ...state,
                detail: false,
                create: true,
                response: action.payload,
            };
        case BOOKING_STATUS_UPDATE:
            return {
                ...state,
                detail: false,
                create: true,
                response: action.payload,
            };
        case REMOVE_ADD_BOOKING:
            return {
                ...state,
                create: false,
                response: null,
            };
        default:
            return state;
    }
}