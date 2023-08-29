import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import {  Navigate } from "react-router-dom";
import axios from "axios";
export default function ProfileTab() {
  const { ready, user } = useContext(UserContext);
  const [flag, setFlag] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    mobileNo: "",
    email: "",
    gender: "",
    dob: Date,
  });

  useEffect(() => {
    console.log("use");
    if (ready && user) {
      console.log(user?.dob);
      setUserInput({
        userName: user?.userName,
        mobileNo: user?.mobileNo,
        email: user?.email,
        gender: user?.gender,
        dob: user?.dob,
      });
    }
  }, [ready, user]);

  //
  //Handling Name
  function handleName(event) {
    setUserInput((prevState) => ({
      ...prevState,
      userName: event.target.value,
    }));
  }
  //Handling Mobile No.
  function handleMNo(event) {
    setUserInput((prevState) => ({
      ...prevState,
      mobileNo: event.target.value,
    }));
  }
  //Handling Email
  function handleEmail(event) {
    setUserInput((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  }

  //Handling Gender
  function handleGender(event) {
    setUserInput((prevState) => ({
      ...prevState,
      gender: event.target.value,
    }));
  }
  //Handling DOB
  function handleDOB(event) {
    setUserInput((prevState) => ({
      ...prevState,
      dob: event.target.value,
    }));
  }
  //Handling onSubmit
  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      await axios.put("/updateProfile", userInput);
      setRedirect(true);
      setFlag(true);
      console.log("first");
      alert("You have successfully updated.");
    } catch (e) {
      alert("Updation Failed!! Try Again Later");
    }
  }

  //Handling Logout
  async function handleLogout() {
    try {
      await axios.get("/logout");
      setRedirect(true);
      alert("You have successfully Logout.");
      window.location.reload();
    } catch (e) {
      alert("Logout Failed!! Try Again Later");
    }
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  function handleEdit(event) {
    if (flag === false) {
      setFlag(true);
    }
    event.preventDefault();
  }

  if (redirect === true) {
    window.location.reload();
  }
  return (
    <form className="px-8 py-4 flex flex-col w-1/3 mx-auto border border-1 mt-10 rounded-2xl pb-8">
      <div className="">
        {" "}
        <h1 className="text-2xl font-medium text-center pb-3">
          User Profile !!
        </h1>
        <hr />
      </div>

      <div className=" space-y-1">
        {" "}
        <div className=" mt-6  half flex space-x-1">
          <div className="p-1 px-2 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg text-sm text-slate-500 w-1/2">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              className="focus:outline-none"
              required={true}
              value={userInput.userName}
              readOnly={!flag}
              onChange={handleName}
              //   contentEditable
            />
          </div>
          <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
            <label htmlFor="PhoneNumber">Mobile Number</label>
            <input
              type="number"
              id="PhoneNumber"
              className="focus:outline-none"
              required={true}
              value={userInput.mobileNo}
              readOnly={!flag}
              onChange={handleMNo}
            />
          </div>
        </div>
        <div className="half flex space-x-1">
          <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
            <label htmlFor="Name">Gender</label>
            <select
              name="Gender"
              id=""
              className="focus:outline-none"
              value={userInput.gender}
              disabled={!flag}
              onChange={handleGender}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
            <label htmlFor="Dob">Date of Birth</label>
            <input
              type="date"
              id="DOB"
              className="focus:outline-none"
              required={true}
              value={userInput.dob}
              readOnly={!flag}
              onChange={handleDOB}
            />
          </div>
        </div>
        <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="focus:outline-none"
            value={userInput.email}
            onChange={handleEmail}
            readOnly={!flag}
            required={true}
          />
        </div>
      </div>

      <p className="text-xs text-slate-500 my-3 ">
        We&apos;ll call or text you to confirm your number. Standard message and
        data rates apply.
        <span className="font-semibold underline text-slate-700">
          Privacy Policy
        </span>
      </p>
      <button
        type={!flag ? "button" : "submit"}
        onClick={!flag ? handleEdit : handleOnSubmit}
        className="bg-pink-600 p-2.5 text-white text-base font-semibold rounded-lg mt-1 border border-black hover:bg-slate-200 hover:text-slate-500 hover:shadow-xl"
      >
        {!flag ? "Edit Profile" : "Update Profile"}
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="bg-pink-600 p-2.5 text-white text-base font-semibold rounded-lg mt-1 border border-black hover:bg-slate-200 hover:text-slate-500 hover:shadow-xl"
      >
        Logout
      </button>
    </form>
  );
}
