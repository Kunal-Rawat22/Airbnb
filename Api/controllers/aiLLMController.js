require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parse } = require("path");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const AImodel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

exports.getGenerativeModel = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ tripPlan: "Place and number of days are required." });
  }

  try {
    // const result = await AImodel.generateContent(`Plan a trip to ${place} for ${days} days. only list places to visit and city along with it no details only places name and city location name comma loaction and no hashes and stars only list using numbers as bullets`);
    // const tripPlan = await fetchTripPlan(place, days);
    const result = await AImodel.generateContent(prompt);
    const text = result.response.text();
      console.log(`##################${text}`);
    //   console.log("dnjedndjndjkndjkn");
    res.json(JSON.parse(text.replace(/```json|```/g, "").trim()));
    // const match = text.match(/const obj = (\[.*\]);/s);

    // if (match && match[1]) {
    //   // Escape single quotes inside string values
    //   const sanitizedText = match[1].replace(
    //     /'([^']*?)'/g,
    //     (m, p1) => `'${p1.replace(/'/g, "\\'")}'`
    //   );

    //   // Use eval after sanitizing
    //   const objArray = eval(`(${sanitizedText})`);
    //   res.json(objArray);
    // } else {
    //   res.json("Sorry Gemini AI is down as of now")
    //   console.log("Object not found in text.");
    // }
  } catch (error) {
    console.error("Error communicating with AI:", error);
    res.status(500).json({ text: "Failed to get a trip plan." });
  }
};

// const axios = require("axios");
// const OpenAI = require("openai")

// const openai = new OpenAI({
//   organization: "org-3BxyTI7IvbLjYsCFOGDEnVLT",
//   project: "proj_zQcyMAhSH9C0zQanNEpgZcuE",
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Example function to fetch a trip plan
// const fetchTripPlan = async (place, days) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "user", content: `Plan a trip to ${place} for ${days} days.` },
//       ],
//       headers: {
//         "OpenAI-Organization": process.env.OPENAI_ORGANIZATION_ID, // Add organization ID here if needed
//       },
//     });

//     const tripPlan = response.choices[0].message.content;
//     return tripPlan;
//   } catch (error) {
//     console.error("Error fetching trip plan:", {
//       message: error.message,
//       stack: error.stack,
//       response: error.response ? error.response.data : null,
//     });
//     throw error;
//   }
// };
