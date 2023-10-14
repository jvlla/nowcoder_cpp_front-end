import { useContext } from "react";
import { Row, Col, Avatar, Divider, message } from "antd";
import { CommentOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { context } from "./appContext";
import { Reply, ReplyProps } from "./reply";
import { ENTITY_TYPE_COMMENT } from "../utils/tools";
import "./css/comment.css";

type CommentProps = {
  postId: number;
  commentId: number;
  username: string;
  userHeaderURL: string;
  content: string;
  commentRecord: string; // 评论发表时间
  commentCount: number;
  likeCount: number;
  replys: ReplyProps[];
  setShowModal: any;
  setEntityType: any;
  setEntityId: any;
  setTargetId: any;
};

const parser = new DOMParser(); // 用于对帖子标题和内容进行转义

function Comment({
  commentId,
  username,
  userHeaderURL,
  content,
  commentRecord,
  likeCount,
  replys,
  setShowModal,
  setEntityType,
  setEntityId,
  setTargetId,
}: CommentProps) {
  const { user } = useContext(context);  // 登录用户信息，用于判断可以点赞评论

  // 点赞函数
  function likeComment() {
    if (user.userId == 0) {
      message.error("点赞请登录");
      return;
    }
    message.error("点赞还没实现");
  }
  
  // 恢复函数
  function postReply() {
    if (user.userId == 0) {
      message.error("评论请登录");
      return;
    }

    setEntityType(ENTITY_TYPE_COMMENT);
    setEntityId(commentId);
    setTargetId(0);
    setShowModal(true);
  }

  return (
    <Row>
      {/* 头像 */}
      <Col span={2} className="commentCol">
          <Avatar size={50} icon={<UserOutlined />} src={userHeaderURL} />
      </Col>
      <Col span={22} className="commentCol">
        {/* 用户名 */}
        <Row style={{ fontSize: "16px" }}>{username}</Row>
        {/* 回复内容 */}
        <Row style={{ margin: "25px 0px" }}>
          <div className="commentContent">
            {
              parser.parseFromString(content, "text/html").documentElement
                .textContent
            }
          </div>
        </Row>
        <Divider style={{ margin: "2px 0px 10px 0px" }} />
        {/* 帖子信息 */}
        <Row>
          {/* 时间 */}
          <Col span={21} style={{ fontSize: "14px" }}>
            {commentRecord}
          </Col>
          {/* 点赞和评论 */}
          <Col span={1}>
            <div>
              <LikeOutlined
                style={{ fontSize: "16px" }}
                onClick={likeComment}
              />
              <a
                onClick={likeComment}
                style={{ color: "black", fontSize: "14px" }}
              >
                {likeCount}
              </a>
            </div>
          </Col>
          <Col span={2}>
            <div>
              <CommentOutlined
                style={{ fontSize: "16px" }}
                onClick={postReply}
              />
              <a
                style={{ fontSize: "14px", color: "black" }}
                onClick={postReply}
              >
                &nbsp;回复
              </a>
            </div>
          </Col>
        </Row>
        {/* 回复 */}
        <div>
          {replys.length}
        </div>
        <Col className="replyCol" hidden={replys.length == 0}>
          {replys.map((reply, index) => (
            <Row key={index}>
              <Reply
                commentId={reply.commentId}
                userId={reply.userId}
                username={reply.username}
                replyUsername={reply.replyUsername}
                content={reply.content}
                replyRecord={reply.replyRecord}
                likeCount={reply.likeCount}
                setShowModal={setShowModal}
                setEntityType={setEntityType}
                setEntityId={setEntityId}
                setTargetId={setTargetId}
              />
            </Row>
          ))}
        </Col>
      </Col>
    </Row>
  );
}

export { Comment, type CommentProps };
