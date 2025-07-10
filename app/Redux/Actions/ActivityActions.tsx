import apiEndPoints from "app/components/utilities/apiEndPoints";
import { CLOSE_FOLLOWUP, CLOSE_FOLLOWUP_ERROR, GET_SCHEDULED_ACTIVITY, REMOVE_CLOSE_FOLLOWUP_DATA, SCHEDULED_ACTIVITY_ERROR, START_LOADING, STOP_LOADING } from "../types";
import { apiCall } from "app/components/utilities/httpClient";

export const GetScheduledActivityList = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  console.log(params);
  
  try {
    const res = await apiCall("post", apiEndPoints.SCHEDULED_ACTIVITY, params);
    if (res.data.status == 200) {
      dispatch({
        type: GET_SCHEDULED_ACTIVITY,
        payload: res.data,
      });
    } else {
      dispatch({
        type: SCHEDULED_ACTIVITY_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: SCHEDULED_ACTIVITY_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};



export const closeFollowUp = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.CLOSE_ACTIVITY, params);
    if (res.data.status == 200) {
      dispatch({
        type: CLOSE_FOLLOWUP,
        payload: res.data,
      });
    } else {
      dispatch({
        type: CLOSE_FOLLOWUP_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: CLOSE_FOLLOWUP_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};

export const closefollowupRemove = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_CLOSE_FOLLOWUP_DATA,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: CLOSE_FOLLOWUP_ERROR,
      payload: console.log(e),
    });
  }
};