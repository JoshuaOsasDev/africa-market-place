import axios from 'axios';

import toast from 'react-hot-toast';



const baseURL = process.env.NEXT_PUBLIC_API_URL;
console.log("baseUrl", baseURL)
const http = axios.create({
  baseURL: baseURL + `/api`,
   withCredentials: true
});



// Response interceptor: catch 401
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ✅ show toast once
      toast.error('Session expired, please login again.');

      // ✅ clear auth state
   //   store.dispatch(setLogout());
      // ✅ optional: redirect to login page
     // window.location.href = '/auth-user/sign-in';
    }
    return Promise.reject(error);
  }
);

export default http;
