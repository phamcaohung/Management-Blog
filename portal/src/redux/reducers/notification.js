import * as types from '../constants/notificationContants'

const initialState = {
    message: null,
    severity: null
}

const notificationReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case types.SHOW_NOTIFICATION:
            return {
                ...state,
                message: payload.message,
                severity: payload.severity
            }
        case types.HIDE_NOTIFICATION:
            return state
        default:
            return state
    }
}

export default notificationReducer