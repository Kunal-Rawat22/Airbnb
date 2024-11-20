import "../../App.css"; // Import custom CSS for animation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const PaymentSuccess = () => {
  const queryParams = new URLSearchParams(location.search);
  const [bookingDetails, setBookingDetails] = useState(null);
  const payment_id = queryParams.get("payment_id");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    // Retrieve booking details from localStorage once when the component mounts
    const details = JSON.parse(localStorage.getItem("bookingDetails"));
    if (details) {
      // Include payment_id in the booking details
      setBookingDetails({
        ...details,
        payment_id: payment_id,
      });
    }
  }, [payment_id]);

  useEffect(() => {
    // Send booking details to backend if bookingDetails is available
    if (bookingDetails) {
      axios
        .post("/payment/success", bookingDetails)
        .then(({ data }) => {
          setBookingSuccess(true);
        })
        .catch((error) => {
          setBookingSuccess(true);
          console.error("Error posting payment data", error);
        });
    }
  }, [bookingDetails]);

  if (redirect) {
    return <Navigate to={"/account/booking"} />;
  }
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center pt-8 pb-8">
      <div className="max-w-[380px] mx-auto overflow-hidden">
        <div className="bg-gray-800 h-[6px] border border-gray-600 border-b-0 rounded-t-lg" />

        <div className="relative overflow-hidden h-[467px]">
          <div className="bg-white h-[447px] relative z-10 mx-3 mt-[-12px] animate-print">
            <div className="mx-3 p-6">
              <div className="flex justify-center">
                <FontAwesomeIcon
                  className="bg-green-600 text-white p-2.5 rounded-full text-4xl mx-auto"
                  icon={faCheck}
                />
              </div>
              <div className="text-center text-2xl font-bold text-gray-600 mt-4 mb-4">
                Payment Complete
              </div>
              <div className="text-center text-sm text-gray-500 mb-6">
                Your payment for ₹1 has been received and sent to YatraNest.
              </div>
              <div className="text-center text-gray-800 font-bold">
                <div className="text-lg mb-2">Payment ID</div>
                <div className="border-t border-b border-gray-300 py-2 text-lg mb-6">
                  {/* {payment_id} */}
                  pay_PJVbtn4i2xA08G
                </div>
              </div>
              <div className="text-center text-xl font-bold text-gray-500">
                Redirecting to my bookings!
              </div>
              {bookingSuccess && (
                <div className=" flex mt-2 justify-center">
                  <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    colors={["#16A34A", "#16A34A", "#16A34A", "#16A34A"]}
                    colorsTime={[7, 5, 2, 0]}
                    size={80}
                    strokeWidth={6}
                    onComplete={() => {
                      setRedirect(true); // Set redirect to true after countdown completes
                      return [false, 0]; // Stop timer
                    }}
                  >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                </div>
              )}
            </div>
            <div
              className={`relative h-5 w-full -mt-${
                bookingSuccess ? "6" : "1"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-75" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 h-[6px] border border-gray-600 border-t-0 rounded-b-lg" />
      </div>
    </div>
  );
};

export default PaymentSuccess;
