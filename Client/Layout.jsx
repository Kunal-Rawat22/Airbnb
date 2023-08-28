import { Outlet } from "react-router-dom";
import Header from "./src/Components/UI/Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
