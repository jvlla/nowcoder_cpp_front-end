/**
 * 注册子页面
 */
import { Row, Col, Form, Input, Button, notification, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../services/user";

function isEmail(str: string) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

function Register() {
  const navigate = useNavigate();

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
        const res = await registerAPI(v);
        console.log(res);
        if (res.success) {
          // 不能sleep了，不然notification弹不出来
          navigate("/");
          notification.open({
            message: "注册成功，激活链接已发送至邮箱",
            placement: "top",
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
      <Form.Item
        label="请确认密码"
        name="rePassword"
        required
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue("password") == "") {
                return Promise.reject("请再次输入密码");
              } else if (getFieldValue("password") != value) {
                return Promise.reject("密码与确认新密码不同");
              } else if (getFieldValue("password") === value) {
                return Promise.resolve();
              } else {
                return Promise.reject("确认错误");
              }
            },
          }),
        ]}
      >
        <Input.Password placeholder="请再次输入密码" />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue("email") == "") {
                return Promise.reject("请输入邮箱");
              } else if (!isEmail(getFieldValue("email"))) {
                return Promise.reject("请输入正确格式的邮箱");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password placeholder="请输入邮箱" />
      </Form.Item>
      <Row>
        <Col offset={4}>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                display: "block",
                width: "25.8vw",
              }}
            >
              注册
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Register;
