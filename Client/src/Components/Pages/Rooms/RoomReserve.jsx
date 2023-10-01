/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
export default function RoomReserve({
  price,
  noOfDays,
  flag2,
  endDate,
  startDate,
}) {
  let discount = 0;
  if (noOfDays >= 7) {
    discount = 5000;
  }
  const endYear = endDate.split(" ")[3];
  const startYear = startDate.split(" ")[3];
  const startMonth = startDate.split(" ")[1];
  const endMonth = endDate.split(" ")[1];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let SI, EI;
  months.map((month, index) => {
    if (month === startMonth) SI = index + 1;
    if (month === endMonth) EI = index + 1;
  });

  if (SI / 10 < 1) SI = "0" + SI;
  if (EI / 10 < 1) EI = "0" + EI;

  const sDate = `${startYear}-${SI}-${startDate.split(" ")[2]}`;
  const eDate = `${endYear}-${EI}-${endDate.split(" ")[2]}`;
  const [adults, setAdults] = useState(1);
  const [children, setChilren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [active, setActive] = useState(false);
  function handleGuests(e) {
    e.preventDefault();
    setActive(true);
  }
  useEffect(() => {
    const handleClick = (e) => {
      console.log(e.target.id);
      if (e.target.id === "Guests") setActive(true);
      else setActive(false);
    };
    window.addEventListener("click", handleClick);
  });
  function handleGClick(e) {
    e.preventDefault();
    const name = e.target.name;
    console.log(e.target.name);
    if (name === "AD") setAdults((prev) => prev - 1);
    else if (name === "AI") setAdults((prev) => prev + 1);
    else if (name === "CD") setChilren((prev) => prev - 1);
    else if (name === "CI") setChilren((prev) => prev + 1);
    else if (name === "ID") setInfants((prev) => prev - 1);
    else if (name === "II") setInfants((prev) => prev + 1);
    else if (name === "PD") setPets((prev) => prev - 1);
    else if (name === "PI") setPets((prev) => prev + 1);
  }
  function handleReserve(e) {
    e.preventDefault();
  }
  console.log("endFate", endDate);
  console.log("object", adults);
  return (
    <div className="flex flex-col border rounded-xl shadow-lg px-6 pt-6 pb-6 sticky top-32">
      <div>
        <h2 className="text-xl font-medium">
          ₹ {price} <span className="text-base font-light">night</span>
        </h2>
      </div>
      <div className="flex flex-col border-l border-r rounded-lg border-gray-400 mt-6 mb-4">
        <div className="half flex">
          <div className="w-1/2 border-t rounded-tl-lg p-2 border-r flex flex-col border-gray-400">
            <label className="text-xs font-medium">Check In</label>
            <input
              type="date"
              name=""
              id=""
              value={sDate}
              className="text-sm font-light pt-1 focus:outline-none"
            />
          </div>
          <div className="w-1/2 p-2 flex flex-col border-t rounded-tr-lg border-gray-400">
            <label className="text-xs font-medium">Check Out</label>
            {endDate === "" ? (
              <span className="text-sm font-light pt-1">Add Date</span>
            ) : (
              <input
                type="date"
                name=""
                id=""
                value={eDate}
                className="text-sm font-light pt-1 focus:outline-none"
              />
            )}
          </div>
        </div>
        <button
          className="w-full  flex flex-col border-b border-t rounded-b-lg border-gray-400 "
          // focus:border
          // focus:border-black
          // focus:rounded-lg
          onClick={handleGuests}
          id="Guests"
        >
          <div className="p-2 text-left w-full pr-6" id="Guests">
            <label className="text-xs font-medium" id="Guests">
              Guest
            </label>
            <div
              name=""
              id="Guests"
              className="flex justify-between w-full text-base font-light"
            >
              <span id="Guests">{`${adults + children} ${
                adults + children < 2 ? "guest" : "guests"
              } ${
                infants
                  ? `, ${infants} ${infants < 2 ? "infant" : "infants"}`
                  : ""
              }${pets ? `, ${pets} ${pets < 2 ? "pet" : "pets"}` : ""}`}</span>
              {!active ? (
                <FontAwesomeIcon icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} />
              )}
            </div>
          </div>

          {active && (
            <div className="relative w-full" id="Guests">
              <div
                id="Guests"
                className=" cursor-default w-full absolute flex flex-col top-0 bg-white shadow-md border rounded-md pt-5 px-4 main-div space-y-4 pb-4 z-20"
              >
                <div className="flex justify-between one-div" id="Guests">
                  <div className="flex flex-col" id="Guests">
                    <h3 className="font-medium text-left">Adults</h3>
                    <span className="font-light text-sm text-left">
                      Age 13+
                    </span>
                  </div>
                  <div
                    className="flex w-2/5 justify-between py-1 items-center"
                    id="Guests"
                  >
                    <button
                      className={`p-1 px-2.5 border rounded-full ${
                        adults < 2 ? "border-gray-300" : "border-gray-500"
                      }`}
                      disabled={adults < 2 ? true : false}
                      id="Guests"
                      name="AD"
                      onClick={handleGClick}
                    >
                      <button
                        className={`fa-solid fa-minus ${
                          adults < 2 ? "text-gray-300" : "text-gray-500"
                        } text-sm`}
                        id="Guests"
                        name="AD"
                      ></button>
                    </button>
                    <span className="">{adults}</span>
                    <button
                      className="p-1 px-2.5 border rounded-full border-gray-500"
                      id="Guests"
                      name="AI"
                      onClick={handleGClick}
                    >
                      <button
                        className="fa-solid fa-plus text-gray-500 text-sm"
                        id="Guests"
                        name="AI"
                      ></button>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between one-div" id="Guests">
                  <div className="flex flex-col" id="Guests">
                    <h3 className="font-medium text-left">Children</h3>
                    <span className="font-light text-sm text-left">
                      Age 2-12
                    </span>
                  </div>
                  <div
                    className="flex w-2/5 justify-between py-1 items-center"
                    id="Guests"
                  >
                    <button
                      className={`p-1 px-2.5 border rounded-full ${
                        children < 1 ? "border-gray-300" : "border-gray-500"
                      }`}
                      disabled={children < 1 ? true : false}
                      id="Guests"
                      name="CD"
                      onClick={handleGClick}
                    >
                      <button
                        className={`fa-solid fa-minus ${
                          children < 1 ? "text-gray-300" : "text-gray-500"
                        } text-sm`}
                        id="Guests"
                        name="CD"
                      ></button>
                    </button>
                    <span className="">{children}</span>
                    <button
                      className="p-1 px-2.5 border rounded-full border-gray-500"
                      id="Guests"
                      name="CI"
                      onClick={handleGClick}
                    >
                      <button
                        className="fa-solid fa-plus text-gray-500 text-sm"
                        id="Guests"
                        name="CI"
                      ></button>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between one-div" id="Guests">
                  <div className="flex flex-col" id="Guests">
                    <h3 className="font-medium text-left">Infants</h3>
                    <span className="font-light text-sm text-left">
                      Under 2
                    </span>
                  </div>
                  <div
                    className="flex w-2/5 justify-between  py-1 items-center"
                    id="Guests"
                  >
                    <button
                      className={`p-1 px-2.5 border rounded-full ${
                        infants < 1 ? "border-gray-300" : "border-gray-500"
                      }`}
                      disabled={infants < 1 ? true : false}
                      id="Guests"
                      name="ID"
                      onClick={handleGClick}
                    >
                      <button
                        className={`fa-solid fa-minus ${
                          infants < 1 ? "text-gray-300" : "text-gray-500"
                        } text-sm`}
                        name="ID"
                        id="Guests"
                      ></button>
                    </button>
                    <span className="">{infants}</span>
                    <button
                      className="p-1 px-2.5 border rounded-full border-gray-500"
                      id="Guests"
                      name="II"
                      onClick={handleGClick}
                    >
                      <button
                        className="fa-solid fa-plus text-gray-500 text-sm"
                        id="Guests"
                        name="II"
                      ></button>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between one-div" id="Guests">
                  <div className="flex flex-col" id="Guests">
                    <h3 className="font-medium text-left">Pets</h3>
                    <span
                      className="font-medium underline text-sm text-left"
                      id="Guests"
                    >
                      Bringing a Service Dogs
                    </span>
                  </div>
                  <div
                    className="flex w-2/5 justify-between  py-1 items-center"
                    id="Guests"
                  >
                    <button
                      className={`p-1 px-2.5 border rounded-full ${
                        pets < 1 ? "border-gray-300" : "border-gray-500"
                      }`}
                      disabled={pets < 1 ? true : false}
                      id="Guests"
                      name="PD"
                      onClick={handleGClick}
                    >
                      <button
                        className={`fa-solid fa-minus ${
                          pets < 1 ? "text-gray-300" : "text-gray-500"
                        } text-sm`}
                        id="Guests"
                        name="PD"
                      ></button>
                    </button>
                    <span className="">{pets}</span>
                    <button
                      className="p-1 px-2.5 border rounded-full border-gray-500"
                      id="Guests"
                      name="PI"
                      onClick={handleGClick}
                    >
                      <button
                        className="fa-solid fa-plus text-gray-500 text-sm"
                        id="Guests"
                        name="PI"
                      ></button>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end  one-div" id="Guests">
                  <div className="flex flex-col justify-end ">
                    <span
                      className="text-justify text-xs text-gray-600"
                      id="Guests"
                    >
                      This place has a maximum of 12 guests, not including
                      infants. If you&apos;re bringing more than 2 pets, please
                      let your Host know.
                    </span>
                  </div>
                  <button className="mt-4 underline">Close</button>
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
      <button
        className="w-full bg-pink-600 text-white text-center p-3 rounded-lg"
        onClick={handleReserve}
      >
        {flag2 ? "Reserve" : "Check For Availablity"}
      </button>
      {flag2 && (
        <div className="w-full flex flex-col">
          <span className="text-sm text-gray-600 font-light mt-4 text-center m">
            You won&apos;t be charged yet
          </span>
          <div className="flex justify-between font-light mt-4">
            <div className="underline cursor-pointer">
              ₹{price} X {noOfDays} nights
            </div>
            <div>₹ {price * noOfDays}</div>
          </div>
          {noOfDays >= 7 && (
            <div className="flex justify-between font-light mt-4">
              <div>Weekly stay discount</div>
              <div className=" text-green-700">₹ -{discount}</div>
            </div>
          )}
          <hr className="mt-6" />

          <div className="flex justify-between font-medium pt-6">
            <div>Total before taxes</div>
            <div>₹ {price * noOfDays - discount}</div>
          </div>
        </div>
      )}
    </div>
  );
}
