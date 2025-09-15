import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { CP_CHECKING_LIST_ERROR, GET_CP_CHECKING_LIST, START_LOADING, STOP_LOADING } from "../types";

export const getCpCheckingList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCall("post", apiEndPoints.GET_CHECKING_APPOINTMENT_LIST, params);
      if (res.data.status === 200) {
        dispatch({
          type: GET_CP_CHECKING_LIST,
          payload: res.data,
        });
      } else {
        dispatch({
          type: CP_CHECKING_LIST_ERROR,
          payload: [],
        });
      }
    } catch (e) {
      dispatch({
        type: CP_CHECKING_LIST_ERROR,
        payload: [],
      });
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };