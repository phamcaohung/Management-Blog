import { jwtDecode } from "jwt-decode"
import { refreshTokenAction } from "../redux/actions/refreshTokenAction"

export const token = (store) => (next) => async (action) => {
    const state = store.getState()
    const token = state.auth?.token

    if(token) {
        const expiresIn = jwtDecode(token).exp * 1000 - Date.now()
        if(expiresIn < 10 * 60 * 1000) {
            const refreshToken = state.auth.refreshToken
            try {
                await store.dispatch(refreshTokenAction(refreshToken))
                const newToken = store.getState().auth?.token
                if(!newToken)
                    throw new Error("Access token not found after refresh")
            } catch (e) {
                console.error("Token refresh error: ", e)
            }
        }
        else if(expiresIn <= 0)
            store.dispatch({ type: "LOGOUT" })
    }

    return next(action)
}