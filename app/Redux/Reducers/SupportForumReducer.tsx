import { STATUS_UPDATER, SUPPORT_FORUM_DETAIL, SUPPORT_FORUM_DETAIL_ERROR, SUPPORT_FORUM_LIST, SUPPORT_FORUM_LIST_ERROR, UPDATE_SUPPORTFORUM_REMOVE, UPDATE_SUPPORT_FORUM, USER_STATUS_UPDATE } from "../types";
const initialStateForm = {
    response: null,
    update: false,
};

export function supportForumReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case SUPPORT_FORUM_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case SUPPORT_FORUM_LIST_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        case SUPPORT_FORUM_DETAIL:
            return {
                ...state,
                detail: true,
                response: action.payload,
            };
        case SUPPORT_FORUM_DETAIL_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}

export function supportForumUpdateReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case UPDATE_SUPPORT_FORUM:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case UPDATE_SUPPORTFORUM_REMOVE:
            return {
                ...state,
                data: false,
                response: action.payload,
            };
        default:
            return state;
    }
}