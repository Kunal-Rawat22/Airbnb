import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../UserContext";

const BookingConfirmation = () => {
  const { ready, user } = useContext(UserContext);
  const [booking, setBooking] = useState(null);
  const { subpage } = useParams();

  useEffect(() => {
    if (ready && user) {
      axios.get(`/booking/${subpage}`).then((response) => {
        setBooking(response.data);
        console.log(response.data);
      });
    }
  }, [ready,user,subpage]);

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const url = "http://localhost:4000/uploads/";

  return (
    <div className="flex flex-col bg-gray-300 items-center p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-16 mb-16">
      <h1 className="text-gray-700 text-2xl font-extrabold mb-2">
        Congratulations!
      </h1>
      <h2 className="text-3xl font-bold mb-8">
        Your Accomodation has been Booked!
      </h2>

      <div className="parent-div flex flex-col md:flex-row items-start md:items-center w-full h-full bg-white rounded-lg relative">
        {/* Image Section */}
        <div className=" w-full lg:w-1/2 h-full relative p-6">
          <img
            src={url + booking?.photos[0]}
            alt="Booking Image"
            className="w-full h-full rounded-xl aspect-square"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col w-full lg:w-1/2  gap-4 p-6 bg-slate-200 rounded-r-lg h-full">
          <h3 className="text-xl font-semibold">
            A Vibrant Tapestry of Culture and History
          </h3>

          <div className="flex justify-between text-gray-600">
            <div className="text-sm">
              <p className="font-semibold">Dates</p>
              <p>August 15 - 20, 2023</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-right">Traveler</p>
              <p>
                {" "}
                No. of Guests:{" "}
                <span className="font-medium text-gray-700">
                  {booking?.noOfGuests}{" "}
                  {booking?.noOfGuests === 1 ? `Guest` : `Guests`}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h4 className="text-lg font-semibold mb-2">Reserve Details</h4>
            <div className="text-sm text-gray-600 flex flex-col gap-2 text-justify">
              <div className="flex justify-between">
                <span className="font-semibold">Booking Code:</span>{" "}
                {booking?._id}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Check In:</span>{" "}
                {booking?.checkIn}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Check Out:</span>{" "}
                {booking?.checkOut}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Payment Id:</span>{" "}
                {booking?.paymentId}
              </div>
            </div>
          </div>

          <Link to={"/"} className="mt-6 text-center  text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-500 bg-primary  transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
