export default function RoomBrief()
{
    return (
      <div className="brief flex flex-col mt-8 px-2 space-y-7 pb-8">
        <div className="flex items-center space-x-10">
          <div className="text-center">
            <i className="fa-solid fa-desktop text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <h4 className="font-medium mb-1">Dedicated workspace</h4>
            <p className="text-sm text-gray-500">
              A common area with wifi that&apos;s well suited for working.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="text-center">
            <i className="fa-solid fa-medal text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <h4 className="font-medium mb-1">Kunal is a Superhost</h4>
            <p className="text-sm text-gray-500">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for their guests.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="text-center">
            <i className="fa-regular fa-calendar text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <h4 className="font-medium mb-1">
              Free cancellation before 11 May.
            </h4>
          </div>
        </div>
      </div>
    );
}