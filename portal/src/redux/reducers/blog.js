import * as types from '../constants/blogContants'
import * as reactionTypes from '../constants/reactionConstants'
import * as commentTypes from '../constants/commentContants'
import * as userTypes from "../constants/userConstants"


const initialState = {
    blog: null,
    blogs: [],
    profile: [],
    blogsFollowing: [],
    totalBlogs: 0,
    followingUsersBlogs: [],
    blogError: null,
    reactionError: null,
    commentError: null,
    profileError: null,
}

const blogReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case types.CREATE_BLOG_SUCCESS: 
            return {
                ...state,
                blogs: [payload, ...state.blogs],
                profile: state.profile.length !== 0 ? {
                    ...state.profile,
                    blogsLast30Days: [payload, ...state.profile.blogsLast30Days]
                } : [],
                blogError: null,
            }
        case types.CREATE_BLOG_FAILURE:
            return {
                ...state,
                blogError: payload
            }
        case types.GET_BLOGS_SUCCESS:
            if (payload.page === 1)
                return {
                    ...state,
                    blogs: payload ? payload.blogs : [],
                    totalBlogs: payload ? payload.totalBlogs : 0,
                    blogError: null
                }
            else {
                const existsBlog = state.blogs.map((item) => item._id)
                const newBlog = (payload ? payload.blogs : []).filter((item) => !existsBlog.includes(item._id))
                return {
                    ...state,
                    blogs: [...state.blogs, ...newBlog],
                    totalBlogs: payload ? payload.totalBlogs : 0,
                    blogError: null
                }
            }
        case types.GET_BLOGS_FAILURE:
            return {
                ...state,
                blogError: payload
            }
        case types.GET_BLOG_BY_ID_SUCCESS:
            return {
                ...state,
                blog: payload,
                blogError: null
            }
        case types.GET_BLOG_BY_ID_FAILURE:
            return {
                ...state,
                blogError: payload
            }
        case reactionTypes.REACTION_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.map(item => item._id === payload._id ? payload : item),
                reactionError: null,
            }
        case reactionTypes.REACTION_BLOG_FAILURE:
            return {
                ...state,
                reactionError: payload
            }
        case reactionTypes.UNREACTION_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.map(item => item._id === payload._id ? payload : item),
                reactionError: null,
            }
        case reactionTypes.UNREACTION_BLOG_FAILURE:
            return {
                ...state,
                reactionError: payload
            }
        case commentTypes.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.map(
                    item => item._id === payload.blog
                        ?
                        {
                            ...item,
                            comments: [...item.comments, payload]
                        }
                        : item
                ),
                commentError: null
            }
        case commentTypes.ADD_COMMENT_FAILURE:
            return {
                ...state,
                commentError: payload
            }
        case userTypes.GET_PROFILE_BY_ID_SUCCESS:
            return {
                ...state,
                profile: payload ? payload : [],
                profileError: null
            }
        case userTypes.GET_PROFILE_BY_ID_FAILURE:
            return {
                ...state,
                profileError: payload
            }
        default:
            return state
    }
}

export default blogReducer