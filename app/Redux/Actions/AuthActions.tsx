import { USER_LOGIN, USER_LOGOUT, LOGIN_ERROR, TOKEN_GENRATE, FORGOT_PASSWORD, FORGOT_ERROR, OTPVERIFY, OTPVERIFY_ERROR, UPDATEPASSWORD, UPDATEPASSWORD_ERROR, RESENDOTP, RESENDOTP_ERROR, CHANGEPASSWORD, CHANGEPASSWORD_ERROR, USERREGISTER, USERREGISTER_ERROR, START_LOADING, STOP_LOADING, REMOVE_USERDATA, GET_USER_DETAILS, GET_USER_DETAILS_ERROR } from '../types'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndPoints from '../../components/utilities/apiEndPoints';
import { apiCall } from '../../components/utilities/httpClient';
import { handleApiError } from 'app/components/ErrorMessage/HandleApiErrors';
import { Isios } from 'app/components/utilities/constant';
const initialState = {
    response: null,
    detail: false,
    create: false,
};

export const userLogin = (loginDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.LOGIN, loginDetail);
        if (res.data.status === 200) {
            await AsyncStorage.setItem("AuthToken", res?.data?.token);
            await AsyncStorage.setItem("userData", JSON.stringify(res?.data?.data));
            dispatch({
                type: USER_LOGIN,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const forgotemailverify = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.FORGOTPASSWORD, params);
        if (res.data.status === 200) {
            // Isios ? await AsyncStorage.setItem("AuthToken", res?.data?.token) : null;
            dispatch({
                type: FORGOT_PASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: FORGOT_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: FORGOT_ERROR,
            payload: e,
        })
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
}

export const otpVerify = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.OTPVERIFY, params);
        if (res.data.status === 200) {
            // Isios && await AsyncStorage.setItem("AuthToken", res?.data?.token);
            dispatch({
                type: OTPVERIFY,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: OTPVERIFY_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: OTPVERIFY_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
}
export const Resendotp = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.RESENDOTP, params);
        if (res.data.status === 200) {
            // Isios && await AsyncStorage.setItem("AuthToken", res?.data?.token);
            dispatch({
                type: RESENDOTP,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: OTPVERIFY_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: OTPVERIFY_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
}


export const updatepassword = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.UPDATEPASSWORD, params);
        if (res.data.status === 200) {
            // Isios && await AsyncStorage.setItem("AuthToken", res?.data?.token);
            dispatch({
                type: UPDATEPASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: UPDATEPASSWORD_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: UPDATEPASSWORD_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
}

export const changePassword = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.CHANGEPASSWORD, params);
        if (res.data.status === 200) {
            // Isios && await AsyncStorage.setItem("AuthToken", res?.data?.token);
            dispatch({
                type: CHANGEPASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: CHANGEPASSWORD_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: UPDATEPASSWORD_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING });
    }
}

export const userLogout = () => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const userData: any = await AsyncStorage.getItem("loginData");
        const loginData = JSON.parse(userData)?.data
        const res = await apiCall("post", apiEndPoints.LOGOUT, {login_id: loginData?._id});
        // if (res.data.status === 200) {
            await AsyncStorage.removeItem("persistantState");
            await AsyncStorage.removeItem("AuthToken");
            await AsyncStorage.removeItem('userData')
            await AsyncStorage.removeItem('firebase_id')
            await AsyncStorage.removeItem('loginData')
            dispatch({
                type: USER_LOGOUT,
                payload: null
            })
        // }
    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const jwtTokenGenrate = () => async (dispatch: any) => {
    try {
        const res = await apiCall("get", apiEndPoints.JWTTOKEN, {});
        if (res.data.status == 200) {
            dispatch({
                type: TOKEN_GENRATE,
                payload: res.data
            })
        } else {
            return null;
        }

    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
}
export const userRegister = (item: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.REGISTERANDADDUSER, item);
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
export const getUserDetails = (item: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING });
    try {
        const res = await apiCall("post", apiEndPoints.GETUSERDETAIL, item);
        if (res.data.status == 200) {
            dispatch({
                type: GET_USER_DETAILS,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: GET_USER_DETAILS_ERROR,
                payload: []
            })
        }

    }
    catch (e) {
        dispatch({
            type: GET_USER_DETAILS_ERROR,
            payload: console.log(e),
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


