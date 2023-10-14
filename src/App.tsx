import { Routes, Route } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./components/generalLayout";
import Home from "./pages/home";
import LoginAndRegister from "./pages/loginAndRegister";
import Setting from "./pages/setting";
import Detail from "./pages/detail";
import Letter from "./pages/letter";
import Notice from "./pages/notice";

function App() {
  return (
    <GeneralLayout>
      <Routes>
        <Route path="login" element={<LoginAndRegister />} />
        <Route path="register" element={<LoginAndRegister />} />
        <Route path="user/setting" element={<Setting />} />
        <Route path="letter" element={<Letter />} />
        <Route path="notice" element={<Notice />} />
        <Route path="detail/*" element={<Detail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </GeneralLayout>
  );
}

export default App;
