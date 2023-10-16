/*
 * 页面中Header的右侧部分组件
 */
import { useNavigate } from "react-router-dom";
import { Space, MenuProps, Button, Dropdown, Badge, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export type RightHeaderProps = {
  userId: number;
  username: string;
  userHeaderURL: string;
  infoCount: number
}

export const RightHeader = (user: RightHeaderProps) => {
  const navigate = useNavigate();

  // header中dropdown组件菜单选项，之后记得改网址
  var items: MenuProps["items"] = [
    {
      key: "1",
      label: <a href="/letter">私信查看</a>,
    },
    {
      key: "2",
      label: <a href="/notice">消息查看</a>,
    },
    {
      key: "3",
      label: <a href="/user/setting">账号设置</a>,
    },
    {
      key: "4",
      label: <a href="/api/logout">退出登录</a>,
    },
    {
      key: "4",
      label: <div style={{ textAlign: "center" }}>{user.username}</div>,
      danger: true, // 没办法，用这个标记人名吧
    },
  ];

  return (
    <>
      {/* 这div都是为了能隐藏用的 */}
      <div hidden={user.userId == 0}>
        <Dropdown menu={{ items }}>
          <Space style={{ float: "right" }}>
            <Badge count={user.infoCount}>
              <Avatar
                size={32}
                icon={<UserOutlined />}
                src={user.userHeaderURL}
                onClick={()=>{
                  navigate("/user/profile/" + user.userId)
                }}
              />
            </Badge>
          </Space>
        </Dropdown>
      </div>
      <div hidden={user.userId != 0}>
        <Button className="loginButton" onClick={() => {navigate("/login");}}>登录/注册</Button>
      </div>
    </>
  );
};
