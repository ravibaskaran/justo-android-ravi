import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_PICKUP_LIST, GET_PICKUP_LIST_ERROR, START_LOADING, STOP_LOADING, UPDATE_PICKUP_STATUS, UPDATE_PICKUP_STATUS_ERROR } from "../types";

export const getAllPickupList = (params: any) => async (dispatch: any) => {
console.log('params: ', params);
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.PICKUP_LIST, params);
        if (res?.data?.status == 200) {
            dispatch({
                type: GET_PICKUP_LIST,
                payload: res.data,
            });
        } else {
            // handleApiError(res.data)
            dispatch({
                type: GET_PICKUP_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_PICKUP_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const updatePickupStatusAction = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.UPDATE_PICKUP_LIST, params);
        if (res?.data?.status == 200) {
            dispatch({
                type: UPDATE_PICKUP_STATUS,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: UPDATE_PICKUP_STATUS_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: UPDATE_PICKUP_STATUS_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};