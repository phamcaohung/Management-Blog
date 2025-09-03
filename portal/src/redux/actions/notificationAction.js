import * as types from '../constants/notificationContants'


export const showNotification = (message, severity) => async (dispatch) => {
    dispatch({ type: types.SHOW_NOTIFICATION, payload: { message, severity }})
}

export const hideNotification = () => async (dispatch) => {
    dispatch({ type: types.HIDE_NOTIFICATION, payload: "" })
}