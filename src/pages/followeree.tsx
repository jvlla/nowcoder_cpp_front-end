import { useEffect, useState } from "react";
import { Row, Col, Pagination } from "antd";
import { getFolloweesAPI, getFollowersAPI } from "../services/likeAndFollow";
import {
  FollowereeElement,
  FollowereeElementProps,
} from "../components/followereeElement";

function Followeree() {
  const url = window.location.href;
  const userId = url.substring(url.lastIndexOf("/") + 1, url.length); // 用户
  const type = url.split("/").slice(-2)[0];
  const [query, setQuery] = useState({}); // 查询条件
  const [postsTotal, setPostsTotal] = useState(0); // 用户总数
  const [data, setData] = useState<FollowereeElementProps[]>([]); // 用户数据

  const turnPage = (page: number, _: number) => {
    // 翻页函数，_是pageSize
    setQuery({
      ...query,
      page,
    });
    console.log(page);
  };

  useEffect(() => {
    // 根据网址加载用户内容
    if (type == "followees") {
      getFolloweesAPI(userId, query).then((res) => {
        console.log(res);
        setData(res.data);
        setPostsTotal(res.total);
      });
    } else {
      getFollowersAPI(userId, query).then((res) => {
        console.log(res);
        setData(res.data);
        setPostsTotal(res.total);
      });
    }
  }, [query]); // 监听query改变

  return (
    <>
      {/* 关注用户 */}
      {data.map((data, index) => (
        <Row key={index}>
          {/* Row的gutter实际是使用padding实现的，所以要搞成圆角就不能用gutter，直接设置margin */}
          <Col span={16} offset={4} className="post">
            <FollowereeElement {...data} />
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
    </>
  );
}

export default Followeree;
