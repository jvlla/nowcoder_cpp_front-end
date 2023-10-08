import { useContext } from "react";
import { Row, Col, Avatar, Divider, message } from "antd";
import { CommentOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { context } from "./appContext";
import { ENTITY_TYPE_POST } from "../utils/tools";

type PostDetailProps = {
  postId: number;
  username: string;
  userHeaderURL: string;
  title: string;
  content: string;
  postRecord: string; // 帖子发表时间
  commentCount: number;
  likeCount: number;
  setShowModal: any;
  setEntityType: any;
  setEntityId: any;
  setTargetId: any;
};

const parser = new DOMParser(); // 用于对帖子标题和内容进行转义

function PostDetail({
  postId,
  username,
  userHeaderURL,
  title,
  content,
  postRecord,
  commentCount,
  likeCount,
  setShowModal,
  setEntityType,
  setEntityId,
  setTargetId,
}: PostDetailProps) {
  const { user } = useContext(context); // 登录用户信息，用于判断可以点赞评论

  // 点赞函数
  function likePost() {
    if (user.userId == 0) {
      message.error("点赞请登录");
      return;
    }
    message.error("点赞还没实现");
  }

  // 评论函数
  function postComment() {
    if (user.userId == 0) {
      message.error("评论请登录");
      return;
    }

    setEntityType(ENTITY_TYPE_POST);
    setEntityId(postId);
    setTargetId(0);
    setShowModal(true);
  }

  return (
    <Row>
      {/* 头像 */}
      <Col span={2} className="postCol">
        <Avatar size={50} icon={<UserOutlined />} src={userHeaderURL} />
      </Col>
      <Col span={22} className="postCol">
        {/* 用户名 */}
        <Row style={{ color: "orange", fontSize: "16px" }}>{username}</Row>
        {/* 发帖时间 */}
        <Row style={{ margin: "11px 0 2px 0", fontSize: "16px" }}>
          发布于 {postRecord}
        </Row>
        <Divider style={{ margin: "2px 10px 0 0" }} />
        {/* 帖子标题 */}
        <Row
          style={{ margin: "15px 0 0 0", fontSize: "18px", fontWeight: "bold" }}
        >
          <a href={"/detail/" + postId} style={{ color: "black" }}>
            {
              parser.parseFromString(title, "text/html").documentElement
                .textContent
            }
          </a>
        </Row>
        {/* 帖子内容 */}
        <Row style={{ margin: "25px 0", fontSize: "16px" }}>
          {
            parser.parseFromString(content, "text/html").documentElement
              .textContent
          }
        </Row>
        <Divider style={{ margin: "2px 0px 10px 0px" }} />
        {/* 点赞和评论 */}
        <Row>
          <Col span={2}>
            <div style={{ color: "black" }}>
              <LikeOutlined style={{ fontSize: "20px" }} onClick={likePost} />
              <a
                onClick={likePost}
                style={{ color: "black", fontSize: "16px" }}
              >
                {likeCount}
              </a>
            </div>
          </Col>
          <Col span={2}>
            <div>
              <CommentOutlined
                style={{ fontSize: "20px", color: "black" }}
                onClick={postComment}
              />
              <a
                style={{ color: "black", fontSize: "16px" }}
                onClick={postComment}
              >
                &nbsp;{commentCount}
              </a>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export { PostDetail, type PostDetailProps };
