/*
 * 主页
 */
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Pagination,
  FloatButton,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Post, PostProps } from "../components/post";
import { addPostAPI, getPostsAPI } from "../services/post";

function Home() {
  const [query, setQuery] = useState({}); // 查询条件
  const [postsTotal, setPostsTotal] = useState(0); // 帖子总数
  const [data, setData] = useState<PostProps[]>([]); // 帖子数据
  const [showModal, setShowModal] = useState(false); // 控制modal显示和隐藏
  const [postForm] = Form.useForm(); // 可以获取表单元素实例

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
      {/* 发帖按钮 */}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ height: "50px", width: "50px" }}
        onClick={() => {
          setShowModal(true);
        }}
      />
      {/* 发帖弹出框 */}
      <Modal
        width="66%"
        title="发帖"
        open={showModal}
        // 点击遮罩层时不关闭
        maskClosable={false}
        onCancel={() => setShowModal(false)}
        // 关闭modal的时候清楚数据
        destroyOnClose
        onOk={() => {
          postForm.submit(); // 手动触发表单的提交事件
        }}
      >
        <Form
          // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
          preserve={false}
          onFinish={async (v) => {
            console.log(v);

            addPostAPI(v).then((res) => {
              console.log(res);
              if (res.success) {
                message.success("发帖成功");
                setQuery({}); // 重置查询条件，重新查看帖子
              } else {
                message.error("发帖失败");
              }
            });
            setShowModal(false);
          }}
          labelCol={{ span: 3 }}
          form={postForm}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入帖子标题",
              },
            ]}
          >
            <Input placeholder="请输入帖子标题" />
          </Form.Item>
          <Form.Item label="内容" name="content">
            <Input.TextArea
              autoSize={{ minRows: 10, maxRows: 20 }}
              placeholder="请输入帖子内容"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Home;
