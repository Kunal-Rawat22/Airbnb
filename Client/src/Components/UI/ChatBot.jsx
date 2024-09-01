import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faX } from "@fortawesome/free-solid-svg-icons";
const countries = {
  USA: ["California", "Texas", "New York"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  India: ["Maharashtra", "Karnataka", "Delhi"],
};

const days = [1, 2, 3, 4, 5, 6, 7];

const Chatbot = () => {
  //Chatbot Active
  const [isChatboxOpen, setChatboxOpen] = useState(false);
  //Close Flag
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  //Message Container
  const [messages, setMessages] = useState([]);
  //Country Flag
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  //State Flag
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  //Day Flag
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  //Country Var
  const [selectedCountry, setSelectedCountry] = useState("");
  //State Var
  const [selectedState, setSelectedState] = useState("");
  //Day Var
  const [noOfDays, setNoOfDays] = useState(0);
  //User Msg Var
  const [userMsg, setUserMsg] = useState("");
  //Bot Msg Var
  const [botMsg, setBotMsg] = useState("Click to suggest some places");

  //From close to open
  const handleChatboxToggle = () => {
    setChatboxOpen(true);
    setShowCloseConfirmation(false);
  };

  const handleBotMessage = () => {
    setMessages((prev) => [...prev, { text: botMsg, type: "bot" }]);
    setBotMsg("");
  };
  //   const handleSendButton = (message, type = "user") => {
  //     setMessages([messages, { text: message, type }]);
  //     e.target.value = "";
  //   };

  const handleClickSuggestPlaces = () => {
    handleBotMessage();
    setBotMsg("Please select country you want to visit:");
    setShowCountryDropdown(true);
    setShowStateDropdown(false);
    setShowDaysDropdown(false);
  };

  const handleSelectCountry = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    handleBotMessage();
    setBotMsg("Please select state you want to visit:");
    handleUserMessage(e, country);
    setShowStateDropdown(true);
    setShowCountryDropdown(false);
  };

  const handleSelectState = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    handleBotMessage();
    setBotMsg("Please select no. of days you want to live:");
    handleUserMessage(e, state);
    setShowDaysDropdown(true);
    setShowStateDropdown(false);
  };

  const handleSelectDays = (e) => {
    const days = e.target.value;
    setNoOfDays(days);
    const text = `You selected ${days} days in ${selectedState}, ${selectedCountry}.`;
    handleUserMessage(e, text);
    setShowDaysDropdown(false);
    setSelectedCountry("");
    setSelectedState("");
  };

  const handleMessage = (e) => {
    setUserMsg(e.target.value);
    console.log(userMsg);
  };

  const handleUserMessage = (e, message = "") => {
    if (message === "") {
      setMessages((prev) => [...prev, { text: userMsg, type: "user" }]);
      setUserMsg("");
    } else setMessages((prev) => [...prev, { text: message, type: "user" }]);
  };

  const handleCrossMinimize = () => {
    setShowCloseConfirmation(false);
    setChatboxOpen(false);
  };

  const handleCloseBot = () => {
    setChatboxOpen(false);
    setMessages([]);
    setShowCloseConfirmation(false);
    setShowCountryDropdown(false);
    setShowStateDropdown(false);
    setShowDaysDropdown(false);
    setSelectedCountry("");
    setSelectedState("");
    setNoOfDays(0);
    setUserMsg("");
    setBotMsg("Click to suggest some places");
  };

  return (
    <div className="relative z-10">
      {!isChatboxOpen && (
        <div
          id="chatbox-toggle"
          className="fixed bottom-5 right-5 w-16 h-16 bg-gradient-to-r text-white from-[#4F1787] to-[#EC6164] rounded-full flex items-center justify-center text-base font-bold cursor-pointer z-50 animate-pulseReduced transition-transform transform hover:scale-110"
          onClick={handleChatboxToggle}
        >
          Ask Me
        </div>
      )}
      {isChatboxOpen && (
        <div className="fixed bottom-20 right-5 w-1/4 h-4/5 bg-white rounded-lg shadow-xl border border-1 flex flex-col z-50">
          <div className=" bg-[#EB6162] text-white p-2 flex justify-between items-center rounded-t-lg w-full">
            <span>Need help?</span>
            <div className="flex gap-4">
              <button
                className="bg-transparent text-white text-xl"
                onClick={() => setChatboxOpen(false)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button
                className="bg-transparent text-white text-xl"
                onClick={() => setShowCloseConfirmation(true)}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          </div>
          <div className="flex-1 p-3 overflow-y-auto w-full h-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.type === "user" ? "justify-end" : ""
                }`}
              >
                <div
                  className={`max-w-3/4 p-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-[#EB6162] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {showCountryDropdown && (
              <div className="mt-2">
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleSelectCountry}
                >
                  <option value="">Select a country</option>
                  {Object.keys(countries).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {showStateDropdown && (
              <div className="mt-2">
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleSelectState}
                >
                  <option value="">Select a state</option>
                  {countries[selectedCountry].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {showDaysDropdown && (
              <div className="mt-2">
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleSelectDays}
                >
                  <option value="">Select number of days</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {!showCountryDropdown &&
              !showStateDropdown &&
              !showDaysDropdown && (
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-lg mt-2"
                  onClick={handleClickSuggestPlaces}
                >
                  Click to suggest some places
                </button>
              )}
          </div>
          <div className="p-2 border-t border-gray-300 flex items-center">
            <input
              id="user-input"
              type="text"
              placeholder="Ask me anything..."
              onChange={handleMessage}
              value={userMsg}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleUserMessage(e)}
            />
            <button
              className="bg-[#EB6162] text-white px-4 py-2 ml-2 rounded-lg text-sm"
              onClick={handleUserMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {showCloseConfirmation && isChatboxOpen && (
        <div className="fixed bottom-28 right-5 p-4 bg-white rounded-lg shadow-lg z-[1000] w-72">
          <p>Do you want to close the chat? If not, please minimize it.</p>
          <div className="mt-2 flex">
            <button
              className="bg-[#EB6162] text-white px-4 py-2 rounded-lg mr-2"
              onClick={handleCloseBot}
            >
              Close
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={handleCrossMinimize}
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
