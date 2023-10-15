import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Pagination, Row, message, Form, Input, Button } from "antd";
import { context } from "../components/appContext";
import { Conversation, ConversationProps } from "../components/conversation";
import { DetailLetter, DetailLetterProps } from "../components/detailLetter";
import {
  addLetterAPI,
  getLettersAPI,
  getLettersDetailAPI,
} from "../services/letter";
import { sleep } from "../utils/tools";
import "../components/css/letter.css";

function Letter() {
  const { user } = useContext(context);
  const [ct, setCt] = useState(0); // user改变计数
  const [conversationData, setConversationData] = useState<ConversationProps[]>(
    []
  ); // 评论数据
  const [conversationQuery, setConversationQuery] = useState({});
  const [detailTotal, setDetailTotal] = useState(0); // 单对话私信总数
  const [currentCoversation, setCurrentConversation] = useState("");
  const [detailQuery, setDetailQuery] = useState({}); // 查询条件
  const [detailData, setDetailData] = useState<DetailLetterProps[]>([]); // 单对话私信数据
  const [toId, setToId] = useState(0);
  const [letterForm] = Form.useForm();
  const navigate = useNavigate();

  const turnPage = (page: number, _: number) => {
    // 翻页函数，_是pageSize
    setDetailQuery({
      ...detailQuery,
      page,
    });
    console.log("这里");
    // setConversationQuery("newpage"); // 不是，这怎么更新不了啊
    // setConversationQuery("");
    sleep(500).then(() => {
      // 加上延迟避免多线程更新不及时
      getLettersAPI().then((res) => {
        console.log(res);
        setConversationData(res.data);
      });
    });
    console.log(page);
  };

  // 默认检查当前用户是否登录，已登录跳转主页
  useEffect(() => {
    // 这个也想直接从user取值就好，但应该是先执行子组件的useEffect再执行父组件的useEffect，先第二次调用再判断
    if (ct >= 1 && user.userId == 0) {
      navigate("/");
      message.error("禁止未登录访问");
    }
    setCt(ct + 1);
  }, [user]); // 监听user变化

  useEffect(() => {
    getLettersAPI().then((res) => {
      console.log(res);
      setConversationData(res.data);
    });
  }, [conversationQuery]);

  useEffect(() => {
    getLettersDetailAPI(currentCoversation, detailQuery).then((res) => {
      console.log(res);
      setDetailData(res.data);
      setDetailTotal(res.total);
      setToId(res.toId);
    });
  }, [detailQuery, currentCoversation]); // 监听detailQuery改变

  return (
    <Row>
      <Col span={5} offset={4} className="gutter-row" id="letter">
        {conversationData.length <= 0 ? (
          <Row
            align="middle"
            justify="center"
            style={{ fontSize: "16px", minHeight: "100px" }}
          >
            无私信
          </Row>
        ) : (
          conversationData.map((conversation, index) => (
            <Row key={index}>
              <Conversation
                conversationId={conversation.conversationId}
                content={conversation.content}
                targetId={conversation.targetId}
                targetName={conversation.targetName}
                targetHeaderUrl={conversation.targetHeaderUrl}
                letterRecord={conversation.letterRecord}
                unreadCount={conversation.unreadCount}
                total={conversation.total}
                setConversationId={setCurrentConversation}
                setDetailQuery={setDetailQuery}
                setConversationData={setConversationData}
              />
            </Row>
          ))
        )}
      </Col>
      <Col span={9} offset={1}>
        {/* 私信 */}
        <Row style={{ display: detailTotal > 0 ? "" : "none" }}>
          <Col
            span={24}
            id="letter"
            style={{
              padding: "10px",
            }}
          >
            {/* 帖子 */}
            {detailData.map((detail, index) => (
              <Row key={index}>
                <DetailLetter {...detail} />
              </Row>
            ))}
          </Col>
        </Row>
        {/* 发消息框 */}
        <Row style={{ display: detailTotal > 0 ? "" : "none" }}>
          <Col span={24} id="letter" style={{ padding: "10px" }}>
            <Form
              preserve={false}
              onFinish={async (v) => {
                console.log(v);

                var postData = {
                  toId: toId,
                  content: v.content,
                };
                addLetterAPI(postData).then((res) => {
                  console.log(res);
                  if (res.success) {
                    setConversationQuery(Math.random()); // 随机数更新会话列表显示
                    setCurrentConversation(currentCoversation);
                    setDetailQuery({});
                  } else {
                    message.error("消息发送失败");
                  }
                });
                letterForm.setFieldValue("content", ""); // 清空消息
              }}
              labelCol={{ span: 3 }}
              form={letterForm}
            >
              <Form.Item name="content">
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  style={{ borderRadius: "20px" }}
                  placeholder="请输入输入聊天内容"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{
                    float: "right",
                  }}
                >
                  发送
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {/* 页码 */}
        <Row>
          <Col
            span={24}
            style={{
              display: detailTotal >= 10 ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
            }}
            id="letter"
          >
            <Pagination
              defaultCurrent={1}
              showSizeChanger={false}
              total={detailTotal}
              onChange={turnPage}
              hideOnSinglePage={true}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Letter;
