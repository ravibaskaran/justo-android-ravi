import {
    LEADERBOARD, LEADERBOARD_DETAIL, LEADERBOARD_DETAIL_ERROR,
    LEADERBOARD_ERROR,
} from "../types";
const initialStateForm = {
    response: null,
    update: false,
};

export function leaderBoardReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case LEADERBOARD:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case LEADERBOARD_ERROR:
            return {
                ...state,
                list: false,
                response: action.payload,
            };
        case LEADERBOARD_DETAIL:
            return {
                ...state,
                detail: true,
                response: action.payload,
            };
        case LEADERBOARD_DETAIL_ERROR:
            return {
                ...state,
                detail: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
