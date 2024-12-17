import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_PROJECT_REPORT_DETAILS, GET_PROJECT_REPORT_ERROR, START_LOADING, STOP_LOADING } from "../types";

export const GetProjectDetailsReport = (item: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.GET_PROJECT_DETAILS_REPORT, item);
    if (res?.data?.status == 200) {
      dispatch({
        type: GET_PROJECT_REPORT_DETAILS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PROJECT_REPORT_ERROR,
        payload: res.data,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_PROJECT_REPORT_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};