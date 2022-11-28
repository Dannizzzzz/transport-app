import instance from "../utils/request";

/**
 * 管理后台登录
 * @param {*} user 
 * @returns 
 */
export function loginApi(user) {
  console.log(instance);
  return instance.post("/api/v1/auth/manager_login", {data: user});
}