import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {" "}
      <header className="flex justify-between p-4 items-center px-10">
        <div>
          <Link to={'/'} className="Logo text-2xl font-bold text-pink-600">
            <i className="fa-brands fa-airbnb"></i> <span>Airbnb</span>
          </Link>
        </div>
        <div className="flex border border-1 border-slate-200 shadow-xl p-3 px-5 rounded-full space-x-4 items-center">
          <div className="font-medium hover:font-bold cursor-pointer text-sm">
            Anywhere
          </div>
          <div className="border-1 border-l border-gray-400 h-7 shadow-lg"></div>
          <div className="font-medium hover:font-bold cursor-pointer text-sm ">
            Any week
          </div>
          <div className="border-1 border-l border-gray-400 h-7 shadow-lg"></div>
          <div className=" font-light text-slate-600 hover:font-semibold cursor-pointer text-sm ">
            Add Guests
          </div>
          <div className=" cursor-pointer">
            <i className="fa-solid fa-magnifying-glass text-white bg-pink-600 p-1 rounded-3xl px-2 hover:text-pink-800 text-base"></i>
          </div>
        </div>
        <Link
          to={user?"/account/profile":"/login"}
          className="border border-1 flex items-center space-x-4 p-2 rounded-3xl px-4 shadow-md text-lg cursor-pointer"
        >
          <div>
            <i className="fa-solid fa-bars "></i>
          </div>
          {!user ? (
              <div>
                <i className="fa-solid fa-user bg-slate-600 text-white p-1.5 rounded-full"></i>
              </div>
          ) : (
              <div className=" bg-slate-600 text-white px-2 rounded-full">
                {user?.userName[0]}
              </div>
          )}
        </Link>
      </header>
      <hr />
    </div>
  );
}
