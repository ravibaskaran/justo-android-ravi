import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
    GET_CLOSINGMANAGER_LIST, GET_CLOSINGMANAGER_LIST_ERROR,
    GET_CLOSINGMANAGER_DETAIL, GET_CLOSINGMANAGER_DETAIL_ERROR,
    STOP_LOADING, START_LOADING
} from "../types";

export const getClosingManagerList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.GET_CLOSINGMANAGER, {});
        if (res.data.status == 200) {
            dispatch({
                type: GET_CLOSINGMANAGER_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_CLOSINGMANAGER_LIST_ERROR,
                payload: console.log(res),
            });
        }
    } catch (e) {
        dispatch({
            type: GET_CLOSINGMANAGER_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
};

export const getClosingDetail = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.GETCMDETAIL, params);
        console.log('res: ', res?.data);
        if (res.data.status === 200) {
            dispatch({
                type: GET_CLOSINGMANAGER_DETAIL,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_CLOSINGMANAGER_DETAIL_ERROR,
                payload: res.data.data[0],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_CLOSINGMANAGER_DETAIL_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
};