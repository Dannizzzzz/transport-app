// axios封装
import axios from "axios";
import { getToken } from "./localStorage";
import { message } from "antd";
import { serverUrl } from "../config";

// 创建实例
const instance = axios.create({
  baseURL: serverUrl,
  timeout: 1000,
});
// 请求的拦截器
instance.interceptors.request.use(
  function (config) {
    config.headers["authorization"] = "Bearer " + getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应的拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data; // 数据简化
  },
  function (error) {
    message.info(error.message);
    return Promise.reject(error);
  }
);

export default instance;