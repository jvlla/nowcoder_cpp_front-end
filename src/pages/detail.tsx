/**
 * 帖子详情页
 */
import { useEffect, useState } from "react";
import { Row, Col, Pagination, message, Modal, Form, Input } from "antd";
import { Comment, CommentProps } from "../components/comment.js";
import { addCommentAPI, getCommentsAPI } from "../services/comment.js";
import { PostDetail, PostDetailProps } from "../components/postDetail.js";
import { getPostAPI } from "../services/post.js";
import { ENTITY_TYPE_POST } from "../utils/tools.js";

function Detail() {
  const url = window.location.href;
  const postId = url.substring(url.lastIndexOf("/") + 1, url.length); // 帖子id
  const [postData, setPostData] = useState<PostDetailProps>({
    username: "",
    userHeaderURL: "",
    userId: 0,
    postId: 0,
    title: "",
    content: "",
    postRecord: "",
    commentCount: 0,
    likeRawStatus: 0,
    likeRawCount: 0,
    setShowModal: {},
    setEntityType: {},
    setEntityId: {},
    setTargetId: {},
  }); // 查询条件
  const [commentQuery, setCommentQuery] = useState({}); // 查询条件
  const [commentData, setCommentData] = useState<CommentProps[]>([]); // 评论数据
  const [commentsTotal, setCommentsTotal] = useState(0); // 评论总数
  const [showModal, setShowModal] = useState(false); // 控制modal显示和隐藏
  const [commentForm] = Form.useForm(); // 可以获取表单元素实例
  const [page, setPage] = useState(0); // 当前页码，用来在回复后再次查询
  const [entityType, setEntityType] = useState(0); // 用户发送回复数据，为被回复的的类型、id和发表用户id
  const [entityId, setEntityId] = useState(0);
  const [targetId, setTargetId] = useState(0);

  const turnPage = (page: number, _: number) => {
    // 设置页码，以在更新回复后保持页面
    setPage(page);
    // 翻页函数，_是pageSize
    setCommentQuery({
      ...commentQuery,
      page,
    });
    console.log(page);
  };

  useEffect(() => {
    getPostAPI(postId).then((res) => {
      console.log(res);
      setPostData(res.data);
    });
  }, []); // 默认加载帖子

  useEffect(() => {
    console.log("帖子号: " + postId);
    // 加载帖子内容
    getCommentsAPI(postId, commentQuery).then((res) => {
      console.log(res);
      setCommentData(res.data);
      setCommentsTotal(res.total);
    });
  }, [commentQuery]); // 监听query改变

  return (
    <>
      {/* 帖子 */}
      <Row>
        {/* Row的gutter实际是使用padding实现的，所以要搞成圆角就不能用gutter，直接设置margin */}
        <Col span={16} offset={4} className="post">
          <PostDetail
            postId={Number(postId)}
            userId={postData.userId}
            username={postData.username}
            userHeaderURL={postData.userHeaderURL}
            title={postData.title}
            content={postData.content}
            postRecord={postData.postRecord}
            commentCount={postData.commentCount}
            likeRawStatus={postData.likeRawStatus}
            likeRawCount={postData.likeRawCount}
            setShowModal={setShowModal}
            setEntityType={setEntityType}
            setEntityId={setEntityId}
            setTargetId={setTargetId}
          />
        </Col>
      </Row>
      {/* 回复 */}
      {commentData.map((comment, index) => (
        <Row key={index}>
          {/* Row的gutter实际是使用padding实现的，所以要搞成圆角就不能用gutter，直接设置margin */}
          <Col span={16} offset={4} className="post">
            <Comment
              postId={Number(postId)}
              commentId={comment.commentId}
              userId={comment.userId}
              username={comment.username}
              userHeaderURL={comment.userHeaderURL}
              content={comment.content}
              commentRecord={comment.commentRecord}
              commentCount={comment.commentCount}
              likeRawStatus={comment.likeRawStatus}
              likeRawCount={comment.likeRawCount}
              replys={comment.replys}
              setShowModal={setShowModal}
              setEntityType={setEntityType}
              setEntityId={setEntityId}
              setTargetId={setTargetId}
            />
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
            total={commentsTotal}
            onChange={turnPage}
          />
        </Col>
      </Row>
      {/* 评论弹出框 */}
      <Modal
        width="66%"
        title="" // 用来空行
        open={showModal}
        maskClosable={false} // 点击遮罩层时不关闭
        onCancel={() => setShowModal(false)}
        destroyOnClose // 关闭modal的时候清楚数据
        onOk={() => {
          commentForm.submit(); // 手动触发表单的提交事件
        }}
      >
        <Form
          // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
          preserve={false}
          onFinish={async (v) => {
            var postCommentData = {
              content: v.content,
              entityType: entityType,
              entityId: entityId,
              targetId: targetId,
            };
            console.log(postCommentData);

            addCommentAPI(postCommentData).then((res) => {
              console.log(res);
              if (res.success) {
                message.success("评论成功");
                if (entityType == ENTITY_TYPE_POST) {
                  getPostAPI(postId).then((res) => {
                    console.log("发表comment, 刷新post");
                    console.log(res);
                    setPostData(res.data);
                  });
                }
                setCommentQuery({
                  ...commentQuery,
                  page,
                }); // 重置查询条件，重新查看帖子
              } else {
                message.error("发帖失败");
              }
            });
            setShowModal(false);
          }}
          labelCol={{ span: 3 }}
          form={commentForm}
        >
          <Form.Item />
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "请输入内容",
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 10, maxRows: 20 }}
              placeholder="请输入内容"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Detail;
