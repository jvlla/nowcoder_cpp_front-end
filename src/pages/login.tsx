/**
 * 登录子页面
 */
import { Row, Col, Form, Input, Button, message, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { loginAPI, captchaAPI, getUserAPI } from "../services/user";
import { sleep } from "../utils/tools";
import { useContext, useState } from "react";
import { context } from "../components/AppContext";

function Login() {
  const { setUser } = useContext(context);
  const [isVarified, setIsVarified] = useState(false);  // 是否使用谷歌captcha标志，为真隐藏验证
  const navigate = useNavigate();

  // 验证captcha函数，展示是否验证成功
  function doVerity(ticket: any) {
    if (!isVarified) {
      setIsVarified(true);
      var ret = { ticket: ticket };
      captchaAPI(ret).then((res) => {
        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    }
  }

  return (
    <Form
      labelCol={{
        md: {
          span: 4,
        },
      }}
      initialValues={{
        rememberMe: false,
      }}
      onFinish={async (v) => {
        console.log(v);
        const res = await loginAPI(v);
        console.log(res);
        if (res.success) {
          message.success(res.message);
          sleep(500).then(() => {
            navigate("/");
            // 重新获取登录用户
            getUserAPI().then((res) => {
              console.log(res.user);
              setUser(res.user);
            });
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
      <Row>
        <Col offset={4}>
          <Form.Item style={{ display: "inline-flex" }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                display: "block",
                margin: "",
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Col>
        <Col offset={1}>
          <Form.Item
            name="rememberMe"
            valuePropName="checked"
            style={{
              display: "inline-flex",
            }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
        </Col>
        <Col offset={4}>
          <div hidden={isVarified}>
            <ReCAPTCHA
              sitekey="6LfY_0EoAAAAANyIkFtnTGxsJJFFpvjV1J7s082r"
              onChange={doVerity}
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default Login;
