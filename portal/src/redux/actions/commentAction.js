import { API } from "../../config/apiConfig"
import * as types from "../constants/commentContants"

export const addComment = (id, data) => async (dispatch) => {
    try {
        const res = await API.post(`/blogs/${id}/comment`, data)
        dispatch({ type: types.ADD_COMMENT_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.ADD_COMMENT_FAILURE, payload: e.message })
    }
}

export const updateComment = (id, data) => async (dispatch) => {
    try {
        const res = await API.put(`/blogs/${id}/comment`, data)
        dispatch({ type: types.UPDATE_COMMENT_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.UPDATE_COMMENT_FAILURE, payload: e.message })
    }
}

export const deleteComment = (id) => async (dispatch) => {
    try {
        const res = API.delete(`/blogs/${id}/comment`, data)
        dispatch({ type: types.DELETE_COMMENT_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.DELETE_COMMENT_FAILURE, payload: e.message })
    }
}