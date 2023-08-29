import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import ProfileTab from "../../Components/Pages/AccountPage/ProfileTab/ProfileView";

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);
  const { subpage } = useParams();
  function linkClasses(type = null) {
    let classes = "font-semibold cursor-pointer rounded-full py-3 px-5 text-lg";
    if (type === subpage) classes +=
      " bg-pink-600  text-white  hover:bg-slate-200 hover:text-slate-500 hover:shadow-xl";
    else
      classes +=
        " bg-slate-50 rounded-full py-3 px-5 text-slate-500 shadow-md text-lg font-semibold cursor-pointer hover:bg-pink-600 hover:text-white";
    return classes;
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <div className="flex w-2/5 justify-between mx-auto mt-10">
        <Link to={"/account/profile"} className={linkClasses("profile")}>
          <i className="fa-solid fa-user text-center"></i>&nbsp;&nbsp;Profile
        </Link>
        <Link to={"/account/places"} className={linkClasses("places")}>
          <i className="fa-solid fa-building"></i>&nbsp;&nbsp;My Accommodations
        </Link>
        <Link to={"/account/booking"} className={linkClasses("booking")}>
          <i className="fa-solid fa-bars"></i>&nbsp;&nbsp;My Bookings
        </Link>
          </div>
          {subpage==='profile'&&<ProfileTab/>}
    </div>
  );
}
