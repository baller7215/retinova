const axios = require("axios");
const express = require("express");
const app = express();

/**
 * nominatim search function
 *
 * @param address user's current address location
 * @param keywords query with any keywords
 * @returns list of locations that match the given address and keywords
 */
const searchPlacesNominatim = async (address, keywords) => {
    const results = [];

    for (const keyword of keywords) {
        const query = `${keyword}, ${address}`;
        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: query,
                    format: "json",
                    addressdetails: 1,
                    limit: 10,
                },
            });
            results.push(...response.data);
        } catch (error) {
            console.error(`Nominatim error for query "${query}":`, error.message);
        }
    }

    return results.map((item) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        address: "No address available", // placeholder for address
    }));
};

/**
 * overpass search function
 *
 * @param lat latitude
 * @param lon longitude
 * @param radius optional radius that can be specified. defaults to 25000
 * @returns list of locations that match the given address and keywords
 */
const searchPlacesOverpass = async (lat, lon, radius = 25000) => {
    const query = `[out:json];
        node["healthcare"="optometrist"](around:${radius},${lat},${lon});
        out;`;

    try {
        const response = await axios.get("https://overpass-api.de/api/interpreter", {
            params: { data: query },
        });
        return response.data.elements.map((element) => ({
            name: element.tags.name || "Unknown",
            lat: element.lat,
            lon: element.lon,
            address: "No address available", // placeholder for address
        }));
    } catch (error) {
        console.error("Overpass API error:", error.message);
        return [];
    }
};

/**
 * reverse geocode function
 *
 * @param lat latitude
 * @param lon longitude
 * @returns uses nominatim reverse search to refetch the address given a lat and lon
 */
const reverseGeocode = async (lat, lon) => {
    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: {
                format: "json",
                lat,
                lon,
                addressdetails: 1,
            },
        });
        const address = response.data.address || {};
        return `${address.road || ""}, ${address.city || address.town || address.village || ""}, ${
            address.state || ""
            }, ${address.country || ""}`.replace(/(^[,\s]+|[,\s]+$)/g, ""); // clean up commas
    } catch (error) {
        console.error(`Reverse geocoding failed for (${lat}, ${lon}):`, error.message);
        return "No address available";
    }
};

// Combined Search with Reverse Geocoding
/**
 * combines search with reverse geocoding
 *
 * @param street
 * @param city
 * @param county
 * @param state
 * @param country
 * @param postalcode
 * @param lat
 * @param lon
 * @returns combination of results from nominate and overpass
 */
const searchCombined = async ({ street, city, county, state, country, postalcode, lat, lon }) => {
    // build the address string for Nominatim
    const addressParts = [street, city, county, state, country, postalcode].filter(Boolean).join(", ");

    // define keywords
    /** @todo add more keywords for bigger search */
    const keywords = ["optometrist", "eye care", "ophthalmologist"];

    // perform searches
    const nominatimResults = await searchPlacesNominatim(addressParts, keywords);
    const overpassResults = await searchPlacesOverpass(lat, lon);

    // combine results
    const allResults = [...nominatimResults, ...overpassResults];

    // reverse geocode missing addresses
    const resultsWithAddresses = await Promise.all(
        allResults.map(async (result) => {
            if (result.address === "No address available") {
                result.address = await reverseGeocode(result.lat, result.lon);
            }
            return result;
        })
    );

    // remove duplicates based on lat/lon
    const uniqueResults = Array.from(
        new Map(resultsWithAddresses.map((item) => [`${item.lat},${item.lon}`, item])).values()
    );

    return uniqueResults;
};


/**
 * api endpoint that calls helper functions
 */
app.get("/api/nearby-clinics", async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }

        const address = await axios
            .get("https://nominatim.openstreetmap.org/reverse", {
                params: {
                format: "json",
                lat,
                lon,
                addressdetails: 1,
                },
            })
            .then((response) => response.data.address);

        // Extract address components
        const street = `${address.house_number || ""} ${address.road || ""}`.trim();
        const city = address.city || address.town || address.village || address.suburb || "";
        const county = address.county || "";
        const state = address.state || "";
        const country = address.country || "";
        const postalcode = address.postcode || "";

        // Perform the combined search
        const clinics = await searchCombined({ street, city, county, state, country, postalcode, lat, lon });

        res.json(clinics);
    } catch (error) {
        console.error("Error fetching clinics:", error.message);
        res.status(500).json({ error: "An error occurred while fetching clinics" });
    }
});

// start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
