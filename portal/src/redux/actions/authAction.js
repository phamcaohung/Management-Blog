import { refreshTokenAction } from "./refreshTokenAction"
import * as types from "../constants/authConstants"
import { API } from "../../config/apiConfig"
import { isValidToken } from "../../config/authConfig";


export const initializeAuth = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token
    const refreshToken = JSON.parse(localStorage.getItem("profile"))?.refreshToken

    if (token && refreshToken)
        if (isValidToken(token)) {
            console.log("token: ", token);
            dispatch({ type: types.SET_ACCESS_TOKEN, payload: token })
            dispatch({ type: types.SET_REFRESH_TOKEN, payload: refreshToken })
            dispatch({
                type: types.SET_USER,
                payload: JSON.parse(localStorage.getItem("profile"))?.user
            })
        }
        else
            await dispatch(refreshTokenAction(refreshToken))
}

export const signUp = (data, navigate, verify = false) => async (dispatch) => {
    try {
        localStorage.removeItem("profile")
        await API.post("/users/signup", data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        if (!verify) 
            dispatch({ type: types.SIGNIN_SUCCESS, payload: "Create Account successfully" })
        else {
            dispatch({ type: types.SIGNIN_SUCCESS, payload: "Create Account successfully" })
            navigate("/auth/verify", { state: data.email })
        }
    } catch (e) {
        dispatch({ type: types.SIGNIN_FAILURE, payload: e.message })
    }
}

export const signIn = (data, navigate) => async (dispatch) => {
    try {
        const res = await API.post("/users/signin", data)
        const { user, token, refreshToken, tokenUpdated } = res.data
        const profile = {
            user,
            token,
            refreshToken,
            tokenUpdated
        }
        localStorage.setItem("profile", JSON.stringify(profile))
        dispatch({ type: types.SIGNIN_SUCCESS, payload: profile })
        navigate("/")
    } catch (e) {
        dispatch({ type: types.SIGNIN_FAILURE, payload: e.response?.data?.message || e.message })
    }
}

export const logout = () => async (dispatch) => {
    try {
        const res = await API.post("/users/logout")
        localStorage.removeItem("profile")
        dispatch({ type: types.LOGOUT_SUCCESS, payload: res })
    } catch (e) {
        console.log(e.message)
    }
}   

export const clearError = () => async (dispatch) => {
    dispatch({ type: types.CLEAR_ERROR })
}




