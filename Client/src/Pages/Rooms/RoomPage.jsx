import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomPhotos from "../../Components/Pages/Rooms/RoomPhotos";
import RoomBrief from "../../Components/Pages/Rooms/RoomBrief";
import RoomDescription from "../../Components/Pages/Rooms/RoomDescription";
import RoomPerks from "../../Components/Pages/Rooms/RoomPerks";
import RoomDate from "../../Components/Pages/Rooms/RoomDate";
import RoomOwner from "../../Components/Pages/Rooms/RoomOwner";
import RoomCover from "../../Components/Pages/Rooms/RoomCover";
import Navbar from "../../Components/UI/Navbar";
import RoomReserve from "../../Components/Pages/Rooms/RoomReserve";
export default function RoomPage() {
  const { subpage } = useParams();
  const [room, setRoom] = useState({
    title: "",
    address: "",
    photos: [],
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
    price: Number,
  });
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  //Setting Perks
  const [options, setOptions] = useState([]);
  const allOptions = [
    { icon: "fa-solid fa-utensils", name: "Food" },
    { icon: "fa-solid fa-wifi", name: "Wifi" },
    { icon: "fa-solid fa-dog", name: "Pets" },
    { icon: "fa-solid fa-person-swimming", name: "Pool" },
    { icon: "fa-solid fa-car", name: "Parking" },
    { icon: "fa-solid fa-tv", name: "TV" },
  ];

  //Fetching Details of place
  useEffect(() => {
    axios.get(`/places/${subpage}`).then(({ data }) => {
      setRoom({
        title: data[0]?.title,
        address: data[0]?.address,
        description: data[0]?.description,
        perks: data[0]?.perks,
        extraInfo: data[0]?.extraInfo,
        checkIn: data[0]?.checkIn,
        checkOut: data[0]?.checkOut,
        maxGuests: data[0]?.maxGuests,
        price: data[0]?.price,
        photos: data[0]?.photos,
      });
      setFlag(true);
      allOptions.map((option) => {
        if (data[0].perks.includes(option.name)) {
          if (options.includes(option.name)) {
            console.log("");
          } else {
            setOptions((prev) => [...prev, option.name]);
          }
        }
      });
    });
  }, []);

  //Date Range Picker
  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [startDate, setStartDate] = useState(
    selection[0].startDate.toDateString()
  );
  const [endDate, setEndDate] = useState(selection[0].endDate.toDateString());
  const [noOfDays, setNoOfDays] = useState(1);
  //Scrolling Navbar
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {flag && (
        <div>
          {showNavbar && <Navbar />}
          <div className=" px-40 py-6">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-3xl font-medium">{room?.title}</h1>
                <RoomCover address={room?.address} />
                <RoomPhotos photos={room?.photos} />
                <div className="mt-12 flex ">
                  <div className="w-2/3">
                    <RoomOwner />
                    <hr className=" w-11/12" />
                    <RoomBrief />
                    <hr className=" w-11/12" />
                    <RoomDescription description={room?.description} />
                    <hr className=" w-11/12" />
                    <RoomPerks allOptions={allOptions} options={options} />
                    <hr className=" w-11/12" />
                    <RoomDate
                      address={room?.address}
                      startDate={startDate}
                      endDate={endDate}
                      selection={selection}
                      setEndDate={setEndDate}
                      setSelection={setSelection}
                      setStartDate={setStartDate}
                      setNoOfDays={setNoOfDays}
                      noOfDays={noOfDays}
                      setFlag2={setFlag2}
                    />
                  </div>
                  <div className="Reserve w-full">
                    <RoomReserve
                      price={room?.price}
                      noOfDays={noOfDays}
                      flag2={flag2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
