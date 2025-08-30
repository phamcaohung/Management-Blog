import { API } from "../../config/apiConfig"
import * as types from "../constants/reactionConstants"

export const reactionBlog = (id, data) => async (dispatch) => {
    try {
        const res = await API.post(`/blogs/${id}/reaction`, data)
        dispatch({ type: types.REACTION_BLOG_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.REACTION_BLOG_FAILURE, payload: e.message })
    }
}

export const unReactionBlog = (id, data) => async (dispatch) => {
    try {
        const res  = await API.delete(`/blogs/${id}/unReaction`, { data })
        dispatch({ type: types.UNREACTION_BLOG_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.UNREACTION_BLOG_FAILURE, payload: e.message })
    }
}