export default function RoomPerks({allOptions, options})
{
    return (
      <div className="perks mt-8 pb-10">
        <h2 className="text-2xl font-medium">What this place offers</h2>
        <div className="grid grid-cols-2 gap-4 mt-6 px-1">
          {allOptions.map((option, index) => (
            <div key={index} className="text-lg font-light space-x-10">
              <i className={option.icon + " text-2xl w-5"}></i>
              {options.includes(option.name) ? (
                <span>{option.name}</span>
              ) : (
                <span className=" line-through">{option.name}</span>
              )}
            </div>
          ))}
        </div>
        <button className="bg-white mt-8 border border-1 p-3 px-6 font-medium hover:bg-gray-100 border-black rounded-xl">
          Show All Amenities
        </button>
      </div>
    );
}