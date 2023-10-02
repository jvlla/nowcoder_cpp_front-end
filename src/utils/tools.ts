import logoImage from "../assets/logo.png";
export const defaultImg = logoImage;

/*
 * 牛客图标
 */
export const logo = logoImage;

/*
 * 服务器地址
 */
export const serverUrl = "/";

/*
 * 休眠函数，延迟执行，提高视觉体验
 */
export function sleep(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

/**
 * 图片处理
 * @param img
 * @returns
 */
export const dalImg = (img: string) => {
  if (img) {
    if (img.startsWith('http')) return img;
    return serverUrl + img;
  }
  return defaultImg;
};

export const uploadActionUrl = serverUrl + '/api/upload/header';

