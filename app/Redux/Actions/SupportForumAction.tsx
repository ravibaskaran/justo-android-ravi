import { START_LOADING, STOP_LOADING, USER_STATUS_UPDATE, USER_STATUS_UPDATE_ERROR, STATUS_UPDATER, SUPPORT_FORUM_LIST_ERROR, SUPPORT_FORUM_LIST, UPDATE_SUPPORT_FORUM, UPDATE_SUPPORT_FORUM_ERR, UPDATE_SUPPORTFORUM_REMOVE, SUPPORT_FORUM_DETAIL, SUPPORT_FORUM_DETAIL_ERROR } from "../types";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

export const supportForumListData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.GET_SUPPORT_FORUM_LIST,
            params
            );
        if (res.data.status == 200) {
            dispatch({
                type: SUPPORT_FORUM_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: SUPPORT_FORUM_LIST_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: SUPPORT_FORUM_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const supportForumDetailData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.GET_SUPPORT_FORUM_DETAIL,
            params
            );
            if (res.data.status == 200) {
            dispatch({
                type: SUPPORT_FORUM_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: SUPPORT_FORUM_DETAIL_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: SUPPORT_FORUM_DETAIL_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

// export const supportForumStatusUpdate = (params: any) => async (dispatch: any) => {
//     dispatch({ type: START_LOADING })
//     try {
//         const res = await apiCall(
//             "post",
//             apiEndPoints.UPDATE_SUPPORTFORUM,
//             params,
//         );
//         if (res.data.status == 200) {
//             dispatch({
//                 type: UPDATE_SUPPORT_FORUM,
//                 payload: res.data,
//             });
//         } else {
//             handleApiError(res?.data)
//             dispatch({
//                 type: UPDATE_SUPPORT_FORUM_ERR,
//                 payload: res.data,
//             });
//         }
//     } catch (e) {
//         dispatch({
//             type: UPDATE_SUPPORT_FORUM_ERR,
//             payload: console.log(e),
//         });
//     }
//     finally {
//         dispatch({ type: STOP_LOADING })
//     }
// };
// export const userStatusUpdater = () => async (dispatch: any) => {
//     try {
//         dispatch({
//             type: UPDATE_SUPPORTFORUM_REMOVE,
//             payload: null,
//         });
//     } catch (e) {
//         dispatch({
//             type: UPDATE_SUPPORT_FORUM_ERR,
//             payload: console.log(e),
//         });
//     }
// };
