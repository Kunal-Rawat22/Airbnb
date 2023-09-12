import { Link, Navigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../../UserContext";
import axios from "axios";
export default function AccommodationTab() {
  const { ready, user } = useContext(UserContext);
  const [userInput, setUserInput] = useState({
    title: "",
    address: "",
    photos: [
      {
        path: "",
        picTitle: "",
      },
    ],
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
  });

  let add = false;
  const { action } = useParams();
  if (action === "new") {
    add = true;
  }

  //Handling Title
  function handleTitle(event) {
    setUserInput((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  }

  //Handling Address
  function handleAddress(event) {
    setUserInput((prevState) => ({
      ...prevState,
      address: event.target.value,
    }));
  }

  //Handling CheckIn
  function handleCheckIn(event) {
    setUserInput((prevState) => ({
      ...prevState,
      checkIn: event.target.value,
    }));
  }

  //Handling CheckOut
  function handleCheckOut(event) {
    setUserInput((prevState) => ({
      ...prevState,
      checkOut: event.target.value,
    }));
  }

  //Handling MaxGuest
  function handleMaxGuest(event) {
    setUserInput((prevState) => ({
      ...prevState,
      maxGuests: event.target.value,
    }));
  }

  //Handling Address
  function handleDescription(event) {
    setUserInput((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  }

  //Handling ExtraInfo
  function handleExtraInfo(event) {
    setUserInput((prevState) => ({
      ...prevState,
      extraInfo: event.target.value,
    }));
  }

  //Handling Perks
  function handlePerks(event) {
    if (userInput.perks.includes(event.target.value)) {
      setUserInput((prevState) => ({
        ...prevState,
      }));
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        perks: [...prevState.perks, event.target.value],
      }));
    }
  }
  //Handling onSubmit
  async function handleOnSubmit(event) {
    event.preventDefault();
    console.log(userInput);
    try {
      await axios.post("/addPlaces", userInput);
      alert("You have added successfully.");
    } catch (e) {
      alert("Couldn't Add!! Try Again Later");
    }
  }

  //   Cookie
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  console.log(userInput);
  return (
    <div>
      {!add && (
        <div className="text-center mt-10">
          <Link
            className="bg-pink-600 text-white p-3 text-base font-semibold px-5 rounded-full text-center"
            to={"/account/places/new"}
          >
            <i className="fa-solid fa-plus"></i> Add New Place
          </Link>
        </div>
      )}

      {add === true && (
        <form className="px-8 py-4 flex flex-col w-1/3 mx-auto border border-1 mt-10 rounded-2xl pb-8">
          <div className="">
            {" "}
            <h1 className="text-2xl font-medium text-center pb-3">
              Accommodation Details
            </h1>
            <hr />
            <div className="mt-3 space-y-1">
              <div className="p-1 px-2 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg text-sm text-slate-500 w-full">
                <label htmlFor="Name">Title</label>
                <input
                  type="text"
                  id="title"
                  className="focus:outline-none"
                  required={true}
                  value={userInput.title}
                  onChange={handleTitle}
                />
              </div>
              <div className="p-1 px-2 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg text-sm text-slate-500 w-full">
                <label htmlFor="Name">Address</label>
                <input
                  type="text"
                  id="address"
                  className="focus:outline-none"
                  required={true}
                  value={userInput.address}
                  onChange={handleAddress}
                />
              </div>
              <div className=" mt-6  half flex space-x-1">
                <div className="p-1 px-2 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg text-sm text-slate-500 w-1/2">
                  <label htmlFor="Name">Check In</label>
                  <input
                    type="time"
                    id="checkIn"
                    className="focus:outline-none"
                    required={true}
                    value={userInput.checkIn}
                    onChange={handleCheckIn}
                  />
                </div>
                <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
                  <label htmlFor="PhoneNumber">Check Out</label>
                  <input
                    type="time"
                    id="checkOut"
                    className="focus:outline-none"
                    required={true}
                    value={userInput.checkOut}
                    onChange={handleCheckOut}
                  />
                </div>
              </div>
              <div className="half flex space-x-1">
                <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
                  <label htmlFor="Name">Max Guest</label>
                  <input
                    type="number"
                    id="maxGuest"
                    className="focus:outline-none"
                    required={true}
                    value={userInput.maxGuests}
                    onChange={handleMaxGuest}
                  />
                </div>
                <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
                  <label htmlFor="Dob">Perks</label>
                  <select
                    type="Text"
                    id="Perks"
                    className="focus:outline-none"
                    required={true}
                    onChange={handlePerks}
                  >
                    <option value="Wifi">Wifi</option>
                    <option value="Food">Food</option>
                    <option value="AC">AC</option>
                    <option value="Swimming Pool">Swimming Pool</option>
                    <option value="Free Parking">Free Parking</option>
                    <option value="TV">TV</option>
                  </select>
                </div>
              </div>
              <div className="p-1 px-2 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg text-sm text-slate-500 w-full">
                <label htmlFor="Name">Description</label>
                <textarea
                  type="text"
                  id="description"
                  className="focus:outline-none"
                  required={true}
                  value={userInput.description}
                  onChange={handleDescription}
                />
              </div>
              <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500">
                <label htmlFor="email">Extra Information</label>
                <input
                  type="text"
                  id="extraInfo"
                  className="focus:outline-none"
                  value={userInput.extraInfo}
                  onChange={handleExtraInfo}
                  required={true}
                />
              </div>
              <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500">
                <label htmlFor="email" className="mb-2">
                  Upload Images
                </label>
                {/* <input type="text" name="upload-by-link" id=""  value={}/> */}
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
              </div>
            </div>
          </div>
          <button
            type={"submit"}
            onClick={handleOnSubmit}
            className="bg-pink-600 p-2.5 text-white text-base font-semibold rounded-lg mt-1 border border-black hover:bg-slate-200 hover:text-slate-500 hover:shadow-xl"
          >
            {"Add Accomodation"}
          </button>
        </form>
      )}
    </div>
  );
}
