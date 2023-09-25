import { get, post } from '../utils/request';

/**
 * 管理后台登录接口
 * @param data
 * .{
 *   "username": "xxx",
 *   "password": "xxx"
 * }
 * @returns
 * .{
 *   "status": true/false,
 *   "message": "xxx"
 * }
 * 如果成功，同时设置Cookie，key为nowcoder_jwt
 */
export const loginAPI = (data: any) => post('/login', data);

/**
 * captcha验证接口
 * @param data 
 * .{
 *   "ticket": "xxx"
 * }
 * @returns
 * .{
 *   "success": true/false,
 *   "message": ""
 * }
 * 如果成功，同时设置Cookie，key为nowcoder_captcha
 */
export const captchaAPI = (data: any) => post('/login/captcha', data);

/**
 * 获取当前登录用户信息接口
 * @returns 
 * .{
 *   "success": true/false,
 *   "message": "",
 *   "user":
 *   {
 *     "userId": "xxx"/"",
 *     "username": "xxx"/"",
 *     "userHeaderURL": "xxx"/""
 *   }
 * }
 */
export const getUserAPI = () => get('/user');
