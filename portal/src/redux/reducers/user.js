import * as types from '../constants/userConstants'


const initialState = {
    profile: [],
    profileError: null
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    
    switch (type) {
        case types.GET_PROFILE_BY_ID_SUCCESS:
            return {
                ...state,
                profile: payload ? payload : [],
                profileError: null
            }
        case types.GET_PROFILE_BY_ID_FAILURE:
            return {
                ...state,
                profileError: payload
            }
        default:
            return state
    }
}

export default userReducer