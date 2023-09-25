import ReactDOM from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
// 数据模拟，后端实现后注释
// import './mock/post'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.compactAlgorithm,
        token: {
          colorPrimary: "#00b96b",
          // borderRadius: 2,
        },
      }}
    >
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </ConfigProvider>
  </Router>
);
