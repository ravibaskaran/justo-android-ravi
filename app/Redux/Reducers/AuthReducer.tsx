import { TOKEN_GENRATE, USER_LOGIN, USER_LOGOUT, LOGIN_ERROR, FORGOT_PASSWORD, FORGOT_ERROR, FORGOT_NULL, OTPVERIFY, OTPVERIFY_ERROR, OTPVERIFY_NULL, UPDATEPASSWORD, UPDATEPASSWORD_NULL, UPDATEPASSWORD_ERROR, RESENDOTP, RESENDOTP_ERROR, RESENDOTP_NULL, CHANGEPASSWORD_ERROR, CHANGEPASSWORD, CHANGEPASSWORD_NULL, USERREGISTER_ERROR, USERREGISTER, START_LOADING, STOP_LOADING, REMOVE_USERDATA, GET_USER_DETAILS, GET_USER_DETAILS_ERROR, UPDATE_PROFILE } from '../types'

const initialState = {
    response: null,
    authToken: false,
    loading: true,

}
const initialStateUserData = {
    userData: null,
    authToken: false,
    loading: true,

}
const forgotinitialState = {
    response: null,
    loading: true,
    forgot: false,
    error: false
}
const otpverifyinitialState = {
    response: null,
    loading: true,
    otpverify: false,
    error: false,
    resend: false,
}
const updatepasswordinitialState = {
    response: null,
    loading: true,
    updatepassword: false,
    error: false
}
const changePasswordinitialState = {
    response: null,
    loading: true,
    changepassword: false,
    error: false
}
const initialStateForm = {
    response: null,
    loading: true,
    changepassword: false,
    error: false
}
const initialStateUserDetails = {
    response: null,

}
export function loadingReducer(state = { loading: false }, action: any) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING:
            return {
                ...state,
                loading: false,
            }
        default: return state
    }

}

export function userData(state = initialStateUserData, action: any) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userData: action.payload,
                authToken: true,
                loading: false,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                userData: action.payload,
                authToken: false,
                loading: false,
            }

        default: return state
            break;
    }

}
export function authStore(state = initialState, action: any) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                response: action.payload,
                authToken: true,
                loading: false,
            }


        case USER_LOGOUT:
            return {
                ...state,
                response: null,
                authToken: false,
                loading: false,
            }

        case LOGIN_ERROR:
            return {
                ...state,
                response: action.payload,
                authToken: false,
                loading: false,
            }

        case TOKEN_GENRATE:
            return {
                ...state,
                response: action.payload,
                // authToken: false
            }
        // case USERREGISTER:
        //     return {
        //         ...state,
        //         response: action.payload,
        //         // authToken: false
        //     }
        // case USERREGISTER_ERROR:
        //     return {
        //         ...state,
        //         response: action.payload,
        //         // authToken: false
        //     }

        default: return state
    }

}

export function forgotReducer(state = forgotinitialState, action: any) {
    switch (action.type) {

        case FORGOT_PASSWORD:
            return {
                ...state,
                response: action.payload,
                forgot: true,
                error: false,
                loading: false,

            }
        case FORGOT_ERROR:
            return {
                ...state,
                response: action.payload,
                forgot: true,
                error: true,
                loading: false,
            }
        case FORGOT_NULL:
            return {
                ...state,
                response: action.payload,
                forgot: false,
                error: false,
                loading: false,
            }


        default: return state
    }

}

export function otpVerifyReducer(state = otpverifyinitialState, action: any) {
    switch (action.type) {

        case OTPVERIFY:
            return {
                ...state,
                response: action.payload,
                otpverify: true,
                error: false,
                loading: false,
                resend: false,

            }
        case OTPVERIFY_ERROR:
            return {
                ...state,
                response: action.payload,
                otpverify: true,
                error: true,
                loading: false,

            }
        case OTPVERIFY_NULL:
            return {
                ...state,
                response: action.payload,
                otpverify: false,
                error: false,
                loading: false,
            }
        case RESENDOTP:
            return {
                ...state,
                response: action.payload,
                otpverify: true,
                error: false,
                loading: false,
                resend: true,

            }
        /*  case RESENDOTP_ERROR:
         return {
             ...state,
             response: action.payload,
             otpverify: true,
             error: true,
             loading: false,
         }
         case RESENDOTP_NULL:
         return {
             ...state,
             response: action.payload,
             otpverify: false,
             error: false,
             loading: false,
         } */


        default: return state
    }

}
export function updatepasswordReducer(state = updatepasswordinitialState, action: any) {
    switch (action.type) {

        case UPDATEPASSWORD:
            return {
                ...state,
                response: action.payload,
                updatepassword: true,
                error: false,
                loading: false,

            }
        case UPDATEPASSWORD_ERROR:
            return {
                ...state,
                response: action.payload,
                updatepassword: true,
                error: true,
                loading: false,
            }
        case UPDATEPASSWORD_NULL:
            return {
                ...state,
                response: action.payload,
                updatepassword: false,
                error: false,
                loading: false,
            }


        default: return state
    }

}

export function changePasswordReducer(state = changePasswordinitialState, action: any) {
    switch (action.type) {

        case CHANGEPASSWORD:
            return {
                ...state,
                response: action.payload,
                changepassword: true,
                error: false,
                loading: false,

            }
        case CHANGEPASSWORD_ERROR:
            return {
                ...state,
                response: action.payload,
                changepassword: true,
                error: true,
                loading: false,
            }
        case CHANGEPASSWORD_NULL:
            return {
                ...state,
                response: action.payload,
                changepassword: false,
                error: false,
                loading: false,
            }


        default: return state
    }

}
export function userReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case USERREGISTER:
            return {
                ...state,
                detail: false,
                create: true,
                response: action.payload,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                detail: false,
                create: true,
                response: action.payload,
            };
        case REMOVE_USERDATA:
            return {
                ...state,
                create: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function userDetailReducer(state = initialStateUserDetails, action: any) {
    switch (action.type) {
        case GET_USER_DETAILS:
            return {
                ...state,
                response: action.payload,
                // authToken: false
            }
        case GET_USER_DETAILS_ERROR:
            return {
                ...state,
                response: action.payload,
                // authToken: false
            }
        default:
            return state;
    }
}
