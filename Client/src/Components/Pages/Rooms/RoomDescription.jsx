/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import TruncateText from "./TruncatedText";

export default function RoomDescription({ description }) {
  return (
    <div className="description mt-8 flex flex-col px-2 space-y-6 pb-8 pr-16">
      <div className="space-x-2">
        <i className="fa-solid fa-star"></i>
        <span className="font-light">
          You&apos;ll be taken care of by one of the most successful Airbnb
          hosts in the country.{" "}
        </span>
      </div>
      <div className="space-x-2">
        <i className="fa-solid fa-star"></i>
        <TruncateText text={description} limit={40} />
      </div>
      <Link className=" space-x-2">
        <span className="underline">Show More</span>
        <i className="fa-solid fa-chevron-right text-sm"></i>
      </Link>
    </div>
  );
}
