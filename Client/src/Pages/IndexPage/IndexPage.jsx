import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/all-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  console.log(places);
  return (
    <div className="p-4 lg:px-20 md:px-12 sm:px-8 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 gap-y-8">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link key={index} className="" to={`/rooms/${place._id}`}>
              {place.photos.length > 0 && (
                <div>
                    <img
                      className="rounded-xl aspect-square object-cover"
                      src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                      alt=""
                    />
                    {/* {place.photos.length > 1 && (
                      <button className="absolute right-2 z-10 top-36 bg-white p-1 rounded-full px-2">
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    )} */}
                  <h2 className="mt-2 font-medium">{place.address}</h2>
                  <h3 className="text-sm truncate">{place.description}</h3>
                  <h1 className=" font-medium text-base">₹{place.price} <span className=" font-light text-sm">night</span></h1>
                </div>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
}
