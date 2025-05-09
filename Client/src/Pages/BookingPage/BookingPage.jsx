import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useParams } from "react-router-dom";
import RazorpayButton from "../../Components/UI/RazorPayBtn";
import Image from "../../Components/Pages/AccountPage/Accomodation/Image";
import axios from "axios";

export default function BookingPage() {
  const queryParams = new URLSearchParams(location.search);
  const { subpage } = useParams();
  const checkIn = queryParams.get("checkin");
  const checkOut = queryParams.get("checkout");
  const infants = queryParams.get("noOfInfants");
  const noOfChildren = queryParams.get("noOfChildren");
  const noOfAdults = queryParams.get("noOfAdults");
  const startDate = checkIn.split(" ")[2];
  const startMonth = checkIn.split(" ")[1];
  const endDate = checkOut.split(" ")[2];
  const endMonth = checkOut.split(" ")[1];
  const noOfDays = queryParams.get("noOfDays");
  const noOfGuests =
    Number(noOfAdults) + Number(noOfChildren) + Number(infants);
  const { ready, user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [placeInfo, setPlaceInfo] = useState(null);
  useEffect(() => {
    if (ready && user) {
      axios.get(`/places/${subpage}`).then(({ data }) => {
        setLoggedIn(true);
        setPlaceInfo({
          title: data[0]?.title,
          address: data[0]?.address,
          description: data[0]?.description,
          price: data[0]?.price,
          photos: data[0]?.photos,
        });
      });
    }
  }, [ready, user, loggedIn, subpage]);

  useEffect(() => {
    if (placeInfo) {
      const amount =
        placeInfo.price * noOfDays + (placeInfo.price * noOfDays * 18) / 100;
      const details = {
        ...placeInfo,
        checkIn: checkIn,
        checkOut: checkOut,
        startDate: startDate,
        startMonth: startMonth,
        endDate: endDate,
        endMonth: endMonth,
        noOfDays: noOfDays,
        noOfGuests: noOfGuests,
        placeId: subpage,
        amount: amount,
      };
      localStorage.setItem("bookingDetails", JSON.stringify(details));
    }
  }, [
    placeInfo,
    checkIn,
    checkOut,
    endDate,
    endMonth,
    noOfDays,
    noOfGuests,
    startDate,
    startMonth,
    subpage,
  ]);

  //Cookie
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  console.log("njn", checkIn);
  console.log("njkknn", checkOut);

  return (
    <div className="Booking-Page xl:pb-24 lg:pb-24 md:pb-16 sm:pb-12 pb-8">
      <div className="Heading flex lg:pl-28 md:pl-20 sm:pl-16 pl-12">
        <div className="py-16 text-right px-1 ">
          <Link to={`/rooms/${subpage}`}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </div>
        <div className="grid-item-large flex items-center px-4">
          <h1 className="text-4xl font-medium">Request to book</h1>
        </div>
      </div>
      <div className="main lg:flex-row md:flex-col xl:flex-row  sm:flex-col flex flex-col px-36">
        {/* Left Part */}
        <div className="left w-1/2 flex flex-col">
          {/* Details */}
          <div className="details flex flex-col gap-y-5">
            <h2 className="text-2xl font-medium">Your Trip</h2>
            {/* Dates */}
            <div className="flex dates justify-between">
              <div className="Date-block flex flex-col">
                <div className="text-xl">Dates</div>
                <div className="text-lg font-light">
                  {startDate} {startMonth} - {endDate} {endMonth}
                </div>
              </div>
              <Link to={`/rooms/${subpage}`} className="edit">
                <span className="text-xl font-medium underline">Edit</span>
              </Link>
            </div>
            {/* Guests */}
            <div className="flex Guests-block justify-between">
              <div className="Guests flex flex-col">
                <div className="text-xl">Guests</div>
                <div className="text-lg font-light">
                  {noOfGuests} {noOfGuests == 1 ? "Guest" : "Guests"}
                </div>
              </div>
              <Link to={`/rooms/${subpage}`} className="edit">
                <span className="text-xl font-medium underline">Edit</span>
              </Link>
            </div>
            <hr />
            {/* Policy  */}
            <div className="policy text-sm font-light">
              By selecting the button below, I agree to the{" "}
              <span className="underline font-medium">
                Host&apos;s House Rules
              </span>
              ,{" "}
              <span className="underline font-medium">
                Ground rules for guests
              </span>
              ,{" "}
              <span className="underline font-medium">
                YatraNest&apos;s Rebooking and Refund Policy
              </span>{" "}
              and that YatraNest can{" "}
              <span className="underline font-medium">
                charge my payment method
              </span>{" "}
              if I&apos;m responsible for damage. I also agree to the updated
              Terms of Service, Payments Terms of Service and I acknowledge the
              Privacy Policy.
            </div>
            <hr />
            {/* Payment */}
            <div className="payment flex justify-between mt-4 items-center">
              {" "}
              <div className="p-2.5 text-2xl lg:text-2xl font-semibold rounded-lg mt-1 w-1/3 ">
                Request To Book
              </div>
              <RazorpayButton />
            </div>
          </div>
        </div>
        {/* Right Part */}
        <div className="right w-1/2 ">
          <div className="border border-1 border-slate-300 rounded-xl w-4/5 h-full mx-auto flex flex-col p-8 gap-y-6">
            <div className="roomDetail h-2/5 w-full flex gap-6">
              <Image
                src={placeInfo?.photos[0]}
                alt=""
                className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-xl block darker cursor-pointer"
                // onClick={openNewTab}
              />
              <div className="room-description flex flex-col gap-y-3 h-full w-full relative">
                <div className="text-xl">{placeInfo?.title}</div>
                <div className="text-lg">
                  <FontAwesomeIcon icon={faStar} /> <span>5.00</span>{" "}
                  <span className="font-light text-base">(1 review)</span>
                </div>
                <div className="text-base w-full line-clamp-2">
                  {placeInfo?.description}
                </div>
              </div>
            </div>
            <hr />
            <div className="Price-Details flex flex-col">
              <h2 className="text-2xl font-medium">Price Details</h2>
              <div className="flex justify-between font-light mt-4 text-lg">
                <div className="">
                  ₹{placeInfo?.price} X {noOfDays} nights
                </div>
                <div>₹ {placeInfo?.price * noOfDays}</div>
              </div>
              <div className="flex justify-between font-light mt-4 text-lg">
                <div className="underline">Taxes</div>
                <div>₹ {(placeInfo?.price * noOfDays * 18) / 100}</div>
              </div>
              {/* <div>₹ {price * noOfDays - discount}</div> */}
            </div>
            <hr />
            <div className="price">
              <div className="flex justify-between text-lg font-medium">
                <div>
                  Total (<span className="underline">INR</span>)
                </div>
                <div>
                  ₹{" "}
                  {placeInfo?.price * noOfDays +
                    (placeInfo?.price * noOfDays * 18) / 100}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
