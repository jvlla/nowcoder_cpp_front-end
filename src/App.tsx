import { Routes, Route } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./components/GeneralLayout";
import Home from "./pages/home";
import LoginAndRegister from "./pages/loginAndRegister";
import Setting from "./pages/setting";

function App() {
  return (
    <GeneralLayout>
      <Routes>
        <Route path="login" element={<LoginAndRegister />} />
        <Route path="register" element={<LoginAndRegister />} />
        <Route path="user/setting" element={<Setting />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </GeneralLayout>
  )
}

export default App;
