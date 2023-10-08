import { get, post } from "../utils/request";

/**
 * 主页帖子接口
 * @returns
 * {
 *   "success": true/false,
 *   "message": "",
 *   "data": 帖子数据,
 *   "total": 帖子总数
 * }
 * 如果成功，同时设置Cookie，key为nowcoder_jwt
 */
export const getPostsAPI = (query: any = {}) => get("/post", query);

/**
 * 帖子详情获取帖子接口
 * @param id 帖子id
 * @returns 
 * {
 *   "success": true/false,
 *   "message": "xxx",
 *   "data": 帖子数据
 * }
 */
export const getPostAPI = (id: any = {}) => get("/post/" + id);

/**
 * 发帖接口
 * @param data
 * {
 *   "title": 帖子标题
 *   "content": 帖子内容
 * }
 * @returns 
 * {
 *   "success": true/false,
 *   "message": "xxx",
 * }
 */
export const addPostAPI = (data: any) => post("/post/add", data);
