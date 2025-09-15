import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { ADD_USER_APPOINTMENT, ADD_USER_APPOINTMENT_ERROR, EDIT_USER_APPOINTMENT, EDIT_USER_APPOINTMENT_ERROR, GET_USER_APPOINTMENT_LIST, GET_USER_APPOINTMENT_LIST_ERROR, REMOVE_USER_APPOINTMENT, START_LOADING, STOP_LOADING, UPDATE_USERAPPOINTMENT_STATUS, UPDATE_USERAPPOINTMENT_STATUS_ERROR } from "../types";

export const addUserAppointment = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.CREATE_USER_APPOINTMENT, params);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_USER_APPOINTMENT,
                payload: res.data,
            });
        } else {
            dispatch({
                type: ADD_USER_APPOINTMENT_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: ADD_USER_APPOINTMENT_ERROR,
            payload: [],
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const editUserAppointment = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.EDIT_USER_APPOINTMENT, params);
        if (res.data.status == 200) {
            dispatch({
                type: EDIT_USER_APPOINTMENT,
                payload: res.data,
            });
        } else {
            dispatch({
                type: EDIT_USER_APPOINTMENT_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: EDIT_USER_APPOINTMENT_ERROR,
            payload: [],
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getUserAppointmentList = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_USER_APPOINTMENT_LIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: GET_USER_APPOINTMENT_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_USER_APPOINTMENT_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_USER_APPOINTMENT_LIST_ERROR,
            payload: [],
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const updateUserAppointmentStatus = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        // const header = {
        //     "Content-Type": "multipart/form-data",
        //     "access-control-allow-origin": "*",
        // };
        // const res = await apiCall("post", apiEndPoints.UPDATE_USER_APPOINTMENT_STATUS, params,header);
        const res = await apiCall("post", apiEndPoints.UPDATE_USER_APPOINTMENT_STATUS, params);
        if (res.data.status == 200) {
            dispatch({
                type: UPDATE_USERAPPOINTMENT_STATUS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: UPDATE_USERAPPOINTMENT_STATUS_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: UPDATE_USERAPPOINTMENT_STATUS_ERROR,
            payload: [],
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const RemoveAppointment = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_USER_APPOINTMENT,
            payload: [],
        });
    } catch (e) {
        dispatch({
            type: UPDATE_USERAPPOINTMENT_STATUS_ERROR,
            payload: [],
        });
    }
};
