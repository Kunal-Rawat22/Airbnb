import { useState, useEffect } from "react";
import PhotoUploader from "./PhotoUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function AccommodationForm({ type }) {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [flag, setFlag] = useState(true);
  const [editable, setEditable] = useState(false);
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
    price: Number,
  });
  // const options = ["Food", "Wifi", "AC", "Swimming Pool", "Free Parking", "TV"];

  const options = [
    { icon: "fa-solid fa-utensils", name: "Food" },
    { icon: "fa-solid fa-wifi", name: "Wifi" },
    { icon: "fa-solid fa-dog", name: "Pets" },
    { icon: "fa-solid fa-person-swimming", name: "Pool" },
    { icon: "fa-solid fa-car", name: "Parking" },
    { icon: "fa-solid fa-tv", name: "TV" },
  ];

  // console.log("action",action)
  useEffect(() => {
    type === "image"
      ? axios.get(`/places/${action}`).then(({ data }) => {
          setUserInput({
            title: data[0]?.title,
            address: data[0]?.address,
            description: data[0]?.description,
            perks: data[0]?.perks,
            extraInfo: data[0]?.extraInfo,
            checkIn: data[0]?.checkIn,
            checkOut: data[0]?.checkOut,
            maxGuests: data[0]?.maxGuests,
            price: data[0]?.price,
          });
          setAddedPhotos([...data[0].photos]);
          setFlag(false);
        })
      : "";
  }, []);

  console.log(flag);
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

  //Handling Price
  function handlePrice(event) {
    setUserInput((prevState) => ({
      ...prevState,
      price: event.target.value,
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
    const { checked, value } = event.target;
    console.log(value, checked);
    if (checked) {
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
    } else {
      if (userInput.perks.includes(event.target.value)) {
        setUserInput((prevState) => ({
          ...prevState,
          perks: [
            ...prevState.perks.filter((perk) => perk !== event.target.value),
          ],
        }));
      } else {
        setUserInput((prevState) => ({
          ...prevState,
        }));
      }
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
  function handleOnEdit(event) {
    event.preventDefault();
    setEditable(true);
    setFlag(true);
  }
  async function handleOnSave(event) {
    console.log("Hello");
    event.preventDefault();
    const data = {
      ...userInput,
      photos: addedPhotos,
    };
    try {
      await axios.put(`/places/${action}`, data);
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
    <form className="px-8 py-4 flex flex-col w-3/6 mx-auto border border-1 mt-10 rounded-2xl pb-8">
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
              readOnly={!flag}
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
              readOnly={!flag}
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
                readOnly={!flag}
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
                readOnly={!flag}
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
                readOnly={!flag}
                value={userInput.maxGuests}
                onChange={handleMaxGuest}
              />
            </div>
            <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
              <label>Price</label>
              <input
                type="number"
                id="price"
                className="focus:outline-none"
                required={true}
                readOnly={!flag}
                value={userInput.price}
                onChange={handlePrice}
              />
            </div>
          </div>
          <div className="p-1 px-2 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg text-sm text-slate-500 w-full">
            <label>Perks</label>
            <div className="grid grid-cols-4 gap-x-2 px-3 pb-2">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="border mt-2 p-2 flex rounded-md justify-start"
                >
                  <input
                    type="checkbox"
                    name={option.name}
                    value={option.name}
                    id=""
                    className="items-left"
                    onChange={handlePerks}
                    checked={userInput.perks.includes(option.name)}
                    disabled={!flag}
                  />

                  <div className="flex items-center text-xs justify-center w-full">
                    <i className={option.icon}></i>
                    <span>&nbsp;&nbsp;{option.name}</span>
                  </div>
                </div>
              ))}
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
              readOnly={!flag}
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
              readOnly={!flag}
              onChange={handleExtraInfo}
              required={true}
            />
          </div>
          <PhotoUploader
            addedPhotos={addedPhotos}
            flag={flag}
            setAddedPhotos={setAddedPhotos}
          />
        </div>
      </div>
      <button
        type={type === "image" ? "button" : "submit"}
        onClick={
          type === "image"
            ? editable === false
              ? handleOnEdit
              : handleOnSave
            : handleOnSubmit
        }
        className="bg-pink-600 p-2.5 text-white text-base font-semibold rounded-lg mt-1 border border-black hover:bg-slate-200 hover:text-slate-500 hover:shadow-xl"
      >
        {type === "image"
          ? editable === false
            ? "Edit Accomodation"
            : "Save Changes"
          : "Add Accomodation"}
      </button>
    </form>
  );
}
