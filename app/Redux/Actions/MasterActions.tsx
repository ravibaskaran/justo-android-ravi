import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_APPOINTMENT_CHECKIN, GET_APPOINTMENT_CHECKIN_ERROR, GET_CITY_LIST, GET_CITY_LIST_ERROR, GET_ROLE_LIST, GET_ROLE_LIST_ERROR, GET_SOURCING_MANAGER, GET_SOURCING_MANAGER_ERROR, MASTER_ERROR, MASTER_LIST, PROPERTY_CONFIGURATION, PROPERTY_CONFIGURATION_ERROR, REMOVE_MASTERS, START_LOADING, STOP_LOADING } from "../types";

export const getCityList = (item: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_CITY_LIST, item);
        if (res.data.status == 200) {
            dispatch({
                type: GET_CITY_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_CITY_LIST_ERROR,
                payload: []
            })
        }
    }
    catch (e) {
        dispatch({
            type: GET_CITY_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getRolesList = (item: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_ROLE_LIST, item);
        if (res.data.status == 200) {
            dispatch({
                type: GET_ROLE_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_ROLE_LIST_ERROR,
                payload: []
            })
        }

    }
    catch (e) {
        dispatch({
            type: GET_ROLE_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getAllMaster = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ADDMASTERLIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: MASTER_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: MASTER_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: MASTER_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getPropertyConfig = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_PROPERTYCONFIGURATION, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_CONFIGURATION,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_CONFIGURATION_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_CONFIGURATION_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getAllSourcingManager = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_SOURCINGMANAGER, params);
        if (res.data.status == 200) {
            dispatch({
                type: GET_SOURCING_MANAGER,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_SOURCING_MANAGER_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_SOURCING_MANAGER_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const cpAppointmentCheckIn = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.CHECKIN_APPOINTMENT, params);
        if (res.data.status == 200) {
            dispatch({
                type: GET_APPOINTMENT_CHECKIN,
                payload: res.data,
            });
        } else {
            // handleApiError(res?.data)
            dispatch({
                type: GET_APPOINTMENT_CHECKIN_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: GET_APPOINTMENT_CHECKIN_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const removeMasters = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_MASTERS,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: GET_APPOINTMENT_CHECKIN_ERROR,
            payload: console.log(e),
        });
    }
};
