import { useEffect, useState } from "react";
import Menu from "./Menu";
export default function Footer() {
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
  return (
    <div>
      {screenSize.width <= 768 && <Menu />}
      <footer className="bg-gray-50 border-t border-gray-300 lg:pb-4 md:pb-4 pb-28">
        <div className="upper-half lg:px-32 md:px-20 lg:pt-8 px-4 pt-8">
          <h2 className="text-xl font-medium px-4">
            Inspiration for future getaways
          </h2>
          <div className="text-sm font-medium pt-2 px-4 ">
            <div className="grid-cols-5 lg:grid-cols-8 lg:space-x-6  md:space-x-6 sm:space-x-8 space-x-3 w-full h-14">
              <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                Popular
              </button>
              <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                Arts & culture
              </button>
              <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                Outdoors
              </button>
              <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                Mountains
              </button>
              {screenSize.width > 555 && (
                <>
                  <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                    Beach
                  </button>
                  <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                    Unique stays
                  </button>
                  {screenSize.width > 810 && (
                    <>
                      <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                        Categories
                      </button>
                    </>
                  )}
                  {screenSize.width > 930 && (
                    <>
                      <button className="py-4 text-slate-500 focus:text-black focus:border-b-2 focus:border-black">
                        Things to do
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            <hr className="w-full text-slate-600 " />
          </div>
        </div>
        {screenSize.width > 555 && (
          <div
            className={`${
              screenSize.width > 1023
                ? "px-32"
                : `${screenSize.width > 768 ? "px-20" : "px-4"} `
            } lower-half`}
          >
            <div className="grid grid-cols-6 px-4 pt-8 text-sm gap-8 pb-8">
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">London</span>
                <span className="text-slate-500 font-light">England</span>
              </div>
            </div>
          </div>
        )}
        <hr className="w-screen text-center" />
        <div className="upper-2-half ">
          <div
            className={`${
              screenSize.width > 555
                ? `${
                    screenSize.width > 1023
                      ? "px-36"
                      : `${screenSize.width > 768 ? "px-24" : "px-8"}`
                  } grid grid-cols-3 pt-8 text-sm gap-8 pb-8 `
                : "pt-8 flex flex-col justify-start px-8 space-y-6"
            }`}
          >
            <div className="flex flex-col space-y-2">
              <h5 className="font-medium">Support</h5>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Help Centre
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                AirCover
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Anti-discrimination
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Disability support
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Cancellation options
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Report neighbourhood concern
              </div>
            </div>
            {screenSize.width <= 555 && <hr />}
            <div className="flex flex-col space-y-2">
              <h5 className="font-medium">Hosting</h5>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Airbnb your home
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                AirCover for Hosts
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Hosting resources
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Community forum
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Hosting responsibly
              </div>
            </div>
            {screenSize.width <= 555 && <hr />}
            <div className="flex flex-col space-y-2">
              <h5 className="font-medium">Airbnb</h5>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Newsroom
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                New features
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Careers
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Investors
              </div>
              <div className="text-slate-600 font-light hover:underline cursor-pointer">
                Airbnb.org emergency stays
              </div>
            </div>
          </div>
          <div className="px-4">
            {/* <hr className="w-full text-slate-600" /> */}
          </div>
          <div className="lower-2-half"></div>
        </div>
      </footer>
    </div>
  );
}
