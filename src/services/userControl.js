import instance from "../utils/request";

/**
 * 获取用户管理列表
 * @param {*} page 当前页码, 默认1
 * @param {*} per 每一页显示的数量, 默认4
 * @returns 
 */
export function findUserControlList(page = 1, per = 4) {
  return instance.get("/api/usersControl", {params: {page, per}});
}

/**
 * 删除用户管理信息
 * @param {*} id 删除的用户id
 * @returns 
 */
export function delUserControlList(id) {
  return instance.delete("/api/usersControl/" + id);
}

/**
 * 根据 ID 获取用户管理信息
 * @param {*} id 
 * @returns 
 */
export function findUserControlDetail(id) {
  return instance.get("/api/usersControl/" + id);
}

/**
 * 新增用户管理信息
 * @param {
 *    name: 姓名
 *    role: 身份
 *    permission: 允许访问
 * } data 
 * @returns 
 */
export function createUserControl(data) {
  return instance.post("/api/usersControl", {data});
}

/**
 * 修改用户管理信息
 * @param {*} id 
 * @param {
 *    name: 姓名
 *    role: 身份
 *    permission: 允许访问
 * } data 
 * @returns 
 */
export function modifyUserControl(id, data) {
  return instance.put("/api/usersControl/" + id, {data});
}