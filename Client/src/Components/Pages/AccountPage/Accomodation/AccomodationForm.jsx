import { useState,useEffect } from "react";
import PhotoUploader from "./PhotoUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function AccommodationForm({ type }) {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { action } = useParams();
  const [userInput, setUserInput] = useState({
    title: "",
    address: "",
    photos: addedPhotos,
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
  });

  // console.log("action",action)
    useEffect(() => {
      (type==="image")?axios.get(`/places/${action}`).then(({ data }) => {
        setUserInput({
          title: data[0]?.title,
          address: data[0]?.address,
          description: data[0]?.description,
          perks: data[0]?.perks,
          extraInfo: data[0]?.extraInfo,
          checkIn: data[0]?.checkIn,
          checkOut: data[0]?.checkOut,
          maxGuests: data[0]?.maxGuests,
        });
        setAddedPhotos([...data[0].photos])
      }):"";
    },[]);
  
  console.log(type)
  // const [photoLink, setPhotoLink] = useState("");
  

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
    const data = {
      ...userInput,
      photos: addedPhotos,
    };
    try {
      await axios.post("/places", data);
      setUserInput({
        title: "",
        address: "",
        photos: [],
        description: "",
        perks: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: Number,
      });
      alert("You have added successfully.");
      setRedirect(true);
    } catch (e) {
      alert("Couldn't Add!! Try Again Later");
    }
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <form className="px-8 py-4 flex flex-col w-1/3 mx-auto border border-1 mt-10 rounded-2xl pb-8">
      <div className="">
        {" "}
        <h1 className="text-2xl font-medium text-center pb-3">
          Accommodation Details
        </h1>
        <hr />
        <div className="mt-3 space-y-1">
          <div className="p-1 px-2 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg text-sm text-slate-500 w-full">
            <label>Title</label>
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
            <label>Address</label>
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
              <label>Check In</label>
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
              <label>Check Out</label>
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
              <label>Max Guest</label>
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
              <label>Perks</label>
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
            <label>Description</label>
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
            <label>Extra Information</label>
            <input
              type="text"
              id="extraInfo"
              className="focus:outline-none"
              value={userInput.extraInfo}
              onChange={handleExtraInfo}
              required={true}
            />
          </div>
          <PhotoUploader
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
          />
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
  );
}
