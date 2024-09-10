import axios, { AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "https://js-post-api.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
