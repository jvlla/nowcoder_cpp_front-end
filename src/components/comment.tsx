import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Avatar, Divider, message } from "antd";
import { CommentOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { context } from "./appContext";
import { Reply, ReplyProps } from "./reply";
import { ENTITY_TYPE_COMMENT } from "../utils/tools";
import { likeAPI } from "../services/likeAndFollow";
import "./css/comment.css";

type CommentProps = {
  postId: number;
  commentId: number;
  userId: number;
  username: string;
  userHeaderURL: string;
  content: string;
  commentRecord: string; // 评论发表时间
  commentCount: number;
  likeRawStatus: number;
  likeRawCount: number;
  replys: ReplyProps[];
  setShowModal: any;
  setEntityType: any;
  setEntityId: any;
  setEntityUserId: any;
  setTargetId: any;
};

const parser = new DOMParser(); // 用于对帖子标题和内容进行转义

function Comment({
  postId,
  commentId,
  userId,
  username,
  userHeaderURL,
  content,
  commentRecord,
  likeRawStatus,
  likeRawCount,
  replys,
  setShowModal,
  setEntityType,
  setEntityId,
  setEntityUserId,
  setTargetId,
}: CommentProps) {
  const { user } = useContext(context); // 登录用户信息，用于判断可以点赞评论
  const [likeStatus, setLikeStatus] = useState(-1); // 点赞状态，1已赞，0未赞
  const [likeCount, setLikeCount] = useState(-1); // 点赞数量
  const navigate = useNavigate();

  // 默认设置点赞情况和数量
  useEffect(() => {
    setLikeCount(likeRawCount);
    setLikeStatus(likeRawStatus);
  }, [user]); // 监听user是因为什么都不写好像起不到作用

  // 点赞函数
  function likeComment() {
    if (user.userId == 0) {
      message.error("点赞请登录");
      return;
    }
    var data = {
      entityType: ENTITY_TYPE_COMMENT,
      entityId: commentId,
      entityUserId: userId,
      postId: postId
    };
    likeAPI(data).then((res) => {
      console.log(res);
      setLikeCount(res.data.likeCount);
      setLikeStatus(res.data.likeStatus);
    });
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
    setEntityUserId(userId);
    setShowModal(true);
  }

  return (
    <Row>
      {/* 头像 */}
      <Col span={2} className="commentCol">
        <Avatar
          size={50}
          icon={<UserOutlined />}
          src={userHeaderURL}
          onClick={() => {
            navigate("/user/profile/" + userId);
          }}
        />
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
                style={{
                  color: likeStatus ? "#00b96b" : "black",
                  fontSize: "16px",
                }}
                onClick={likeComment}
              />
              <a
                onClick={likeComment}
                style={{
                  color: likeStatus ? "#00b96b" : "black",
                  fontSize: "14px",
                }}
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
        <div>{replys.length}</div>
        <Col className="replyCol" hidden={replys.length == 0}>
          {replys.map((reply, index) => (
            <Row key={index}>
              <Reply
                postId={postId}
                replyId={reply.replyId}
                commentId={reply.commentId}
                userId={reply.userId}
                username={reply.username}
                replyUsername={reply.replyUsername}
                content={reply.content}
                replyRecord={reply.replyRecord}
                likeRawStatus={reply.likeRawStatus}
                likeRawCount={reply.likeRawCount}
                setShowModal={setShowModal}
                setEntityType={setEntityType}
                setEntityId={setEntityId}
                setEntityUserId={setEntityUserId}
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
