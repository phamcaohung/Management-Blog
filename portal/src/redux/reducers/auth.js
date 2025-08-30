import * as types from "../constants/authConstants"
import * as blogTypes from '../constants/blogContants'



const initialState = {
    user: null,
    token: null,
    refreshToken: null,

    saveBlog: [],
    saveBlogError: null,
    saveBlogSuccess: null,

    signInError: null,
    signUpError: [],
    successMessage: null,

}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case types.SET_ACCESS_TOKEN:
            return {
                ...state,
                token: payload ? payload : null
            }
        case types.SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: payload ? payload : null
            }
        case types.SET_USER:
            return {
                ...state,
                user: payload ? payload : null
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                signInError: null,
                signUpError: [],
                successMessage: payload ? payload : null
            }
        case types.SIGNUP_FAILURE:
            return {
                ...state,
                successMessage: null,
                signInError: null,
                signUpError: payload ? payload : []
            }
        case types.SIGNIN_SUCCESS:
            return {
                ...state,
                signInError: null,
                successMessage: payload ? payload : null,
                token: payload ? payload.token : null,
                refreshToken: payload ? payload.refreshToken : null,
                user: payload ? payload.user : null
            }
        case types.SIGNIN_FAILURE:
            return {
                ...state,
                signUpError: [],
                successMessage: null,
                signInError: payload ? payload : null,
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                refreshToken: null,
                token: null,
                signInError: null,
                signUpError: [],
                successMessage: null,
            }
        case types.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: payload ? payload : null,
                refreshToken: payload ? payload : null
            }
        case types.REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                user: null,
                refreshToken: null,
                token: null,
                signInError: null,
                signUpError: [],
                successMessage: null,
            }
        case types.CLEAR_ERROR:
            return {
                ...state,
                signInError: null
            }
        case blogTypes.SAVE_OR_UNSAVE_BLOG_SUCCESS:
            console.log("payload: ", payload);
            return {
                ...state,
                user: {
                    ...state.user,
                    saveBlog: payload ? payload : []
                },
                saveBlogError: null
            }
        case blogTypes.SAVE_OR_UNSAVE_BLOG_FAILURE:
            return {
                ...state,
                saveBlogError: payload
            }
        default:
            return state
    }
}

export default authReducer