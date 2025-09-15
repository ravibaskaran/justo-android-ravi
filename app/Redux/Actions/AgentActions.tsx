import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { GET_AGENT_DETAIL, AGENT_ERROR, AGENT_LIST, AGENT_STATUSUPDATE, ADD_AGENT, ADD_AGENT_FORM, EDIT_AGENT, STOP_LOADING, START_LOADING, REMOVE_AGENT } from "../types";
import { handleApiError } from "../../components/ErrorMessage/HandleApiErrors";

export const addAgent = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const header = { "Content-Type": "multipart/form-data", "access-control-allow-origin": "*" }
        const res = await apiCall("post", apiEndPoints.ADD_AGENT_, params, header);
        console.log("🚀 ~ file: AgentActions.tsx:12 ~ res.data:", res.data)
        if (res.data.status == 200) {
            dispatch({
                type: ADD_AGENT,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
};
export const addAgentForm = (params: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: ADD_AGENT_FORM,
            payload: params,
        });
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};

export const getAgentDetail = (params: any) => async (dispatch: any) => {
dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.GETUSERDETAIL, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_AGENT_DETAIL,
                payload: res.data,
            });

            dispatch({
                type: ADD_AGENT_FORM,
                payload: res.data.data[0],
            });

        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
};

export const editAgent = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const header = { "Content-Type": "multipart/form-data", "access-control-allow-origin": "*" }
        const res = await apiCall("post", apiEndPoints.EDIT_AGENT_, params, header);
        console.log("🚀  file: AgentActions.tsx:86  editAgent ~ res:", res?.data , params)
        if (res.data.status == 200) {
            dispatch({
                type: EDIT_AGENT,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const addAgentRemove = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_AGENT,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};