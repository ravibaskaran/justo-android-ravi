import { handleApiError } from "../../components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { START_LOADING, STOP_LOADING, SUPPORT_FORUM_DETAIL, SUPPORT_FORUM_DETAIL_ERROR, SUPPORT_FORUM_LIST, SUPPORT_FORUM_LIST_ERROR } from "../types";

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
