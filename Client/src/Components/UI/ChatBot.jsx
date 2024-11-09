import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { Country, State } from "country-state-city";
import axios from "axios";


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
  // All countries Var
  const [countries, setCountries] = useState([]);
  // All states Var
  const [states, setStates] = useState([]);
  // Prompt
  const [prompt, setPrompt] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all countries on component mount
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (prompt) {
      setLoading(true);
      try {
        axios.post("/api/getTripPlan", { prompt }).then(({ data }) => {
          // let plainText = data.text.replace(/## (.+)/g, "$1") // Remove ## headers
          // .replace(/\*\*(.+?)\*\*/g, "$1") // Remove *bold* formatting
          // .replace(/\*([^\*]+)\*/g, "$1") // Remove italic formatting
          // .replace(/\n\n+/g, "\n\n") // Ensure single line breaks
          // .replace(/\n/g, " ") // Replace remaining newlines with spaces
          // .trim(); // Trim leading and trailing whitespace
          handleBotMessage(data, data.text);
          console.log(data.text);
        });
        // setTripPlan(response.data.text);
        // console.log(response.data.text);
      } catch (error) {
        console.error("Error fetching trip plan", error);
        handleBotMessage(error,"Sorry, there was an error fetching the trip plan.");
      }
      setLoading(false);
    }
  }, [prompt]);

  // Generate prompt based on selections
  const generatePrompt = () => {
    if (selectedCountry && selectedState && noOfDays) {
      const promptMessage = `Plan a trip to state of ${selectedState} in ${selectedCountry} for ${noOfDays} days. only list places to visit and city along with it no details only places name and city location name comma loaction and no hashes and stars only list using numbers as bullets. write cities only in Day heading and give this in plain text`;
      //   const promptMessage = `Given the state of ${selectedState} in ${selectedCountry} and a travel duration of ${days} days, provide a concise list of the top travel destinations and activities to explore within that timeframe and within the state only and please list the cities. Focus on a variety of interests including nature, history, culture, and adventure. Highlight unique experiences, must-see landmarks, and local cuisines that showcase the essence of ${selectedState}. Additionally, include practical tips for optimizing travel time between locations to make the most of the journey. The response should be around 150 words, giving a clear overview without excessive detail.`;
      setPrompt(promptMessage);
    } else {
      alert("Please select a country, state, and enter the number of days.");
    }
  };

  //From close to open
  const handleChatboxToggle = () => {
    setChatboxOpen(true);
    setShowCloseConfirmation(false);
  };

  const handleBotMessage = (e, botMsg) => {
    setMessages((prev) => [...prev, { text: botMsg, type: "bot" }]);
  };
  //   const handleSendButton = (message, type = "user") => {
  //     setMessages([messages, { text: message, type }]);
  //     e.target.value = "";
  //   };

  const handleClickSuggestPlaces = (e) => {
    handleBotMessage(e, "Click to suggest some places");
    setShowCountryDropdown(true);
    setShowStateDropdown(false);
    setShowDaysDropdown(false);
  };

  const handleSelectCountry = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    handleBotMessage(e, "Please select country you want to visit:");
    handleUserMessage(e, country);
    setShowStateDropdown(true);
    setShowCountryDropdown(false);
    const countryName = Country.getAllCountries().find(
      (c) => c.name === country
    );
    if (countryName) {
      setStates(State.getStatesOfCountry(countryName.isoCode));
    }
    setSelectedState("");
  };

  const handleSelectState = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    handleBotMessage(e, "Please select state you want to visit:");
    handleUserMessage(e, state);
    setShowDaysDropdown(true);
    setShowStateDropdown(false);
  };

  const handleSelectDays = (e) => {
    const days = e.target.value;
    setNoOfDays(days);
    handleBotMessage(e, "Please enter no. of days you want to spend:");
    handleUserMessage(e, days);
    const text = `You have selected ${days} days in ${selectedState}, ${selectedCountry}.`;
    handleBotMessage(e,text);
    setShowDaysDropdown(false);
    setSelectedCountry("");
    setSelectedState("");
    generatePrompt();
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
  };

  return (
    <div className="relative z-50">
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
          <div className="flex-1 p-3 overflow-y-auto w-full h-full relative bg-custom-bg bg-center bg-cover">
            {/* <div className="absolute inset-0 bg-custom-bg opacity-30 bg-cover bg-repeat-y bg-center pointer-events-none -z-20"></div> */}
            <div className="relative z-10">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={`flex mb-2 w-full ${
                    m.type === "user" ? "justify-end" : ""
                  }`}
                >
                  <div
                    className={`w-3/4 flex ${
                      m.type === "user" ? "justify-end" : ""
                    }`}
                  >
                    <div
                      className={`flex max-w-3/4 p-2 rounded-lg whitespace-normal break-words ${
                        m.type === "user"
                          ? "bg-[#EB6162] text-white opacity-100"
                          : "bg-gray-200 text-black opacity-100"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {showCountryDropdown && (
              <div className="mt-2">
                <select
                  className=" p-2 border border-gray-300 rounded-lg max-w-3/4 opacity-100"
                  value={selectedCountry}
                  onChange={handleSelectCountry}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {showStateDropdown && (
              <div className="mt-2">
                <select
                  className="max-w-3/4 p-2 border border-gray-300 rounded-lg opacity-100"
                  value={selectedState}
                  onChange={handleSelectState}
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {showDaysDropdown && (
              <div className="mt-2">
                <label className="max-w-3/4 p-2 border bg-gray-200 border-gray-300 rounded-lg opacity-100 h-full">
                  Please enter no. of days :
                </label>
                <input
                  className=" max-w-12 p-2 border border-gray-300 rounded-lg opacity-100"
                  onChange={(e) => setNoOfDays(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSelectDays(e)}
                  value={noOfDays}
                  type="number"
                />
              </div>
            )}
            {!showCountryDropdown &&
              !showStateDropdown &&
              !showDaysDropdown && (
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-lg mt-2 opacity-100"
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
