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