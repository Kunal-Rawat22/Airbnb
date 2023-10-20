/* eslint-disable react/jsx-key */
import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import AccommodationForm from "./AccomodationForm";
import axios from "axios";
import TruncateText from "../../Rooms/TruncatedText";
export default function AccommodationTab() {
  // window.location.reload();
  const { ready, user } = useContext(UserContext);
   const [screenSize, setScreenSize] = useState({
     width: window.innerWidth,
     height: window.innerHeight,
   });
   useEffect(() => {
     function handleResize() {
       setScreenSize({ width: window.innerWidth, height: window.innerHeight });
     }

     window.addEventListener("resize", handleResize);

     return () => {
       window.removeEventListener("resize", handleResize);
     };
   }, []);
  
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
    <div className=" lg:px-32 md:px-12 px-0">
      {add === "null" && (
        <div className="text-center mt-10 space-y-6">
          <Link
            className="bg-pink-600 text-white p-3 text-base font-semibold px-5 rounded-full text-center"
            to={"/account/places/new"}
          >
            <i className="fa-solid fa-plus"></i> Add New Place
          </Link>
          <div className="lg:px-8 space-y-4 md:px-8 sm:px-6 px-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="bg-slate-100 flex rounded-xl px-4 py-4 lg:p-6 md:p-6 cursor-pointer hover:shadow-lg hover:bg-slate-200 items-center"
                >
                  <div className="lg:h-48 md:h-48 sm:h-48 h-32 lg:w-1/4 md:w-1/3 sm:w-1/2 w-5/12 grow shrink-0">
                    {place.photos.length > 0 && (
                      <img
                        src={"http://localhost:4000/uploads/" + place.photos[0]}
                        alt=""
                        className="h-full w-full object-cover rounded-xl shadow-xl"
                      />
                    )}
                  </div>

                  <div className="text-left lg:pl-8 md:pl-8 lg:pr-2 md:pr-2 sm:pl-4 pl-3 grow shrink lg:py-4">
                    <h2 className="font-medium lg:text-2xl md:text-xl sm:text-base text-sm lg:mb-4 md:mb-4 sm:mb-4 mb-1">
                      {place.title}
                    </h2>
                    <TruncateText
                      text={place.description}
                      limit={screenSize.width>450?30:20}
                      className=" text-xs md:text-sm font-normal"
                    />
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
