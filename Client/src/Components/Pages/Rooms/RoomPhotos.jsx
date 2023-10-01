export default function RoomPhotos({ photos }) {
  const url = "http://localhost:4000/uploads/";
  return (
    <div className="grid grid-cols-2 gap-2 mt-8 photos">
      <div className="w-full">
        <img
          src={url + photos[0]}
          alt=""
          className="w-full object-cover rounded-s-xl max-h-96 h-full darker cursor-pointer"
        />
      </div>
      <div className="grid grid-rows-2 gap-y-2">
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <img
              src={url + photos[1]}
              alt=""
              className="w-full object-cover max-h-48 darker cursor-pointer"
            />
          </div>
          <div>
            <img
              src={url + photos[2]}
              alt=""
              className="w-full object-cover rounded-tr-xl max-h-48 darker cursor-pointer"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <img
              src={url + photos[3]}
              alt=""
              className="w-full object-cover max-h-48 darker cursor-pointer"
            />
          </div>
          <div>
            <img
              src={url + photos[0]}
              alt=""
              className="w-full object-cover rounded-br-xl max-h-48 darker cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
