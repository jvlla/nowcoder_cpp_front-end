import { get, post } from "../utils/request";

/**
 * 帖子详情页评论展示接口
 * @param id 帖子号
 * @param query 查询条件
 * @returns 
 * {
 *   "success": true/false,
 *   "message": "xxx",
 *   "data": 评论数据
 *   {
 *     "xxx": xx,
 *     "replys": 回复数据
 *   }
 *   "total": 评论综述
 * }
 */
export const getCommentsAPI = (id: any, query: any = {}) => get("/comment/" + id, query);

/**
 * 
 * @param data 
 * {
 *   "content": 回复内容,
 *   "entity_type": 所回复的评论的类型（帖子或评论）
 *   "entity_id": 所回复的对象的id
 *   "target_id": 所回复的评论的发表用户（如果是回复给post或comment而不是reply，为0）
 * }
 * @returns
 * {
 *   "success": true/false,
 *   "message": "xxx",
 * }
 */
export const addCommentAPI = (data: any) => post("/comment/add", data);
