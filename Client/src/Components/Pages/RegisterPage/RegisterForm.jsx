import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function RegisterForm() {
  const [userInput, setUserInput] = useState({
    userName: "",
    mobileNo: null,
    email: "",
    password: "",
    gender: "",
    dob: "",
  });

  const [redirect, setRedirect] = useState(false);
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
  //Handling Password
  function handlePassword(event) {
    setUserInput((prevState) => ({
      ...prevState,
      password: event.target.value,
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
      await axios.post("/register", userInput);
      setUserInput({
        userName: "",
        mobileNo: "",
        email: "",
        password: "",
        gender: "",
        dob: "",
      });
      alert("You have successfully registered. You can log in now !!");
    } catch (e) {
      setUserInput({
        userName: "",
        mobileNo: "",
        email: "",
        password: "",
        gender: "",
        dob: "",
      });
      alert("Registration Failed!! Try Again Later");
    }
    setRedirect(true);
  }
  if (redirect === true) {
    return(<Navigate to={"/"} />);
  }
  console.log(userInput);
  return (
    <>
      <form onSubmit={handleOnSubmit} className="px-8 py-4 pt-8 flex flex-col">
        <div>
          {" "}
          <h1 className="text-2xl font-medium">Welcome to Airbnb !!</h1>
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
                onChange={handleName}
                required={true}
                value={userInput.userName}
              />
            </div>
            <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500 w-1/2">
              <label htmlFor="PhoneNumber">Mobile Number</label>
              <input
                type="number"
                id="PhoneNumber"
                className="focus:outline-none"
                onChange={handleMNo}
                required={true}
                value={userInput.mobileNo}
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
                onChange={handleGender}
                value={userInput.gender}
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
                onChange={handleDOB}
                required={true}
                value={userInput.dob}
              />
            </div>
          </div>
          <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="focus:outline-none"
              onChange={handleEmail}
              value={userInput.email}
              required={true}
            />
          </div>
          <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2 text-sm text-slate-500">
            <label htmlFor="PhoneNumber">Password</label>
            <input
              type="password"
              id="password"
              className="focus:outline-none"
              onChange={handlePassword}
              value={userInput.password}
              required={true}
            />
          </div>
        </div>

        <p className="text-xs text-slate-500 my-3 ">
          We&apos;ll call or text you to confirm your number. Standard message
          and data rates apply.
          <span className="font-semibold underline text-slate-700">
            {" "}
            Privacy Policy
          </span>
        </p>
        <button
          type="submit"
          className="bg-pink-600 p-2.5 text-white text-base font-semibold rounded-lg mt-1"
        >
          Continue
        </button>
      </form>
      <p className="text-xs text-slate-500 my-3 mx-auto">
        Already have an account ?{" "}
        <Link to={"/login"} className="font-semibold underline text-slate-700">
          Login
        </Link>
      </p>
    </>
  );
}
