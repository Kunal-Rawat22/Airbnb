import { Link } from "react-router-dom";
export default function Menu()
{
    return (
      <div className="fixed bottom-0 bg-white w-full flex py-4 border items-center sm:px-8 px-4 justify-center sm:space-x-20 space-x-6 sm:text-2xl text-base text-gray-500">
        <Link to={"/account/profile"} className="flex flex-col text-center">
          <i className="fa-solid fa-user"></i>
          <span className="text-xs mt-2">Profile</span>
        </Link>
        <Link to={"/account/places"} className="flex flex-col text-center">
          <i className="fa-solid fa-building"></i>
          <span className="text-xs mt-2">Accommodations</span>
        </Link>
        <Link to={"/account/booking"} className="flex flex-col text-center">
          <i className="fa-solid fa-bars"></i>
          <span className="text-xs mt-2">Bookings</span>
        </Link>
      </div>
    );
}