import instance from "../utils/request";

/**
 * 获取路单列表
 * @param {*} page 当前页码, 默认1
 * @param {*} per 每一页显示的数量, 默认10
 * @returns 
 */
export function findWayBillList(page = 1, per = 10) {
  return instance.get("/api/wayBill", {params: {page, per}});
}

/**
 * 删除路单信息
 * @param {*} id 删除的路单id
 * @returns 
 */
export function delWayBillList(id) {
  return instance.delete("/api/wayBill/" + id);
}

/**
 * 根据 ID 获取路单信息
 * @param {*} id 
 * @returns 
 */
export function findWayBillDetail(id) {
  return instance.get("/api/wayBill/" + id);
}

/**
 * 新增路单信息
 * @param {
 *    gDate: 发车日期
 *    aDate: 到车日期
 *    start: 去程邮路
 *    destination: 返程邮路
 *    wayBillNum: 路单流水号
 *    driver: 司机姓名
 *    tel: 司机电话
 *    weight: 载重量
 * } data 
 * @returns 
 */
export function createWayBill(data) {
  return instance.post("/api/wayBill", {data});
}

/**
 * 修改路单信息
 * @param {*} id 
 * @param {
 *    gDate: 发车日期
 *    aDate: 到车日期
 *    start: 去程邮路
 *    destination: 返程邮路
 *    wayBillNum: 路单流水号
 *    driver: 司机姓名
 *    tel: 司机电话
 *    weight: 载重量
 * } data 
 * @returns 
 */
export function modifyWayBill(id, data) {
  return instance.put("/api/wayBill/" + id, {data});
}