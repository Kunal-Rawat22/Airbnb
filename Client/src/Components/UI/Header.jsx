import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext, useEffect, useState } from "react";

export default function Header() {
  const { user } = useContext(UserContext);
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
  console.log(screenSize);
  return (
    <div>
      {" "}
      {screenSize.width > 768 && (
        <header className="flex justify-between p-4 items-center lg:px-40 md:px-20">
          <div>
            <Link to={"/"} className="Logo text-2xl font-bold text-pink-600">
              <i className="fa-brands fa-airbnb"></i> <span>Airbnb</span>
            </Link>
          </div>
          <div
            className={`flex border border-1 border-slate-200 shadow-xl p-3 px-5 rounded-full justify-between items-center ${
              screenSize.width < 1190 && screenSize.width > 1020
                ? "lg:w-1/2"
                : "lg:w-5/12"
            } md:w-7/12 md:justify-evenly`}
          >
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
      )}
      {screenSize.width <= 768 && (
        <header className="flex px-6 py-4 items-center cursor-pointer justify-between space-x-5">
          <Link
            to={"/"}
            className="flex items-center text-center text-3xl font-bold text-pink-600"
          >
            {/* <i className="fa-solid fa-chevron-left"></i> */}
            <i className="fa-brands fa-airbnb"></i>
          </Link>
          <div className="flex sm:px-4 px-2 py-2 rounded-full shadow-lg w-10/12 border items-center sm:space-x-4 space-x-2">
            <div className="text-center">
              <i className="fa-solid fa-magnifying-glass text-black p-1 rounded-3xl px-2 hover:text-slate-400 sm:text-2xl text-base text-center"></i>
            </div>
            <div className="flex flex-col">
              <div className="font-semibold sm:text-base text-sm">Anywhere</div>
              <div className="flex space-x-2 items-center">
                <div className="font-light sm:text-sm text-xs text-slate-500">
                  Any week
                </div>
                <hr className="w-1 bg-slate-400 h-1 rounded-3xl" />
                <div className="font-light sm:text-sm text-xs text-slate-500">
                  Add guests
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <i className="fa-solid fa-filter text-black p-1 rounded-3xl px-2 hover:text-slate-400 sm:text-2xl text-base border border-black text-center"></i>
          </div>
        </header>
      )}
      <hr />
    </div>
  );
}
