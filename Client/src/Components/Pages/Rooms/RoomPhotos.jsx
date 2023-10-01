export default function RoomPhotos({ photos }) {
  const url = "http://localhost:4000/uploads/";
  return (
    <div className="grid grid-cols-2 gap-2 mt-8 photos">
      <div className="w-full h-96 relative pt-2">
        <img
          src={url + photos[0]}
          alt=""
          className="w-full object-cover rounded-s-xl block h-full darker cursor-pointer"
        />
      </div>
      <div className="grid gap-y-2 h-96">
        <div className="grid grid-cols-2 gap-x-2 pt-2">
          <div>
            <img
              src={url + photos[1]}
              alt=""
              className="w-full object-cover h-48 darker cursor-pointer"
            />
          </div>
          <div>
            <img
              src={url + photos[2]}
              alt=""
              className="w-full object-cover rounded-tr-xl h-48 darker cursor-pointer"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 pb-2">
          <div className="relative h-44">
            <img
              src={url + photos[3]}
              alt=""
              className="w-full object-cover h-full darker cursor-pointer block"
            />
          </div>
          <div className="relative h-44">
            <img
              src={url + photos[0]}
              alt=""
              className="w-full object-cover rounded-br-xl h-full darker cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
