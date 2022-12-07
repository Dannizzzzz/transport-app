import instance from "../utils/request";

/**
 * 获取员工列表
 * @param {*} page 当前页码, 默认1
 * @param {*} per 每一页显示的数量, 默认5
 * @returns 
 */
export function findStaffList(page = 1, per = 5) {
  return instance.get("/api/staff", {params: {page, per}});
}

/**
 * 删除员工信息
 * @param {*} id 删除的员工id
 * @returns 
 */
export function delStaffList(id) {
  return instance.delete("/api/staff/" + id);
}

/**
 * 根据 ID 获取员工信息
 * @param {*} id 
 * @returns 
 */
export function findStaffDetail(id) {
  return instance.get("/api/staff/" + id);
}

/**
 * 新增员工信息
 * @param {
 *    name: 员工姓名
 *    img: 员工照片
 *    position: 职位
 *    salary: 工资
 *    oilConsumption: 平均耗油量
 *    fine: 罚款
 * } data 
 * @returns 
 */
export function createStaff(data) {
  return instance.post("/api/staff", {data});
}

/**
 * 修改员工信息
 * @param {*} id 
 * @param {
 *    name: 员工姓名
 *    img: 员工照片
 *    position: 职位
 *    salary: 工资
 *    oilConsumption: 平均耗油量
 *    fine: 罚款
 * } data 
 * @returns 
 */
export function modifyStaff(id, data) {
  return instance.put("/api/staff/" + id, {data});
}