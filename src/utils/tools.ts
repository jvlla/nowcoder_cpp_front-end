import logoImage from "../assets/logo.png";

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
