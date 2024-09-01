import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./Pages/IndexPage/IndexPage";
import Layout from "../Layout";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./Pages/AccountPage/AccountPage";
import RoomPage from "./Pages/Rooms/RoomPage";
import BookingPage from "./Pages/BookingPage/BookingPage";
import TripPlanner from "./Trial";
import GetLocation from "./GeoLocation";
import MapComponent from "./Map";
import TravelPromptGenerator from "./Country";
import LocationSelector from "./Country";
import PaymentSuccess from "./PaymentSuccess";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
          <Route path="/rooms/:subpage" element={<RoomPage />} />
          <Route path="/book/stays/:subpage?" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    // <PaymentSuccess/>
    // <TripPlanner/>
    // <GetLocation />
    // <MapComponent />
    // <PaymentGateway/>
    // <TravelPromptGenerator/>
    // <LocationSelector/>
  );
}

export default App;
