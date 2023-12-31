/*
 * 主页中每一个帖子的发帖组件
 */
import { useNavigate } from "react-router-dom";
import { Row, Col, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./css/post.css";

// 血的教训，别起太常见的名字，userAvator, createTime就是没有值
type PostProps = {
  userId: number;
  username: string;
  userHeaderURL: string;
  postId: number;
  title: string;
  content: string;
  postRecord: string; // 帖子发表时间
  commentCount: number;
  likeCount: number;
};

const parser = new DOMParser(); // 用于对帖子标题和内容进行转义

const Post = (props: PostProps) => {
  const navigate = useNavigate();

  return (
    <Row>
      {/* 头像 */}
      <Col span={2} className="postCol">
        <Avatar
          size={50}
          icon={<UserOutlined />}
          src={props.userHeaderURL}
          onClick={() => {
            navigate("/user/profile/" + props.userId);
          }}
        />
      </Col>
      <Col span={22} className="postCol">
        {/* 帖子标题 */}
        <Row>
          <Col style={{ fontSize: "18px", fontWeight: "bold" }}>
            <a href={"/detail/" + props.postId} style={{ color: "black" }}>
              {
                parser.parseFromString(props.title, "text/html").documentElement
                  .textContent
              }
            </a>
          </Col>
        </Row>
        {/* 帖子内容 */}
        <Row style={{ margin: "10px 0px 0px 0px" }}>
          <div className="postContent">
            {
              parser.parseFromString(props.content, "text/html").documentElement
                .textContent
            }
          </div>
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
