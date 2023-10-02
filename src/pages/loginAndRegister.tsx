/**
 * 登录和注册父页面
 */
import { Row, Col, Card, Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import { useContext, useEffect, useState } from "react";
import { context } from "../components/AppContext";

function LoginAndRegister({ children }: any) {
  const {user} = useContext(context);
  const [ct, setCt] = useState(0);  // user改变计数
  const navigate = useNavigate();

  // 默认检查当前用户是否登录，已登录跳转主页
  useEffect(() => {
    // 这个也想直接从user取值就好，但应该是先执行子组件的useEffect再执行父组件的useEffect，先第二次调用再判断
    if (ct >= 1 && user.userId != 0) {
      navigate("/");
      message.error("禁止已登录访问");
    }
    setCt(ct + 1);
  }, [user]);  // 监听user变化

  return (
    <Row>
      <Col
        md={{
          span: 8,
          push: 8,
        }}
        xs={{
          span: 22,
          push: 1,
        }}
      >
        <div style={{ height: "25%" }} />
        <Card title="C++版牛客论坛登录注册" style={{ textAlign: "center" }}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            items=
            {[
              {
                label: "登录",
                key: "login",
                children: <Login />,
              },
              {
                label: "注册",
                key: "register",
                children: <Register />
              }
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default LoginAndRegister;
