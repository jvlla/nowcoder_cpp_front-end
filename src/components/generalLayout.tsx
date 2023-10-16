/*
 * 默认布局，全部网页都要使用
 */
import { Layout, Space, Row, Col, Input, message } from "antd";
import { logo } from "../utils/tools";
import { useContext, useEffect } from "react";
import { getUserAPI } from "../services/user";
import { RightHeader } from "./rightHeader";
import { context } from "./appContext";
import "./css/generalLayout.css"

// 布局
const { Header, Content, Footer } = Layout;
// Header中的搜索框，不知道为什么，但换名字之后就有了搜索按钮
const { Search } = Input;

const GeneralLayout = ({ children }: any) => {
  const {user, setUser} = useContext(context);

  // 默认先获得当前用户
  useEffect(() => {
    getUserAPI().then((res) => {
      console.log(res.user);
      setUser(res.user);
    });
  }, []);

  return (
    <Layout
      className="layout"
      style={{ width: "100%", height: "100%" }} // 拉伸全屏
      id="components-layout-demo-top"
    >
      <Header>
        {/* 通过栅格系统定位子组件，要不float, align什么的真不行 */}
        <Row>
          {/* 网站图标 */}
          <Col span={2}>
            <a href="/">
              <img src={logo} alt="牛客网" className="logo"></img>
            </a>
          </Col>
          {/* 搜索框 */}
          <Col span={4} offset={16}>
            <Search
              placeholder="input search text"
              onSearch={() => {}}
              style={{
                width: 150,
                float: "right",
                marginTop: "17px",
              }}  // 就这一个style也不分css文件了
            />
          </Col>
          {/* 头像或登录注册按钮 */}
          <Col span={2}>
            <RightHeader {...user} />
          </Col>
        </Row>
      </Header>
      {/* 这个min-height是权宜之计，让footer不满一屏的时候也能呆在最下面 */}
      {/* <Content style={{ minHeight: "68.7vh" }}>{children}</Content> */}
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center", backgroundColor: "black" }}>
        <Row>
          <Col span={4} offset={4}>
            <img
              src="https://uploadfiles.nowcoder.com/app/app_download.png"
              style={{ width: "136px", height: "136px" }}
            />
          </Col>
          <Col span={12}>
            {/* 这个标签是可以造出来但1.不能左对齐; 2.下面的文字不会换行，先这样 */}
            <ul id="nav">
              <li>
                <a href="https://www.nowcoder.com/nowcoder/about">关于我们</a>
              </li>
              <li>
                <a href="https://www.nowcoder.com/nowcoder/recruitment">
                  加入我们
                </a>
              </li>
              {/* 这个回头可以填一下，说没这功能 */}
              <li>
                <a href="#">意见反馈</a>
              </li>
              <li>
                <a href="https://hr.nowcoder.com/?utm_channel=nkweb_homepage">
                  企业服务
                </a>
              </li>
              <li>
                <a href="https://www.nowcoder.com/nowcoder/school-cooperation">
                  校企合作
                </a>
              </li>
              <li>
                <a href="https://www.nowcoder.com/html/cooperation">联系我们</a>
              </li>
              <li>
                <a href="https://www.nowcoder.com/html/disclaimer">免责声明</a>
              </li>
            </ul>
            <br></br>
            {/* 左边的竖线不知道为什么会连在一起，先直接打吧；这div设置display:inline 第一个换行也有问题，先凑合 */}
            <Space></Space>
            <div className="footerInfo">
              |
              公司地址：北京市朝阳区北苑路北美国际商务中心K2座一层-北京牛客科技有限公司
            </div>
            <div className="footerInfo">| 联系方式：010-60728802</div>
            <div className="footerInfo">
              | 投诉举报电话：010-57596212（朝阳人力社保局）
            </div>
            <div className="footerInfo">
              | 牛客科技©2023 All rights reserved
            </div>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default GeneralLayout;
