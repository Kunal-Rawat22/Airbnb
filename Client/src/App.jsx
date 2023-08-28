import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./Pages/IndexPage/IndexPage";
import Layout from "../Layout";
import LoginForm from "./Pages/LoginPage/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginForm/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
