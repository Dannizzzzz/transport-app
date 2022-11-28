// umi-request封装
import { extend } from "umi-request";
import { getToken } from "./localStorage";
import { message } from "antd";
import { serverUrl } from "../config";

// 创建实例
const instance = extend({
  prefix: serverUrl,
  timeout: 1000,
});
// 请求的拦截器
instance.interceptors.request.use((url, options) => {
  options.headers["authorization"] = "Bearer " + getToken();
  return { url, options };
});
// 响应的拦截器
instance.interceptors.response.use((response) => {
  const codeMaps = {
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "网关超时。",
  };
  // 如果出现问题才提示error信息
  codeMaps[response.status] && message.error(codeMaps[response.status]);
  return response; // 默认数据简化
});

export default instance;