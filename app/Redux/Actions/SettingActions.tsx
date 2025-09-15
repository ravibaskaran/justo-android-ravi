import { handleApiError } from "../../components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import { REMOVE_USERDATA, START_LOADING, STOP_LOADING, UPDATE_PROFILE, UPDATE_PROFILE_ERROR, USERREGISTER, USERREGISTER_ERROR } from "../types";

export const updateUserSettingData =
  (userDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
    console.log("🚀 ~ file: SettingActions.tsx:8 ~ userDetail:", userDetail)

      const header = {
        "Content-Type": "multipart/form-data",
        "access-control-allow-origin": "*",
      };
      const res = await apiCall("post", apiEndPoints.EDITUSER, userDetail, header);
      console.log("🚀 ~ file: SettingActions.tsx:18 ~ res?.data:", res?.data)
      if (res?.data?.status == 200) {
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data,
        });
      } else {
        dispatch({
          type: UPDATE_PROFILE_ERROR,
          payload: res.data,
        });
      }
    } catch (e) {
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: console.log(e),
      });
    }
    finally {
      dispatch({ type: STOP_LOADING })
    }
  };

export const userRegister = (item: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const header = {
      "Content-Type": "multipart/form-data",
      "access-control-allow-origin": "*",
    };
    const res = await apiCall("post", apiEndPoints.REGISTERANDADDUSER, item, header);
    if (res.data.status == 200) {
      dispatch({
        type: USERREGISTER,
        payload: res.data
      })
    } else {
      handleApiError(res?.data)
      dispatch({
        type: USERREGISTER_ERROR,
        payload: []
      })
    }

  }
  catch (e) {
    dispatch({
      type: USERREGISTER_ERROR,
      payload: console.log('e', e),
    })
  }
  finally {
    dispatch({ type: STOP_LOADING });
  }
}
export const removeAuthUser = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_USERDATA,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: USERREGISTER_ERROR,
      payload: console.log(e),
    });
  }
}