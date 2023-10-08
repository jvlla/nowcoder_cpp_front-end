/**
 * 修改用户设置页面
 */
import { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button, message, Divider, Upload } from "antd";
import { getUserAPI, uploadHeader } from "../services/user";
import { context } from "../components/appContext";
import "../components/css/setting.css";
import { useNavigate } from "react-router-dom";

// 上传头像部分来自 https://blog.csdn.net/wscwj8/article/details/105691170
/***
	上传验证格式及大小
*/
function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传JPG或PNG文件!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("图片大小需小于1MB!");
    return false;
  }
  return isJpgOrPng && isLt2M;
}

function Setting() {
  const { user, setUser } = useContext(context);
  const [imageBase64, setImageBase64] = useState<string>(""); // 上传之后的数据
  const [ct, setCt] = useState(0);
  const props = {
    customRequest: customRequest,
    showUploadList: false, // 不展示文件列表
    beforeUpload: beforeUpload,
  };
  const navigate = useNavigate();

  // 默认检查当前用户是否登录，未登录跳转主页
  useEffect(() => {
    // 这个也想直接从user取值就好，但是先执行子组件的useEffect再执行父组件的useEffect，暂时先第二次调用再判断
    if (ct >= 1 && user.userId == 0) {
      navigate("/");
      message.error("禁止未登录访问");
    }
    setCt(ct + 1);
  }, [user]);

  function uploadImage() {
    var json = {
      image: imageBase64,
    };
    uploadHeader(json).then((res) => {
      console.log(res);
      if (res.success) {
        message.success("图片上传成功");
        getUserAPI().then((res) => {
          console.log(res.user);
          setUser(res.user);
        });
      } else {
        message.error(res.message);
      }
    });
  }

  /**
    获取file，通过FileReader获取图片的 base64
  */
  function customRequest(option: any) {
    const formData = new FormData();
    formData.append("files[]", option.file);
    const reader = new FileReader();
    reader.readAsDataURL(option.file);
    console.log(option);
    reader.onloadend = function (e: any) {
      console.log(e.target.result); // 打印图片的base64
      setImageBase64(e.target.result);
      if (e && e.target && e.target.result) {
        option.onSuccess();
      }
    };
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
        <div style={{ height: "25%" }} />
        <Card title="更改头像" style={{ textAlign: "center" }}>
          <Row>
            <Col span={14}>
              <img src={imageBase64} className="headerImage" />
            </Col>
            <Col>
              <Row>
                <Upload {...props}>
                  <Button>选择头像</Button>
                </Upload>
              </Row>
              <Divider />
              <Row>
                <Button onClick={uploadImage}>上传头像</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Setting;
