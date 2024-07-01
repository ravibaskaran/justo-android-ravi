import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_RECOVERY_LIST, GET_RECOVERY_LIST_ERROR, START_LOADING, STOP_LOADING } from "../types";

export const getRecoveryList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_RECOVERY_LIST, params);
        if (res?.data?.status === 200) {
            dispatch({
                type: GET_RECOVERY_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_RECOVERY_LIST,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: GET_RECOVERY_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}