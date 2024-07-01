import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_ASSIGNCP_LIST, GET_ASSIGNCP_LIST_ERROR, GET_USERS_LIST_FOR_SH, GET_USERS_LIST_FOR_SH_ERROR, START_LOADING, STOP_LOADING } from "../types";

export const getUsersListForSiteHead = (parma: any) => async (dispatch: any) => {
        dispatch({ type: START_LOADING })
        try {
            const res = await apiCall("post", apiEndPoints.GET_USERS_LIST_FOR_SH, parma);
            if (res?.data?.status === 200) {
                dispatch({
                    type: GET_USERS_LIST_FOR_SH,
                    payload: res.data
                })
            } else {
                handleApiError(res?.data)
                dispatch({
                    type: GET_USERS_LIST_FOR_SH_ERROR,
                    payload: [],
                })
            }
        }
        catch (e) {
            dispatch({
                type: GET_USERS_LIST_FOR_SH_ERROR,
                payload: console.log(e),
            })
        }
        finally {
            dispatch({ type: STOP_LOADING })
        }
    }