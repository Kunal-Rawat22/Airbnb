import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const TripPlanner = ({ prompt }) => {
  const [tripPlan, setTripPlan] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("dmhvhmsdbhkdgbhjkghdhjbhjdbjkbn");
  useEffect(() => {
    if (prompt) {
      setLoading(true);
      try {
        axios.post("/api/getTripPlan", { prompt }).then(({ data }) => {
          setTripPlan(data.text);
          console.log(data.text);
        });
        // let plainText = response.data.text
        //   .replace(/## (.+)/g, "$1") // Remove ## headers
        //   .replace(/\*\*(.+?)\*\*/g, "$1") // Remove *bold* formatting
        //   .replace(/\*([^\*]+)\*/g, "$1") // Remove italic formatting
        //   .replace(/\n\n+/g, "\n\n") // Ensure single line breaks
        //   .replace(/\n/g, " ") // Replace remaining newlines with spaces
        //   .trim(); // Trim leading and trailing whitespace

        // setTripPlan(response.data.text);
        // console.log(response.data.text);
      } catch (error) {
        console.error("Error fetching trip plan", error);
        setTripPlan("Sorry, there was an error fetching the trip plan.");
      }
      setLoading(false);
    }
  }, [prompt]);

  return (
    <div style={styles.container}>
      {loading && <p>Loading...</p>}
      {tripPlan && (
        <div style={styles.tripDetails}>
          <h2>Trip Plan:</h2>
          <ReactMarkdown>{tripPlan}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  form: {
    marginBottom: "20px",
  },
  input: {
    marginRight: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
  },
  tripDetails: {
    marginTop: "20px",
  },
};

export default TripPlanner;
