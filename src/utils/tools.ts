import logoImage from "../assets/logo.png";
export const defaultImg = logoImage;

/**
 * 牛客图标
 */
export const logo = logoImage;

/*
 * 服务器地址
 */
export const serverUrl = "/";

/**
 * 休眠函数，延迟执行，提高视觉体验
 */
export function sleep(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

/**
 * 上传图片url
 */
export const uploadActionUrl = serverUrl + '/api/upload/header';

/**
 * 实体类型，帖子 
 */ 
export const ENTITY_TYPE_POST = 1;

/**
 * 实体类型，评论
 */ 
export const ENTITY_TYPE_COMMENT = 2;

