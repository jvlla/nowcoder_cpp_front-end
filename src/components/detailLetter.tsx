import { Avatar, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

type DetailLetterProps = {
  isMe: boolean;
  content: string;
  username: string;
  userHeaderUrl: string;
  letterRecord: string;
};

const DetailLetter = (props: DetailLetterProps) => {
  return (
    <Col span={24}>
      {/* 私信时间 */}
      <Row>
        <div style={{ margin: "auto", fontSize: "14px" }}>
          {props.letterRecord}
        </div>
      </Row>
      {/* 另一会话用户头像，如果有 */}
      <Row>
        <Col span={3}>
          <div hidden={props.isMe}>
            <Avatar
              size={50}
              icon={<UserOutlined />}
              src={props.userHeaderUrl}
            />
          </div>
        </Col>
        {/* 私信内容 */}
        <Col span={18}>
          <div
            style={{
              background: "WhiteSmoke",
              fontSize: "16px",
              width: "fit-content",
              float: props.isMe ? "right" : "left",
              borderRadius: props.isMe ? "5px 0 5px 5px" : "0 5px 5px 5px",
              margin: "15px 10px 0 0",
              padding: "5px",
            }}
          >
            {props.content}
          </div>
        </Col>
        {/* 本用户头像，如果有 */}
        <Col span={3} className="postCol">
          <div hidden={!props.isMe}>
            <Avatar
              size={50}
              icon={<UserOutlined />}
              src={props.userHeaderUrl}
            />
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export { DetailLetter, type DetailLetterProps };
