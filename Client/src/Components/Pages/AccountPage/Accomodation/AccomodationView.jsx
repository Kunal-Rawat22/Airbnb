/* eslint-disable react/jsx-key */
import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import AccommodationForm from "./AccomodationForm";
import axios from "axios";
export default function AccommodationTab() {
  // window.location.reload();
  const { ready, user } = useContext(UserContext);
  let add = false;
  const { action } = useParams();
  console.log("action",action)
  if (action === "new") {
    add = "new";
    console.log(add)
  } else if(action ===undefined) {
    add = "null";
    console.log(add);
  } else {
    add = "image"
    console.log(add);

  }
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    })
  },[])
  console.log("first")
  //   Cookie
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className=" px-32">
      {add === "null" && (
        <div className="text-center mt-10 space-y-6">
          <Link
            className="bg-pink-600 text-white p-3 text-base font-semibold px-5 rounded-full text-center"
            to={"/account/places/new"}
          >
            <i className="fa-solid fa-plus"></i> Add New Place
          </Link>
          <div className="px-8 space-y-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="bg-slate-100 flex rounded-xl p-6 cursor-pointer hover:shadow-lg hover:bg-slate-200"
                >
                  <div className="h-48 w-1/4 grow shrink-0">
                    {place.photos.length > 0 && (
                      <img
                        src={"http://localhost:4000/uploads/" + place.photos[0]}
                        alt=""
                        className="h-full w-full object-cover rounded-xl shadow-xl"
                      />
                    )}
                  </div>

                  <div className="text-left pl-8 pr-2 grow shrink py-4">
                    <h2 className="font-medium text-2xl mb-4">{place.title}</h2>
                    <p>{place.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      {add === "image" && <AccommodationForm type={add} />}
      {add === "new" && <AccommodationForm type={add} />}
    </div>
  );
}
