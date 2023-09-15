import { Routes, Route } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./components/GeneralLayout";
import Home from "./pages/home";

function App() {
  return (
    <GeneralLayout>
      <Routes>
        <Route path="" element={<Home />} />
      </Routes>
    </GeneralLayout>
  );
}

export default App;
