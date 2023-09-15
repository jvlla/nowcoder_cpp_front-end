/*
 * 主页
 */
import React from "react";
import { Row, Col, Pagination } from "antd";
import Post from "../components/post";
import '../components/css/home.css'

function Home() {
  return (
    <>
      {/* 先直接造两个帖子，之后再改成变量 */}
      <Row>
        {/* Row的gutter实际是使用padding实现的，所以要搞成圆角就不能用gutter，直接设置margin */}
        <Col span={16} offset={4} className="post">
          <Post avatarSrc="" title="标题" comment="评论" />
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4} className="post">
          <Post avatarSrc="" title="标题" comment="评论" />
        </Col>
      </Row>

      {/* 页码 */}
      <Row>
        <Col
          span={16}
          offset={4}
          className="post"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
          }}
        >
          <Pagination defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </>
  );
}

export default Home;
