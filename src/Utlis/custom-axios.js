import axios from 'axios';
const Base_URL = "http://localhost:5000";

// axios instance for making requests 
const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers["authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && err.response.data.message === "Unauthorized User Token inValid" && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosInstance.post(`${Base_URL}/user/refresh-token`, {
            token: sessionStorage.getItem('refreshToken'),
          });
          const { token } = rs.data;
          console.log("token",token,rs.data)
          sessionStorage.setItem("accessToken", token);
          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      } else {
        await axios.post(`${Base_URL}/user/logout`,{id: sessionStorage.getItem('id')});
        sessionStorage.clear();
        window.location.reload(); 
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;