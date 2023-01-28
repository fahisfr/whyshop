import axios from "axios";

const baseURL = "http://localhost:4000/";

export const ImagePath = `${baseURL}images/`;

const instance = axios.create({
  baseURL: `${baseURL}api/`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error?.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const { data } = await instance.get(
        "/user/refresh-token",

        { withCredentials: true }
      );
      if (data?.status === "ok") {
        localStorage.setItem("accesstoken", data.accessToken);
      }
      return instance(prevRequest);
    }

    return Promise.resolve({ data: { status: "error", error: error.message } });
  }
);

export default instance;
