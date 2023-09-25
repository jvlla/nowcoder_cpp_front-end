/*
 * 页面中Header的右侧部分
 */
import { Space, MenuProps, Button, Dropdown, Badge, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export type RightHeaderProps = {
  userId: number;
  username: string;
  userHeaderURL: string;
}

export const RightHeader = (user: RightHeaderProps) => {
  // header中dropdown组件菜单选项，之后记得改网址
  var items: MenuProps["items"] = [
    {
      key: "1",
      label: <a href="https://www.antgroup.com">消息通知</a>,
    },
    {
      key: "2",
      label: <a href="https://www.aliyun.com">系统通知</a>,
    },
    {
      key: "3",
      label: <a href="https://www.luohanacademy.com">退出登录</a>,
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
            <Badge count={10}>
              <Avatar
                size={32}
                icon={<UserOutlined />}
                src={user.userHeaderURL}
              />
            </Badge>
          </Space>
        </Dropdown>
      </div>
      <div hidden={user.userId != 0}>
        <Button className="loginButton">登录/注册</Button>
      </div>
    </>
  );
};
