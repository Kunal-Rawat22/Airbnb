/* eslint-disable react/prop-types */
export default function RoomCover({address})
{
    return (
      <div className="cover flex items-center justify-between">
        <p className="text-sm font-medium underline mt-2 cursor-pointer">
          {address}
        </p>
        <div className="flex mt-2 space-x-4">
          <div className="text-sm cursor-pointer">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            &nbsp;&nbsp;
            <span className="underline">Share</span>
          </div>
          <div className="text-sm cursor-pointer">
            <i className="fa-regular fa-heart"></i>&nbsp;&nbsp;
            <span className="underline">Save</span>
          </div>
        </div>
      </div>
    );
}