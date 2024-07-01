import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { BOOKINGREGISTER_DETAIL, BOOKINGREGISTER_DETAIL_ERROR, BOOKING_CANCEL, BOOKING_CANCEL_ERROR, BOOKING_DETAIL, BOOKING_DETAIL_ERROR, BOOKING_LIST, BOOKING_LIST_ERROR, BOOKING_STATUS_UPDATE, BOOKING_STATUS_UPDATE_ERROR, REGISTER_BOOKING, REGISTER_BOOKING_ERROR, REGISTER_BOOKING_LIST, REGISTER_BOOKING_LIST_ERROR, REMOVE_BOOKING, START_LOADING, STOP_LOADING } from "../types";

export const getBookingList = (params: any) => async (dispatch: any) => {
    console.log('params======>>>>>>.: ', params);
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_BOOKINGLIST, params);
        if (res?.data?.status == 200) {
            dispatch({
                type: BOOKING_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: BOOKING_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: BOOKING_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getRegisteredList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_REGISTERLIST, params);
        if (res?.data?.status == 200) {
            dispatch({
                type: REGISTER_BOOKING_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: REGISTER_BOOKING_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: REGISTER_BOOKING_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getBookingDetail = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_BOOKINGDETAIL, params);
        if (res.data.status == 200) {
            dispatch({
                type: BOOKING_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: BOOKING_DETAIL_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: BOOKING_DETAIL_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getBookingRegisterDetail = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_BOOKINGREGISTERDETAIL, params);
        if (res.data.status == 200) {
            dispatch({
                type: BOOKINGREGISTER_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: BOOKINGREGISTER_DETAIL_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: BOOKINGREGISTER_DETAIL_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const updateBookingDetailStatus = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const header = {
            "Content-Type": "multipart/form-data",
            "access-control-allow-origin": "*",
        };
        const res = await apiCall("post", apiEndPoints.UPDATE_BOOKINGSTATUS, params, header);
        if (res.data.status == 200) {
            dispatch({
                type: BOOKING_STATUS_UPDATE,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: BOOKING_STATUS_UPDATE_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: BOOKING_STATUS_UPDATE_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const cancelBooking = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.CANCEL_BOOKING, params);
        if (res.data.status == 200) {
            dispatch({
                type: BOOKING_CANCEL,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: BOOKING_CANCEL_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: BOOKING_CANCEL_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addRegistration = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const header = {
            "Content-Type": "multipart/form-data",
            "access-control-allow-origin": "*",
        };
        const res = await apiCall("post", apiEndPoints.REGISTER_BOOKING, params, header);
        console.log('res:REGISTER_BOOKING ', res);
        if (res.data.status == 200) {
            dispatch({
                type: REGISTER_BOOKING,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: REGISTER_BOOKING_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: REGISTER_BOOKING_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const removeBooking = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_BOOKING,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: BOOKING_CANCEL_ERROR,
            payload: console.log(e),
        });
    }
}
