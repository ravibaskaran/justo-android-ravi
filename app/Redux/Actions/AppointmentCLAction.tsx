import { handleApiError } from "../../components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { START_LOADING, STOP_LOADING, ADD_DROPLOCATION_ERROR, ADD_DROPLOCATION, ADD_BOOKING, ADD_BOOKING_ERROR, ALLOCATE_CM_APPOINTMENT, ALLOCATE_CM_APPOINTMENT_ERROR, REMOVE_ADD_BOOKING } from "../types";

export const AddDropLocation = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ADD_DROPLOCATION, params);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_DROPLOCATION,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: ADD_DROPLOCATION_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: ADD_DROPLOCATION_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const AddBooking = (params: any) => async (dispatch: any) => {
    console.log('params', params)
    dispatch({ type: START_LOADING })
    try {
        const header = {
            "Content-Type": "multipart/form-data", "access-control-allow-origin": "*",
        };
        const res = await apiCall("post", apiEndPoints.ADD_BOOKING, params, header);
        console.log("🚀 ~ file: AppointmentCLAction.tsx:41 ~ res.data:", res.data)
        if (res.data.status == 200) {
            dispatch({
                type: ADD_BOOKING,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: ADD_BOOKING_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: ADD_BOOKING_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const AllocateCM = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ALLOCATE_CM, params);
        if (res.data.status == 200) {
            dispatch({
                type: ALLOCATE_CM_APPOINTMENT,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: ALLOCATE_CM_APPOINTMENT_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: ALLOCATE_CM_APPOINTMENT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const removeAddBookingData = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_ADD_BOOKING,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: ADD_BOOKING_ERROR,
            payload: console.log(e),
        });
    }
}
