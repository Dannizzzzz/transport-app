import instance from "../utils/request";

/**
 * 获取经费列表
 * @param {*} page 当前页码, 默认1
 * @param {*} per 每一页显示的数量, 默认10
 * @returns 
 */
export function findFundsList(page = 1, per = 10) {
  return instance.get("/api/funds", {params: {page, per}});
}

/**
 * 删除经费信息
 * @param {*} id 删除的经费id
 * @returns 
 */
export function delFundsList(id) {
  return instance.delete("/api/funds/" + id);
}

/**
 * 根据 ID 获取经费信息
 * @param {*} id 
 * @returns 
 */
export function findFundsDetail(id) {
  return instance.get("/api/funds/" + id);
}

/**
 * 新增经费信息
 * @param {
 *    img: 图片发票
 *    date: 日期
 *    name: 姓名
 *    content: 花销项目类型
 *    count: 花费金额
 *    cost: 购买数量
 * } data 
 * @returns 
 */
export function createFunds(data) {
  return instance.post("/api/funds", {data});
}

/**
 * 修改经费信息
 * @param {*} id 
 * @param {
 *    img: 图片发票
 *    date: 日期
 *    name: 姓名
 *    content: 花销项目类型
 *    count: 花费金额
 *    cost: 购买数量
 * } data 
 * @returns 
 */
export function modifyFunds(id, data) {
  return instance.put("/api/funds/" + id, {data});
}