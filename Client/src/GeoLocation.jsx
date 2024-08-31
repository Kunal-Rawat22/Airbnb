import axios from "axios";
import  { useState } from "react";

const GetLocation = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLocation({ lat, lon });
          setError(null);

          // Send location data to the server
            try {
            const response = await axios.post("/api/location", { lat, lon });

            const result = await response.json();
            console.log(result.message);
          } catch (err) {
            console.error("Error sending location:", err);
          }
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <button onClick={getCurrentLocation}>Get Current Location</button>
      {error && <p>Error: {error}</p>}
      {location.lat && location.lon && (
        <p>
          Latitude: {location.lat}, Longitude: {location.lon}
        </p>
      )}
    </div>
  );
};

export default GetLocation;
