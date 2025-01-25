const express = require("express");
const axios = require("axios");
const app = express();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
console.log(GOOGLE_MAPS_API_KEY)

app.get("/api/nearby-clinics", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius: 5000, // 5 km radius
          type: "hospital",
          keyword: "clinic",
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching nearby clinics");
  }
});

app.listen(5000, () => {5000
  console.log("Server running on port 5000");
});
