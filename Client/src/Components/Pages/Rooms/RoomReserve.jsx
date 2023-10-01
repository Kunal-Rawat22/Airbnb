/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import GuestList from "./GuestList/GuestList";
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
  const [Children, setChildren] = useState(0);
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
              <span id="Guests">{`${adults + Children} ${
                adults + Children < 2 ? "guest" : "guests"
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
            <GuestList
              adults={adults}
              Children={Children}
              infants={infants}
              pets={pets}
              setAdults={setAdults}
              setChildren={setChildren}
              setInfants={setInfants}
              setPets={setPets}
            />
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
