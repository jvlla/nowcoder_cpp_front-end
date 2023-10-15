import { get, post } from "../utils/request";

export const likeAPI = (data: any) => post("/like", data);

export const followAPI = (data: any) => post("/follow", data);

export const unfollowAPI = (data: any) => post("/unfollow", data);

export const getFolloweesAPI = (userId: any, query: any = {}) =>
  get("/followees/" + userId, query);

export const getFollowersAPI = (userId: any, query: any = {}) =>
  get("/followers/" + userId, query);