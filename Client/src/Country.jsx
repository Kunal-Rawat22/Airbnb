import { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import TripPlanner from "./Trial";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [days, setDays] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    // Fetch all countries on component mount
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  // Handle country change
  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);
    const country = Country.getAllCountries().find(
      (c) => c.name === countryName
    );
    if (country) {
      setStates(State.getStatesOfCountry(country.isoCode));
    }
    setSelectedState("");
  };

  // Handle state change
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  // Generate prompt based on selections
  const generatePrompt = () => {
    if (selectedCountry && selectedState && days) {
      const promptMessage = `Plan a trip to state of ${selectedState} in ${selectedCountry} for ${days} days. only list places to visit and city along with it no details only places name and city location name comma loaction and no hashes and stars only list using numbers as bullets. write cities only in Day heading and give this in plain text`;
      //   const promptMessage = `Given the state of ${selectedState} in ${selectedCountry} and a travel duration of ${days} days, provide a concise list of the top travel destinations and activities to explore within that timeframe and within the state only and please list the cities. Focus on a variety of interests including nature, history, culture, and adventure. Highlight unique experiences, must-see landmarks, and local cuisines that showcase the essence of ${selectedState}. Additionally, include practical tips for optimizing travel time between locations to make the most of the journey. The response should be around 150 words, giving a clear overview without excessive detail.`;
      setPrompt(promptMessage);
    } else {
      alert("Please select a country, state, and enter the number of days.");
    }
  };

  return (
    <div>
      <h1>Travel Prompt Generator</h1>
      <div>
        <label htmlFor="country-dropdown">Select a Country:</label>
        <select
          id="country-dropdown"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">--Select a Country--</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="state-dropdown">Select a State:</label>
        <select
          id="state-dropdown"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">--Select a State--</option>
          {states.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="days-input">Number of Days:</label>
        <input
          type="number"
          id="days-input"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>
      <button onClick={generatePrompt}>Generate Prompt</button>
      {prompt && (
        <div>
          {prompt}
          <TripPlanner prompt={prompt} />
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
