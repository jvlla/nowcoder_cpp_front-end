import {
  CommentOutlined,
  HeartOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Col, Divider, Row, message } from "antd";
import { sleep } from "../utils/tools";
import { getLettersAPI, getNoticesAPI } from "../services/letter";
import { TOPIC_COMMENT, TOPIC_LIKE, TOPIC_FOLLOW } from "../utils/tools";

type NoticeListElementProps = {
  type: string;
  noticeRecord: string;
  username: string;
  count: number;
  unreadCount: number;
  setNoticeType: any;
  setDetailQuery: any;
  setListData: any;
};

function NoticeListElement({
  type,
  noticeRecord,
  username,
  count,
  unreadCount,
  setNoticeType,
  setDetailQuery,
  setListData,
}: NoticeListElementProps) {
  const changeQuery = () => {
    setNoticeType(type);
    setDetailQuery({});
    sleep(500).then(() => {
      getNoticesAPI().then((res) => {
        console.log(res);
        setListData(res.data);
      });
    });
  };

  return (
    <Col span={24} onClick={changeQuery}>
      <Row>
        <Col span={5} style={{ margin: "10px 0" }}>
          <Badge count={unreadCount} offset={[-4, 4]}>
            <Avatar
              size={50}
              style={{
                background:
                  type == TOPIC_COMMENT
                    ? "green"
                    : type == TOPIC_LIKE
                    ? "orange"
                    : "pink"
              }}
              icon={
                type == TOPIC_COMMENT ? (
                  <CommentOutlined />
                ) : type == TOPIC_LIKE ? (
                  <LikeOutlined />
                ) : (
                  <HeartOutlined />
                )
              }
            />
          </Badge>
        </Col>
        <Col span={19}>
          {/* 通知类型 */}
          <Row style={{ margin: "10px 0" }}>
            <Col style={{ fontSize: "18px", color: "#00b96b" }}>
              {type == TOPIC_COMMENT
                ? "评论"
                : type == TOPIC_LIKE
                ? "赞"
                : "关注"}
            </Col>
          </Row>
          <Row style={{ margin: "0" }}>
            {/* 内容 */}
            <Col span={15} style={{ fontSize: "16px" }} className="onerow">
              {username +
                (type == TOPIC_COMMENT
                  ? "评论了你的帖子……"
                  : type == TOPIC_LIKE
                  ? "点赞了你的帖子……"
                  : "关注了你的帖子……")}
            </Col>
            {/* 时间 */}
            <Col span={8} offset={1} style={{ fontSize: "14px" }}>
              {noticeRecord.substring(0, 10)}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Divider style={{ margin: "2px 2px" }} />
      </Row>
    </Col>
  );
}

export { NoticeListElement, type NoticeListElementProps };
