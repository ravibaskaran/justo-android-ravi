import { handleApiError } from "../../components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import {
    LEADERBOARD,
    LEADERBOARD_DETAIL,
    LEADERBOARD_DETAIL_ERROR,
    LEADERBOARD_ERROR,
    START_LOADING, STOP_LOADING
} from "../types";

export const learderBoardData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.GET_LEADERBOARD,
            params
        );
        if (res.data.status == 200) {
            dispatch({
                type: LEADERBOARD,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: LEADERBOARD_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: LEADERBOARD_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const learderBoardDetailData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.GET_LEADERBOARD_DETAIL,
            params,
        );
        if (res.data.status == 200) {
            dispatch({
                type: LEADERBOARD_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: LEADERBOARD_DETAIL_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: LEADERBOARD_DETAIL_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
// export const userStatusUpdater = () => async (dispatch: any) => {
//     try {
//         dispatch({
//             type: STATUS_UPDATER,
//             payload: null,
//         });
//     } catch (e) {
//         dispatch({
//             type: DASHBOARD_ERROR,
//             payload: console.log(e),
//         });
//     }
// };
