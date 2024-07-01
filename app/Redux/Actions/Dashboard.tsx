import {
    START_LOADING, STOP_LOADING, DASHBOARD_SOURCING_ERROR,
    GET_DASHBOARD_SOURCING, DASHBOARD_UPDATE_ERROR, STATUS_UPDATE_DATA,
    USER_STATUS_UPDATE, USER_STATUS_UPDATE_ERROR, GET_DASHBOARD_CLOSING,
    DASHBOARD_CLOSING_ERROR, DASHBOARD_POSTSALES_ERROR, GET_DASHBOARD_POSTSALES, GET_DASHBOARD_RECEPTIONIST, DASHBOARD_RECEPTIONIST_ERROR, GET_DASHBOARD_SITE_HEAD, GET_DASHBOARD_SITE_HEAD_ERROR
} from "../types";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

export const dashboardSourcingData = (userDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.DASHBOARD_SOURCING,
            {}
        );
        if (res.data.status == 200) {
            dispatch({
                type: GET_DASHBOARD_SOURCING,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: DASHBOARD_SOURCING_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: DASHBOARD_SOURCING_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const dashboardClosingData = (userDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.DASHBOARD_CLOSING,
            {}
        );
        if (res.data.status == 200) {
            dispatch({
                type: GET_DASHBOARD_CLOSING,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: DASHBOARD_CLOSING_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: DASHBOARD_CLOSING_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const dashboardPostSaleData = (userDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.DASHBOARD_POSTSALES,
            {}
        );
        if (res.data.status == 200) {
            dispatch({
                type: GET_DASHBOARD_POSTSALES,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: DASHBOARD_POSTSALES_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: DASHBOARD_POSTSALES_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const dashboardReceptionistData = (userDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.DASHBOARD_RECEPTIONIST,
            {}
        );
        if (res.data.status == 200) {
            dispatch({
                type: GET_DASHBOARD_RECEPTIONIST,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: DASHBOARD_RECEPTIONIST_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: DASHBOARD_RECEPTIONIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const dashboardSiteHeadData = (userDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.DASHBOARD_SITE_HEAD,
            {}
        );

        if (res.data.status == 200) {
            dispatch({
                type: GET_DASHBOARD_SITE_HEAD,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_DASHBOARD_SITE_HEAD_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: GET_DASHBOARD_SITE_HEAD_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const userStatusUpdateData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.UPDATE_USER_STATUS,
            params,
        );
        if (res.data.status == 200) {
            dispatch({
                type: USER_STATUS_UPDATE,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: USER_STATUS_UPDATE_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: DASHBOARD_UPDATE_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const userStatusUpdater = () => async (dispatch: any) => {
    try {
        dispatch({
            type: STATUS_UPDATE_DATA,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: DASHBOARD_UPDATE_ERROR,
            payload: console.log(e),
        });
    }
};
