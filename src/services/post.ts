import { get } from "../utils/request";

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
