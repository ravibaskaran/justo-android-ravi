import { handleApiError } from "../../components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { ASSIGNCP_SM, ASSIGNCP_SM_ERROR, GET_ASSIGNCP_LIST, GET_ASSIGNCP_LIST_ERROR, GET_SOURCINGMANAGER_DETAIL, GET_SOURCINGMANAGER_DETAIL_ERROR, GET_SOURCINGMANAGER_LIST, GET_SOURCINGMANAGER_LIST_ERROR, REMOVE_UPDATE_ASSIGN_CP, START_LOADING, STOP_LOADING, UPDATE_ASSIGN_CP_STATUS, UPDATE_ASSIGN_CP_STATUS_ERR } from "../types";

export const getSourcingManagerList = (parmas: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_SOURCING_MANAGER_LIST, parmas);
        if (res?.data?.status === 200) {
            dispatch({
                type: GET_SOURCINGMANAGER_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_SOURCINGMANAGER_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: GET_SOURCINGMANAGER_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const getSourcingHeadSMList = (parmas: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_SOURCING_HEAD_SM_LIST, parmas);
        if (res?.data?.status === 200) {
            dispatch({
                type: GET_SOURCINGMANAGER_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_SOURCINGMANAGER_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: GET_SOURCINGMANAGER_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const getSourcingManagerDetail = (parma: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_SOURCING_MANAGER_DETAIL, parma);
        if (res?.data?.status === 200) {
            dispatch({
                type: GET_SOURCINGMANAGER_DETAIL,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_SOURCINGMANAGER_DETAIL_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: GET_SOURCINGMANAGER_DETAIL_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getAssignCPList = (parma: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_ASSIGNCP_LIST, parma);
        if (res?.data?.status === 200) {
            dispatch({
                type: GET_ASSIGNCP_LIST,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_ASSIGNCP_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: GET_ASSIGNCP_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const assignCPSM = (parma: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING }) 
    try {
        const res = await apiCall("post", apiEndPoints.ASSIGNCP_SM, parma);
        if (res?.data?.status === 200) {
            dispatch({
                type: ASSIGNCP_SM,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: ASSIGNCP_SM_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: ASSIGNCP_SM_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const updateAssignCP = (parma: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.STATUS_UPDATE_ASSIGN_CP, parma);
        if (res?.data?.status === 200) {
            dispatch({
                type: UPDATE_ASSIGN_CP_STATUS,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: UPDATE_ASSIGN_CP_STATUS_ERR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: ASSIGNCP_SM_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const removeAssignCpStatus = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_UPDATE_ASSIGN_CP,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: UPDATE_ASSIGN_CP_STATUS_ERR,
            payload: console.log(e),
        });
    }
}