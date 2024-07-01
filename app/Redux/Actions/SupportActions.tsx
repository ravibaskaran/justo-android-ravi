import { apiCall } from "app/components/utilities/httpClient";
import { ADD_NEW_TICKET, ADD_NEW_TICKET_ERROR, ASSIGN_ESCALATE_TICKET, ASSIGN_ESCALATE_TICKET_ERROR, EDIT_TICKET, EDIT_TICKET_ERROR, ESCALATE_USER_LIST, REMOVE_TICKET, START_LOADING, STOP_LOADING, TICKET_DEATILS, TICKET_DEATILS_ERROR, TICKET_LIST, TICKET_LIST_ERROR, UPDATE_TICKET_STATUS, UPDATE_TICKET_STATUS_ERROR } from "../types"
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

export const AddNewTicket = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const header = {
            "Content-Type": "multipart/form-data",
            "access-control-allow-origin": "*",
        };
        const res = await apiCall("post", apiEndPoints.ADD_TICKET, params, header);
        if (res?.data?.status === 200) {
            dispatch({
                type: ADD_NEW_TICKET,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: ADD_NEW_TICKET_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: ADD_NEW_TICKET_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const EditTicket = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const header = {
            "Content-Type": "multipart/form-data",
            "access-control-allow-origin": "*",
        };
        const res = await apiCall("post", apiEndPoints.EDIT_TICKET, params, header);
        if (res?.data?.status === 200) {
            dispatch({
                type: EDIT_TICKET,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: EDIT_TICKET_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: EDIT_TICKET_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getTicketList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.TICKET_LIST, params);
        if (res?.data?.status === 200) {
            dispatch({
                type: TICKET_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: TICKET_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: TICKET_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getTicketDetails = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.TICKET_DETAILS, params);
        if (res?.data?.status === 200) {
            dispatch({
                type: TICKET_DEATILS,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: TICKET_DEATILS_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: TICKET_DEATILS_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const updateTicketStatus = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.TICKET_STATUS_UPDATE, params);
        if (res?.data?.status === 200) {
            dispatch({
                type: UPDATE_TICKET_STATUS,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: UPDATE_TICKET_STATUS_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: UPDATE_TICKET_STATUS_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const getEscalateUsersList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_SUPPORT_USER_LIST, params);
        if (res?.data?.status === 200) {
            dispatch({
                type: ESCALATE_USER_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: TICKET_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: TICKET_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const escalateReqTicket = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ESCALATE_REQ_TICKET, params);
        if (res?.data?.status === 200) {
            dispatch({
                type: ASSIGN_ESCALATE_TICKET,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: ASSIGN_ESCALATE_TICKET_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: ASSIGN_ESCALATE_TICKET_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const RemoveTicket = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_TICKET,
            payload: []
        })

    } catch (error) {
        dispatch({
            type: REMOVE_TICKET,
            payload: []
        })
    }
}