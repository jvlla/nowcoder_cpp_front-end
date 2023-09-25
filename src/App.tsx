import { Routes, Route } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./components/GeneralLayout";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  return (
    <GeneralLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </GeneralLayout>
  )
}

export default App;
