import axios from "axios";

const baseUrl = "http://localhost:4000/api/";
export const ImagePath = "http://localhost:4000/images/";
const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.authorization = token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const prevRequest = error.config;
      if (error?.response?.status === 403 && !prevRequest.sent) {
        prevRequest.sent = true;
        const { data } = await instance.get("/user/refresh-token", {
          withCredentials: true,
        });
        localStorage.setItem("auth_token", data.accessToken);
        return instance(prevRequest);
      }
      return Promise.reject(error);
    } catch (error) {
      localStorage.removeItem("auth_token");
      return Promise.reject(error);
    }
  }
);

export default instance;
