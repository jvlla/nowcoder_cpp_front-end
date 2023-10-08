import ReactDOM from "react-dom/client";
import zhCN from "antd/lib/locale/zh_CN";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import AppProvider from "./components/appContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
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
  </AppProvider>
);
