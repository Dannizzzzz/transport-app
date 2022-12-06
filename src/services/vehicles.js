import instance from "../utils/request";

/**
 * 获取车辆列表
 * @param {*} page 当前页码, 默认1
 * @param {*} per 每一页显示的数量, 默认10 
 * @returns 
 */
export function findVehiclesList(page = 1, per = 10) {
  return instance.get("/api/vehicles", {params: {page, per}});
}

/**
 * 删除车辆信息
 * @param {*} id 删除的车辆id
 * @returns 
 */
export function delVehiclesList(id) {
  return instance.delete("/api/vehicles/" + id);
}

/**
 * 根据 ID 获取车辆信息
 * @param {*} id 
 * @returns 
 */
export function findVehicleDetail(id) {
  return instance.get("/api/vehicles/" + id);
}

/**
 * 新增车辆信息
 * @param {
 *    img: 车辆图片
 *    license: 车牌号
 *    load: 额定载重量
 *    belonging: 自有/外雇
 *    service: 上次检修日期
 *    brand: 品牌
 *    speed: 最高车速
 * } data 
 * @returns 
 */
export function createVehicle(data) {
  return instance.post("/api/vehicles", {data});
}

/**
 * 修改路单信息
 * @param {*} id 
 * @param {
 *    img: 车辆图片
 *    license: 车牌号
 *    load: 额定载重量
 *    belonging: 自有/外雇
 *    service: 上次检修日期
 *    brand: 品牌
 *    speed: 最高车速
 * } data 
 * @returns 
 */
export function modifyVehicle(id, data) {
  return instance.put("/api/vehicles/" + id, {data});
}