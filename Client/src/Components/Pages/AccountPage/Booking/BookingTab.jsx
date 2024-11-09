import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function BookingTab() {
  // const [bookings,setBookings] = useState([]);
  const length = 2;
  const gridColsClass =
    length === 1
      ? "grid-cols-1"
      : length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  useEffect(() => {
    // axios.get('/bookings').then(response => {
    //   setBookings(response.data);
    // });
  }, []);
  return (
    <div className="lg:px-32 md:px-12 px-0 mt-10">
      <div
        className={`grid ${gridColsClass} gap-8 mt-8 `}
      >
        {/* {bookings?.length > 0 && bookings.map(booking => ( */}
        {/* <Link to={⁠/account/bookings/temp${booking._id}⁠} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"> */}
        {/* <Link to={⁠/account/bookings/temp⁠} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"> */}
        <div className="bg-slate-100 flex rounded-xl px-4 py-4 lg:p-6 md:p-6 cursor-pointer hover:shadow-lg hover:bg-slate-200 items-center">
          <div className="lg:h-48 md:h-48 sm:h-48 h-32 lg:w-1/4 md:w-1/3 sm:w-1/2 w-5/12 grow shrink-08">
            <img
              src="/0c6f33756489568fab3a7129579a330a.webp"
              alt=""
              className="h-full w-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="text-left lg:pl-8 md:pl-8 lg:pr-2 md:pr-2 sm:pl-4 pl-3 grow shrink lg:py-4 w-3/4">
            <h2 className="font-medium lg:text-2xl md:text-xl sm:text-base text-sm lg:mb-4 md:mb-3 sm:mb-2 mb-1">
              Hotel Name
            </h2>
            <div className="text-lg mb-2 text-gray-500">
              {/* <BookingDates booking={booking} className="" /> */}
              <div className="">20/11/2024 - 12/12/2024</div>
              <div className="">
                No. of Days:{" "}
                <span className="font-medium text-gray-700">10 days</span>
              </div>
              <div className="flex gap-1 mt-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <span className="text-xl">
                  Total price:{" "}
                  <span className="font-medium text-gray-700">₹2000</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 flex rounded-xl px-4 py-4 lg:p-6 md:p-6 cursor-pointer hover:shadow-lg hover:bg-slate-200 items-center">
          <div className="lg:h-48 md:h-48 sm:h-48 h-32 lg:w-1/4 md:w-1/3 sm:w-1/2 w-5/12 grow shrink-08">
            <img
              src="/0c6f33756489568fab3a7129579a330a.webp"
              alt=""
              className="h-full w-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="text-left lg:pl-8 md:pl-8 lg:pr-2 md:pr-2 sm:pl-4 pl-3 grow shrink lg:py-4 w-3/4">
            <h2 className="font-medium lg:text-2xl md:text-xl sm:text-base text-sm lg:mb-4 md:mb-3 sm:mb-2 mb-1">
              Hotel Name
            </h2>
            <div className="text-lg mb-2 text-gray-500">
              {/* <BookingDates booking={booking} className="" /> */}
              <div className="">20/11/2024 - 12/12/2024</div>
              <div className="">
                No. of Days:{" "}
                <span className="font-medium text-gray-700">10 days</span>
              </div>
              <div className="flex gap-1 mt-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <span className="text-xl">
                  Total price:{" "}
                  <span className="font-medium text-gray-700">₹2000</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 flex rounded-xl px-4 py-4 lg:p-6 md:p-6 cursor-pointer hover:shadow-lg hover:bg-slate-200 items-center">
          <div className="lg:h-48 md:h-48 sm:h-48 h-32 lg:w-1/4 md:w-1/3 sm:w-1/2 w-5/12 grow shrink-08">
            <img
              src="/0c6f33756489568fab3a7129579a330a.webp"
              alt=""
              className="h-full w-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="text-left lg:pl-8 md:pl-8 lg:pr-2 md:pr-2 sm:pl-4 pl-3 grow shrink lg:py-4 w-3/4">
            <h2 className="font-medium lg:text-2xl md:text-xl sm:text-base text-sm lg:mb-4 md:mb-3 sm:mb-2 mb-1">
              Hotel Name
            </h2>
            <div className="text-lg mb-2 text-gray-500">
              {/* <BookingDates booking={booking} className="" /> */}
              <div className="">20/11/2024 - 12/12/2024</div>
              <div className="">
                No. of Days:{" "}
                <span className="font-medium text-gray-700">10 days</span>
              </div>
              <div className="flex gap-1 mt-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <span className="text-xl">
                  Total price:{" "}
                  <span className="font-medium text-gray-700">₹2000</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* </Link> */}
        {/* ))} */}
      </div>
    </div>
  );
}
