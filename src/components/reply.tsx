/**
 * 对于评论comment的回复reply组件
 */
import { useContext, useEffect, useState } from "react";
import { Col, Divider, Row, message } from "antd";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { context } from "./appContext";
import { ENTITY_TYPE_COMMENT } from "../utils/tools";
import { likeAPI } from "../services/likeAndFollow";

type ReplyProps = {
  postId: number; // reply所在帖子的id
  replyId: number; // reply发表用户id
  commentId: number; // reply所回复的comment的发表用户
  userId: number; // 发布reply的用户id
  username: string;
  replyUsername: string; // reply回复的用户名
  content: string;
  replyRecord: string; // 回复发表时间
  likeRawStatus: number;
  likeRawCount: number;
  setShowModal: any;
  setEntityType: any;
  setEntityId: any;
  setEntityUserId: any;
  setTargetId: any;
};

function Reply({
  postId,
  replyId,
  commentId,
  userId,
  username,
  replyUsername,
  content,
  replyRecord,
  likeRawStatus,
  likeRawCount,
  setShowModal,
  setEntityType,
  setEntityId,
  setEntityUserId,
  setTargetId,
}: ReplyProps) {
  const { user } = useContext(context); // 登录用户信息，用于判断可以点赞评论
  const [likeStatus, setLikeStatus] = useState(-1); // 点赞状态，1已赞，0未赞
  const [likeCount, setLikeCount] = useState(-1); // 点赞数量

  // 默认设置点赞情况和数量
  useEffect(() => {
    setLikeCount(likeRawCount);
    setLikeStatus(likeRawStatus);
  }, [user]); // 监听user是因为什么都不写好像起不到作用

  // 点赞函数
  function likeReply() {
    if (user.userId == 0) {
      message.error("点赞请登录");
      return;
    }
    var data = {
      entityType: ENTITY_TYPE_COMMENT,
      entityId: replyId,
      entityUserId: userId,
      postId: postId
    };
    likeAPI(data).then((res) => {
      console.log(res);
      setLikeCount(res.data.likeCount);
      setLikeStatus(res.data.likeStatus);
    });
  }

  // 回复回复的函数
  function postReply() {
    if (user.userId == 0) {
      message.error("评论请登录");
      return;
    }

    setEntityType(ENTITY_TYPE_COMMENT);
    setEntityId(commentId);
    setEntityUserId(userId);
    setTargetId(userId);
    setShowModal(true);
  }

  return (
    <>
      <Col span={24}>
        {/* 回复内容 */}
        <Row style={{ fontSize: "16px", margin: "10px" }}>
          <div style={{ color: "#00b96b" }}>{username}</div>
          <div hidden={replyUsername == ""}>回复</div>
          <div hidden={replyUsername == ""}>
            <div style={{ color: "#00b96b" }}>{replyUsername}</div>
          </div>
          : {content}
        </Row>
        {/* 回复信息 */}
        <Row style={{ margin: "0px 10px" }}>
          <Col span={21} style={{ fontSize: "14px" }}>
            {replyRecord}
          </Col>
          {/* 点赞和评论 */}
          <Col span={1}>
            <div>
              <LikeOutlined
                style={{
                  color: likeStatus ? "#00b96b" : "black",
                  fontSize: "16px",
                }}
                onClick={likeReply}
              />
              <a
                onClick={likeReply}
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
        <Row>
          <Divider style={{ margin: "2px 10px 10px 10px", minWidth: "96%" }} />
        </Row>
      </Col>
    </>
  );
}

export { Reply, type ReplyProps };
