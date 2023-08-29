import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  //Handling Email
  function handleEmail(event) {
    setUserInput((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  }

  //Handling Submit
  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("/login", userInput);
      // setUserInput({
      //   email: "",
      //   password: "",
      // });
      alert("Login Successful");
    } catch (e) {
      alert("Login Failed");
    }
  }

  //Hnadling Password
  function handlePassword(event) {
    setUserInput((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
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
          <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2  text-sm text-slate-500 mt-6">
            <label htmlFor="PhoneNumber">Email</label>
            <input
              type="email"
              id="PhoneNumber"
              className="focus:outline-none"
              onChange={handleEmail}
              value={userInput.email}
              required={true}
            />
          </div>
          <div className="p-1 flex flex-col border border-1 border-gray-200 focus:outline-1 rounded-lg px-2  text-sm text-slate-500">
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
        Don&apos;t have an account yet?{" "}
        <Link
          to={"/register"}
          className="font-semibold underline text-slate-700"
        >
          Register Now
        </Link>
      </p>
    </>
  );
}
