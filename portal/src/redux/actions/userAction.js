import { API } from '../../config/apiConfig'
import * as types from '../constants/userConstants'

export const getProfileByUser = (userId) => async (dispatch) => {
    try {
        const { data } = await API.get(`/users/profile/${userId}`)
        dispatch({ type: types.GET_PROFILE_BY_ID_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.GET_PROFILE_BY_ID_FAILURE, payload: e.message })
    }
}