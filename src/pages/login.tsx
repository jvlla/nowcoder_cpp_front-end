import { Row, Col, Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { loginAPI, captchaAPI } from "../services/user";
import { logo, sleep } from "../utils/tools";
import { useState } from "react";

function Login() {
  const [isVarified, setIsVarified] = useState(false);
  const navigate = useNavigate();

  function doVerity(ticket: string) {
    console.log("here");
    if (!isVarified) {
      sleep(1000).then(() => {
        setIsVarified(true);
        var ret = { ticket: ticket};
        captchaAPI(ret).then((res) => {
          if (res.success) {
            message.success(res.message);
          } else {
            message.error(res.message);
          }
        });
      });
    }
  }

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
        <img
          src={logo}
          style={{
            display: "block",
            margin: "20px auto",
            borderRadius: "16px",
            width: "200px",
          }}
        />
        <Card title="C++版牛客论坛登录" style={{ textAlign: "center" }}>
          <Form
            labelCol={{
              md: {
                span: 4,
              },
            }}
            onFinish={async (v) => {
              console.log(v);
              const res = await loginAPI(v);
              console.log(res);
              if (res.success) {
                message.success(res.message);
                sleep(500).then(() => {
                  navigate("/");
                });
              } else {
                message.error(res.message);
              }
            }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  display: "block",
                  margin: "8px auto",
                  width: "20vw",
                }}
              >
                登录
              </Button>
              <div hidden={isVarified}>
                <ReCAPTCHA
                  sitekey="6LfY_0EoAAAAANyIkFtnTGxsJJFFpvjV1J7s082r"
                  onChange={doVerity}
                />
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
