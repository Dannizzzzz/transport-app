import instance from "../utils/request";

/**
 * 获取日志列表
 * @param {*} page 当前页码, 默认1
 * @param {*} per 每一页显示的数量, 默认10
 * @returns 
 */
export function findMyLogList(page = 1, per = 10) {
  return instance.get("/api/mylog", {params: {page, per}});
}

/**
 * 删除日志信息
 * @param {*} id 删除的日志id
 * @returns 
 */
export function delMyLogList(id) {
  return instance.delete("/api/mylog/" + id);
}

/**
 * 根据 ID 获取日志信息
 * @param {*} id 
 * @returns 
 */
export function findMyLogDetail(id) {
  return instance.get("/api/mylog/" + id);
}

/**
 * 新增日志信息
 * @param {
 *    name: 管理员
 *    request: ["查询", "增加", "删除", "修改"]
 *    method: ["GET", "POST", "DELETE", "PUT"]
 *    content: 日志内容
 *    time: 时间
 * } data 
 * @returns 
 */
export function createMyLog(data) {
  return instance.post("/api/mylog", {data});
}

/**
 * 修改日志信息
 * @param {*} id 
 * @param {
 *    name: 管理员
 *    request: ["查询", "增加", "删除", "修改"]
 *    method: ["GET", "POST", "DELETE", "PUT"]
 *    content: 日志内容
 *    time: 时间
 * } data 
 * @returns 
 */
export function modifyMyLog(id, data) {
  return instance.put("/api/mylog/" + id, {data});
}