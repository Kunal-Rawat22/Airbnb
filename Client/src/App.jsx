import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./Pages/IndexPage/IndexPage";
import Layout from "../Layout";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
