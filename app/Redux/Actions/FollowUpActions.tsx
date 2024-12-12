import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
  ADD_FOLLOWUP,
  ADD_FOLLOWUP_ERROR,
  FOLLOWUP_DETAILS,
  FOLLOWUP_DETAILS_ERROR,
  FOLLOWUP_ERROR,
  GET_FOLLOWUP_LIST,
  REMOVE_FOLLOWUP_DATA,
  START_LOADING,
  STOP_LOADING,
  UPDATE_FOLLOWUP,
  UPDATE_FOLLOWUP_ERROR,
} from "../types";

export const getAllFollowUpList = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  console.log(params);
  
  try {
    const res = await apiCall("post", apiEndPoints.GET_FOLLOWUP_LIST, params);
    if (res.data.status == 200) {
      dispatch({
        type: GET_FOLLOWUP_LIST,
        payload: res.data,
      });
    } else {
      dispatch({
        type: FOLLOWUP_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: FOLLOWUP_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const getAllFollowUpDetails = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall(
      "post",
      apiEndPoints.GET_FOLLOWUP_DETAILS,
      params
    );
    if (res.data.status == 200) {
      dispatch({
        type: FOLLOWUP_DETAILS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: FOLLOWUP_DETAILS_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: FOLLOWUP_DETAILS_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const updateFollowUp = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.UPDATE_FOLLOWUP, params);
    if (res.data.status == 200) {
      dispatch({
        type: UPDATE_FOLLOWUP,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_FOLLOWUP_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: UPDATE_FOLLOWUP_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const addFollowUp = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.ADD_FOLLOWUP, params);
    if (res.data.status == 200) {
      dispatch({
        type: ADD_FOLLOWUP,
        payload: res.data,
      });
    } else {
      dispatch({
        type: ADD_FOLLOWUP_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: ADD_FOLLOWUP_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const allfollowupRemove = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_FOLLOWUP_DATA,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: FOLLOWUP_ERROR,
      payload: console.log(e),
    });
  }
};
