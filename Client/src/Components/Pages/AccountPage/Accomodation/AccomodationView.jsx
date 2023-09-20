/* eslint-disable react/jsx-key */
import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import AccommodationForm from "./AccomodationForm";
import axios from "axios";
export default function AccommodationTab() {
  const { ready, user } = useContext(UserContext);
  let add = false;
  const { action } = useParams();
  if (action === "new") {
    add = true;
  } else {
    add = null;
  }
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    })
  })
  //   Cookie
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

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
          <div>
            {places.length > 0 && places.map(place => (
              <div>
                {place.title}
              </div>
            )
            ) }
          </div>
        </div>
      )}

      {add === true && <AccommodationForm />}
    </div>
  );
}
