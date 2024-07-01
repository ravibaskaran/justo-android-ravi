import { FIREBASE_UPDATE, FIREBASE_UPDATE_ERROR } from "../types";

const initialStateForm = {
    response: null,
    update: false,
};

export function firebaseReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case FIREBASE_UPDATE:
            return {
                ...state,
                update: true,
                response: action.payload,
            };
        case FIREBASE_UPDATE_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}