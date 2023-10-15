import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Col, Divider, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getLettersAPI } from "../services/letter";
import { sleep } from "../utils/tools";


type ConversationProps = {
  conversationId: string;
  content: string;
  targetId: number;
  targetName: string;
  targetHeaderUrl: string;
  letterRecord: string;
  unreadCount: number;
  total: number;
  setConversationId: any;
  setDetailQuery: any;
  setConversationData: any;
};

function Conversation({
  conversationId,
  content,
  targetId,
  targetName,
  targetHeaderUrl,
  letterRecord,
  unreadCount,
  total,
  setConversationId,
  setDetailQuery,
  setConversationData,
}: ConversationProps) {
  const navigate = useNavigate();

  const changeQuery = () => {
    setConversationId(conversationId);
    setDetailQuery({});
    sleep(500).then(() => {
      getLettersAPI().then((res) => {
        console.log(res);
        setConversationData(res.data);
      });
    });
  };

  return (
    <Col span={24} onClick={changeQuery}>
      <Row>
        <Col span={5} style={{ margin: "10px 0" }}>
          <Badge count={unreadCount} offset={[-4, 4]}>
            <Avatar size={50} icon={<UserOutlined />} src={targetHeaderUrl} onClick={()=>{
                  navigate("/user/profile/" + targetId)
                }} />
          </Badge>
        </Col>
        <Col span={19}>
          {/* 用户名 */}
          <Row style={{ margin: "10px 0" }}>
            <Col style={{ fontSize: "18px", color: "#00b96b" }}>
              {targetName}
            </Col>
          </Row>
          <Row style={{ margin: "0" }}>
            {/* 内容 */}
            <Col span={16} style={{ fontSize: "16px" }}>
              {content}
            </Col>
            {/* 时间 */}
            <Col span={8} style={{ fontSize: "14px" }}>
              {letterRecord.substring(0, 10)}
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

export { Conversation, type ConversationProps };
