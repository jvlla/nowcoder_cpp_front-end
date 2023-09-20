import { get } from "../utils/request";

export const loadDataAPI = (query: any = {}) =>
  get('/post', query);
