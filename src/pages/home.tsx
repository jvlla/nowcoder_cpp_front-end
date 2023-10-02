/*
 * 主页
 */
import { useEffect, useState } from "react";
import { Row, Col, Pagination, FloatButton, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Post, PostProps } from "../components/post";
import { getPostsAPI } from "../services/post";

function Home() {
  const [query, setQuery] = useState({}); // 查询条件
  const [postsTotal, setPostsTotal] = useState(0); // 帖子总数
  const [data, setData] = useState<PostProps[]>([]); // 帖子数据

  const turnPage = (page: number, _: number) => {
    // 翻页函数，_是pageSize
    setQuery({
      ...query,
      page,
    });
    console.log(page);
  };

  useEffect(() => {
    // 加载帖子内容
    getPostsAPI(query).then((res) => {
      console.log(res);
      setData(res.data);
      setPostsTotal(res.total);
    });
  }, [query]); // 监听query改变

  return (
    <>
      {/* 帖子 */}
      {data.map((post, index) => (
        <Row key={index}>
          {/* Row的gutter实际是使用padding实现的，所以要搞成圆角就不能用gutter，直接设置margin */}
          <Col span={16} offset={4} className="post">
            <Post {...post} />
          </Col>
        </Row>
      ))}
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
          <Pagination
            defaultCurrent={1}
            showSizeChanger={false}
            total={postsTotal}
            onChange={turnPage}
          />
        </Col>
      </Row>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ height: "50px", width: "50px" }}
        onClick={() => {
          message.info("发帖还没实现呢，哭");
        }}
      />
    </>
  );
}

export default Home;
