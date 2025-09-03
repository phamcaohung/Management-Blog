import { API } from "../../config/apiConfig"
import { SET_USER } from "../constants/authConstants"
import * as types from "../constants/blogContants"


export const createBlog = (data) => async (dispatch) => {
    try {
        const res = await API.post("/blogs/create", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch({ type: types.CREATE_BLOG_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.CREATE_BLOG_FAILURE, payload: e.message })
    }
}

export const getBlogById = (id) => async (dispatch) => {

    try {
        const { data } = await API.get(`/blogs/${id}`)
        dispatch({ type: types.GET_BLOG_BY_ID_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.GET_BLOG_BY_ID_FAILURE, payload: e.message })
    }
}

export const getBlogs = (limit, skip) => async (dispatch) => {

    try {
        const { data } = await API.get(`/blogs?limit=${limit}&skip=${skip}`)

        dispatch({
            type: types.GET_BLOGS_SUCCESS,
            payload: {
                page: skip / limit + 1,
                blogs: data.formattedBlogs,
                totalBlogs: data.totalBlogs
            }
        })
    } catch (e) {
        dispatch({ type: types.GET_BLOGS_FAILURE, payload: e.message })
    }
}

export const deleteBlog = (id) => async (dispatch) => {
    try {
        const { data } = await API.delete(`/blogs/${id}`)
        dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.DELETE_BLOG_FAILURE, payload: e.message })
    }
}

export const updateBlog = (id, data) => async (dispatch) => {
    try {
        const res = await API.put(`/blogs/${id}`, data)
        dispatch({ type: types.UPDATE_BLOG_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: e.message })
    }
}

export const saveBlog = (id) => async (dispatch) => {
    try {
        const { data } = await API.post(`/blogs/${id}/save`)
        dispatch({ type: types.SAVE_BLOG_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.SAVE_BLOG_FAILURE, payload: e.message })
    }
}

export const unSaveBlog = (id) => async (dispatch) => {
    try {
        const { data } = await API.post(`/blogs/${id}/un-save`)
        dispatch({ type: types.UNSAVE_BLOG_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.UNSAVE_BLOG_FAILURE, payload: e.message })
    }
}

export const getSaveBlogs = () => async (dispatch) => {
    try {
        const { data } = await API.get(`/blogs/save`)
        dispatch({ type: types.GET_BLOGS_SAVE_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.GET_BLOGS_SAVE_FAILURE, payload: e.message })
    }
}



export const getBlogsFollowing = (id) => async (dispatch) => {

}