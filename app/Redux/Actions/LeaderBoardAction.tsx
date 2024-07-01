import {
    START_LOADING, STOP_LOADING, LEADERBOARD_ERROR, LEADERBOARD,
    LEADERBOARD_DETAIL_ERROR, LEADERBOARD_DETAIL
} from "../types";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

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
