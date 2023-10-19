import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {" "}
      <header className="flex justify-between p-4 items-center px-40  ">
        <div>
          <Link to={"/"} className="Logo text-2xl font-bold text-pink-600">
            <i className="fa-brands fa-airbnb"></i> <span>Airbnb</span>
          </Link>
        </div>
        <div className="flex border border-1 border-slate-200 shadow-xl p-3 px-5 rounded-full justify-between items-center w-2/6">
          <div className="font-medium hover:font-bold cursor-pointer text-sm w-1/5">
            Anywhere
          </div>
          <div className="border-1 border-l border-gray-400 h-7 shadow-lg"></div>
          <div className="font-medium hover:font-semibold cursor-pointer text-sm w-1/5 text-center">
          Any week
          </div>
          <div className="border-1 border-l border-gray-400 h-7 shadow-lg"></div>
          <div className=" font-light text-slate-600 hover:text-black hover:font-normal cursor-pointer text-sm  text-center">
            Add Guest
          </div>
          <div className=" cursor-pointer">
            <i className="fa-solid fa-magnifying-glass text-white bg-pink-600 p-1 rounded-3xl px-2 hover:bg-slate-400 text-base"></i>
          </div>
        </div>
        <Link
          to={user ? "/account/profile" : "/login"}
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
