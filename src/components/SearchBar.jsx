import axios from "axios";
import React, { useState } from "react";

function SearchBar({ onSelectLocation }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // API Call
  async function apiCall() {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
        },
      });

      setLocation(
        response.data
          .map((element) => ({
            name: element.display_name.split(",")[0], // main city name
            state: element.address?.state,
            country: element.address?.country,
            addresstype: element.addresstype,
            lat: parseFloat(element.lat),
            lon: parseFloat(element.lon),
          }))
          .filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.name === item.name &&
                  t.state === item.state &&
                  t.country === item.country
              )
          )
      );

      setIsVisible(true);
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  function cardHandle(loc) {
    setIsVisible(false);

    // Unique key like "Paris, Île-de-France, France"
    const cityKey = `${loc.name}${loc.state ? ", " + loc.state : ""}${loc.country ? ", " + loc.country : ""
      }`;

    onSelectLocation([loc.lat, loc.lon], cityKey);
  }

  return (
    <div className="flex flex-col items-center py-4 relative ">
      {/* Search Section */}
      <div
        className={`flex flex-col sm:flex-row mb-4 mt-[${location.length > 0 ? "50px" : "0"
          }] w-full sm:w-auto`}
      >
        <input
          type="text"
          placeholder="Location"
          className="w-full sm:w-96 mr-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") apiCall();
          }}
        />
        <button
          className="mt-2 sm:mt-0 px-4 py-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-600 focus:outline-none hover:cursor-pointer"
          onClick={apiCall}
        >
          Search
        </button>
      </div>

      {/* Result cards */}
      {isVisible && (
        <div className="absolute top-[120px] p-2 z-50 sm:top-[90px] w-full sm:w-[80%] md:w-[34%] rounded-2xl flex flex-col items-center bg-gray-100">
          {location.map((loc, index) => (
            <div
              key={index}
              className="bg-white border border-black w-[80%] sm:w-[30vw] shadow-md rounded-lg p-4 m-2 hover:shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => cardHandle(loc)}
            >
              <p className="text-lg font-semibold text-gray-800">{loc.name}</p>
              <p className="text-gray-600">
                {loc.addresstype === "state" ? null : loc.state}
              </p>
              <p className="text-gray-500">
                {loc.addresstype === "country" ? null : loc.country}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
