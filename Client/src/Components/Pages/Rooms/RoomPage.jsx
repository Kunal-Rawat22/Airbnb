import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    });
  }, []);

  console.log("first", room);
  return (
    <div className=" px-40 py-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium">{room?.title}</h1>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium underline mt-2">{room?.address}</p>
          <div className="flex mt-2 space-x-4">
            <div className="text-sm">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;
              <span className="underline">Share</span>
            </div>
            <div className="text-sm">
              <i className="fa-regular fa-heart"></i>&nbsp;&nbsp;
              <span className="underline">Save</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-8">
          <div className="w-full">
            <img
              src={url + room.photos[0]}
              alt=""
              className="w-full object-cover rounded-s-xl max-h-96 h-full"
            />
          </div>
          <div className="grid grid-rows-2 gap-y-2">
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <img
                  src={url + room.photos[1]}
                  alt=""
                  className="w-full object-cover max-h-48"
                />
              </div>
              <div>
                <img
                  src={url + room.photos[2]}
                  alt=""
                  className="w-full object-cover rounded-tr-xl max-h-48"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <img
                  src={url + room.photos[3]}
                  alt=""
                  className="w-full object-cover max-h-48"
                />
              </div>
              <div>
                <img
                  src={url + room.photos[0]}
                  alt=""
                  className="w-full object-cover rounded-br-xl max-h-48"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
