import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistClicked, setIsWishlistClicked] = useState(false);
  const { ready, user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (ready && user) {
      setLoggedIn(true);
    }
  }, [ready, user, loggedIn]);

  useEffect(() => {
    axios.get("/all-places").then(({ data }) => {
      setPlaces(data);
      setWishlist(data.map((element) => element.isWishlist));
    });
  }, []);

  async function toggleWishlist(e, placeId, index) {
    setIsWishlistClicked(true);
    e.preventDefault();
    if (ready && user && loggedIn) {
      const response = await axios.put(`/places/wishlist/${placeId}`);
      console.log(response);
      setWishlist((prevWishlist) => {
        const updatedWishlist = [...prevWishlist];
        updatedWishlist[index] = response.data; 
        return updatedWishlist;
      });
    }
  }

  if (ready && !user && isWishlistClicked) {
    // console.log("efbheb");
    return <Navigate to={"/login"} />;
  }

  console.log(places);
  return (
    <div className="py-4 px-8 lg:px-20 md:px-12 sm:px-8 pb-16">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link key={index} className="" to={`/rooms/${place._id}`}>
              {place.photos.length > 0 && (
                <div>
                  <div className="relative">
                    <img
                      className="rounded-xl aspect-square object-cover w-full"
                      src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                      alt=""
                    />
                    <button
                      className="absolute top-2 right-2  p-2 px-3 rounded-full shadow-md bg-white transition"
                      onClick={(e) => toggleWishlist(e, place._id, index)}
                    >
                      {wishlist[index] && (
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{ color: "#d2746a" }}
                        />
                      )}
                      {!wishlist[index] && (
                        <i
                          className="fa-regular fa-heart"
                          style={{ color: "#D2746A" }}
                        ></i>
                      )}
                    </button>
                  </div>

                  {/* {place.photos.length > 1 && (
                      <button className="absolute right-2 z-10 top-36 bg-white p-1 rounded-full px-2">
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    )} */}
                  <h2 className="mt-2 font-medium">{place.address}</h2>
                  <h3 className="text-sm truncate">{place.description}</h3>
                  <h1 className=" font-medium text-base">
                    ₹{place.price}{" "}
                    <span className=" font-light text-sm">night</span>
                  </h1>
                </div>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
}
