import { Outlet } from "react-router-dom";
import Header from "./src/Components/UI/Header";
import Footer from "./src/Components/UI/Footer";
import Chatbot from "./src/Components/UI/ChatBot";
export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Chatbot/>
      <Footer />
    </div>
  );
}
