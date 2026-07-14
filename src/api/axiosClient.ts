import axios from "axios"
import Cookies from "js-cookie"

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
