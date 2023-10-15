import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Col, Divider, Row } from "antd";
import { ENTITY_TYPE_USER } from "../utils/tools";
import { UserOutlined } from "@ant-design/icons";
import { context } from "./appContext";
import { followAPI, unfollowAPI } from "../services/likeAndFollow";

type FollowereeElementProps = {
  userId: number;
  username: string;
  userHeaderURL: string;
  followRecord: string;
  hasFollowed: boolean;
};

const FollowereeElement = (props: FollowereeElementProps) => {
  const { user } = useContext(context);
  const navigate = useNavigate();

  function doAboutFollow() {
    var ret = {
      entityType: ENTITY_TYPE_USER,
      entityId: props.userId,
    };
    if (props.hasFollowed) {
      unfollowAPI(ret).then((res) => {
        console.log(res);
        if (res.success) {
          location.reload();
        }
      });
    } else {
      followAPI(ret).then((res) => {
        console.log(res);
        if (res.success) {
          location.reload();
        }
      });
    }
  }

  return (
    <Row>
      <Col span={2} className="postCol">
        <Avatar size={50} icon={<UserOutlined />} src={props.userHeaderURL} onClick={()=>{
                  navigate("/user/profile/" + props.userId)
                }}/>
      </Col>
      <Col
        span={16}
        className="postCol"
        style={{ fontSize: "16px", color: "#00b96b" }}
      >
        {props.username}
      </Col>
      <Col span={5} className="postCol">
        <Row style={{ fontSize: "14px", float: "right" }}>
          {"关注于 " + props.followRecord}
        </Row>
        <Row style={{ margin: "10px 0", float: "right" }}>
          <div hidden={user.userId == 0 || props.userId == user.userId}>
            <Button
              style={{ background: props.hasFollowed ? "#00b96b" : "white" }}
              onClick={doAboutFollow}
            >
              {props.hasFollowed ? "已关注" : "关注"}
            </Button>
          </div>
        </Row>
      </Col>
      <Divider style={{ margin: "0 2px" }}></Divider>
    </Row>
  );
};

export { FollowereeElement, type FollowereeElementProps };
