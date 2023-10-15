import { get, post } from '../utils/request';

/**
 * 用户登录接口
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
 * 用户注册接口
 * @param data
 * .{
 *   "username": "xxx",
 *   "password": "xxx",
 *   "rePassword:": "xxx",
 *   "email": "xxx"
 * }
 * @returns
 * .{
 *   "status": true/false,
 *   "message": "xxx"
 * }
 */
export const registerAPI = (data: any) => post('/register', data);

/**
 * captcha验证接口
 * @param data 
 * .{
 *   "ticket": "xxx"
 * }
 * @returns
 * .{
 *   "success": true/false,
 *   "message": "xxx"
 * }
 * 如果成功，同时设置Cookie，key为nowcoder_captcha
 */
export const captchaAPI = (data: any) => post('/login/captcha', data);

/**
 * 获取当前登录用户信息接口
 * @returns 
 * .{
 *   "success": true/false,
 *   "message": "xxx",
 *   "user":
 *   {
 *     "userId": "xxx"/"",
 *     "username": "xxx"/"",
 *     "userHeaderURL": "xxx"/""
 *   }
 * }
 */
export const getUserAPI = () => get('/user');

export const getUserProfileAPI = (userId: any) =>get('/user/profile/' + userId)

/**
 * captcha验证接口
 * @param data 
 * .{
 *   "image": "xxx"  // base64后的图片
 * }
 * @returns
 * .{
 *   "success": true/false,
 *   "message": "xxx"
 * }
 */
export const uploadHeader = (data: any) => post('/user/changeHeader', data);
