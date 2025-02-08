import axios from 'axios'
import { getApiUrlBackend } from  '@/utils/env'

export default axios.create({
    baseURL: getApiUrlBackend(),
    // baseURL: import.meta.env.VITE_API_URL_BACKEND
    // baseURL: process.env.VITE_API_URL_BACKEND
})
export const axiosPrivate = axios.create({
    baseURL: getApiUrlBackend(),
    // baseURL: import.meta.env.VITE_API_URL_BACKEND,
    // baseURL: process.env.VITE_API_URL_BACKEND,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})