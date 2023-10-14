import { Col, Divider, Row } from "antd";
import { TOPIC_COMMENT, TOPIC_LIKE } from "../utils/tools";

type DetailNoticeProps = {
  type: string;
  noticeRecord: string;
  userId: number;
  username: string;
  postId: number; // 被点赞或评论的帖子的id号
};

const DetailNotice = (props: DetailNoticeProps) => {
  return (
    <Col span={24}>
      {/* 系统通知内容，根据通知类型不同不同 */}
      <Row>
        <Col span={18}>
          <Row
            justify="end"
            align="middle"
            style={{
              fontSize: "18px",
              margin: "14px 0 4px 0"
            }}
          >
            {"用户" +
              props.username +
              (props.type == TOPIC_COMMENT
                ? "评论了你的帖子"
                : props.type == TOPIC_LIKE
                ? "点赞了你的帖子"
                : "关注了你") +
              ","}
            <a
              href={
                props.type == TOPIC_COMMENT
                  ? "/detail/" + props.postId
                  : props.type == TOPIC_LIKE
                  ? "/detail/" + props.postId
                  : "/user/profile/" + props.userId
              }
              style={{ color: "#00b96b" }}
            >
              点击查看
            </a>
          </Row>
        </Col>
        {/* 用来右对齐 */}
        <Col span={6} />
      </Row>
      {/* 时间 */}
      <Row justify="end" style={{ fontSize: "14px", float: "right" }}>
        {props.noticeRecord}
      </Row>
      <Divider style={{ margin: "0 2px" }}></Divider>
    </Col>
  );
};

export { DetailNotice, type DetailNoticeProps };
