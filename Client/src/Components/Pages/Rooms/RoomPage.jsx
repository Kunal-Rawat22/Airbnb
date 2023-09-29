import axios from "axios";
import TruncateText from "./TruncatedText";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DatePicker from "./DateRange";

export default function RoomPage() {
  const { subpage } = useParams();
  const url = "http://localhost:4000/uploads/";
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
  const [options, setOptions] = useState([]);
  // let options = [];
  const allOptions = [
    { icon: "fa-solid fa-utensils", name: "Food" },
    { icon: "fa-solid fa-wifi", name: "Wifi" },
    { icon: "fa-solid fa-dog", name: "Pets" },
    { icon: "fa-solid fa-person-swimming", name: "Pool" },
    { icon: "fa-solid fa-car", name: "Parking" },
    { icon: "fa-solid fa-tv", name: "TV" },
  ];
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
  console.log("first", endDate);
  console.log("hhbhb", startDate);
  return (
    <div className=" px-40 py-6">
      {flag && (
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium">{room?.title}</h1>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium underline mt-2 cursor-pointer">
                {room?.address}
              </p>
              <div className="flex mt-2 space-x-4">
                <div className="text-sm cursor-pointer">
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  &nbsp;&nbsp;
                  <span className="underline">Share</span>
                </div>
                <div className="text-sm cursor-pointer">
                  <i className="fa-regular fa-heart"></i>&nbsp;&nbsp;
                  <span className="underline">Save</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-8">
              <div className="w-full">
                <img
                  src={url + room?.photos[0]}
                  alt=""
                  className="w-full object-cover rounded-s-xl max-h-96 h-full"
                />
              </div>
              <div className="grid grid-rows-2 gap-y-2">
                <div className="grid grid-cols-2 gap-x-2">
                  <div>
                    <img
                      src={url + room?.photos[1]}
                      alt=""
                      className="w-full object-cover max-h-48"
                    />
                  </div>
                  <div>
                    <img
                      src={url + room?.photos[2]}
                      alt=""
                      className="w-full object-cover rounded-tr-xl max-h-48"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  <div>
                    <img
                      src={url + room?.photos[3]}
                      alt=""
                      className="w-full object-cover max-h-48"
                    />
                  </div>
                  <div>
                    <img
                      src={url + room?.photos[0]}
                      alt=""
                      className="w-full object-cover rounded-br-xl max-h-48"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 flex ">
              <div className="w-2/3">
                <div className="pb-6 onwer Details">
                  <h2 className="text-2xl font-medium">
                    Treehouse hosted by Kunal
                  </h2>
                  <div className="flex font-light mt-2 space-x-1 items-center">
                    <div className="">2 Guests</div>
                    <div className="border-r-2 border-slate-400 h-0.5 "></div>
                    <div className="">1 Bedroom</div>
                    <div className="border-r-2 border-slate-400 h-0.5"></div>
                    <div className="">1 Bathroom</div>
                    <div className="border-r-2 border-slate-400 h-0.5"></div>
                    <div className="">1 Bed</div>
                  </div>
                </div>
                <hr />
                <div className="brief flex flex-col mt-8 px-2 space-y-7 pb-8">
                  <div className="flex items-center space-x-10">
                    <div className="text-center">
                      <i className="fa-solid fa-desktop text-2xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium mb-1">Dedicated workspace</h4>
                      <p className="text-sm text-gray-500">
                        A common area with wifi that&apos;s well suited for
                        working.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-10">
                    <div className="text-center">
                      <i className="fa-solid fa-medal text-2xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium mb-1">Kunal is a Superhost</h4>
                      <p className="text-sm text-gray-500">
                        Superhosts are experienced, highly rated hosts who are
                        committed to providing great stays for their guests.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-10">
                    <div className="text-center">
                      <i className="fa-regular fa-calendar text-2xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium mb-1">
                        Free cancellation before 11 May.
                      </h4>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="description mt-8 flex flex-col px-2 space-y-6 pb-8">
                  <div className="space-x-2">
                    <i className="fa-solid fa-star"></i>
                    <span className="font-light">
                      You&apos;ll be taken care of by one of the most successful
                      Airbnb hosts in the country.{" "}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <i className="fa-solid fa-star"></i>
                    <TruncateText text={room?.description} limit={40} />
                  </div>
                  <Link className=" space-x-2">
                    <span className="underline">Show More</span>
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                  </Link>
                </div>
                <hr />
                <div className="perks mt-8 pb-10">
                  <h2 className="text-2xl font-medium">
                    What this place offers
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-6 px-1">
                    {allOptions.map((option, index) => (
                      <div
                        key={index}
                        className="text-lg font-light space-x-10"
                      >
                        <i className={option.icon + " text-2xl w-5"}></i>
                        {options.includes(option.name) ? (
                          <span>{option.name}</span>
                        ) : (
                          <span className=" line-through">{option.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="bg-white mt-8 border border-1 p-3 px-6 font-medium hover:bg-gray-100 border-black rounded-xl">
                    Show All Amenities
                  </button>
                </div>
                <hr />
                <div className="mt-8">
                  <h2 className="text-2xl font-medium mb-2">
                    30 Nights in {room?.address}
                  </h2>
                  <span className="font-light text-sm text-gray-500">{startDate} - {endDate}</span>
                  <div className=" pb-10">
                    <DatePicker
                      selection={selection}
                      setSelection={setSelection}
                      setEndDate={setEndDate}
                      setStartDate={setStartDate}
                    />
                    <hr className="relative w-5/6 top-3 left-16"/>
                  </div>
                </div>
              </div>
              <div className="Reserve">Hello</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
