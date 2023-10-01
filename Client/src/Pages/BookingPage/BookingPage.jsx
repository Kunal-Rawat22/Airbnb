import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
export default function BookingPage() {
  const queryParams = new URLSearchParams(location.search);
  const checkIn = queryParams.get("checkin");
  const checkOut = queryParams.get("checkout");
  const { ready, user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (ready && user) {
      setLoggedIn(true);
    }
  }, [ready, user, loggedIn]);

  //Cookie
  if (ready && !user) {
    console.log("Not Logged In");
  }
    console.log("njn", checkIn);
  console.log("njkknn", checkOut);
    
  return (
    <div>
      <div className="Heading grid grid-cols-10">
        <div className="py-16 text-right px-2">
          <button>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="grid-item-large flex items-center px-4">
          <h1 className="text-4xl font-medium">Request to book</h1>
        </div>
      </div>
      <div className="main flex px-36">
        <div className="left w-1/2 flex flex-col">
          <div className="details flex flex-col">
            <h2 className="text-xl font-medium">Your Trip</h2>
            <div className="flex">
              <div>Dates</div>
              <div>Edit</div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="right w-1/2">Right</div>
      </div>
    </div>
  );
}
