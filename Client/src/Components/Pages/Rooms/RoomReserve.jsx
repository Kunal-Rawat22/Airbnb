import { useState } from "react";

export default function RoomReserve({ price, noOfDays, flag2 }) {
  let discount = 0;
  if (noOfDays >= 7) {
    discount = 5000;
  }
  return (
    <div className="flex flex-col border rounded-xl shadow-lg px-6 pt-6 pb-6">
      <div>
        <h2 className="text-xl font-medium">
          ₹ {price} <span className="text-base font-light">night</span>
        </h2>
      </div>
      <div className="flex flex-col border rounded-lg border-gray-400 mt-6 mb-4">
        <div className="half flex border-b border-gray-400">
          <div className="w-1/2 border-r p-2 flex flex-col border-gray-400">
            <label className="text-xs font-medium">Check In</label>
            <input type="date" name="" id="" />
          </div>
          <div className="w-1/2 p-2 flex flex-col">
            <label className="text-xs font-medium">Check Out</label>
            <input type="date" name="" id="" />
          </div>
        </div>
        <div className="w-full p-2  flex flex-col">
          <label className="text-xs font-medium">Guest</label>
          <input type="date" name="" id="" />
        </div>
      </div>
      <div className="w-full bg-pink-600 text-white text-center p-3 rounded-lg">
        {flag2 ? "Reserve" : "Check For Availablity"}
      </div>
      {flag2 && (
        <div className="w-full flex flex-col">
          <span className="text-sm text-gray-600 font-light mt-4 text-center m">
            You won&apos;t be charged yet
          </span>
          <div className="flex justify-between font-light mt-4">
            <div className="underline cursor-pointer">
              ₹{price} X {noOfDays} nights
            </div>
            <div>₹ {price * noOfDays}</div>
          </div>
          {noOfDays >= 7 && (
            <div className="flex justify-between font-light mt-4">
              <div>Weekly stay discount</div>
              <div className=" text-green-700">₹ -{discount}</div>
            </div>
          )}
          <hr className="mt-6" />

          <div className="flex justify-between font-medium pt-6">
            <div>Total before taxes</div>
            <div>₹ {price * noOfDays - discount}</div>
          </div>
        </div>
      )}
    </div>
  );
}
