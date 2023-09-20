/*
 * 主页中每一个帖子的发帖组件
 */
import { Row, Col, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./css/post.css";

// 血的教训，别起太常见的名字，userAvator, createTime就是没有值
type PostProps = {
  username: string;
  userHeaderURL: string;
  title: string;
  content: string;
  postRecord: string; // 帖子发表时间
  commentCount: number;
  likeCount: number;
};

const Post = (props: PostProps) => {
  return (
    <Row>
      {/* 头像 */}
      <Col span={2} className="postCol">
        <Avatar size={50} icon={<UserOutlined />} src={props.userHeaderURL} />
      </Col>
      <Col span={22} className="postCol">
        {/* 帖子标题 */}
        <Row>
          <Col style={{ fontSize: "18px", fontWeight: "bold" }}>
            {props.title}
          </Col>
        </Row>
        {/* 帖子内容 */}
        <Row style={{ margin: "10px 0px 0px 0px" }}>
          <div className="postContent">{props.content}</div>
        </Row>
        <Divider style={{ margin: "2px 0px 10px 0px" }} />
        {/* 帖子信息 */}
        <Row style={{ fontSize: "14px" }}>
          <Col span={21}>
            {props.username} 发布于 {props.postRecord}
          </Col>
          <Col span={3}>
            <div style={{ float: "right" }}>
              {props.likeCount}赞 | {props.commentCount}回帖
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { Post, type PostProps };
