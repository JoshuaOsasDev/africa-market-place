import axios from "axios";
import Cookies from "js-cookie";

import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
//console.log("baseUrl", baseURL)
const http = axios.create({
  baseURL: baseURL + `/api`,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  // const all = Cookies.get();
  // console.log(token, all, config, "token from http bearer");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor: catch 401
// http.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // ✅ show toast once
//       toast.error("Session expired, please login again.");

//       // ✅ clear auth state
//       //   store.dispatch(setLogout());
//       // ✅ optional: redirect to login page
//       // window.location.href = '/auth-user/sign-in';
//     }
//     return Promise.reject(error);
//   },
// );

export default http;
