import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, message, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { context } from "../components/appContext";
import { getUserProfileAPI } from "../services/user";
import { followAPI, unfollowAPI } from "../services/likeAndFollow";
import { ENTITY_TYPE_USER } from "../utils/tools";
import "../components/css/setting.css";

type ProfileProps = {
  userId: number;
  username: string;
  userHeaderURL: string;
  registerRecord: string;
  likeCount: number;
  followeeCount: number;
  followerCount: number;
  hasFollowed: boolean;
};

function Profile() {
  const { user } = useContext(context);
  const url = window.location.href;
  const userId = url.substring(url.lastIndexOf("/") + 1, url.length); // 用户
  const [data, setData] = useState<ProfileProps>({
    userId: 0,
    username: "",
    userHeaderURL: "",
    registerRecord: "",
    likeCount: 0,
    followeeCount: 0,
    followerCount: 0,
    hasFollowed: false,
  }); // 用户数据
  const navigate = useNavigate();

  function doAboutFollow() {
    var ret = {
      entityType: ENTITY_TYPE_USER,
      entityId: data.userId,
    };
    if (data.hasFollowed) {
      unfollowAPI(ret).then((res) => {
        console.log(res);
      });
    } else {
      followAPI(ret).then((res) => {
        console.log(res);
      });
    }
    location.reload();
  }

  useEffect(() => {
    getUserProfileAPI(userId).then((res) => {
      if (!res.success) {
        navigate("/");
        message.error("查无此用户");
      }
      setData(res.data);
    });
  }, [user]);

  return (
    <Row>
      <Col span={16} offset={4} className="post" style={{ minHeight: "300px" }}>
        <div style={{ height: "25%" }} />
        {/* 头像 */}
        <Row>
          <Col span={2} offset={1}>
            <Avatar
              size={75}
              icon={<UserOutlined />}
              src={data.userHeaderURL}
            />
          </Col>
          <Col span={16} offset={1}>
            <Row style={{ color: "orange", fontSize: "24px" }}>
              {data.username}
            </Row>
            <br />
            <Row style={{ fontSize: "14px" }}>
              {"注册于 " + data.registerRecord}
            </Row>
            <br />
            <Row style={{ fontSize: "14px" }}>
              关注了&nbsp;
              <a href={"/followees/" + data.userId}>{data.followeeCount}</a>
              &nbsp;人 &emsp;&emsp; 关注者&nbsp;
              <a href={"/followers/" + data.userId}>{data.followerCount}</a>
              &nbsp;人 &emsp;&emsp; 获得了&nbsp;<a href="">{data.likeCount}</a>
              &nbsp;个赞
            </Row>
          </Col>
          <Col span={4}>
            <div hidden={user.userId == 0 || data.userId == user.userId}>
              <Button
                style={{ background: data.hasFollowed ? "#00b96b" : "white" }}
                onClick={doAboutFollow}
              >
                {data.hasFollowed ? "已关注" : "关注"}
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Profile;
