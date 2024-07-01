import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_ERROR,
  GET_NOTIFICATION_LIST,
  NOTIFICATION_ERROR,
  NOTIFICATION_STATUS,
  REMOVE_NOTIFICATION,
  START_LOADING,
  STOP_LOADING,
} from "../types";

export const getNotificationList = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.NOTIFICATION_LIST, params);
    if (res.data.status == 200) {
      dispatch({
        type: GET_NOTIFICATION_LIST,
        payload: res.data,
      });
      dispatch({
        type: NOTIFICATION_STATUS,
        payload: {notification_count: 0},
      });
    } else {
      dispatch({
        type: NOTIFICATION_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const deleteNotification = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.DELETE_NOTIFICATION, params);
    if (res.data.status == 200 || res.data.status == 201) {
      dispatch({
        type: DELETE_NOTIFICATION,
        payload: res.data,
      });
    } else {
      dispatch({
        type: DELETE_NOTIFICATION_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: DELETE_NOTIFICATION_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const notificationRemove = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_NOTIFICATION,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: console.log(e),
    });
  }
};
