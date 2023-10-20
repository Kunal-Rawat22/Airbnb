/* eslint-disable react/prop-types */
import { useState } from "react";
import GuestList from "./GuestList/GuestList";
export default function ReserveBar({ price, endDate, startDate, screenSize }) {
  const [active, setActive] = useState(false);
  const [adults, setAdults] = useState(1);
  const [Children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  function handleReserve(e) {
    e.preventDefault();
    setActive(true);
  }
  return (
    <div className="fixed bottom-0 bg-white w-full flex py-4 border items-center px-8 justify-between">
      <div className="flex flex-col pr-8">
        <div className="font-semibold">
          ₹{price} <span className="font-normal text-sm">night</span>
        </div>
        <div className="underline">
          <span>{startDate}</span> -{" "}
          <span>{!endDate ? startDate : endDate}</span>
        </div>
      </div>
      <button
        className="p-4 bg-pink-600 text-white px-6 rounded-lg"
        onClick={handleReserve}
      >
        Reserve
      </button>
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
          screenSize={screenSize}
          setActive={setActive}
        />
      )}
    </div>
  );
}
