import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import blogReducer from "./blog";
import userReducer from "./user";



const rootReducer = combineReducers({
    auth: authReducer,
    blogs: blogReducer,
    user: userReducer
})

export default rootReducer