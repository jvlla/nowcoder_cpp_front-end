import { get, post } from "../utils/request";

export const getLettersAPI = () => get("/letter", "");

export const getLettersDetailAPI = (
  conversation_id: any = {},
  query: any = {}
) => get("/letter/detail/" + conversation_id, query);

export const addLetterAPI = (data: any) => post("/letter/add", data);

export const getNoticesAPI = () => get("/notice", "");

export const getNoticesDetailAPI = (
  topic: any = {},
  query: any = {}
) => get("/notice/detail/" + topic, query);

