/* eslint-disable react/prop-types */

export default function GuestList({
  adults,
  Children,
  infants,
  pets,
  setAdults,
  setChildren,
  setInfants,
  setPets,
  screenSize,
  setActive
}) {
  function handleGClick(e) {
    e.preventDefault();
    const name = e.target.name;
    console.log(e.target.name);
    if (name === "AD") setAdults((prev) => prev - 1);
    else if (name === "AI") setAdults((prev) => prev + 1);
    else if (name === "CD") setChildren((prev) => prev - 1);
    else if (name === "CI") setChildren((prev) => prev + 1);
    else if (name === "ID") setInfants((prev) => prev - 1);
    else if (name === "II") setInfants((prev) => prev + 1);
    else if (name === "PD") setPets((prev) => prev - 1);
    else if (name === "PI") setPets((prev) => prev + 1);
  }
  function handleActive(e) {
    e.preventDefault();
    setActive(false);
  }
  // function handleReserve(e) {
  //   e.preventDefault();
  // }
  return (
    <div
      className={`${screenSize.width <= 768 ? "absolute" : "relative"} w-full`}
      id="Guests"
    >
      <div
        id="Guests"
        className={`${
          screenSize.width <= 768 ? "bottom-8 right-8" : "top-0"
        } cursor-default w-full absolute flex flex-col bg-white shadow-md border rounded-md pt-5 px-4 main-div space-y-4 pb-4 z-20`}
      >
        <div className="flex justify-between one-div" id="Guests">
          <div className="flex flex-col" id="Guests">
            <h3 className="font-medium text-left">Adults</h3>
            <span className="font-light text-sm text-left">Age 13+</span>
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
              className={`p-1 px-2.5 border rounded-full ${
                adults + Children > 11 ? "border-gray-300" : "border-gray-500"
              }`}
              id="Guests"
              name="AI"
              onClick={handleGClick}
              disabled={adults + Children > 11 ? true : false}
            >
              <button
                className={`fa-solid fa-plus ${
                  adults + Children > 11 ? "text-gray-300" : "text-gray-500"
                } text-sm`}
                id="Guests"
                name="AI"
              ></button>
            </button>
          </div>
        </div>
        <div className="flex justify-between one-div" id="Guests">
          <div className="flex flex-col" id="Guests">
            <h3 className="font-medium text-left">Children</h3>
            <span className="font-light text-sm text-left">Age 2-12</span>
          </div>
          <div
            className="flex w-2/5 justify-between py-1 items-center"
            id="Guests"
          >
            <button
              className={`p-1 px-2.5 border rounded-full ${
                Children < 1 ? "border-gray-300" : "border-gray-500"
              }`}
              disabled={Children < 1 ? true : false}
              id="Guests"
              name="CD"
              onClick={handleGClick}
            >
              <button
                className={`fa-solid fa-minus ${
                  Children < 1 ? "text-gray-300" : "text-gray-500"
                } text-sm`}
                id="Guests"
                name="CD"
              ></button>
            </button>
            <span className="">{Children}</span>
            <button
              className={`p-1 px-2.5 border rounded-full ${
                adults + Children > 11 ? "border-gray-300" : "border-gray-500"
              }`}
              id="Guests"
              name="CI"
              onClick={handleGClick}
              disabled={adults + Children > 11 ? true : false}
            >
              <button
                className={`fa-solid fa-plus ${
                  adults + Children > 11 ? "text-gray-300" : "text-gray-500"
                } text-sm`}
                id="Guests"
                name="CI"
              ></button>
            </button>
          </div>
        </div>
        <div className="flex justify-between one-div" id="Guests">
          <div className="flex flex-col" id="Guests">
            <h3 className="font-medium text-left">Infants</h3>
            <span className="font-light text-sm text-left">Under 2</span>
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
              className={`p-1 px-2.5 border rounded-full ${
                infants > 4 ? "border-gray-300" : "border-gray-500"
              }`}
              id="Guests"
              name="II"
              onClick={handleGClick}
              disabled={infants > 4 ? true : false}
            >
              <button
                className={`fa-solid fa-plus ${
                  infants > 4 ? "text-gray-300" : "text-gray-500"
                } text-sm`}
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
              className={`p-1 px-2.5 border rounded-full ${
                pets > 1 ? "border-gray-300" : "border-gray-500"
              }`}
              id="Guests"
              name="PI"
              onClick={handleGClick}
              disabled={pets > 1 ? true : false}
            >
              <button
                className={`fa-solid fa-plus ${
                  pets > 1 ? "text-gray-300" : "text-gray-500"
                } text-sm`}
                id="Guests"
                name="PI"
              ></button>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end  one-div" id="Guests">
          <div className="flex flex-col justify-end ">
            <span className="text-justify text-xs text-gray-600" id="Guests">
              This place has a maximum of 12 guests, not including infants. If
              you&apos;re bringing more than 2 pets, please let your Host know.
            </span>
          </div>
          <button className="mt-4 underline" onClick={handleActive}>Close</button>
        </div>
      </div>
    </div>
  );
}
