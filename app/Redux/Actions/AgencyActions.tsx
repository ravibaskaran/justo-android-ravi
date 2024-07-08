import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
  ADD_TARGET_FOR_CP,
  ADD_TARGET_FOR_CP_ERROR,
  AGENCY_CREATE_FORM,
  AGENCY_CREATE_FORM_ERROR,
  AGENT_ERROR,
  AGENT_LIST,
  CHECK_EMAIL_MOBILE,
  CHECK_EMAIL_MOBILE_ERROR,
  CREATE_AGENCY,
  CREATE_AGENCY_ERROR,
  EDIT_AGENCY,
  GET_AGENCY_DETAIL,
  REMOVE_ADD_TARGET_FOR_CP,
  REMOVE_AGENCY,
  REMOVE_EMAIL_NUMBER_CHECK,
  START_LOADING,
  STOP_LOADING,
} from "../types";

export const getAllAgentList = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.AGENTLIST, params);
    if (res.data.status == 200) {
      dispatch({
        type: AGENT_LIST,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      dispatch({
        type: AGENT_LIST,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: AGENT_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const getAgencyDetail = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.GET_AGENT_DETAIL_, params);
    if (res.data.status === 200) {
      dispatch({
        type: GET_AGENCY_DETAIL,
        payload: res.data,
      });

      dispatch({
        type: AGENCY_CREATE_FORM,
        payload: res.data.data[0],
      });
    } else {
      handleApiError(res.data);
      return [];
    }
  } catch (e) {
    dispatch({
      type: AGENT_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const AddTargetForCpAction = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.ADD_TARGET_FOR_CP, params);
    if (res.data.status === 200) {
      dispatch({
        type: ADD_TARGET_FOR_CP,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      return [];
    }
  } catch (e) {
    dispatch({
      type: ADD_TARGET_FOR_CP_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const AgencyCreateForm = (item: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: AGENCY_CREATE_FORM,
      payload: item,
    });
  } catch (e) {
    dispatch({
      type: AGENCY_CREATE_FORM_ERROR,
      payload: console.log(e),
    });
  }
};

export const removeAddTarget = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_ADD_TARGET_FOR_CP,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: ADD_TARGET_FOR_CP_ERROR,
      payload: null,
    });
  }
};

export const AgencyCreateFormRemove = () => async (dispatch: any) => {
  try {
    dispatch({
      type: AGENCY_CREATE_FORM,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: AGENCY_CREATE_FORM_ERROR,
      payload: null,
    });
  }
};

export const createAgency = (item: any) => async (dispatch: any) => {
  console.log("item", item);
  dispatch({ type: START_LOADING });
  try {
    const header = {
      "Content-Type": "multipart/form-data",
      "access-control-allow-origin": "*",
    };
    const res = await apiCall(
      "post",
      apiEndPoints.CREATECHANNELPARTNER,
      item,
      header
    );
    console.log("res?.data?.status", res?.data);
    if (res?.data?.status === 200) {
      dispatch({
        type: CREATE_AGENCY,
        payload: res.data,
      });
    } else {
      handleApiError(res?.data);
      dispatch({
        type: CREATE_AGENCY_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    console.log("e: ", e);
    dispatch({
      type: CREATE_AGENCY_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const editAgent = (params: any) => async (dispatch: any) => {
  console.log("params: ", params);
  dispatch({ type: START_LOADING });
  try {
    const header = {
      "Content-Type": "multipart/form-data",
      "access-control-allow-origin": "*",
    };
    const res = await apiCall(
      "post",
      apiEndPoints.EDIT_CHANNELPARTNER,
      params,
      header
    );
    console.log("🚀 ~ file: AgencyActions.tsx:193 ~ res.data:", res.data);
    if (res.data.status == 200) {
      dispatch({
        type: EDIT_AGENCY,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      return [];
    }
  } catch (e) {
    dispatch({
      type: AGENT_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const checkEmailMobile = (item: any) => async (dispatch: any) => {
  console.log("item: ", item);
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.CHECKEMAILMOBILE, item);
    if (res.data.status === 200) {
      dispatch({
        type: CHECK_EMAIL_MOBILE,
        payload: res.data,
        check_type: item.mobile
          ? "mobile"
          : item.email
          ? "email"
          : item?.rera_certificate_no
          ? "rera_certificate_no"
          : "",
      });
    } else if (res.data.status === 201) {
      dispatch({
        type: CHECK_EMAIL_MOBILE,
        payload: res.data,
        check_type: item.mobile
          ? "mobile"
          : item.email
          ? "email"
          : item?.rera_certificate_no
          ? "rera_certificate_no"
          : "",
      });
    } else {
      handleApiError(res?.data);
      dispatch({
        type: CHECK_EMAIL_MOBILE_ERROR,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: CHECK_EMAIL_MOBILE_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const emailCheckRemove = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_EMAIL_NUMBER_CHECK,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: CHECK_EMAIL_MOBILE_ERROR,
      payload: console.log(e),
    });
  }
};
export const removeAgency = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_AGENCY,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: AGENT_ERROR,
      payload: console.log(e),
    });
  }
};
