import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_CP_ACTIVE_LEAD, GET_CP_ACTIVE_LEAD_ERROR, REMOVE_TRANSFER_VISIT_DATA, START_LOADING, STOP_LOADING, TRANSFER_VISIT_DATA, TRANSFER_VISIT_ERROR } from "../types";

export const transferVisitList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.TRANSFER_VISIT, params);
        if (res.data.status == 200) {
            dispatch({
                type: TRANSFER_VISIT_DATA,
                payload: res.data,
            });
        } else {
            dispatch({
                type: TRANSFER_VISIT_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: TRANSFER_VISIT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const removeTransferVisit = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_TRANSFER_VISIT_DATA,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: TRANSFER_VISIT_ERROR,
            payload: console.log(e),
        });
    }
}

export const getCpActiveLead = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_CP_ACTIVE_LEAD, params);
        if (res.data.status == 200) {
            dispatch({
                type: GET_CP_ACTIVE_LEAD,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_CP_ACTIVE_LEAD_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_CP_ACTIVE_LEAD_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};