/* eslint-disable react/prop-types */
import Image from "../AccountPage/Accomodation/Image";
export default function RoomPhotos({ photos, screenSize }) {
  const url = "http://localhost:4000/uploads/";
  const openNewTab = (e) => {
    console.log(e);
    const newTab = window.open(e.target.currentSrc, "_blank");
    if (newTab) {
      // The new tab was successfully opened
      newTab.focus(); // Optional: Focus on the new tab
    } else {
      // The browser blocked the popup, or the user's browser settings prevent popups
      alert("Please allow popups for this website.");
    }
  };

  return (
    <>
      {screenSize.width > 768 && (
        <div className="grid grid-cols-2 gap-2 mt-8 photos">
          <div className="w-full h-96 relative pt-2">
            <Image
              src={photos[0]}
              alt=""
              className="w-full object-cover rounded-s-xl block h-full darker cursor-pointer"
              onClick={openNewTab}
            />
          </div>
          <div className="grid gap-y-2 h-96">
            <div className="grid grid-cols-2 gap-x-2 pt-2">
              <div>
                <Image
                  src={photos[1]}
                  alt=""
                  className="w-full object-cover h-48 darker cursor-pointer"
                  onClick={openNewTab}
                />
              </div>
              <div>
                <Image
                  src={photos[2]}
                  alt=""
                  className="w-full object-cover rounded-tr-xl h-48 darker cursor-pointer"
                  onClick={openNewTab}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-2">
              <div className="relative h-44">
                <Image
                  src={photos[3]}
                  alt=""
                  className="w-full object-cover h-full darker cursor-pointer block"
                  onClick={openNewTab}
                />
              </div>
              <div className="relative h-44">
                <Image
                  src={photos[0]}
                  alt=""
                  className="w-full object-cover rounded-br-xl h-full darker cursor-pointer"
                  onClick={openNewTab}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {screenSize.width <= 768 && (
        <div>
          <div className="w-full h-96 relative pt-2">
            <img
              src={url + photos[0]}
              alt=""
              className="w-full object-cover block h-full darker cursor-pointer"
              onClick={openNewTab}
            />
          </div>
        </div>
      )}
    </>
  );
}
