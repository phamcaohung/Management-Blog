import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1"
const API_ADMIN_URL = `${API_BASE_URL}/admin`

export const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const API_ADMIN = axios.create({
    baseURL: API_ADMIN_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

const authInterceptor = (req) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token
    if(token)
        req.headers.Authorization = `Bearer ${token}`
    return req
}

const adminInterceptor = (req) => {
    const token = JSON.parse(localStorage.getItem("admin"))?.token
    if(token)
        req.headers.Authorization = `Bearer ${token}`
    return req
}

API.interceptors.request.use(authInterceptor)
API_ADMIN.interceptors.request.use(adminInterceptor)

