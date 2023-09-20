import Mock from "mockjs";

export const serverUrl = "http://localhost:3006";

const loginData = Mock.mock("http://localhost:3006/post", "get", () => {
  // return (
  //   '"code": 200, "data": [{"username": "张三"}, {"username": "李四"}]'
  // )

  return {


    code: 200,
    message: "mock模拟成功",
    data: [
      {
        username: "张三",
        userAvatar: "http://localhost:8080/defaultAvatar.jpeg",
        title: "标题一",
        content: "内容二",
        createTime: "",
        commentCount: 10,
        likeCount: 5,
      },
      {
        username: "李四",
        userAvatar: "http://localhost:8080/defaultAvatar.jpeg",
        title: "标题二",
        content: "内容二",
        createTime: "",
        commentCount: 10,
        likeCount: 5,
      },
    ],
  };
});

export { loginData };
