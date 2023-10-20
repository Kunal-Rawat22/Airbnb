import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import ProfileTab from "../../Components/Pages/AccountPage/ProfileTab/ProfileView";
import AccommodationTab from "../../Components/Pages/AccountPage/Accomodation/AccomodationView";

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);
  const { subpage } = useParams();
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function linkClasses(type = null) {
    let classes =
      "lg:font-semibold cursor-pointer rounded-full lg:py-3 lg:px-5 lg:text-lg";
    if (type === subpage)
      classes +=
        " bg-pink-600  text-white  hover:bg-slate-200 hover:text-slate-500 hover:shadow-xl";
    else
      classes +=
        " bg-slate-50 rounded-full lg:py-3 lg:px-5 text-slate-500 shadow-md lg:text-lg lg:font-semibold cursor-pointer hover:bg-pink-600 hover:text-white";
    return classes;
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="pb-16">
      {screenSize.width > 768 && (
        <div className="flex lg:w-2/5 md:w-3/5  justify-between mx-auto mt-10">
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
      )}
      {subpage === "profile" && <ProfileTab />}
      {subpage === "places" && <AccommodationTab />}
    </div>
  );
}
