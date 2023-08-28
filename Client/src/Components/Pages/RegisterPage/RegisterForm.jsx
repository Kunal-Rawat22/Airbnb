import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [userInput, setUserInput] = useState({
    userName: "",
    mobileNo: null,
    email: "",
    password: "",
    gender: "",
    dob: Date,
  });
  function handleName(event) {
    setUserInput((prevState) => ({
      ...prevState,
      userName: event.target.value,
    }));
  }
  function handleMNo(event) {
    setUserInput((prevState) => ({
      ...prevState,
      mobileNo: event.target.value,
    }));
  }
  function handleEmail(event) {
    setUserInput((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  }
  function handlePassword(event) {
    setUserInput((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  }

  function handleGender(event) {
    setUserInput((prevState) => ({
      ...prevState,
      gender: event.target.value,
    }));
  }
  function handleDOB(event) {
    setUserInput((prevState) => ({
      ...prevState,
      dob: event.target.value,
    }));
  }
  function handleOnSubmit(event) {

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
