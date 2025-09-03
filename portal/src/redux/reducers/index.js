import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import blogReducer from "./blog";
import userReducer from "./user";
import notificationReducer from "./notification";



const rootReducer = combineReducers({
    auth: authReducer,
    blogs: blogReducer,
    // user: userReducer,
    notification: notificationReducer
})

export default rootReducer