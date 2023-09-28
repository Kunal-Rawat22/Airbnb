/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
export default function PhotoUploader({ addedPhotos, setAddedPhotos, flag }) {
  const [photoLink, setPhotoLink] = useState("");
  //Handling Photo By Link
  async function addPhotobyLink(event) {
    event.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => [...prev, filename]);
    setPhotoLink("");
  }
  //Handling Photo by Upload
  function uploadPhoto(event) {
    event.preventDefault();
    const files = event.target.files;
    console.log(files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filename } = res;
        setAddedPhotos((prev) => [...prev, ...filename]);
      });
  }
  function handleDelete(e,link)
  {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter(photo=>photo !==link)])
    console.log("YO",link)
  }
  function selectAsMainPhoto(e,link)
  {
    e.preventDefault();
    setAddedPhotos([link, ...addedPhotos.filter((photo) => photo !== link)]);
  }
  return (
    <>
      <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 space-y-2">
        <label className="mb-2">Upload Images</label>
        <div className="flex space-x-1">
          <input
            type="text"
            name="upload-by-link"
            id=""
            placeholder="Add Using a Link"
            className=" w-4/5 border p-2 rounded-lg"
            value={photoLink}
            readOnly={!flag}
            onChange={(event) => setPhotoLink(event.target.value)}
          />
          <button
            className="bg-gray-500 p-2 rounded-lg text-white w-1/5 font-medium"
            onClick={addPhotobyLink}
          >
            Add
          </button>
        </div>
        <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-1 ">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="flex relative" key={link}>
                <img
                  src={"http://localhost:4000/uploads/" + link}
                  alt=""
                  className="rounded-xl w-full object-cover max-h-20"
                />
                <button className="absolute right-1.5 top-1.5" onClick={(e) => selectAsMainPhoto(e,link)} disabled={!flag} >
                  {link === addedPhotos[0] && <i className="fa-solid fa-star text-white cursor-pointer bg-black bg-opacity-70 p-0.5 rounded-sm"></i>}
                  {link !== addedPhotos[0] && <i className="fa-regular fa-star  text-white cursor-pointer bg-black bg-opacity-70 p-0.5 rounded-sm"></i>}
                </button>
                <button className="absolute left-1.5 top-1.5" onClick={(e)=>handleDelete(e,link)} disabled={!flag} >
                  <i className="fa-solid fa-trash text-white cursor-pointer"></i>
                </button>
              </div>
            ))}
          <label className="border bg-transparent rounded-2xl p-4 text-base flex items-center justify-center py-6 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={uploadPhoto}
              readOnly={!flag}
              disabled={!flag}
              multiple
            />
            <i className="fa-solid fa-cloud-arrow-up"></i>{" "}
            <span>&nbsp;Upload</span>
          </label>
        </div>
      </div>
    </>
  );
}
