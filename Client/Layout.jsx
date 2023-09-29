import { Outlet } from "react-router-dom";
import Header from "./src/Components/UI/Header";
import Footer from "./src/Components/UI/Footer";
export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
