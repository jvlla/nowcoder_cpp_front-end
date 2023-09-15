/*
 * 主页中每一个帖子的发帖组件
 */
import { Row, Col, Avatar, Space, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import './css/post.css'

type PostProps = {
  avatarSrc: string;
  title: string;
  comment: string;
};

const Post = ({ avatarSrc, title, comment }: PostProps) => (
  <Row>
    {/* 头像 */}
    <Col span={2} className="postCol">
      <Avatar size={50} icon={<UserOutlined />} src={avatarSrc} />
    </Col>
    {/* 标题和信息 */}
    <Col span={22} className="postCol">
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{title}</div>
      <Divider />
      <ul >
        <li className="postLi" style={{float: "left"}}>张三  发布于</li>
        <li className="postLi" style={{float: "left"}}>2023-09-15 02:52</li>
        <li className="postLi" style={{float: "right"}}>赞 11</li>
        <li className="postLi" style={{float: "right"}}>|</li>
        <li className="postLi" style={{float: "right"}}>回帖 7</li>
      </ul>
    </Col>
  </Row>
);

export default Post;
